import { SubjectType, Abilities, ExtractSubjectType, AbilityTuple } from './types';

interface BaseRawRule<Conditions> {
  fields?: string | string[]
  conditions?: Conditions
  /** indicates that rule forbids something (i.e., has inverted logic) */
  inverted?: boolean
  /** explains the reason of why rule does not allow to do something */
  reason?: string
}

interface ClaimRawRule extends BaseRawRule<undefined> {
  subject?: 'all'
}

interface SubjectRawRule<S extends SubjectType, C> extends BaseRawRule<C> {
  subject: S | S[]
}

type ActionAndLegacyActions<A> = {
  action: A | A[]
} | {
  /** @deprecated use "action" field instead */
  actions: A | A[]
};

type DefineRawRule<A extends Abilities, Else, C> =
  A extends AbilityTuple<infer Action, infer Subject>
    ? SubjectRawRule<ExtractSubjectType<Subject>, C> & ActionAndLegacyActions<Action>
    : Else;

export type RawRule<A extends Abilities, C = unknown> = DefineRawRule<
A,
[A] extends [string] ? ClaimRawRule & ActionAndLegacyActions<A> : never,
C
>;
