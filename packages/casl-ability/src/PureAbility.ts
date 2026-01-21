import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public, RawRuleOf } from './RuleIndex';
import { Abilities, AbilityTuple, CanParameters, Subject } from './types';
import { Rule } from './Rule';

export interface AbilityOptions<A extends Abilities, Conditions>
  extends RuleIndexOptions<A, Conditions> { }
export interface AnyAbility extends Public<PureAbility<any, any>> { }
export interface AbilityOptionsOf<T extends AnyAbility> extends RuleIndexOptionsOf<T> { }

export type AbilityClass<T extends AnyAbility> = new (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export type CreateAbility<T extends AnyAbility> = (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export class PureAbility<
  A extends Abilities = AbilityTuple,
  Conditions = unknown
> extends RuleIndex<A, Conditions> {
  can(...args: CanParameters<A>): boolean;
  can(action: string, subject?: Subject, field?: string | string[]): boolean {
    return this._can(action, subject, field);
  }

  relevantRuleFor(...args: CanParameters<A>): Rule<A, Conditions> | null;
  relevantRuleFor(
    action: string,
    subject?: Subject,
    field?: string | string[]
  ): Rule<A, Conditions> | null {
    if (Array.isArray(field)) {
      let firstAllowedRule: Rule<A, Conditions> | null = null;

      for (let i = 0; i < field.length; i++) {
        const rule = this._relevantRuleFor(action, subject, field[i]);

        if (!rule || rule.inverted) {
          return rule;
        }

        if (!firstAllowedRule) {
          firstAllowedRule = rule;
        }
      }

      return firstAllowedRule;
    }

    return this._relevantRuleFor(action, subject, field);
  }

  private _relevantRuleFor(
    action: string,
    subject?: Subject,
    field?: string
  ): Rule<A, Conditions> | null {
    const subjectType = this.detectSubjectType(subject);
    const rules = (this as any).rulesFor(action, subjectType, field);

    for (let i = 0, length = rules.length; i < length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  private _can(action: string, subject?: Subject, field?: string | string[]): boolean {
    if (Array.isArray(field)) {
      return field.every(value => this._can(action, subject, value));
    }

    const rule = this._relevantRuleFor(action, subject, field);
    return !!rule && !rule.inverted;
  }

  cannot(...args: CanParameters<A>): boolean;
  cannot(action: string, subject?: Subject, field?: string | string[]): boolean {
    return !this._can(action, subject, field);
  }
}
