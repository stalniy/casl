import { AbilityOptions, AbilityTuple, fieldPatternMatcher, PureAbility, RawRuleFrom } from '@casl/ability';
import { createAbilityFactory, createAccessibleByFactory, prismaQuery } from './runtime';
import { WhereInputPerModel, ModelName, PrismaQuery } from './prismaClientBoundTypes';

export type { PrismaQuery, WhereInput } from './prismaClientBoundTypes';
export type { Model, Subjects } from './runtime';
export { prismaQuery, ParsingQueryError } from './runtime';

const createPrismaAbility = createAbilityFactory<ModelName, PrismaQuery>();
const accessibleBy = createAccessibleByFactory<WhereInputPerModel, PrismaQuery>();

export {
  createPrismaAbility,
  accessibleBy,
};

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
  A extends AbilityTuple = [string, ModelName],
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
