import {
  type AbilityOptions,
  type AbilityOptionsOf,
  type AbilityTuple,
  fieldPatternMatcher,
  Ability,
  type RawRuleFrom,
  type RawRuleOf
} from '@casl/ability';
import { prismaQuery } from './prisma/prismaQuery';
import type { BasePrismaQuery } from './types';

export function createPrismaAbility<
  T extends Ability<any, BasePrismaQuery>
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createPrismaAbility<
  A extends AbilityTuple = [string, string],
  C extends BasePrismaQuery = any
>(
  rules?: RawRuleFrom<A, C>[],
  options?: AbilityOptions<A, C>
): Ability<A, C>;
export function createPrismaAbility(rules: any[] = [], options = {}): Ability<any, any> {
  return new Ability(rules, {
    ...options,
    conditionsMatcher: prismaQuery,
    fieldMatcher: fieldPatternMatcher,
  });
}
