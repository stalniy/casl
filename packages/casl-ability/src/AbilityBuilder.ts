import { Ability, AbilityOptions } from './Ability';
import { isObject, isStringOrNonEmptyArray } from './utils';
import { SubjectType, Subject, ExtractSubjectType as E } from './types';
import { UnifiedRawRule } from './RawRule';

class RuleBuilder<A extends string, S extends SubjectType, C> {
  public rule: UnifiedRawRule<A, S, C>;

  constructor(rule: UnifiedRawRule<A, S, C>) {
    this.rule = rule;
  }

  because(reason: string): this {
    this.rule.reason = reason;
    return this;
  }
}

type ToA<T> = T | T[];
type AsyncDSL = <T extends Function>(can: T, cannot: T) => Promise<void>;
type DSL = <T extends Function>(can: T, cannot: T) => void;

export class AbilityBuilder<
  Actions extends string,
  Subjects extends Subject,
  Conditions
> {
  static define<
    A extends string,
    S extends Subject,
    C
  >(dsl: AsyncDSL): Promise<Ability<A, S, C>>;
  static define<
    A extends string,
    S extends Subject,
    C
  >(params: AbilityOptions<C>, dsl: AsyncDSL): Promise<Ability<A, S, C>>;
  static define<
    A extends string,
    S extends Subject,
    C
  >(dsl: DSL): Ability<A, S, C>;
  static define<
    A extends string,
    S extends Subject,
    C
  >(params: AbilityOptions<C>, dsl: DSL): Ability<A, S, C>;
  static define<A extends string, S extends Subject, C>(
    params: AbilityOptions<C> | DSL | AsyncDSL,
    dsl?: DSL | AsyncDSL
  ): Ability<A, S, C> | Promise<Ability<A, S, C>> {
    let options: AbilityOptions<C>;
    let define: Function;

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
    const result: Promise<void> | void = define(
      builder.can.bind(builder),
      builder.cannot.bind(builder)
    );
    const buildAbility = () => new Ability(builder.rules, options); // eslint-disable-line

    return result && typeof result.then === 'function'
      ? result.then(buildAbility)
      : buildAbility();
  }

  static extract<A extends string, S extends Subject, C>(options?: AbilityOptions<C>) {
    const builder = new this<A, S, C>();

    return {
      can: builder.can.bind(builder),
      cannot: builder.cannot.bind(builder),
      rules: builder.rules,
      build: () => new Ability(builder.rules, options),
    } as const;
  }

  public rules: UnifiedRawRule<Actions, E<Subjects>, Conditions>[];

  private constructor() {
    this.rules = [];
  }

  can(
    action: ToA<Actions>,
    subject: ToA<E<Subjects>>,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  can(
    action: ToA<Actions>,
    subject: ToA<E<Subjects>>,
    fields: ToA<string>,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  can(
    action: ToA<Actions>,
    subject: ToA<E<Subjects>>,
    conditionsOrFields?: ToA<string> | Conditions,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions> {
    if (!isStringOrNonEmptyArray(action)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    if (!subject || Array.isArray(subject) && !subject.every(Boolean)) {
      throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name/type or an array of subject names/types');
    }

    const rule: UnifiedRawRule<Actions, E<Subjects>, Conditions> = { action, subject };

    if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
      rule.fields = conditionsOrFields;
    }

    if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
      rule.conditions = conditions || conditionsOrFields as Conditions;
    }

    this.rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(
    action: ToA<Actions>,
    subject: ToA<E<Subjects>>,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  cannot(
    action: ToA<Actions>,
    subject: ToA<E<Subjects>>,
    fields: ToA<string>,
    conditions?: Conditions
  ): RuleBuilder<Actions, E<Subjects>, Conditions>
  cannot(...args: [any, any, any?, any?]): RuleBuilder<Actions, E<Subjects>, Conditions> {
    const builder = this.can(...args);
    builder.rule.inverted = true;
    return builder;
  }
}
