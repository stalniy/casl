import { Ability, Rule, RawRule } from '@casl/ability'

export function rulesToQuery(ability: Ability, action: string, subject: any, convert: (rule: Rule) => Object): Object | null

export interface PermittedFieldsOptions {
  fieldsFrom?: (rule: Rule) => string[] | null | undefined
}

export function permittedFieldsOf(ability: Ability, action: string, subject: any, options?: PermittedFieldsOptions): string[]

export type PackedRule = [string, string]
  | [string, string, number]
  | [string, string, number, any]
  | [string, string, number, number]
  | [string, string, number, any, string]
  | [string, string, number, number, string]
  | [string, string, number, number, number];

export function packRules(rules: RawRule[]): PackedRule[]

export function unpackRules(rules: PackedRule[]): RawRule[]
