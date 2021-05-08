import { Prisma } from '@prisma/client';
import { AbilityOptions, AbilityTuple, fieldPatternMatcher, ForcedSubject, hkt, PureAbility, RawRuleFrom } from '@casl/ability';
import { WhereInput, prismaQuery } from './prisma/PrismaQuery';

type ExtractModelName<T> = T extends { kind: Prisma.ModelName }
  ? T['kind']
  : T extends ForcedSubject<Prisma.ModelName>
    ? T['__caslSubjectType__']
    : T extends { __typename: Prisma.ModelName }
      ? T['__typename']
      : never;

interface PrismaQueryFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0]>>
}

export type Model<T, TName extends string> = T & ForcedSubject<TName>;

type PrismaModel = Model<Record<string, unknown>, Prisma.ModelName>;
export type PrismaQuery<T extends PrismaModel = PrismaModel> =
  WhereInput<ExtractModelName<T>> & hkt.Container<PrismaQueryFactory>;

export class PrismaAbility<
  A extends AbilityTuple = [string, Prisma.ModelName],
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
