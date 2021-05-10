import { AbilityClass } from '@casl/ability'
import { User, Post, Prisma } from '@prisma/client'
import { PrismaAbility, Model as M } from '../src'

export type AppAbility = PrismaAbility<[
  string, Prisma.ModelName | M<User, 'User'> | M<Post, 'Post'>
]>
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppAbility = PrismaAbility as AbilityClass<AppAbility>
