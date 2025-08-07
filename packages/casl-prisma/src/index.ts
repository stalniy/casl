import { AbilityOptions, AbilityTuple, fieldPatternMatcher, PureAbility, RawRuleFrom } from '@casl/ability';
import { Prisma } from '@prisma/client';

import type { PrismaModel, PrismaQueryFactory, PrismaTypes } from './runtime';
import { createAbilityFactory, prismaQuery } from './runtime';

export { accessibleBy, ParsingQueryError, prismaQuery } from './runtime';
export type * from './runtime';
export type WhereInput<TModelName extends Prisma.ModelName> =
  PrismaTypes<Prisma.TypeMap>['WhereInput'][TModelName];
export type PrismaQuery<T extends PrismaModel = PrismaModel> =
  PrismaQueryFactory<Prisma.TypeMap, T>;

export const createPrismaAbility = createAbilityFactory<Prisma.ModelName, PrismaQuery>();

/**
 * Uses conditional type to support union distribution
 */
type ExtendedAbilityTuple<T extends AbilityTuple> = T extends AbilityTuple
  ? [T[0], 'all' | T[1]]
  : never;

/**
 * @deprecated use createPrismaAbility instead
 */
export class PrismaAbility<
  A extends AbilityTuple = [string, Prisma.ModelName],
  C extends PrismaQuery = PrismaQuery
> extends PureAbility<ExtendedAbilityTuple<A>, C> {
  constructor(
    rules?: RawRuleFrom<ExtendedAbilityTuple<A>, C>[],
    options?: AbilityOptions<ExtendedAbilityTuple<A>, C>
  ) {
    super(rules, {
      conditionsMatcher: prismaQuery,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
