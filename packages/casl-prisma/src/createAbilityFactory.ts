import { AbilityOptions, AbilityTuple, fieldPatternMatcher, PureAbility, RawRuleFrom } from '@casl/ability';
import { prismaQuery } from './prisma/prismaQuery';

export function createAbilityFactory<
  TModelName extends string,
  TPrismaQuery extends Record<string, any>
>() {
  return function createAbility<
    A extends AbilityTuple = [string, TModelName],
    C extends TPrismaQuery = TPrismaQuery
  >(
    rules?: RawRuleFrom<A, C>[],
    options?: AbilityOptions<A, C>
  ) {
    return new PureAbility<A, C>(rules, {
      ...options,
      conditionsMatcher: prismaQuery,
      fieldMatcher: fieldPatternMatcher,
    });
  };
}
