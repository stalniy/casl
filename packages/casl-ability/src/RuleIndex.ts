import { Rule, RuleOptions } from './Rule';
import { RawRuleFrom } from './RawRule';
import {
  Abilities,
  Normalize,
  SubjectType,
  AbilityParameters,
  AbilityTuple,
  ExtractSubjectType
} from './types';
import { wrapArray, detectSubjectType, mergePrioritized, getOrDefault, identity, isSubjectType } from './utils';
import { LinkedItem, linkedItem, unlinkItem } from './structures/LinkedItem';

export interface RuleIndexOptions<A extends Abilities, C> extends Partial<RuleOptions<C>> {
  detectSubjectType?(
    subject: Exclude<Normalize<A>[1], SubjectType>
  ): ExtractSubjectType<Normalize<A>[1]>;
  anyAction?: string;
  anySubjectType?: string;
}

declare const $abilities: unique symbol;
declare const $conditions: unique symbol;
interface WithGenerics {
  [$abilities]: any
  [$conditions]: any
}
export type Public<T extends WithGenerics> = { [K in keyof T]: T[K] };
export interface Generics<T extends WithGenerics> {
  abilities: T[typeof $abilities],
  conditions: T[typeof $conditions]
}

export type RuleOf<T extends WithGenerics> =
  Rule<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RawRuleOf<T extends WithGenerics> =
  RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions']>;

export type RuleIndexOptionsOf<T extends WithGenerics> =
  RuleIndexOptions<Generics<T>['abilities'], Generics<T>['conditions']>;

interface AbilityEvent<T extends WithGenerics> {
  target: T
  /** @deprecated use "target" property instead */
  ability: T
}

export interface UpdateEvent<T extends WithGenerics> extends AbilityEvent<T> {
  rules: RawRuleOf<T>[]
}
export type EventHandler<Event> = (event: Event) => void;

export type Events<
  T extends WithGenerics,
  K extends keyof EventsMap<T> = keyof EventsMap<T>
> = Map<K, LinkedItem<EventHandler<EventsMap<T>[K]>> | null>;

interface EventsMap<T extends WithGenerics> {
  update: UpdateEvent<T>
  updated: UpdateEvent<T>
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
const analyze = (index: any, rule: Rule<any, any>) => {
  if (!index._hasPerFieldRules && rule.fields) {
    index._hasPerFieldRules = true;
  }
};

type AbilitySubjectTypeParameters<T extends Abilities, IncludeField extends boolean = true> =
  AbilityParameters<
  T,
  T extends AbilityTuple
    ? IncludeField extends true
      ? (action: T[0], subject: ExtractSubjectType<T[1]>, field?: string) => 0
      : (action: T[0], subject: ExtractSubjectType<T[1]>) => 0
    : never,
  (action: Extract<T, string>) => 0
  >;

export class RuleIndex<A extends Abilities, Conditions> {
  private _hasPerFieldRules: boolean = false;
  private _events: Events<this> = new Map();
  private _indexedRules!: IndexTree<A, Conditions>;
  private _rules!: RawRuleFrom<A, Conditions>[];
  private readonly _ruleOptions!: RuleOptions<Conditions>;
  private readonly _detectSubjectType!: Required<RuleIndexOptions<A, Conditions>>['detectSubjectType'];
  private readonly _anyAction: string;
  private readonly _anySubjectType: string;
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
    this._anyAction = options.anyAction || 'manage';
    this._anySubjectType = options.anySubjectType || 'all';
    this._detectSubjectType = options.detectSubjectType || detectSubjectType;
    this._rules = rules;
    this._indexedRules = this._buildIndexFor(rules);
  }

  get rules() {
    return this._rules;
  }

  detectSubjectType(object?: Normalize<A>[1]): ExtractSubjectType<Normalize<A>[1]> {
    if (isSubjectType(object)) return object;
    if (!object) return this._anySubjectType;
    return this._detectSubjectType(object as Exclude<Normalize<A>[1], SubjectType>);
  }

  update(rules: RawRuleFrom<A, Conditions>[]): Public<this> {
    const event = {
      rules,
      ability: this,
      target: this
    } as unknown as UpdateEvent<this>;

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
      const subjects = wrapArray(rule.subject || this._anySubjectType);
      analyze(this, rule);

      for (let k = 0; k < subjects.length; k++) {
        const subjectRules = getOrDefault(indexedRules, subjects[k], defaultSubjectEntry);

        for (let j = 0; j < actions.length; j++) {
          getOrDefault(subjectRules, actions[j], defaultActionEntry).rules.push(rule);
        }
      }
    }

    return indexedRules;
  }

  possibleRulesFor(...args: AbilitySubjectTypeParameters<A, false>): Rule<A, Conditions>[]
  possibleRulesFor(
    action: string,
    subjectType: SubjectType = this._anySubjectType
  ): Rule<A, Conditions>[] {
    if (!isSubjectType(subjectType)) {
      throw new Error('"possibleRulesFor" accepts only subject types (i.e., string or class) as the 2nd parameter');
    }

    const subjectRules = getOrDefault(this._indexedRules, subjectType, defaultSubjectEntry);
    const actionRules = getOrDefault(subjectRules, action, defaultActionEntry);

    if (actionRules.merged) {
      return actionRules.rules;
    }

    const anyActionRules = action !== this._anyAction && subjectRules.has(this._anyAction)
      ? subjectRules.get(this._anyAction)!.rules
      : undefined;
    let rules = mergePrioritized(actionRules.rules, anyActionRules);

    if (subjectType !== this._anySubjectType) {
      rules = mergePrioritized(rules, (this as any).possibleRulesFor(action, this._anySubjectType));
    }

    actionRules.rules = rules;
    actionRules.merged = true;

    return rules;
  }

  rulesFor(...args: AbilitySubjectTypeParameters<A>): Rule<A, Conditions>[]
  rulesFor(action: string, subjectType?: SubjectType, field?: string): Rule<A, Conditions>[] {
    const rules: Rule<A, Conditions>[] = (this as any).possibleRulesFor(action, subjectType);

    if (field && typeof field !== 'string') {
      throw new Error('The 3rd, `field` parameter is expected to be a string. See https://stalniy.github.io/casl/en/api/casl-ability#can-of-pure-ability for details');
    }

    if (!this._hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.matchesField(field));
  }

  on<T extends keyof EventsMap<this>>(
    event: T,
    handler: EventHandler<EventsMap<Public<this>>[T]>
  ): Unsubscribe {
    const head = this._events.get(event) || null;
    const item = linkedItem(handler, head);
    this._events.set(event, item);

    return () => {
      if (!item.next && !item.prev && this._events.get(event) === item) {
        this._events.delete(event);
      } else {
        unlinkItem(item);
      }
    };
  }

  private _emit<T extends keyof EventsMap<this>>(name: T, payload: EventsMap<this>[T]) {
    let current = this._events.get(name) || null;
    while (current !== null) {
      const prev = current.prev;
      current.value(payload);
      current = prev;
    }
  }
}
