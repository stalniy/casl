import { Rule } from '@casl/ability'

export function rulesToQuery(rules: Rule[], convert: (rule: Rule) => Object): Object | null
