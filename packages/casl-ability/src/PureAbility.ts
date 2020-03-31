import { Rule, RuleOptions } from './Rule';
import { RawRuleFrom } from './RawRule';
import { wrapArray, detectSubjectType, identity } from './utils';
import {
  DetectSubjectType,
  ResolveAction,
  ValueOf,
  CanParameters,
  Abilities,
  Normalize,
  ConditionsMatcher,
  FieldMatcher
} from './types';

export type Unsubscribe = () => void;

export interface AbilityOptions<A extends Abilities, Conditions> {
  /** @deprecated use "detectSubjectType" option instead */
  subjectName?: this['detectSubjectType']
  detectSubjectType?: DetectSubjectType<Normalize<A>[1]>
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
  resolveAction?: ResolveAction<Normalize<A>[0]>
}

export type AnyAbility = PureAbility<any, any>;
export type Generics<T extends AnyAbility> = T extends AnyAbility
  ? { abilities: T['za'], conditions: T['zc'] } : never;


export type RuleOf<T extends AnyAbility> =
  Rule<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RawRuleOf<T extends AnyAbility> =
  RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions']>;

export type AbilityOptionsOf<T extends AnyAbility> =
  AbilityOptions<Generics<T>['abilities'], Generics<T>['conditions']>;

export interface AbilityEvent<T extends AnyAbility> {
  ability: T
}
export interface UpdateEvent<T extends AnyAbility> extends AbilityEvent<T> {
  rules: RawRuleOf<T>[]
}
export type EventHandler<Event> = (event: Event) => void;

type Events<T extends AnyAbility> =
  Record<keyof EventsMap<T>, EventHandler<ValueOf<EventsMap<T>>>[]>;

type EventsMap<T extends AnyAbility> = {
  update: UpdateEvent<T>
  updated: UpdateEvent<T>
};

type RuleIndex<A extends Abilities, C> = {
  [subject: string]: {
    [action: string]: {
      [priority: number]: Rule<A, C>
    }
  }
};

export type AbilityClass<T extends AnyAbility> = new (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export class PureAbility<A extends Abilities = Abilities, Conditions = unknown> {
  private _hasPerFieldRules: boolean = false;
  private _mergedRules: Record<string, this['rules']> = {};
  private _events: Events<this> = Object.create(null);
  private _indexedRules: RuleIndex<A, Conditions> = {};
  private readonly _ruleOptions: RuleOptions<A, Conditions>;
  public readonly detectSubjectType!: DetectSubjectType<Normalize<A>[1]>;
  private _rules: this['rules'] = [];
  public readonly rules!: Rule<A, Conditions>[];

  constructor(
    rules: RawRuleFrom<A, Conditions>[] = [],
    options: AbilityOptions<A, Conditions> = {}
  ) {
    this._ruleOptions = {
      conditionsMatcher: options.conditionsMatcher,
      fieldMatcher: options.fieldMatcher,
      resolveAction: options.resolveAction || identity,
    };
    Object.defineProperty(this, 'detectSubjectType', {
      value: options.detectSubjectType || options.subjectName || detectSubjectType
    });
    Object.defineProperty(this, 'rules', { get: () => this._rules });
    this.update(rules);
  }

  update(rules: RawRuleFrom<A, Conditions>[]): this {
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

  private _buildIndexFor(rawRules: RawRuleFrom<A, Conditions>[]) {
    const rules: this['rules'] = [];
    const indexedRules: RuleIndex<A, Conditions> = Object.create(null);
    let isAllInverted = true;
    let hasPerFieldRules = false;

    for (let i = 0; i < rawRules.length; i++) {
      const rule = new Rule(rawRules[i], this._ruleOptions);
      const actions = wrapArray(rule.action);
      const priority = rawRules.length - i - 1;
      const subjects = wrapArray(rule.subject);

      rules.push(rule);
      isAllInverted = !!(isAllInverted && rule.inverted);

      if (!hasPerFieldRules && rule.fields) {
        hasPerFieldRules = true;
      }

      for (let k = 0; k < subjects.length; k++) {
        const subject = this.detectSubjectType(subjects[k]);
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

  can(...args: CanParameters<A>): boolean {
    const field = args[2];

    if (field && typeof field !== 'string') {
      throw new Error('`can` expects 3rd parameter to be a string. See https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html#checking-fields for details');
    }

    const rule = this.relevantRuleFor(...args);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<A>) {
    const rules = this.rulesFor(...args);
    const subject = args[1];

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  possibleRulesFor(...args: CanParameters<A, false>) {
    const [action, subject] = args;
    const subjectName = this.detectSubjectType(subject);
    const mergedRules = this._mergedRules;
    const key = `${subjectName}_${action}`;

    if (!mergedRules[key]) {
      mergedRules[key] = this._mergeRulesFor(action as string, subjectName);
    }

    return mergedRules[key];
  }

  private _mergeRulesFor(action: Normalize<A>[0], subjectName: string) {
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

  rulesFor(...args: CanParameters<A>) {
    const [action, subject, field] = args;
    const rules: this['rules'] = (this as any).possibleRulesFor(action, subject);

    if (!this._hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.matchesField(field));
  }

  cannot(...args: CanParameters<A>): boolean {
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

  private _emit<T extends keyof EventsMap<this>>(eventName: T, event: EventsMap<this>[T]) {
    const handlers = this._events[eventName];

    if (handlers) {
      handlers.slice(0).forEach(handler => handler(event));
    }
  }
}

// workaround for complex inference logic
export interface PureAbility<A extends Abilities = Abilities, Conditions = unknown> {
  /** holds Abilities generic parameter to simplify type inference */
  readonly za: A;
  /** holds Conditions generic parameter to simplify type inference */
  readonly zc: Conditions;
}
