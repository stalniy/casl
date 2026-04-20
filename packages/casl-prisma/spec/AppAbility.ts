import { PureAbility } from '@casl/ability'
import type { User, Post } from '@prisma/client'
import type { PrismaQuery, Subjects } from '../src'

export type AppAbility = PureAbility<['create' | "read" | "update" | "delete", 'all' | Subjects<{
  User: User,
  Post: Post
}>], PrismaQuery>
