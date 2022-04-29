import { Prisma } from '@prisma/client';
import { AbilityOptions, AbilityTuple, fieldPatternMatcher, PureAbility, RawRuleFrom } from '@casl/ability';
import { PrismaQuery, prismaQuery } from './prisma/PrismaQuery';

export class PrismaAbility<
  A extends AbilityTuple = [string, 'all' | Prisma.ModelName],
  C extends PrismaQuery = PrismaQuery
> extends PureAbility<A, C> {
  constructor(rules?: RawRuleFrom<A, C>[], options?: AbilityOptions<A, C>) {
    super(rules, {
      conditionsMatcher: prismaQuery,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
