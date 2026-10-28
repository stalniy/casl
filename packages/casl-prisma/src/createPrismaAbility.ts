import {
  type AbilityOptions,
  type AbilityOptionsOf,
  type AbilityTuple,
  type SubjectResolver,
  fieldPatternMatcher,
  Ability,
  type RawRuleFrom,
  type RawRuleOf
} from '@casl/ability';
import { prismaQuery } from './prisma/prismaQuery';
import type { BasePrismaQuery } from './types';

export function createPrismaAbility<
  T extends Ability<any, BasePrismaQuery, any>
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createPrismaAbility<
  A extends AbilityTuple,
  C extends BasePrismaQuery,
  R extends SubjectResolver
>(rules?: RawRuleFrom<A, C, R>[], options?: AbilityOptions<A, C, R>): Ability<A, C, R>;
export function createPrismaAbility<
  A extends AbilityTuple = [string, string],
  C extends BasePrismaQuery = any
>(
  rules?: RawRuleFrom<A, C>[],
  options?: AbilityOptions<A, C>
): Ability<A, C>;
export function createPrismaAbility(rules: any[] = [], options = {}): Ability<any, any, any> {
  return new Ability(rules, {
    ...options,
    conditionsMatcher: prismaQuery,
    fieldMatcher: fieldPatternMatcher,
  });
}
