export interface RawRule {
  subject: string | string[],
  actions: string | string[],
  fields?: string[],
  conditions?: Object,
  inverted?: boolean,
  reason?: string
}

export interface Rule extends RawRule {
  matches(subject: any): boolean
  isRelevantFor(subject: any, field?: string): boolean
}

export interface AbilityOptions {
  subjectName: (subject: any) => string
}

export class Ability {
  rules: RawRule[]

  static addAlias(alias: string, fields: string | string[]): void

  constructor(rules?: RawRule[], options?: AbilityOptions)

  update(rules: RawRule[]): Ability

  can(action: string, subject: any, field?: string): boolean

  cannot(action: string, subject: any, field?: string): boolean

  relevantRuleFor(action: string, subject: any, field?: string): Rule | null

  possibleRulesFor(action: string, subject: any): Rule[]

  rulesFor(action: string, subject: any, field?: string): Rule[]

  throwUnlessCan(action: string, subject: any, field?: string): void
}

export class RuleBuilder {
  rule: RawRule

  because(reason: string): RuleBuilder
}

export abstract class AbilityBuilderParts {
  rules: RawRule[]

  can(action: string | string[], subject: any | any[], conditions?: Object): RuleBuilder
  can(action: string | string[], subject: any | any[], fields?: string[], conditions?: Object): RuleBuilder

  cannot(action: string | string[], subject: any | any[], conditions?: Object): RuleBuilder
  cannot(action: string | string[], subject: any | any[], fields?: string[], conditions?: Object): RuleBuilder
}

export class AbilityBuilder extends AbilityBuilderParts {
  static define(params: AbilityOptions, dsl: Function): Ability
  static define(dsl: Function): Ability

  static extract(): AbilityBuilderParts
}

export class ForbiddenError extends Error {
  subject: any
  subjectName: string
  action: string
  field: string
}
