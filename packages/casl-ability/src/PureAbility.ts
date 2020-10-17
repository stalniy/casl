import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public } from './RuleIndex';
import { Abilities, CanParameters, Subject } from './types';
import { Rule } from './Rule';

export type AbilityOptions<A extends Abilities, Conditions> = RuleIndexOptions<A, Conditions>;
export type AnyAbility = Public<PureAbility<any, any>>;
export type AbilityOptionsOf<T extends AnyAbility> = RuleIndexOptionsOf<T>;
export type AbilityClass<T extends AnyAbility> = new (...args: any[]) => T;

export class PureAbility<
  A extends Abilities = Abilities,
  Conditions = unknown
> extends RuleIndex<A, Conditions> {
  can(...args: CanParameters<A>): boolean {
    const rule = this.relevantRuleFor(...args);
    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<A>): Rule<A, Conditions> | null
  relevantRuleFor(action: string, subject?: Subject, field?: string): Rule<A, Conditions> | null {
    const rules = (this as any).rulesFor(action, this.detectSubjectType(subject), field);

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
