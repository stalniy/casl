import { Ability, Rule } from '@casl/ability'

export function rulesToQuery(ability: Ability, action: string, subject: any, convert: (rule: Rule) => Object): Object | null

export interface PermittedFieldsOptions {
  fieldsFrom?: (rule: Rule) => string[] | null | undefined
}

export function permittedFieldsOf(ability: Ability, action: string, subject: any, options?: PermittedFieldsOptions): string[]
