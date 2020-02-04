import { AnyObject } from './types';

interface BaseRawRule<TConditions> {
  subject: string | string[]
  fields?: string[]
  conditions?: TConditions
  inverted?: boolean
  reason?: string
}

export type UnifiedRawRule<TConditions=AnyObject> =
  BaseRawRule<TConditions> &
  { actions: string | string[] };

export type RawRule<TConditions=AnyObject> =
  UnifiedRawRule<TConditions> |
  BaseRawRule<TConditions> & { action: string | string[] };
