import { Ability, AnyMongoAbility } from './Ability';
import { AnyAbility, AbilityOptionsOf, AbilityClass } from './PureAbility';
import { RawRuleOf, Generics } from './RuleIndex';
import {
  ExtractSubjectType as E,
  AbilityTuple,
  SubjectType,
  TaggedInterface,
  Normalize,
  AnyObject,
  AnyClass,
} from './types';
import { ProduceGeneric } from './hkt';

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

type InstanceOf<T extends AnyAbility, S extends SubjectType> = S extends AnyClass<infer R>
  ? R
  : S extends string
    ? Exclude<Normalize<Generics<T>['abilities']>[1], SubjectType> extends { kind: string }
      ? Extract<Normalize<Generics<T>['abilities']>[1], TaggedInterface<S>>
      : AnyObject
    : never;
type ConditionsOf<T extends AnyAbility, I extends {}> =
  ProduceGeneric<Generics<T>['conditions'], I>;
type ActionFrom<T extends AbilityTuple, S extends SubjectType> = T extends any
  ? S extends T[1] ? T[0] : never
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

export class AbilityBuilder<T extends AnyAbility> {
  public rules: RawRuleOf<T>[] = [];
  private _AbilityType!: AnyClass<T>;

  constructor(AbilityType: AnyClass<T>) {
    this._AbilityType = AbilityType;
    this.can = this.can.bind(this as any);
    this.cannot = this.cannot.bind(this as any);
    this.build = this.build.bind(this as any);
  }

  can<
    I extends InstanceOf<T, S>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParameters<S, I, T>): RuleBuilder<T>
  can<
    I extends InstanceOf<T, S>,
    F extends string = Keys<I>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParametersWithFields<S, I, F | Keys<I>, T>): RuleBuilder<T>
  can(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | Generics<T>['conditions'],
    conditions?: Generics<T>['conditions']
  ): RuleBuilder<T> {
    const rule = { action } as RawRuleOf<T>;

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

  cannot<
    I extends InstanceOf<T, S>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParameters<S, I, T>): RuleBuilder<T>
  cannot<
    I extends InstanceOf<T, S>,
    F extends string = Keys<I>,
    S extends SubjectTypeOf<T> = SubjectTypeOf<T>
  >(...args: BuilderCanParametersWithFields<S, I, F | Keys<I>, T>): RuleBuilder<T>
  cannot(
    action: string | string[],
    subject?: SubjectType | SubjectType[],
    conditionsOrFields?: string | string[] | Generics<T>['conditions'],
    conditions?: Generics<T>['conditions'],
  ): RuleBuilder<T> {
    const builder = (this as any).can(action, subject, conditionsOrFields, conditions);
    builder._rule.inverted = true;
    return builder;
  }

  build(options?: AbilityOptionsOf<T>) {
    return new this._AbilityType(this.rules, options);
  }
}

type DSL<T extends AnyAbility, R> = (
  can: AbilityBuilder<T>['can'],
  cannot: AbilityBuilder<T>['cannot']
) => R;

export function defineAbility<
  T extends AnyMongoAbility
>(define: DSL<T, Promise<void>>, options?: AbilityOptionsOf<T>): Promise<T>;
export function defineAbility<
  T extends AnyMongoAbility
>(define: DSL<T, void>, options?: AbilityOptionsOf<T>): T;
export function defineAbility<
  T extends AnyMongoAbility
>(define: DSL<T, void | Promise<void>>, options?: AbilityOptionsOf<T>): T | Promise<T> {
  const builder = new AbilityBuilder(Ability as unknown as AbilityClass<T>);
  const result = define(builder.can, builder.cannot);

  if (result && typeof result.then === 'function') {
    return result.then(() => builder.build(options));
  }

  return builder.build(options);
}
