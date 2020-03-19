import { Ability, AnyMongoAbility } from './Ability';
import { AnyAbility, RawRuleOf, AbilityOptionsOf, AbilityParameters } from './PureAbility';
import { isObject, isStringOrNonEmptyArray } from './utils';
import { ExtractSubjectType as E, AbilityTuple, SubjectType, Abilities } from './types';
import { RawRule } from './RawRule';

class RuleBuilder<T extends RawRule<any, any>> {
  public rule: T;

  constructor(rule: T) {
    this.rule = rule;
  }

  because(reason: string): this {
    this.rule.reason = reason;
    return this;
  }
}

type BuilderCanParametersFrom<
  T extends Abilities,
  Conditions,
  WithFields extends boolean,
  Else
> = T extends AbilityTuple<infer A, infer S>
  ? WithFields extends true
    ? Parameters<(
      action: A | A[],
      subject: E<S> | E<S>[],
      fields?: string | string[],
      conditions?: Conditions
    ) => 0>
    : Parameters<(
      action: A | A[],
      subject: E<S> | E<S>[],
      conditions?: Conditions
    ) => 0>
  : Else;


type ActionOnly<A> = [A] extends [string]
  ? Parameters<(action: A | A[], subject?: 'all') => 0>
  : never;

export type BuilderCanParameters<
  T extends AnyAbility,
  WithFields extends boolean = false
> = BuilderCanParametersFrom<
AbilityParameters<T, false>['abilities'],
AbilityParameters<T, false>['conditions'],
WithFields,
ActionOnly<AbilityParameters<T, false>['abilities']>
>;

export class AbilityBuilder<T extends AnyAbility = AnyAbility> {
  public rules: RawRuleOf<T>[] = [];

  constructor() {
    const self = this as any;
    self.can = self.can.bind(self);
    self.cannot = self.cannot.bind(self);
  }

  can(...args: BuilderCanParameters<T>): RuleBuilder<RawRuleOf<T>>
  can(...args: BuilderCanParameters<T, true>): RuleBuilder<RawRuleOf<T>>
  can(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | AbilityParameters<T>['conditions'],
    conditions?: AbilityParameters<T>['conditions'],
  ): RuleBuilder<RawRuleOf<T>> {
    if (!isStringOrNonEmptyArray(action)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    const rule = { action } as RawRuleOf<T>;

    if (subject) {
      rule.subject = subject;

      if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
        rule.fields = conditionsOrFields;
      }

      if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
        rule.conditions = conditions || conditionsOrFields;
      }
    }

    this.rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(...args: BuilderCanParameters<T>): RuleBuilder<RawRuleOf<T>>
  cannot(...args: BuilderCanParameters<T, true>): RuleBuilder<RawRuleOf<T>>
  cannot(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | AbilityParameters<T>['conditions'],
    conditions?: AbilityParameters<T>['conditions'],
  ): RuleBuilder<RawRuleOf<T>> {
    const builder = (this as any).can(action, subject, conditionsOrFields, conditions);
    builder.rule.inverted = true;
    return builder;
  }
}

type AsyncDSL<T extends AnyMongoAbility> = (
  can: AbilityBuilder<T>['can'],
  cannot: AbilityBuilder<T>['cannot']
) => Promise<void>;
type DSL<T extends AnyMongoAbility> = (...args: Parameters<AsyncDSL<T>>) => void;

export function defineAbility<T extends AnyMongoAbility = AnyMongoAbility>(
  dsl: AsyncDSL<T>
): Promise<T>;
export function defineAbility<T extends AnyMongoAbility = AnyMongoAbility>(
  params: AbilityOptionsOf<T>,
  dsl: AsyncDSL<T>
): Promise<T>;
export function defineAbility<T extends AnyMongoAbility = AnyMongoAbility>(
  dsl: DSL<T>
): T;
export function defineAbility<T extends AnyMongoAbility = AnyMongoAbility>(
  params: AbilityOptionsOf<T>,
  dsl: DSL<T>
): T;
export function defineAbility<T extends AnyMongoAbility = AnyMongoAbility>(
  params: AbilityOptionsOf<T> | DSL<T> | AsyncDSL<T>,
  dsl?: DSL<T> | AsyncDSL<T>
): T | Promise<T> {
  let options: AbilityOptionsOf<T>;
  let define: DSL<T> | AsyncDSL<T>;

  if (typeof params === 'function') {
    define = params;
    options = {};
  } else if (typeof dsl === 'function') {
    options = params;
    define = dsl;
  } else {
    throw new Error('`defineAbility` expects to receive either options and dsl function or only dsl function');
  }

  const builder = new AbilityBuilder<T>();
  const result = define(builder.can, builder.cannot);

  return result && typeof result.then === 'function'
    ? result.then(() => new Ability(builder.rules, options) as T)
    : new Ability(builder.rules, options) as T;
}
