export interface Rule {
  subject: string | string[],
  actions: string | string[],
  conditions?: Object,
  inverted?: boolean
}

export interface AbilityOptions {
  subjectName: (subject: any) => string
}

export class Ability {
  rules: Rule[]

  static addAlias(alias: string, fields: string | string[]): void

  constructor(rules?: Rule[], options?: AbilityOptions)

  update(rules: Rule[]): Ability

  can(action: string, subject: any): boolean

  cannot(action: string, subject: any): boolean

  rulesFor(action: string, subject: any): Rule[]

  throwUnlessCan(action: string, subject: any): void
}

export abstract class AbilityBuilderParts {
  rules: Rule[]

  can(action: string | string[], subject: string | string[], conditions?: Object): Rule

  cannot(action: string | string[], subject: string | string[], conditions?: Object): Rule
}

export class AbilityBuilder extends AbilityBuilderParts {
  static define(params: AbilityOptions, dsl: Function): Ability
  static define(dsl: Function): Ability

  static extract(): AbilityBuilderParts
}

export class ForbiddenError extends Error {}

export function rulesToQuery(rules: Rule[], convert: (rule: Rule) => Object): Object | null

export function toMongoQuery(rules: Rule[]): Object | null

export function mongoosePlugin(schema: any): any
