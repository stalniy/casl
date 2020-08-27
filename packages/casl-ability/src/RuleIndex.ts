import { Rule, RuleOptions } from './Rule';
import { RawRuleFrom } from './RawRule';
import { CanParameters, Abilities, Normalize, Subject } from './types';
import { wrapArray, detectSubjectType, identity, LinkedItem } from './utils';

export interface RuleIndexOptions<A extends Abilities, C> extends Partial<RuleOptions<A, C>> {
  detectSubjectType?(subject?: Normalize<A>[1]): string
}

declare const $abilities: unique symbol;
declare const $conditions: unique symbol;
interface WithGenerics {
  [$abilities]: any
  [$conditions]: any
}
export type Public<T extends WithGenerics> = { [K in keyof T]: T[K] };
export type Generics<T extends WithGenerics> = {
  abilities: T[typeof $abilities],
  conditions: T[typeof $conditions]
};

export type RuleOf<T extends WithGenerics> =
  Rule<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RawRuleOf<T extends WithGenerics> =
  RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions']>;

export type RuleIndexOptionsOf<T extends WithGenerics> =
  RuleIndexOptions<Generics<T>['abilities'], Generics<T>['conditions']>;

export interface UpdateEvent<T extends WithGenerics> {
  rules: RawRuleOf<T>[]
}
export type EventHandler<Event> = (event: Event) => void;

export type Events<T extends WithGenerics, Event extends {} = {}> = {
  [K in keyof EventsMap<T, Event>]: {
    last: LinkedItem<EventHandler<EventsMap<T, Event>[K]>> | null,
    destroy: Array<Unsubscribe> | null,
    emits: boolean
  }
};

interface EventsMap<T extends WithGenerics, Event extends {} = {}> {
  update: UpdateEvent<T> & Event
  updated: UpdateEvent<T> & Event
}

interface IndexTree<A extends Abilities, C> {
  [key: string]: {
    [priority: number]: Rule<A, C>
  }
}

const indexTreeId = (action: string, subject: string) => `${action}_${subject}`;

export type Unsubscribe = () => void;

export class RuleIndex<A extends Abilities, Conditions, BaseEvent extends {} = {}> {
  private _hasPerFieldRules: boolean = false;
  private _events: Events<this, BaseEvent> = Object.create(null);
  private _mergedRules!: Record<string, Rule<A, Conditions>[]>;
  private _indexedRules!: IndexTree<A, Conditions>;
  private _rules!: RawRuleFrom<A, Conditions>[];
  private readonly _ruleOptions!: RuleOptions<A, Conditions>;
  readonly detectSubjectType!: Exclude<RuleIndexOptions<A, Conditions>['detectSubjectType'], undefined>;
  readonly [$abilities]!: A;
  readonly [$conditions]!: Conditions;

  constructor(
    rules: RawRuleFrom<A, Conditions>[] = [],
    options: RuleIndexOptions<A, Conditions> = {}
  ) {
    this._ruleOptions = {
      conditionsMatcher: options.conditionsMatcher,
      fieldMatcher: options.fieldMatcher,
      resolveAction: options.resolveAction || identity,
    };
    this.detectSubjectType = options.detectSubjectType || detectSubjectType;
    this._setRules(rules);
  }

  _setRules(rules: RawRuleFrom<A, Conditions>[]) {
    this._rules = rules;
    this._indexedRules = this._buildIndexFor(rules);
    this._mergedRules = Object.create(null);
  }

  get rules() {
    return this._rules;
  }

  update(rules: RawRuleFrom<A, Conditions>[]): Public<this> {
    const event = {
      rules,
      ability: this,
      target: this
    } as unknown as UpdateEvent<this> & BaseEvent;

    this._emit('update', event);
    this._setRules(rules);
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

        for (let j = 0; j < actions.length; j++) {
          const key = indexTreeId(actions[j], subject);
          indexedRules[key] = indexedRules[key] || Object.create(null);
          indexedRules[key][priority] = rule;
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

  possibleRulesFor(...[action, subject]: CanParameters<A, false>) {
    const subjectName = this.detectSubjectType(subject);
    const mergedRules = this._mergedRules;
    const key = indexTreeId(action, subjectName);

    if (!mergedRules[key]) {
      mergedRules[key] = this._mergeRulesFor(action, subjectName);
    }

    return mergedRules[key];
  }

  private _mergeRulesFor(action: string, subjectName: string) {
    const subjects = subjectName === 'all' ? [subjectName] : [subjectName, 'all'];
    const mergedRules = subjects.reduce((rules, subjectType) => {
      const subjectRules = this._indexedRules[indexTreeId(action, subjectType)];
      return Object.assign(rules, subjectRules, this._indexedRules[indexTreeId('manage', subjectType)]);
    }, []);

    // TODO: think whether there is a better way to prioritize rules
    // or convert sparse array to regular one
    return mergedRules.filter(Boolean);
  }

  rulesFor(...args: CanParameters<A>): Rule<A, Conditions>[]
  rulesFor(action: string, subject?: Subject, field?: string): Rule<A, Conditions>[] {
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
    this._events[event] = this._events[event] || { emits: false, last: null, destroy: null };
    const details = this._events[event];
    const item = new LinkedItem(handler, details.last);
    this._events[event].last = item;
    const destroy = () => {
      if (details.emits) {
        details.destroy = details.destroy || [];
        details.destroy.push(destroy);
        return;
      }

      if (!item.next && !item.prev && this._events[event].last === item) {
        this._events[event].last = null;
      } else {
        item.destroy();
      }
    };

    return destroy;
  }

  private _emit<T extends keyof EventsMap<this, BaseEvent>>(
    name: T,
    payload: EventsMap<this, BaseEvent>[T]
  ) {
    const details = this._events[name];

    if (!details) {
      return;
    }

    try {
      details.emits = true;
      let item = details.last;
      while (item !== null) {
        item.value(payload);
        item = item.prev;
      }
    } finally {
      details.emits = false;
      if (details.destroy) {
        details.destroy.forEach(destroy => destroy());
        details.destroy = [];
      }
    }
  }
}
