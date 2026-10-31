import type { DefaultSubject, ResolveSubjects, SubjectResolver } from './SubjectResolver';
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
import { wrapArray, detectSubjectType, mergePrioritized, getOrDefault, identity, isSubjectType, DETECT_SUBJECT_TYPE_STRATEGY, filterWithLazyAllocation, validateEnforcedSubjectType } from './utils';
import { LinkedItem, linkedItem, unlinkItem } from './structures/LinkedItem';

export interface RuleIndexOptions<
  A extends Abilities, C, R extends SubjectResolver = DefaultSubject
> extends Partial<RuleOptions<C>> {
  detectSubjectType?(
    subject: Exclude<ResolveSubjects<Normalize<A>[1], R>, SubjectType>
  ): ExtractSubjectType<Normalize<A>[1], R>;
  anyAction?: string;
  anySubjectType?: string;
}

export declare const ɵabilities: unique symbol;
export declare const ɵconditions: unique symbol;
export declare const ɵsubjectResolver: unique symbol;
interface WithGenerics {
  [ɵabilities]: any
  [ɵconditions]: any
  [ɵsubjectResolver]: any
}
export type Public<T extends WithGenerics> = { [K in keyof T]: T[K] };
export interface Generics<T extends WithGenerics> {
  abilities: T[typeof ɵabilities],
  conditions: T[typeof ɵconditions],
  subjectResolver: T[typeof ɵsubjectResolver]
}

export type RuleOf<T extends WithGenerics> =
  Rule<Generics<T>['abilities'], Generics<T>['conditions'], Generics<T>['subjectResolver']>;
export type RawRuleOf<T extends WithGenerics> =
  RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions'], Generics<T>['subjectResolver']>;

export type RuleIndexOptionsOf<T extends WithGenerics> =
  RuleIndexOptions<Generics<T>['abilities'], Generics<T>['conditions'], Generics<T>['subjectResolver']>;

interface AbilityEvent<T extends WithGenerics> {
  target: T
  /** @deprecated use "target" property instead */
  ability: T
}

export interface UpdateEvent<T extends WithGenerics> extends AbilityEvent<T> {
  rules: RawRuleOf<T>[]
}
/**
 * @deprecated `on`/`emit` properly infer type without this type
 * TODO(major): delete
 */
export type EventHandler<Event> = (event: Event) => void;

export type Events<
  T extends WithGenerics,
  K extends keyof EventsMap<T> = keyof EventsMap<T>
> = Map<K, LinkedItem<EventsMap<T>[K]> | null>;

interface EventsMap<T extends WithGenerics> {
  update(event: UpdateEvent<T>): void
  updated(event: UpdateEvent<T>): void
}

type IndexTree<A extends Abilities, C, R extends SubjectResolver> = Map<SubjectType, Map<string, {
  rules: Rule<A, C, R>[],
  merged: boolean
}>>;

export type Unsubscribe = () => void;

const defaultActionEntry = () => ({
  rules: [] as unknown as Rule<any, any, any>[],
  merged: false
});
const defaultSubjectEntry = () => new Map<string, ReturnType<typeof defaultActionEntry>>();

type AbilitySubjectTypeParameters<
  T extends Abilities, R extends SubjectResolver, IncludeField extends boolean = true
> =
  AbilityParameters<
  T,
  T extends AbilityTuple
    ? IncludeField extends true
      ? (action: T[0], subject: ExtractSubjectType<T[1], R>, field?: string) => 0
      : (action: T[0], subject: ExtractSubjectType<T[1], R>) => 0
    : never,
  (action: Extract<T, string>) => 0
  >;

export class RuleIndex<
  A extends Abilities, Conditions, R extends SubjectResolver = DefaultSubject
> {
  private _hasPerFieldRules = false;
  private _events?: Events<this>;
  private _indexedRules: IndexTree<A, Conditions, R> = new Map();
  private _rules: RawRuleFrom<A, Conditions, R>[];
  private readonly _ruleOptions: RuleOptions<Conditions>;
  private _detectSubjectType: this['detectSubjectType'];
  private readonly _anyAction: string;
  private readonly _anySubjectType: string;
  private readonly _hasCustomSubjectTypeDetection: boolean;
  readonly [ɵabilities]!: A;
  readonly [ɵconditions]!: Conditions;
  declare readonly [ɵsubjectResolver]: R;

  constructor(
    rules: RawRuleFrom<A, Conditions, R>[] = [],
    options: RuleIndexOptions<A, Conditions, R> = {}
  ) {
    this._ruleOptions = {
      conditionsMatcher: options.conditionsMatcher,
      fieldMatcher: options.fieldMatcher,
      resolveAction: options.resolveAction || identity,
    };
    this._anyAction = options.anyAction || 'manage';
    this._anySubjectType = options.anySubjectType || 'all';
    this._rules = rules;
    this._hasCustomSubjectTypeDetection = !!options.detectSubjectType;
    this._detectSubjectType = options.detectSubjectType || (detectSubjectType as unknown as this['detectSubjectType']);
    this._indexAndAnalyzeRules(rules);
  }

  get rules() {
    return this._rules;
  }

  detectSubjectType(
    object?: ResolveSubjects<Normalize<A>[1], R>
  ): ExtractSubjectType<Normalize<A>[1], R> {
    if (isSubjectType(object)) return object as ExtractSubjectType<Normalize<A>[1], R>;
    if (!object) return this._anySubjectType as ExtractSubjectType<Normalize<A>[1], R>;
    validateEnforcedSubjectType(object);
    return this._detectSubjectType(
      object as Exclude<ResolveSubjects<Normalize<A>[1], R>, SubjectType>
    );
  }

  update(rules: RawRuleFrom<A, Conditions, R>[]): Public<this> {
    const event = {
      rules,
      ability: this,
      target: this
    } as unknown as UpdateEvent<this>;

    this._emit('update', event);
    this._hasPerFieldRules = false;
    this._rules = rules;
    this._indexAndAnalyzeRules(rules);
    this._emit('updated', event);

    return this;
  }

  private _indexAndAnalyzeRules(rawRules: RawRuleFrom<A, Conditions, R>[]) {
    const indexedRules: IndexTree<A, Conditions, R> = new Map();
    let typeOfSubjectType: string | undefined;

    for (let i = rawRules.length - 1; i >= 0; i--) {
      const priority = rawRules.length - i - 1;
      const rule = new Rule<A, Conditions, R>(rawRules[i], this._ruleOptions, priority);
      const actions = wrapArray(rule.action);
      const subjects = wrapArray(rule.subject || this._anySubjectType);
      if (!this._hasPerFieldRules && rule.fields) this._hasPerFieldRules = true;

      for (let k = 0; k < subjects.length; k++) {
        const subjectRules = getOrDefault(indexedRules, subjects[k], defaultSubjectEntry);
        if (typeOfSubjectType === undefined) {
          typeOfSubjectType = typeof subjects[k];
        }
        if (typeof subjects[k] !== typeOfSubjectType && typeOfSubjectType !== 'mixed') {
          typeOfSubjectType = 'mixed';
        }

        for (let j = 0; j < actions.length; j++) {
          getOrDefault(subjectRules, actions[j], defaultActionEntry).rules.push(rule);
        }
      }
    }

    this._indexedRules = indexedRules;
    if (typeOfSubjectType !== 'mixed' && !this._hasCustomSubjectTypeDetection) {
      const detectSubjectType = DETECT_SUBJECT_TYPE_STRATEGY[typeOfSubjectType as 'function' | 'string'] || DETECT_SUBJECT_TYPE_STRATEGY.string;
      this._detectSubjectType = detectSubjectType as unknown as this['detectSubjectType'];
    }
  }

  possibleRulesFor(
    ...args: AbilitySubjectTypeParameters<A, R, false>
  ): readonly Rule<A, Conditions, R>[];
  possibleRulesFor(
    action: string,
    subjectType: SubjectType = this._anySubjectType
  ): readonly Rule<A, Conditions, R>[] {
    if (!isSubjectType(subjectType)) {
      throw new Error('"possibleRulesFor" accepts only subject types (i.e., string or class) as the 2nd parameter');
    }

    const subjectRules = this._indexedRules.get(subjectType);
    const actionRules = subjectRules?.get(action);

    if (actionRules?.merged) {
      return actionRules.rules;
    }

    const anyActionRules = action !== this._anyAction && !!subjectRules?.has(this._anyAction)
      ? Object.freeze(subjectRules.get(this._anyAction)!.rules)
      : undefined;
    let rules = mergePrioritized(actionRules?.rules, anyActionRules);

    if (subjectType !== this._anySubjectType) {
      rules = mergePrioritized(rules, (this as any).possibleRulesFor(action, this._anySubjectType));
    }

    if (actionRules) {
      actionRules.rules = Object.freeze(rules) as Rule<A, Conditions, R>[];
      actionRules.merged = true;
    }

    return rules;
  }

  rulesFor(...args: AbilitySubjectTypeParameters<A, R>): readonly Rule<A, Conditions, R>[];
  rulesFor(
    action: string,
    subjectType?: SubjectType,
    field?: string
  ): readonly Rule<A, Conditions, R>[] {
    const rules: Rule<A, Conditions, R>[] = (this as any).possibleRulesFor(action, subjectType);

    if (field && typeof field !== 'string') {
      throw new Error('The 3rd, `field` parameter is expected to be a string. See https://casl.js.org/v6/en/api/casl-ability#can-of-ability for details');
    }

    if (!this._hasPerFieldRules) {
      return rules;
    }

    return filterWithLazyAllocation(rules, rule => rule.matchesField(field));
  }

  actionsFor(subjectType: ExtractSubjectType<Normalize<A>[1], R>): string[] {
    if (!isSubjectType(subjectType)) {
      throw new Error('"actionsFor" accepts only subject types (i.e., string or class) as a parameter');
    }

    const actions = new Set<string>();

    const subjectRules = this._indexedRules.get(subjectType);
    if (subjectRules) {
      Array.from(subjectRules.keys()).forEach(action => actions.add(action));
    }

    const anySubjectTypeRules = subjectType !== this._anySubjectType
      ? this._indexedRules.get(this._anySubjectType)
      : undefined;
    if (anySubjectTypeRules) {
      Array.from(anySubjectTypeRules.keys()).forEach(action => actions.add(action));
    }

    return Array.from(actions);
  }

  on<T extends keyof EventsMap<this>>(
    event: T,
    handler: EventsMap<Public<this>>[T]
  ): Unsubscribe {
    this._events = this._events || new Map();
    const events = this._events;
    const tail = events.get(event) || null;
    const item = linkedItem(handler, tail);
    events.set(event, item);

    return () => {
      const currentTail = events.get(event);

      if (!item.next && !item.prev && currentTail === item) {
        events.delete(event);
      } else if (item === currentTail) {
        events.set(event, item.prev);
      }

      unlinkItem(item);
    };
  }

  private _emit<T extends keyof EventsMap<this>>(
    name: T,
    payload: Parameters<EventsMap<this>[T]>[0]
  ) {
    if (!this._events) return;

    let current = this._events.get(name) || null;
    const handlers: ((payload: Parameters<EventsMap<this>[T]>[0]) => void)[] = [];

    // We collect handlers in an array first to avoid issues if a handler
    // unsubscribes itself (or others) during emission, which would mutate the linked list.
    // Using an array here is faster than cloning linked list nodes.
    while (current !== null) {
      handlers.push(current.value);
      current = current.prev;
    }

    for (let i = 0; i < handlers.length; i++) {
      handlers[i](payload);
    }
  }
}
