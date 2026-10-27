import { SubjectType, AbilityTypes, AbilityTupleType, Abilities, ToAbilityTypes } from './types';
interface BaseRawRule<Conditions> {
    fields?: string | string[];
    conditions?: Conditions;
    /** indicates that rule forbids something (i.e., has inverted logic) */
    inverted?: boolean;
    /** explains the reason of why rule does not allow to do something */
    reason?: string;
}
export interface ClaimRawRule<A extends string> extends BaseRawRule<undefined> {
    action: A | A[];
    subject?: undefined;
}
export interface SubjectRawRule<A extends string, S extends SubjectType, C> extends BaseRawRule<C> {
    action: A | A[];
    subject: S | S[];
}
type DefineRule<T extends AbilityTypes, C, Else = ClaimRawRule<Extract<T, string>>> = T extends AbilityTupleType ? SubjectRawRule<T[0], T[1], C> : Else;
export type RawRule<T extends AbilityTypes = AbilityTupleType, C = unknown> = DefineRule<T, C>;
export type RawRuleFrom<T extends Abilities, C> = RawRule<ToAbilityTypes<T>, C>;
export {};
