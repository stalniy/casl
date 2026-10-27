import { Rule, RuleOptions } from './Rule';
import { RawRuleFrom } from './RawRule';
import { Abilities, Normalize, SubjectType, AbilityParameters, AbilityTuple, ExtractSubjectType } from './types';
import { LinkedItem } from './structures/LinkedItem';
export interface RuleIndexOptions<A extends Abilities, C> extends Partial<RuleOptions<C>> {
    detectSubjectType?(subject: Exclude<Normalize<A>[1], SubjectType>): ExtractSubjectType<Normalize<A>[1]>;
    anyAction?: string;
    anySubjectType?: string;
}
export declare const ɵabilities: unique symbol;
export declare const ɵconditions: unique symbol;
interface WithGenerics {
    [ɵabilities]: any;
    [ɵconditions]: any;
}
export type Public<T extends WithGenerics> = {
    [K in keyof T]: T[K];
};
export interface Generics<T extends WithGenerics> {
    abilities: T[typeof ɵabilities];
    conditions: T[typeof ɵconditions];
}
export type RuleOf<T extends WithGenerics> = Rule<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RawRuleOf<T extends WithGenerics> = RawRuleFrom<Generics<T>['abilities'], Generics<T>['conditions']>;
export type RuleIndexOptionsOf<T extends WithGenerics> = RuleIndexOptions<Generics<T>['abilities'], Generics<T>['conditions']>;
interface AbilityEvent<T extends WithGenerics> {
    target: T;
    /** @deprecated use "target" property instead */
    ability: T;
}
export interface UpdateEvent<T extends WithGenerics> extends AbilityEvent<T> {
    rules: RawRuleOf<T>[];
}
/**
 * @deprecated `on`/`emit` properly infer type without this type
 * TODO(major): delete
 */
export type EventHandler<Event> = (event: Event) => void;
export type Events<T extends WithGenerics, K extends keyof EventsMap<T> = keyof EventsMap<T>> = Map<K, LinkedItem<EventsMap<T>[K]> | null>;
interface EventsMap<T extends WithGenerics> {
    update(event: UpdateEvent<T>): void;
    updated(event: UpdateEvent<T>): void;
}
export type Unsubscribe = () => void;
type AbilitySubjectTypeParameters<T extends Abilities, IncludeField extends boolean = true> = AbilityParameters<T, T extends AbilityTuple ? IncludeField extends true ? (action: T[0], subject: ExtractSubjectType<T[1]>, field?: string) => 0 : (action: T[0], subject: ExtractSubjectType<T[1]>) => 0 : never, (action: Extract<T, string>) => 0>;
export declare class RuleIndex<A extends Abilities, Conditions> {
    private _hasPerFieldRules;
    private _events?;
    private _indexedRules;
    private _rules;
    private readonly _ruleOptions;
    private _detectSubjectType;
    private readonly _anyAction;
    private readonly _anySubjectType;
    private readonly _hasCustomSubjectTypeDetection;
    readonly [ɵabilities]: A;
    readonly [ɵconditions]: Conditions;
    constructor(rules?: RawRuleFrom<A, Conditions>[], options?: RuleIndexOptions<A, Conditions>);
    get rules(): RawRuleFrom<A, Conditions>[];
    detectSubjectType(object?: Normalize<A>[1]): ExtractSubjectType<Normalize<A>[1]>;
    update(rules: RawRuleFrom<A, Conditions>[]): Public<this>;
    private _indexAndAnalyzeRules;
    possibleRulesFor(...args: AbilitySubjectTypeParameters<A, false>): readonly Rule<A, Conditions>[];
    rulesFor(...args: AbilitySubjectTypeParameters<A>): readonly Rule<A, Conditions>[];
    actionsFor(subjectType: ExtractSubjectType<Normalize<A>[1]>): string[];
    on<T extends keyof EventsMap<this>>(event: T, handler: EventsMap<Public<this>>[T]): Unsubscribe;
    private _emit;
}
export {};
