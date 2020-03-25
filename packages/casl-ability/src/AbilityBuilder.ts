import { Ability, AnyMongoAbility } from './Ability';
import { AnyAbility, RawRuleOf, AbilityOptionsOf, Generics, AbilityClass } from './PureAbility';
import { isStringOrNonEmptyArray } from './utils';
import {
  ExtractSubjectType as E,
  AbilityTuple,
  SubjectType,
  AbilityTypes,
  ToAbilityTypes,
  AbilityParameters
} from './types';
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

type CanFunction<T extends AbilityTypes, C, WithFields = true> = T extends AbilityTuple
  ? WithFields extends true
    // eslint-disable-next-line max-len
    ? (action: T[0] | T[0][], subject: E<T[1]> | E<T[1]>[], fields?: string | string[], conditions?: C) => 0
    : (action: T[0] | T[0][], subject: E<T[1]> | E<T[1]>[], conditions?: C) => 0
  : never;

export type BuilderCanParameters<T extends AnyAbility, WithFields extends boolean = false> =
  AbilityParameters<
  Generics<T>['abilities'],
  CanFunction<ToAbilityTypes<Generics<T>['abilities']>, Generics<T>['conditions'], WithFields>,
  (action: Generics<T>['abilities'] | Generics<T>['abilities'][], subject?: 'all') => 0
  >;

export class AbilityBuilder<T extends AnyAbility = AnyAbility> {
  public rules: RawRuleOf<T>[] = [];

  constructor() {
    const self = this as any;
    self.can = self.can.bind(self);
    self.cannot = self.cannot.bind(self);
    self.build = self.build.bind(self);
  }

  can(...args: BuilderCanParameters<T>): RuleBuilder<RawRuleOf<T>>
  can(...args: BuilderCanParameters<T, true>): RuleBuilder<RawRuleOf<T>>
  can(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | Generics<T>['conditions'],
    conditions?: Generics<T>['conditions'],
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

      if (typeof conditions !== 'undefined' || typeof conditionsOrFields !== 'undefined') {
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
    conditionsOrFields?: string | string[] | Generics<T>['conditions'],
    conditions?: Generics<T>['conditions'],
  ): RuleBuilder<RawRuleOf<T>> {
    const builder = (this as any).can(action, subject, conditionsOrFields, conditions);
    builder.rule.inverted = true;
    return builder;
  }

  build(AbilityType: AbilityClass<AnyAbility>, options?: AbilityOptionsOf<T>): T {
    return new AbilityType(this.rules as any, options) as T;
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
    ? result.then(() => builder.build(Ability, options))
    : builder.build(Ability, options);
}
