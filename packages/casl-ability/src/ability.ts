import ForbiddenError from './error';
import Rule from './rule';
import { RawRule } from './RawRule';
import { wrapArray, getSubjectName, clone } from './utils';
import { GetSubjectName, AbilitySubject } from './types';

type AliasesMap = {
  [key: string]: string | string[]
};
const DEFAULT_ALIASES: AliasesMap = {
  crud: ['create', 'read', 'update', 'delete'],
};

function hasAction(action: string, actions: string | string[]): boolean {
  return action === actions || Array.isArray(actions) && actions.indexOf(action) !== -1;
}

export type CanArgsType = [string, AbilitySubject, string?];

export type Unsubscribe = () => void;

export interface AbilityOptions {
  subjectName?: GetSubjectName
  RuleType?: typeof Rule
}

export interface AbilityEvent {
  ability: Ability
}

export interface UpdateEvent extends AbilityEvent {
  rules: RawRule[]
}

export type EventHandler<T extends AbilityEvent> = (event: T) => void;

interface Internals {
  RuleType: typeof Rule
  originalRules: RawRule[]
  hasPerFieldRules: boolean
  aliases: AliasesMap
  indexedRules: {
    [subjectName: string]: {
      [action: string]: {
        [priority: number]: Rule
      }
    }
  }
  mergedRules: {
    [key: string]: Rule[]
  }
  events: {
    [name: string]: EventHandler<AbilityEvent>[]
  }
}

const PRIVATE_FIELD = Symbol('private');

export class Ability {
  private readonly [PRIVATE_FIELD]: Internals;

  public readonly subjectName: GetSubjectName;

  public readonly rules: RawRule[];

  static addAlias(alias: string, actions: string | string[]) {
    if (alias === 'manage' || hasAction('manage', actions)) {
      throw new Error('Cannot add alias for "manage" action because it represents any action');
    }

    if (hasAction(alias, actions)) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${actions.toString()}`);
    }

    DEFAULT_ALIASES[alias] = actions;
    return this;
  }

  constructor(rules: RawRule[], options: AbilityOptions = {}) {
    this[PRIVATE_FIELD] = {
      RuleType: options.RuleType || Rule,
      originalRules: rules || [],
      hasPerFieldRules: false,
      indexedRules: Object.create(null),
      mergedRules: Object.create(null),
      events: {},
      aliases: clone(DEFAULT_ALIASES)
    };
    this.subjectName = options.subjectName || getSubjectName;
    Object.defineProperty(this, 'subjectName', { value: this.subjectName });
    this.rules = [];
    Object.defineProperty(this, 'rules', { get: () => this[PRIVATE_FIELD].originalRules });
    this.update(rules);
  }

  update(rules: RawRule[]): Ability {
    if (!Array.isArray(rules)) {
      return this;
    }

    const payload: UpdateEvent = { rules, ability: this };

    this._emit('update', payload);
    this[PRIVATE_FIELD].originalRules = rules.slice(0);
    this[PRIVATE_FIELD].mergedRules = Object.create(null);

    const index = this.buildIndexFor(rules);

    if (process.env.NODE_ENV !== 'production' && index.isAllInverted && rules.length) {
      // eslint-disable-next-line
      console.warn('[casl]: Ability contains only inverted rules. That means user will not be able to do any actions. This will be changed to Error throw in the next major version')
    }

    this[PRIVATE_FIELD].indexedRules = index.rules;
    this[PRIVATE_FIELD].hasPerFieldRules = index.hasPerFieldRules;

    this._emit('updated', payload);

    return this;
  }

  buildIndexFor(rules: RawRule[]) {
    const indexedRules: Internals['indexedRules'] = Object.create(null);
    const { RuleType } = this[PRIVATE_FIELD];
    let isAllInverted = true;
    let hasPerFieldRules = false;

    for (let i = 0; i < rules.length; i++) {
      const rule = new RuleType(rules[i]);
      const actions = this.expandActions(rule.actions);
      const subjects = wrapArray(rule.subject);
      const priority = rules.length - i - 1;

      isAllInverted = !!(isAllInverted && rule.inverted);

      if (!hasPerFieldRules && rule.fields) {
        hasPerFieldRules = true;
      }

      for (let k = 0; k < subjects.length; k++) {
        const subject = subjects[k];
        indexedRules[subject] = indexedRules[subject] || Object.create(null);

        for (let j = 0; j < actions.length; j++) {
          const action = actions[j];
          indexedRules[subject][action] = indexedRules[subject][action] || Object.create(null);
          indexedRules[subject][action][priority] = rule;
        }
      }
    }

    return {
      isAllInverted,
      hasPerFieldRules,
      rules: indexedRules,
    };
  }

  expandActions(rawActions: string | string[]) {
    const { aliases } = this[PRIVATE_FIELD];
    let actions = wrapArray(rawActions);
    let i = 0;

    while (i < actions.length) {
      const action = actions[i++];

      if (aliases.hasOwnProperty(action)) {
        actions = actions.concat(aliases[action]);
      }
    }

    return actions;
  }

  can(action: string, subject: AbilitySubject, field?: string): boolean {
    if (field && typeof field !== 'string') {
      // eslint-disable-next-line
      throw new Error('Ability.can expects 3rd parameter to be a string. See https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html#checking-fields for details')
    }

    const rule = this.relevantRuleFor(action, subject, field);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(action: string, subject: AbilitySubject, field?: string): Rule | null {
    const rules = this.rulesFor(action, subject, field);

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matches(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  possibleRulesFor(action: string, subject: AbilitySubject): Rule[] {
    const subjectName = this.subjectName(subject);
    const { mergedRules } = this[PRIVATE_FIELD];
    const key = `${subjectName}_${action}`;

    if (!mergedRules[key]) {
      mergedRules[key] = this._mergeRulesFor(action, subjectName);
    }

    return mergedRules[key];
  }

  private _mergeRulesFor(action: string, subjectName: string): Rule[] {
    const { indexedRules } = this[PRIVATE_FIELD];
    const mergedRules = [subjectName, 'all'].reduce((rules, subjectType) => {
      const subjectRules = indexedRules[subjectType];

      if (!subjectRules) {
        return rules;
      }

      return Object.assign(rules, subjectRules[action], subjectRules.manage);
    }, []);

    // TODO: think whether there is a better way to prioritize rules
    // or convert sparse array to regular one
    return mergedRules.filter(Boolean);
  }

  rulesFor(action: string, subject: AbilitySubject, field?: string): Rule[] {
    const rules = this.possibleRulesFor(action, subject);

    if (!this[PRIVATE_FIELD].hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.isRelevantFor(subject, field));
  }

  cannot(...args: CanArgsType): boolean {
    return !this.can(...args);
  }

  throwUnlessCan(...args: CanArgsType) {
    // eslint-disable-next-line
    console.warn(`
      Ability.throwUnlessCan is deprecated and will be removed in 4.x version.
      Please use "ForbiddenError.from(ability).throwUnlessCan(...)" instead.
    `.trim());
    ForbiddenError.from(this).throwUnlessCan(...args);
  }

  on(event: 'update' | 'updated', handler: EventHandler<UpdateEvent>): Unsubscribe;
  on<T extends AbilityEvent>(event: string, handler: EventHandler<T>): Unsubscribe {
    const { events } = this[PRIVATE_FIELD];
    let isAttached = true;

    if (!events[event]) {
      events[event] = [];
    }

    events[event].push(handler as EventHandler<AbilityEvent>);

    return () => {
      if (isAttached) {
        const index = events[event].indexOf(handler as EventHandler<AbilityEvent>);
        events[event].splice(index, 1);
        isAttached = false;
      }
    };
  }

  private _emit(eventName: 'update' | 'updated', event: UpdateEvent): void;
  private _emit(eventName: string, event: AbilityEvent): void {
    const handlers = this[PRIVATE_FIELD].events[eventName];

    if (handlers) {
      handlers.slice(0).forEach(handler => handler(event));
    }
  }
}
