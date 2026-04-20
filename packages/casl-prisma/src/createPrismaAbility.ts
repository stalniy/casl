import {
  AbilityOptions,
  AbilityOptionsOf,
  AbilityTuple,
  fieldPatternMatcher,
  PureAbility,
  RawRuleFrom,
  RawRuleOf
} from '@casl/ability';
import { prismaQuery } from './prisma/prismaQuery';
import { BasePrismaQuery } from './types';

export function createPrismaAbility<
  T extends PureAbility<any, BasePrismaQuery>
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createPrismaAbility<
  A extends AbilityTuple = [string, string],
  C extends BasePrismaQuery = any
>(
  rules?: RawRuleFrom<A, C>[],
  options?: AbilityOptions<A, C>
): PureAbility<A, C>;
export function createPrismaAbility(rules: any[] = [], options = {}): PureAbility<any, any> {
  return new PureAbility(rules, {
    ...options,
    conditionsMatcher: prismaQuery,
    fieldMatcher: fieldPatternMatcher,
  });
}
