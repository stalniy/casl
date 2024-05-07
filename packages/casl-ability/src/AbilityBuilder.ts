import { AnyMongoAbility, createMongoAbility, MongoAbility } from './Ability';
import { ProduceGeneric } from './hkt';
import { AbilityOptionsOf, AnyAbility } from './PureAbility';
import { Generics, RawRuleOf } from './RuleIndex';
import {
  AbilityTuple, AnyClass, AnyObject, ExtractSubjectType as E, Normalize, SubjectType,
  TaggedInterface
} from './types';

function isAbilityClass(factory: AbilityFactory<any>): factory is AnyClass {
  return typeof factory.prototype.possibleRulesFor === 'function';
}

class RuleBuilder<T extends AnyAbility> {
  public _rule!: RawRuleOf<T>;

  constructor(rule: RawRuleOf<T>) {
    this._rule = rule;
  }

  because(reason: string): this {
    this._rule.reason = reason;
    return this;
  }
}

type AbilityFactory<T extends AnyAbility> = AnyClass<T> | ((rules?: any[], options?: any) => T);
type InstanceOf<T extends AnyAbility, S extends SubjectType> = S extends AnyClass<infer R>
  ? R
  : S extends (...args: any[]) => infer O
    ? O
    : S extends string
      ? Exclude<Normalize<Generics<T>['abilities']>[1], SubjectType> extends TaggedInterface<string>
        ? Extract<Normalize<Generics<T>['abilities']>[1], TaggedInterface<S>>
        : AnyObject
      : never;
type ConditionsOf<T extends AnyAbility, I extends {}> =
  ProduceGeneric<Generics<T>['conditions'], I>;
type ActionFrom<T extends AbilityTuple, S extends SubjectType> = T extends any
  ? S extends Extract<T[1], SubjectType> ? T[0] : never
  : never;
type ActionOf<T extends AnyAbility, S extends SubjectType> = ActionFrom<Generics<T>['abilities'], S>;
type SubjectTypeOf<T extends AnyAbility> = E<Normalize<Generics<T>['abilities']>[1]>;

type SimpleCanParams<T extends AnyAbility> = Parameters<(
  action: Generics<T>['abilities'] | Generics<T>['abilities'][]
) => 0>;
type BuilderCanParameters<
  S extends SubjectType,
  I extends InstanceOf<T, S>,
  T extends AnyAbility
> = Generics<T>['abilities'] extends AbilityTuple
  ? Parameters<(
    action: ActionOf<T, S> | ActionOf<T, S>[],
    subject: S | S[],
    conditions?: ConditionsOf<T, I>
  ) => 0>
  : SimpleCanParams<T>;

type BuilderCanParametersWithFields<
  S extends SubjectType,
  I extends InstanceOf<T, S>,
  F extends string,
  T extends AnyAbility
> = Generics<T>['abilities'] extends AbilityTuple
  ? Parameters<(
    action: ActionOf<T, S> | ActionOf<T, S>[],
    subject: S | S[],
    fields?: F | F[],
    conditions?: ConditionsOf<T, I>
  ) => 0>
  : SimpleCanParams<T>;
type Keys<T> = string & keyof T;

export type AddRule<T extends AnyAbility> = {
  <
    I extends InstanceOf<T, S>,
    F extends string = Keys<I>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParametersWithFields<S, I, F | Keys<I>, T>): RuleBuilder<T>;
  <
    I extends InstanceOf<T, S>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParameters<S, I, T>): RuleBuilder<T>;
};

export class AbilityBuilder<T extends AnyAbility> {
  public rules: RawRuleOf<T>[] = [];
  private readonly _createAbility: AbilityFactory<T>;
  public can: AddRule<T>;
  public cannot: AddRule<T>;
  public build: (options?: AbilityOptionsOf<T>) => T;

  constructor(AbilityType: AbilityFactory<T>) {
    this._createAbility = AbilityType;

    this.can = (
      action: string | string[],
      subject?: SubjectType | SubjectType[],
      conditionsOrFields?: string | string[] | Generics<T>['conditions'],
      conditions?: Generics<T>['conditions']
    ) => this._addRule(action, subject, conditionsOrFields, conditions, false);
    this.cannot = (
      action: string | string[],
      subject?: SubjectType | SubjectType[],
      conditionsOrFields?: string | string[] | Generics<T>['conditions'],
      conditions?: Generics<T>['conditions']
    ) => this._addRule(action, subject, conditionsOrFields, conditions, true);

    this.build = options => (isAbilityClass(this._createAbility)
      ? new this._createAbility(this.rules, options)
      : this._createAbility(this.rules, options));
  }

  private _addRule(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | Generics<T>['conditions'],
    conditions?: Generics<T>['conditions'],
    inverted?: boolean
  ): RuleBuilder<T> {
    const rule = { action } as RawRuleOf<T>;

    if (inverted) rule.inverted = inverted;
    if (subject) {
      rule.subject = subject;

      if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
        rule.fields = conditionsOrFields;
      } else if (typeof conditionsOrFields !== 'undefined') {
        rule.conditions = conditionsOrFields;
      }

      if (typeof conditions !== 'undefined') {
        rule.conditions = conditions;
      }
    }

    this.rules.push(rule);
    return new RuleBuilder(rule);
  }
}

type DSL<T extends AnyAbility, R> = (
  can: AbilityBuilder<T>['can'],
  cannot: AbilityBuilder<T>['cannot']
) => R;

export function defineAbility<
  T extends AnyMongoAbility = MongoAbility
>(define: DSL<T, Promise<void>>, options?: AbilityOptionsOf<T>): Promise<T>;
export function defineAbility<
  T extends AnyMongoAbility = MongoAbility
>(define: DSL<T, void>, options?: AbilityOptionsOf<T>): T;
export function defineAbility<
  T extends AnyMongoAbility
>(define: DSL<T, void | Promise<void>>, options?: AbilityOptionsOf<T>): T | Promise<T> {
  const builder = new AbilityBuilder<T>(createMongoAbility);
  const result = define(builder.can, builder.cannot);

  if (result && typeof result.then === 'function') {
    return result.then(() => builder.build(options));
  }

  return builder.build(options);
}
