import { SubjectType } from './types';

interface BaseRawRule<TSubject extends SubjectType, TConditions> {
  subject: TSubject | TSubject[]
  fields?: string | string[]
  conditions?: TConditions
  inverted?: boolean
  reason?: string
}

export type UnifiedRawRule<Actions extends string, TSubject extends SubjectType, TConditions> =
  BaseRawRule<TSubject, TConditions> &
  { action: Actions | Actions[] };

export type RawRule<Actions extends string, TSubject extends SubjectType, TConditions> =
  UnifiedRawRule<Actions, TSubject, TConditions> |
  BaseRawRule<TSubject, TConditions> & { actions: Actions | Actions[] };
