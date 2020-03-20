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

type DefineRawRule<
  A extends Abilities,
  C,
  Else = [A] extends [string] ? ClaimRawRule & ActionAndLegacyActions<A> : never
> = A extends AbilityTuple
  ? SubjectRawRule<ExtractSubjectType<A[1]>, C> & ActionAndLegacyActions<A[0]>
  : Else;

export type RawRule<A extends Abilities = Abilities, C = unknown> =
  DefineRawRule<A, C>;
