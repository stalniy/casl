import { Ability, AbilityOptions } from './Ability';
import { isObject, isStringOrNonEmptyArray } from './utils';
import { SubjectType, Subject, ExtractSubjectType as E } from './types';
import { RawRule } from './RawRule';

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

type AsyncDSL<A extends string, S extends Subject, C> = (
  can: AbilityBuilder<A, S, C>['can'],
  cannot: AbilityBuilder<A, S, C>['cannot']
) => Promise<void>;
type DSL<A extends string, S extends Subject, C> = (
  ...args: Parameters<AsyncDSL<A, S, C>>
) => void;
type OptionalSC<T extends Subject, U> = T extends 'all'
  ? []
  : Parameters<(subject: E<T> | E<T>[], conditions?: U) => 0>;
type OptionalSCF<T extends Subject, U> = T extends 'all'
  ? []
  : Parameters<(subject: E<T> | E<T>[], fields: string | string[], conditions?: U) => 0>;

export class AbilityBuilder<Actions extends string, Subjects extends Subject, Conditions> {
  static define<A extends string, S extends Subject, C>(
    dsl: AsyncDSL<A, S, C>
  ): Promise<Ability<A, S, C>>;
  static define<A extends string, S extends Subject, C>(
    params: AbilityOptions<S, C>,
    dsl: AsyncDSL<A, S, C>
  ): Promise<Ability<A, S, C>>;
  static define<A extends string, S extends Subject, C>(dsl: DSL<A, S, C>): Ability<A, S, C>;
  static define<A extends string, S extends Subject, C>(
    params: AbilityOptions<S, C>,
    dsl: DSL<A, S, C>
  ): Ability<A, S, C>;
  static define<A extends string, S extends Subject, C>(
    params: AbilityOptions<S, C> | DSL<A, S, C> | AsyncDSL<A, S, C>,
    dsl?: DSL<A, S, C> | AsyncDSL<A, S, C>
  ): Ability<A, S, C> | Promise<Ability<A, S, C>> {
    let options: AbilityOptions<S, C>;
    let define: DSL<A, S, C> | AsyncDSL<A, S, C>;

    if (typeof params === 'function') {
      define = params;
      options = {};
    } else if (typeof dsl === 'function') {
      options = params;
      define = dsl;
    } else {
      throw new Error('AbilityBuilder#define expects to receive either options and dsl function or only dsl function');
    }

    // eslint-disable-next-line
    console.warn('AbilityBuilder.define method is deprecated. Use AbilityBuilder.extract instead.');

    const builder = new this<A, S, C>();
    const result = define(
      builder.can,
      builder.cannot
    );
    const buildAbility = () => new Ability(builder.rules, options); // eslint-disable-line

    return result && typeof result.then === 'function'
      ? result.then(buildAbility)
      : buildAbility();
  }

  static extract<
    A extends string = string,
    S extends Subject = Subject,
    C = object
  >(options?: AbilityOptions<S, C>) {
    const builder = new this<A, S, C>();

    return {
      can: builder.can,
      cannot: builder.cannot,
      rules: builder.rules,
      build: () => new Ability(builder.rules, options),
    } as const;
  }

  public rules: RawRule<Actions, E<Subjects>, Conditions>[] = [];

  private constructor() {
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
