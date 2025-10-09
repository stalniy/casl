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
import { wrapArray, detectSubjectType, mergePrioritized, getOrDefault, identity, isSubjectType, DETECT_SUBJECT_TYPE_STRATEGY } from './utils';
import { LinkedItem, linkedItem, unlinkItem, cloneLinkedItem } from './structures/LinkedItem';

export interface RuleIndexOptions<A extends Abilities, C> extends Partial<RuleOptions<C>> {
  detectSubjectType?(
    subject: Exclude<Normalize<A>[1], SubjectType>
  ): ExtractSubjectType<Normalize<A>[1]>;
  anyAction?: string;
  anySubjectType?: string;
}

export declare const ɵabilities: unique symbol;
export declare const ɵconditions: unique symbol;
interface WithGenerics {
  [ɵabilities]: any
  [ɵconditions]: any
}
export type Public<T extends WithGenerics> = { [K in keyof T]: T[K] };
export interface Generics<T extends WithGenerics> {
  abilities: T[typeof ɵabilities],
  conditions: T[typeof ɵconditions]
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
  private _hasPerFieldRules = false;
  private _events?: Events<this>;
  private _indexedRules: IndexTree<A, Conditions> = new Map();
  private _rules: RawRuleFrom<A, Conditions>[];
  private readonly _ruleOptions: RuleOptions<Conditions>;
  private _detectSubjectType: this['detectSubjectType'];
  private readonly _anyAction: string;
  private readonly _anySubjectType: string;
  private readonly _hasCustomSubjectTypeDetection: boolean;
  readonly [ɵabilities]!: A;
  readonly [ɵconditions]!: Conditions;

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
    this._rules = rules;
    this._hasCustomSubjectTypeDetection = !!options.detectSubjectType;
    this._detectSubjectType = options.detectSubjectType || (detectSubjectType as this['detectSubjectType']);
    this._indexAndAnalyzeRules(rules);
  }

  get rules() {
    return this._rules;
  }

  detectSubjectType(object?: Normalize<A>[1]): ExtractSubjectType<Normalize<A>[1]> {
    if (isSubjectType(object)) return object as ExtractSubjectType<Normalize<A>[1]>;
    if (!object) return this._anySubjectType as ExtractSubjectType<Normalize<A>[1]>;
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
    this._indexAndAnalyzeRules(rules);
    this._emit('updated', event);

    return this;
  }

  private _indexAndAnalyzeRules(rawRules: RawRuleFrom<A, Conditions>[]) {
    const indexedRules: IndexTree<A, Conditions> = new Map();
    let typeOfSubjectType: string | undefined;

    for (let i = rawRules.length - 1; i >= 0; i--) {
      const priority = rawRules.length - i - 1;
      const rule = new Rule(rawRules[i], this._ruleOptions, priority);
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
      this._detectSubjectType = detectSubjectType as this['detectSubjectType'];
    }
  }

  possibleRulesFor(...args: AbilitySubjectTypeParameters<A, false>): Rule<A, Conditions>[];
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

  rulesFor(...args: AbilitySubjectTypeParameters<A>): Rule<A, Conditions>[];
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

  actionsFor(subjectType: ExtractSubjectType<Normalize<A>[1]>): Normalize<A>[0][];
  actionsFor(subjectType: ExtractSubjectType<Normalize<A>[1]>): string[] {
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
    while (current !== null) {
      const prev = current.prev ? cloneLinkedItem(current.prev) : null;
      current.value(payload);
      current = prev;
    }
  }
}
