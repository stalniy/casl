import { Rule, ConditionsMatcher, FieldMatcher } from './Rule';
import { RawRule } from './RawRule';
import { wrapArray, getSubjectName, clone } from './utils';
import { GetSubjectName, AbilitySubject } from './types';
import { mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';

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
  conditionsMatcher?: ConditionsMatcher<any>
  fieldMatcher?: FieldMatcher
}

export interface AbilityEvent {
  ability: Ability
}

export interface UpdateEvent extends AbilityEvent {
  rules: RawRule[]
}

export type EventHandler<T extends AbilityEvent> = (event: T) => void;

interface Internals {
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

  private readonly _fieldMatcher: FieldMatcher;

  private readonly _conditionsMatcher: ConditionsMatcher<any>;

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
    this._conditionsMatcher = options.conditionsMatcher || mongoQueryMatcher;
    this._fieldMatcher = options.fieldMatcher || fieldPatternMatcher;
    this[PRIVATE_FIELD] = {
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

    const event: UpdateEvent = { rules, ability: this };

    this._emit('update', event);
    this[PRIVATE_FIELD].originalRules = rules.slice(0);
    this[PRIVATE_FIELD].mergedRules = Object.create(null);

    const index = this.buildIndexFor(rules);

    if (index.isAllInverted) {
      // eslint-disable-next-line
      console.warn('Make sure your ability has allowable rules, not only inverted ones. Otherwise `ability.can` will always return `false`.');
    }

    this[PRIVATE_FIELD].indexedRules = index.rules;
    this[PRIVATE_FIELD].hasPerFieldRules = index.hasPerFieldRules;
    this._emit('updated', event);

    return this;
  }

  buildIndexFor(rules: RawRule[]) {
    const indexedRules: Internals['indexedRules'] = Object.create(null);
    const options = {
      fieldMatcher: this._fieldMatcher,
      conditionsMatcher: this._conditionsMatcher
    };
    let isAllInverted = true;
    let hasPerFieldRules = false;

    for (let i = 0; i < rules.length; i++) {
      const rule = new Rule(rules[i], options);
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
      isAllInverted: isAllInverted && rules.length > 0,
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
      throw new Error('Ability.can expects 3rd parameter to be a string. See https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html#checking-fields for details');
    }

    const rule = this.relevantRuleFor(action, subject, field);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(action: string, subject: AbilitySubject, field?: string): Rule | null {
    const rules = this.rulesFor(action, subject, field);

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matchesConditions(subject)) {
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

    return rules.filter(rule => rule.matchesField(field));
  }

  cannot(...args: CanArgsType): boolean {
    return !this.can(...args);
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
