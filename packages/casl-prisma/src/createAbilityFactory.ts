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

export function createAbilityFactory<
  TModelName extends string,
  TPrismaQuery extends Record<string, any>
>(): CreateAbility<TModelName, TPrismaQuery> {
  return function createAbility(rules: any[] = [], options = {}): PureAbility<any, any> {
    return new PureAbility(rules, {
      ...options,
      conditionsMatcher: prismaQuery,
      fieldMatcher: fieldPatternMatcher,
    });
  }
}

export type CreateAbility<
  TModelName extends string,
  TPrismaQuery extends Record<string, any>
> = {
  <T extends PureAbility<any, TPrismaQuery>>(
    rules?: RawRuleOf<T>[],
    options?: AbilityOptionsOf<T>
  ): T;
  <A extends AbilityTuple = [string, TModelName], C extends TPrismaQuery = TPrismaQuery>(
    rules?: RawRuleFrom<A, C>[],
    options?: AbilityOptions<A, C>
  ): PureAbility<A, C>;
};
