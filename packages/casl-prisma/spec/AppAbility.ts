import { Ability } from '@casl/ability'
import type { User, Post } from '@prisma/client'
import type { PrismaQuery, Subjects } from '../src'

export type AppAbility = Ability<['create' | "read" | "update" | "delete", 'all' | Subjects<{
  User: User,
  Post: Post
}>], PrismaQuery>
