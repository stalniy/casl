import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public, RawRuleOf } from './RuleIndex';
import { Abilities, AbilityTuple, CanParameters, Subject } from './types';
import { Rule } from './Rule';

export interface AbilityOptions<A extends Abilities, Conditions>
  extends RuleIndexOptions<A, Conditions> {}
export interface AnyAbility<A extends Abilities = any, Conditions = any>
  extends Public<PureAbility<A, Conditions>> {}
export interface AbilityOptionsOf<T extends AnyAbility> extends RuleIndexOptionsOf<T> {}
export type AbilityClass<T extends AnyAbility> = new (
  rules?: RawRuleOf<T>[],
  options?: AbilityOptionsOf<T>
) => T;

export class PureAbility<
  A extends Abilities = AbilityTuple,
  Conditions = unknown
> extends RuleIndex<A, Conditions> {
  can(...args: CanParameters<A>): boolean {
    const rule = this.relevantRuleFor(...args);
    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<A>): Rule<A, Conditions> | null
  relevantRuleFor(action: string, subject?: Subject, field?: string): Rule<A, Conditions> | null {
    const subjectType = this.detectSubjectType(subject);
    const rules = (this as any).rulesFor(action, subjectType, field);

    for (let i = 0, length = rules.length; i < length; i++) {
      if (rules[i].matchesConditions(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  cannot(...args: CanParameters<A>): boolean {
    return !this.can(...args);
  }
}
