import { AnyObject } from './types';

interface BaseRawRule {
  subject: string | string[]
  fields?: string[]
  conditions?: AnyObject
  inverted?: boolean
  reason?: string
}

export type UnifiedRawRule = BaseRawRule & { actions: string | string[] };
export type RawRule =
  UnifiedRawRule |
  BaseRawRule & { action: string | string[] };
