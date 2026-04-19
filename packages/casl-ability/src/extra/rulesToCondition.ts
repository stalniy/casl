import { CompoundCondition, Condition, buildAnd, buildOr } from '@ucast/mongo2js';
import type { AnyAbility } from '../PureAbility';
import type { RuleOf } from '../RuleIndex';
import type { ExtractSubjectType } from '../types';

export type RuleToQueryConverter<T extends AnyAbility, R = object> = (rule: RuleOf<T>) => R;

function ruleToAST(rule: RuleOf<AnyAbility>): Condition {
  if (!rule.ast) {
    throw new Error(`Ability rule "${JSON.stringify(rule)}" does not have "ast" property. So, cannot be used to generate AST`);
  }

  return rule.inverted ? new CompoundCondition('not', [rule.ast]) : rule.ast;
}

export function rulesToAST<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
): Condition | null {
  return rulesToCondition<T, Condition, Condition>(
    ability.rulesFor(action, subjectType),
    ruleToAST,
    {
      and: buildAnd,
      or: buildOr,
      empty: () => buildAnd([])
    }
  );
}

/**
 * Converts CASL's sequential, switch-case priority enforcement into flat boolean logic.
 *
 * CASL evaluates rules from bottom to top (highest priority). When a record is evaluated:
 * - If it matches a `cannot` rule, it returns `false`.
 * - If it matches a `can` rule, it returns `true`.
 * - Thus, a `can` rule is only reached if it was not intercepted by any higher-priority `cannot` rule.
 *
 * This function flattens this logic for database queries by isolating each `can` rule ("OR" branches)
 * and strictly bounding it by all the preceding `cannot` conditions ("AND NOT" bounds).
 * Because standard `$or` logic inherently absorbs the overlap of previously matched `can` paths,
 * we don't mathematically need to subtract higher-priority `can` rules.
 *
 * @param rules - The sorted array of CASL rules (highest priority first).
 * @param convert - The transformer mapping a CASL rule to the target query/AST format.
 * @param hooks - The logical combination hooks for the target format.
 */
export function rulesToCondition<T extends AnyAbility, R, Result>(
  rules: RuleOf<T>[],
  convert: (rule: RuleOf<T>) => R,
  hooks: {
    and: (conditions: R[]) => Result,
    or: (conditions: R[]) => Result,
    empty: () => Result,
  }
): Result | null {
  const higherCannots: R[] = [];
  const orConditions: R[] = [];
  let hasUnconditionalCan = false;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule.inverted) {
      if (!rule.conditions) {
        break; // stop evaluation on unconditional cannot
      }
      higherCannots.push(convert(rule));
    } else {
      if (!rule.conditions) {
        hasUnconditionalCan = true;
        break; // stop evaluation on unconditional can
      }

      let cond = convert(rule);
      if (higherCannots.length > 0) {
        cond = hooks.and([cond, ...higherCannots]) as unknown as R;
      }
      orConditions.push(cond);
    }
  }

  if (hasUnconditionalCan) {
    if (higherCannots.length === 0) {
      return hooks.empty();
    }
    if (orConditions.length === 0) {
      return hooks.and(higherCannots);
    }
    orConditions.push(hooks.and(higherCannots) as unknown as R);
  }

  if (orConditions.length === 0) return null;
  return hooks.or(orConditions);
}
