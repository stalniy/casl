import { Condition } from '@ucast/mongo2js';
import type { AnyAbility } from '../Ability';
import type { RuleOf } from '../RuleIndex';
import type { ExtractSubjectType } from '../types';
export type RuleToQueryConverter<T extends AnyAbility, R = object> = (rule: RuleOf<T>) => R;
export declare function rulesToAST<T extends AnyAbility>(ability: T, action: Parameters<T['rulesFor']>[0], subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>): Condition | null;
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
export declare function rulesToCondition<T extends AnyAbility, R, Result>(rules: readonly RuleOf<T>[], convert: (rule: RuleOf<T>) => R, hooks: {
    and: (conditions: R[]) => Result;
    or: (conditions: R[]) => Result;
    empty: () => Result;
}): Result | null;
