import type { DefaultSubject, SubjectResolver } from './SubjectResolver';
import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public, RawRuleOf } from './RuleIndex';
import { Abilities, AbilityTuple, CanParameters, Subject, SubjectType } from './types';
import { Rule } from './Rule';

export interface AbilityOptions<
  A extends Abilities, Conditions, R extends SubjectResolver = DefaultSubject
>
  extends RuleIndexOptions<A, Conditions, R> {}
export interface AnyAbility extends Public<Ability<any, any, any>> {}
export interface AbilityOptionsOf<T extends AnyAbility> extends RuleIndexOptionsOf<T> {}

export type AbilityClass<T extends AnyAbility> = new (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export type CreateAbility<T extends AnyAbility> = (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export class Ability<
  A extends Abilities = AbilityTuple,
  Conditions = unknown,
  R extends SubjectResolver = DefaultSubject
> extends RuleIndex<A, Conditions, R> {
  can(...args: CanParameters<A, true, R>): boolean;
  can(action: string, subject?: Subject, field?: string): boolean {
    const rule = (this as PrimitiveAbility).relevantRuleFor(action, subject, field);
    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<A, true, R>): Rule<A, Conditions, R> | null;
  relevantRuleFor(
    action: string, subject?: Subject, field?: string
  ): Rule<A, Conditions, R> | null {
    const subjectType = (this as PrimitiveAbility).detectSubjectType(subject);
    const rules = (this as any).rulesFor(action, subjectType, field);

    for (let i = 0, length = rules.length; i < length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  cannot(...args: CanParameters<A, true, R>): boolean;
  cannot(action: string, subject?: Subject, field?: string): boolean {
    return !(this as PrimitiveAbility).can(action, subject, field);
  }
}

/**
 * helper interface that helps to emit js methods that have static parameters
 */
interface PrimitiveAbility<A extends Abilities = AbilityTuple, Conditions = unknown> {
  detectSubjectType(subject?: Subject): SubjectType;
  can(action: string, subject?: Subject, field?: string): boolean;
  relevantRuleFor(action: string, subject?: Subject, field?: string): Rule<A, Conditions> | null
}
