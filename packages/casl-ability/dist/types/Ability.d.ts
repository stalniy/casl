import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public, RawRuleOf } from './RuleIndex';
import { Abilities, AbilityTuple, CanParameters } from './types';
import { Rule } from './Rule';
export interface AbilityOptions<A extends Abilities, Conditions> extends RuleIndexOptions<A, Conditions> {
}
export interface AnyAbility extends Public<Ability<any, any>> {
}
export interface AbilityOptionsOf<T extends AnyAbility> extends RuleIndexOptionsOf<T> {
}
export type AbilityClass<T extends AnyAbility> = new (rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>) => T;
export type CreateAbility<T extends AnyAbility> = (rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>) => T;
export declare class Ability<A extends Abilities = AbilityTuple, Conditions = unknown> extends RuleIndex<A, Conditions> {
    can(...args: CanParameters<A>): boolean;
    relevantRuleFor(...args: CanParameters<A>): Rule<A, Conditions> | null;
    cannot(...args: CanParameters<A>): boolean;
}
