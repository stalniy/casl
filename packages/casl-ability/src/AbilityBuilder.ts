import { Ability } from './Ability';
import { PureAbility, AbilityOptions } from './PureAbility';
import { isObject, isStringOrNonEmptyArray } from './utils';
import { SubjectType, Subject, ExtractSubjectType as E, IfExtends } from './types';
import { RawRule } from './RawRule';
import { MongoQuery } from './matchers/conditions';

class RuleBuilder<A extends string, S extends SubjectType, C> {
  public rule: RawRule<A, S, C>;

  constructor(rule: RawRule<A, S, C>) {
    this.rule = rule;
  }

  because(reason: string): this {
    this.rule.reason = reason;
    return this;
  }
}

type OptionalSC<T extends Subject, U> = IfExtends<
T,
'all',
[],
Parameters<(subject: E<T> | E<T>[], conditions?: U) => 0>
>;
type OptionalSCF<T extends Subject, U> = IfExtends<
T,
'all',
[],
Parameters<(subject: E<T> | E<T>[], fields: string | string[], conditions?: U) => 0>
>;

export class AbilityBuilder<Actions extends string, Subjects extends Subject, Conditions> {
  public rules: RawRule<Actions, E<Subjects>, Conditions>[] = [];

  constructor() {
    this.can = (this as any).can.bind(this);
    this.cannot = (this as any).cannot.bind(this);
  }

  can(
    action: Actions | Actions[],
    ...a: OptionalSC<Subjects, Conditions>
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  can(
    action: Actions | Actions[],
    ...a: OptionalSCF<Subjects, Conditions>
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  can(
    action: Actions | Actions[],
    subject?: E<Subjects> | E<Subjects>[],
    conditionsOrFields?: string | string[] | Conditions,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions> {
    if (!isStringOrNonEmptyArray(action)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    const rule = { action } as RawRule<Actions, E<Subjects>, Conditions>;

    if (subject) {
      rule.subject = subject;

      if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
        rule.fields = conditionsOrFields;
      }

      if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
        rule.conditions = conditions || conditionsOrFields as Conditions;
      }
    }

    this.rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(
    action: Actions | Actions[],
    ...a: OptionalSC<Subjects, Conditions>
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  cannot(
    action: Actions | Actions[],
    ...a: OptionalSCF<Subjects, Conditions>
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  cannot(
    action: Actions | Actions[],
    subject?: E<Subjects> | E<Subjects>[],
    conditionsOrFields?: string | string[] | Conditions,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions> {
    const builder = (this as any).can(action, subject, conditionsOrFields, conditions);
    builder.rule.inverted = true;
    return builder;
  }
}

type AsyncDSL<A extends string, S extends Subject, C> = (
  can: AbilityBuilder<A, S, C>['can'],
  cannot: AbilityBuilder<A, S, C>['cannot']
) => Promise<void>;
type DSL<A extends string, S extends Subject, C> = (
  ...args: Parameters<AsyncDSL<A, S, C>>
) => void;

export function defineAbility<A extends string, S extends Subject>(
  dsl: AsyncDSL<A, S, MongoQuery>
): Promise<PureAbility<A, S, MongoQuery>>;
export function defineAbility<A extends string, S extends Subject>(
  params: AbilityOptions<S, MongoQuery>,
  dsl: AsyncDSL<A, S, MongoQuery>
): Promise<PureAbility<A, S, MongoQuery>>;
export function defineAbility<A extends string, S extends Subject>(
  dsl: DSL<A, S, MongoQuery>
): PureAbility<A, S, MongoQuery>;
export function defineAbility<A extends string, S extends Subject>(
  params: AbilityOptions<S, MongoQuery>,
  dsl: DSL<A, S, MongoQuery>
): PureAbility<A, S, MongoQuery>;
export function defineAbility<A extends string, S extends Subject>(
  params: AbilityOptions<S, MongoQuery> | DSL<A, S, MongoQuery> | AsyncDSL<A, S, MongoQuery>,
  dsl?: DSL<A, S, MongoQuery> | AsyncDSL<A, S, MongoQuery>
): PureAbility<A, S, MongoQuery> | Promise<PureAbility<A, S, MongoQuery>> {
  let options: AbilityOptions<S, MongoQuery>;
  let define: DSL<A, S, MongoQuery> | AsyncDSL<A, S, MongoQuery>;

  if (typeof params === 'function') {
    define = params;
    options = {};
  } else if (typeof dsl === 'function') {
    options = params;
    define = dsl;
  } else {
    throw new Error('`defineAbility` expects to receive either options and dsl function or only dsl function');
  }

  const builder = new AbilityBuilder<A, S, MongoQuery>();
  const result = define(builder.can, builder.cannot);

  return result && typeof result.then === 'function'
    ? result.then(() => new Ability(builder.rules, options))
    : new Ability(builder.rules, options);
}
