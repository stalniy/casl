import { Rule, ConditionsMatcher, FieldMatcher } from './Rule';
import { RawRule } from './RawRule';
import { wrapArray, getSubjectName, expandActions, AliasesMap } from './utils';
import {
  GetSubjectName,
  Subject,
  ExtractSubjectType as E,
  ValueOf,
  CanParameters,
} from './types';
import { mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';

const DEFAULT_ALIASES: AliasesMap = {};

function hasAction(action: string, actions: string | string[]): boolean {
  return action === actions || Array.isArray(actions) && actions.indexOf(action) !== -1;
}

export type Unsubscribe = () => void;

export interface AbilityOptions<Subjects extends Subject, Conditions> {
  subjectName?: GetSubjectName<Subjects>
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
}

export type AnyAbility = Ability<any, any, any>;
export type AbilityParameters<T> = T extends Ability<infer A, infer S, infer C>
  ? { action: A, subject: S, conditions: C }
  : never;

export type RuleOf<T extends AnyAbility> = Rule<
AbilityParameters<T>['action'],
AbilityParameters<T>['subject'],
AbilityParameters<T>['conditions']
>;

export interface AbilityEvent<T extends AnyAbility> {
  ability: T
}
export interface UpdateEvent<T extends AnyAbility> extends AbilityEvent<T> {
  rules: RawRule<
  AbilityParameters<T>['action'],
  E<AbilityParameters<T>['subject']>,
  AbilityParameters<T>['conditions']
  >[]
}
export type EventHandler<Event> = (event: Event) => void;

type RuleIndex<A extends string, S extends Subject, C> = {
  [subject: string]: {
    [action: string]: {
      [priority: number]: Rule<A, S, C>
    }
  }
};

type Events<T extends AnyAbility> =
  Record<keyof EventsMap<T>, EventHandler<ValueOf<EventsMap<T>>>[]>;

type EventsMap<T extends AnyAbility> = {
  update: UpdateEvent<T>
  updated: UpdateEvent<T>
};

export class Ability<
  Actions extends string,
  Subjects extends Subject,
  Conditions
> {
  private _hasPerFieldRules: boolean = false;
  private _mergedRules: Record<string, this['rules']> = {};
  private _events: Events<this> = Object.create(null);
  private _indexedRules: RuleIndex<Actions, Subjects, Conditions> = {};
  private readonly _fieldMatcher: FieldMatcher;
  private readonly _conditionsMatcher: ConditionsMatcher<Conditions>;
  public readonly subjectName: GetSubjectName<Subjects | string> = getSubjectName;
  private _rules: this['rules'] = [];
  public readonly rules!: Rule<Actions, Subjects, Conditions>[];

  static addAlias<T extends string, U extends string>(
    alias: T,
    actions: Exclude<U, T> | Exclude<U, T>[]
  ) {
    if (alias === 'manage' || hasAction('manage', actions)) {
      throw new Error('Cannot add alias for "manage" action because it represents any action');
    }

    if (hasAction(alias, actions)) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${actions.toString()}`);
    }

    DEFAULT_ALIASES[alias] = actions;
    return this;
  }

  constructor(
    rules: RawRule<Actions, E<Subjects>, Conditions>[],
    options: AbilityOptions<Subjects, Conditions> = {}
  ) {
    this._conditionsMatcher = options.conditionsMatcher
      || mongoQueryMatcher as unknown as ConditionsMatcher<Conditions>;
    this._fieldMatcher = options.fieldMatcher || fieldPatternMatcher;
    Object.defineProperty(this, 'subjectName', { value: options.subjectName || getSubjectName });
    Object.defineProperty(this, 'rules', { get: () => this._rules });
    this.update(rules);
  }

  update(rules: RawRule<Actions, E<Subjects>, Conditions>[]): this {
    if (!Array.isArray(rules)) {
      return this;
    }

    const event = { rules, ability: this };

    this._emit('update', event);
    this._mergedRules = Object.create(null);

    const index = this._buildIndexFor(rules);

    if (index.isAllInverted) {
      // eslint-disable-next-line
      console.warn('Make sure your ability has allowable rules, not only inverted ones. Otherwise `ability.can` will always return `false`.');
    }

    this._indexedRules = index.indexedRules;
    this._rules = index.rules;
    this._hasPerFieldRules = index.hasPerFieldRules;
    this._emit('updated', event);

    return this;
  }

  private _buildIndexFor(rawRules: RawRule<Actions, E<Subjects>, Conditions>[]) {
    const rules: Rule<Actions, Subjects, Conditions>[] = [];
    const indexedRules: RuleIndex<Actions, Subjects, Conditions> = Object.create(null);
    const options = {
      fieldMatcher: this._fieldMatcher,
      conditionsMatcher: this._conditionsMatcher
    };
    let isAllInverted = true;
    let hasPerFieldRules = false;

    for (let i = 0; i < rawRules.length; i++) {
      const rule = new Rule(rawRules[i], options);
      const actions = expandActions(DEFAULT_ALIASES, rule.action);
      const priority = rawRules.length - i - 1;
      const subjects = wrapArray(rule.subject);

      rules.push(rule);
      isAllInverted = !!(isAllInverted && rule.inverted);

      if (!hasPerFieldRules && rule.fields) {
        hasPerFieldRules = true;
      }

      for (let k = 0; k < subjects.length; k++) {
        const subject = this.subjectName(subjects[k]);
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
      indexedRules,
      rules,
    };
  }

  can(...args: CanParameters<Actions, Subjects>): boolean {
    const field = args[2];

    if (field && typeof field !== 'string') {
      throw new Error('Ability.can expects 3rd parameter to be a string. See https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html#checking-fields for details');
    }

    const rule = this.relevantRuleFor(...args);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<Actions, Subjects>) {
    const rules = this.rulesFor(...args);
    const subject = args[1] as Subjects;

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  possibleRulesFor(...args: CanParameters<Actions, Subjects, false>) {
    const [action, subject] = args;
    const subjectName = this.subjectName(subject);
    const mergedRules = this._mergedRules;
    const key = `${subjectName}_${action}`;

    if (!mergedRules[key]) {
      mergedRules[key] = this._mergeRulesFor(action, subjectName);
    }

    return mergedRules[key];
  }

  private _mergeRulesFor(action: Actions, subjectName: string) {
    const subjects = subjectName === 'all' ? [subjectName] : [subjectName, 'all'];
    const mergedRules = subjects.reduce((rules, subjectType) => {
      const subjectRules = this._indexedRules[subjectType];

      if (!subjectRules) {
        return rules;
      }

      return Object.assign(rules, subjectRules[action], subjectRules.manage);
    }, []);

    // TODO: think whether there is a better way to prioritize rules
    // or convert sparse array to regular one
    return mergedRules.filter(Boolean);
  }

  rulesFor(...args: CanParameters<Actions, Subjects>) {
    const [action, subject, field] = args;
    const rules: this['rules'] = (this as any).possibleRulesFor(action, subject);

    if (!this._hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.matchesField(field));
  }

  cannot(...args: CanParameters<Actions, Subjects>): boolean {
    return !this.can(...args);
  }

  on<T extends keyof EventsMap<this>>(
    event: T,
    handler: EventHandler<EventsMap<this>[T]>
  ): Unsubscribe {
    const events = this._events;
    let isAttached = true;

    if (!events[event]) {
      events[event] = [];
    }

    events[event].push(handler);

    return () => {
      if (isAttached) {
        const index = events[event].indexOf(handler);
        events[event].splice(index, 1);
        isAttached = false;
      }
    };
  }

  private _emit<T extends keyof EventsMap<this>>(
    eventName: T,
    event: EventsMap<this>[T]
  ) {
    const handlers = this._events[eventName];

    if (handlers) {
      handlers.slice(0).forEach(handler => handler(event));
    }
  }
}
