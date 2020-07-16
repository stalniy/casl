import { Rule } from './Rule';
import { RawRuleFrom } from './RawRule';
import {
  DetectSubjectType,
  ResolveAction,
  CanParameters,
  Abilities,
  Normalize,
  ConditionsMatcher,
  FieldMatcher,
  RuleOptions,
} from './types';
import { wrapArray, detectSubjectType, identity } from './utils';

type AnyRuleIndex = RuleIndex<any, any, any>;

export interface RuleIndexOptions<A extends Abilities, Conditions> {
  detectSubjectType?: DetectSubjectType<Normalize<A>[1]>
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
  resolveAction?: ResolveAction<Normalize<A>[0]>
}

export type Generics<T extends AnyRuleIndex> = T extends AnyRuleIndex
  ? { abilities: T['za'], conditions: T['zc'] }
  : never;

export type RuleOf<T extends AnyRuleIndex> =
  Rule<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RawRuleOf<T extends AnyRuleIndex> =
  RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions']>;

export type RuleIndexOptionsOf<T extends AnyRuleIndex> =
  RuleIndexOptions<Generics<T>['abilities'], Generics<T>['conditions']>;

export interface UpdateEvent<T extends AnyRuleIndex> {
  rules: RawRuleOf<T>[]
}
export type EventHandler<Event> = (event: Event) => void;

export type Events<T extends AnyRuleIndex, Event extends {} = {}> = {
  [K in keyof EventsMap<T, Event>]: EventHandler<EventsMap<T, Event>[K]>[]
};

interface EventsMap<T extends AnyRuleIndex, Event extends {} = {}> {
  update: UpdateEvent<T> & Event
  updated: UpdateEvent<T> & Event
}

interface IndexTree<A extends Abilities, C> {
  [subject: string]: {
    [action: string]: {
      [priority: number]: Rule<A, C>
    }
  }
}

type RuleIterator<A extends Abilities, C> = (rule: RawRuleFrom<A, C>, index: number) => void;

export type Unsubscribe = () => void;

export class RuleIndex<A extends Abilities, Conditions, BaseEvent extends {} = {}> {
  private _hasPerFieldRules: boolean = false;
  private _mergedRules: Record<string, Rule<A, Conditions>[]> = Object.create(null);
  private _events: Events<this, BaseEvent> = Object.create(null);
  private _indexedRules: IndexTree<A, Conditions> = Object.create(null);
  private _rules: this['rules'] = [];
  readonly rules!: RawRuleFrom<A, Conditions>[];
  readonly _ruleOptions!: RuleOptions<A, Conditions>;
  readonly detectSubjectType!: DetectSubjectType<Normalize<A>[1]>;
  /** @private hacky property to track Abilities type */
  readonly za!: A;
  /** @private hacky property to track Conditions type */
  readonly zc!: Conditions;

  constructor(
    rules: RawRuleFrom<A, Conditions>[] = [],
    options: RuleIndexOptions<A, Conditions> = {}
  ) {
    this._ruleOptions = {
      conditionsMatcher: options.conditionsMatcher,
      fieldMatcher: options.fieldMatcher,
      resolveAction: options.resolveAction || identity,
    };
    Object.defineProperty(this, 'detectSubjectType', {
      value: options.detectSubjectType || detectSubjectType
    });
    Object.defineProperty(this, 'rules', { get: () => this._rules });
    this.update(rules);
  }

  update(rules: RawRuleFrom<A, Conditions>[]): this {
    const event = {
      rules,
      ability: this,
      target: this
    } as unknown as UpdateEvent<this> & BaseEvent;

    this._emit('update', event);
    this._mergedRules = Object.create(null);
    this._indexedRules = this._buildIndexFor(rules);
    this._rules = rules;
    this._emit('updated', event);

    return this;
  }

  private _buildIndexFor(rawRules: RawRuleFrom<A, Conditions>[]) {
    const indexedRules: IndexTree<A, Conditions> = Object.create(null);

    for (let i = 0; i < rawRules.length; i++) {
      const rule = new Rule(rawRules[i], this._ruleOptions);
      const priority = rawRules.length - i - 1;
      const actions = wrapArray(rule.action);
      const subjects = wrapArray(rule.subject);
      this._analyze(rule);

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

    return indexedRules;
  }

  private _analyze(rule: Rule<A, Conditions>) {
    if (!this._hasPerFieldRules && rule.fields) {
      this._hasPerFieldRules = true;
    }
  }

  possibleRulesFor(...args: CanParameters<A, false>) {
    const [action, subject] = args;
    const subjectName = this.detectSubjectType(subject);
    const mergedRules = this._mergedRules;
    const key = `${subjectName}_${action}`;

    if (!mergedRules[key]) {
      mergedRules[key] = this._mergeRulesFor(action, subjectName);
    }

    return mergedRules[key];
  }

  private _mergeRulesFor(action: string, subjectName: string) {
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
    const rules: Rule<A, Conditions>[] = (this as any).possibleRulesFor(action, subject);

    if (field && typeof field !== 'string') {
      throw new Error('The 3rd, `field` parameter is expected to be a string. See https://stalniy.github.io/casl/en/api/casl-ability#can-of-pure-ability for details');
    }

    if (!this._hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.matchesField(field));
  }

  on<T extends keyof EventsMap<this, BaseEvent>>(
    event: T,
    handler: EventHandler<EventsMap<this, BaseEvent>[T]>
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

  private _emit<T extends keyof EventsMap<this, BaseEvent>>(
    eventName: T,
    event: EventsMap<this, BaseEvent>[T]
  ) {
    const handlers = this._events[eventName];

    if (handlers) {
      handlers.slice(0).forEach(handler => handler(event));
    }
  }
}
