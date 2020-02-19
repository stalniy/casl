import { SubjectType, IfExtends } from './types';

interface BaseRawRule<TConditions> {
  fields?: string | string[]
  conditions?: TConditions
  inverted?: boolean
  reason?: string
}

interface PureClaimRawRule extends BaseRawRule<undefined> {
  subject?: 'all'
}

interface PureSubjectRawRule<S extends SubjectType, C> extends BaseRawRule<C> {
  subject: S | S[]
}

type ActionAndLegacyActions<A> = { action: A | A[] } | { actions: A | A[] };

export type SubjectRawRule<A extends string, S extends SubjectType, C> =
  PureSubjectRawRule<S, C> & ActionAndLegacyActions<A>;

export type RawRule<A extends string, S extends SubjectType, C> =
  IfExtends<S, 'all', PureClaimRawRule, PureSubjectRawRule<S, C>> &
  ActionAndLegacyActions<A>;
