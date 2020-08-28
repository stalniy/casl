import { Rule, RuleOptions } from './Rule';
import { RawRuleFrom } from './RawRule';
import { CanParameters, Abilities, Normalize, Subject, SubjectType } from './types';
import { wrapArray, detectSubjectType, identity, mergePrioritized, getOrDefault } from './utils';
import { LinkedItem } from './structures/LinkedItem';

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

export type Events<
  T extends WithGenerics,
  Event extends {} = {},
  K extends keyof EventsMap<T, Event> = keyof EventsMap<T, Event>
> = Map<K, {
  last: LinkedItem<EventHandler<EventsMap<T, Event>[K]>> | null,
  destroy: Array<Unsubscribe> | null,
  emits: boolean
}>;

interface EventsMap<T extends WithGenerics, Event extends {} = {}> {
  update: UpdateEvent<T> & Event
  updated: UpdateEvent<T> & Event
}

type IndexTree<A extends Abilities, C> = Map<SubjectType, Map<string, {
  rules: Rule<A, C>[],
  merged: boolean
}>>;

export type Unsubscribe = () => void;

const defaultActionEntry = () => ({
  rules: [] as unknown as Rule<any, any>[],
  merged: false
});
const defaultSubjectEntry = () => new Map<string, ReturnType<typeof defaultActionEntry>>();
const defaultEventEntry = () => ({ emits: false, last: null, destroy: null });

export class RuleIndex<A extends Abilities, Conditions, BaseEvent extends {} = {}> {
  private _hasPerFieldRules: boolean = false;
  private _events: Events<this, BaseEvent> = new Map();
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
    this._rules = rules;
    this._indexedRules = this._buildIndexFor(rules);
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
    this._rules = rules;
    this._indexedRules = this._buildIndexFor(rules);
    this._emit('updated', event);

    return this;
  }

  private _buildIndexFor(rawRules: RawRuleFrom<A, Conditions>[]) {
    const indexedRules: IndexTree<A, Conditions> = new Map();

    for (let i = rawRules.length - 1; i >= 0; i--) {
      const priority = rawRules.length - i - 1;
      const rule = new Rule(rawRules[i], this._ruleOptions, priority);
      const actions = wrapArray(rule.action);
      const subjects = wrapArray(rule.subject);
      this._analyze(rule);

      for (let k = 0; k < subjects.length; k++) {
        const subjectType = this.detectSubjectType(subjects[k]);
        const subjectRules = getOrDefault(indexedRules, subjectType, defaultSubjectEntry);

        for (let j = 0; j < actions.length; j++) {
          getOrDefault(subjectRules, actions[j], defaultActionEntry).rules.push(rule);
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
    const subjectType = this.detectSubjectType(subject);
    const subjectRules = getOrDefault(this._indexedRules, subjectType, defaultSubjectEntry);
    const actionRules = getOrDefault(subjectRules, action, defaultActionEntry);

    if (actionRules.merged) {
      return actionRules.rules;
    }

    const manageRules = action !== 'manage' && subjectRules.has('manage')
      ? subjectRules.get('manage')!.rules
      : undefined;
    let rules = mergePrioritized(actionRules.rules, manageRules);

    if (subjectType !== 'all') {
      rules = mergePrioritized(rules, (this as any).possibleRulesFor(action, 'all'));
    }

    actionRules.rules = rules;
    actionRules.merged = true;

    return rules;
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
    const details = getOrDefault(this._events, event, defaultEventEntry);
    const item = new LinkedItem(handler, details.last);
    details.last = item;
    const destroy = () => {
      if (details.emits) {
        details.destroy = details.destroy || [];
        details.destroy.push(destroy);
        return;
      }

      if (!item.next && !item.prev && details.last === item) {
        details.last = null;
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
    const details = this._events.get(name);

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
      }
    }
  }
}
