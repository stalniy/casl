import { Rule } from './Rule';
import { type Public, type RawRuleOf, RuleIndex, type RuleIndexOptions, type RuleIndexOptionsOf } from './RuleIndex';
import type { DefaultSubject, SubjectResolver } from './SubjectResolver';
import type { Abilities, AbilityActions, AbilityTuple, CanParametersForAction, Subject, SubjectType } from './types';

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
  can<Action extends AbilityActions<A>>(...args: CanParametersForAction<Action, A, R>): boolean;
  can(action: string, subject?: Subject, field?: string): boolean {
    const rule = (this as PrimitiveAbility).relevantRuleFor(action, subject, field);
    return !!rule && !rule.inverted;
  }

  relevantRuleFor<Action extends AbilityActions<A>>(
    ...args: CanParametersForAction<Action, A, R>
  ): Rule<A, Conditions, R> | null;
  relevantRuleFor(
    action: string, subject?: Subject, field?: string
  ): Rule<A, Conditions, R> | null {
    const subjectType = (this as PrimitiveAbility).detectSubjectType(subject);
    const rules: Rule<A, Conditions, R>[] = (this as any).rulesFor(action, subjectType, field);

    for (let i = 0, length = rules.length; i < length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  cannot<Action extends AbilityActions<A>>(...args: CanParametersForAction<Action, A, R>): boolean;
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
