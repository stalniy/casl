import { AbilityOptionsOf, PureAbility, RawRuleOf } from '@casl/ability'
import { User, Post } from '@prisma/client'
import { createPrismaAbility, PrismaQuery, Subjects } from '../src'

export type AppAbility = PureAbility<[string, 'all' | Subjects<{
  User: User,
  Post: Post
}>], PrismaQuery>

type AppAbilityFactory = (
  rules?: RawRuleOf<AppAbility>[],
  options?: AbilityOptionsOf<AppAbility>
) => AppAbility
export const createAppAbility = createPrismaAbility as AppAbilityFactory
