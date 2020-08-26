import { RuleIndex, RuleIndexOptions, RuleIndexOptionsOf, Public } from './RuleIndex';
import { Abilities, CanParameters } from './types';

export type AbilityOptions<A extends Abilities, Conditions> = RuleIndexOptions<A, Conditions>;
export type AnyAbility = Public<PureAbility<any, any>>;
export type AbilityOptionsOf<T extends AnyAbility> = RuleIndexOptionsOf<T>;
export type AbilityClass<T extends AnyAbility> = new (...args: any[]) => T;

interface AbilityEvent<A extends Abilities = Abilities, Conditions = unknown> {
  /** @deprecated use "target" property instead */
  ability: this['target']
  target: PureAbility<A, Conditions>
}

export class PureAbility<
  A extends Abilities = Abilities,
  Conditions = unknown
> extends RuleIndex<A, Conditions, AbilityEvent<A, Conditions>> {
  can(...args: CanParameters<A>): boolean {
    const rule = this.relevantRuleFor(...args);
    return !!rule && !rule.inverted;
  }

  relevantRuleFor(...args: CanParameters<A>) {
    const rules = this.rulesFor(...args);
    const subject = args[1];

    for (let i = 0; i < rules.length; i++) {
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
