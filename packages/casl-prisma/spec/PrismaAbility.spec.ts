import { AbilityBuilder, PureAbility, subject } from '@casl/ability'
import { User, Post, Prisma } from '@prisma/client'
import { createPrismaAbility, Model as M, PrismaAbility, PrismaQuery, Subjects } from '../src'
import { AppAbility } from './AppAbility'

describe('PrismaAbility', () => {
  it('uses PrismaQuery to evaluate conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)
    can('read', 'Post', {
      authorId: { notIn: [1, 2] }
    })
    can('read', 'User', {
      firstName: { startsWith: 'john', mode: 'insensitive' }
    })
    const ability = build()

    expect(ability.can('read', 'all')).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 1 } as Post))).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 2 } as Post))).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 3 } as Post))).toBe(true)
    expect(ability.can('read', subject('User', { firstName: 'John' } as User))).toBe(true)
    expect(ability.can('read', subject('User', { firstName: 'Tom' } as User))).toBe(false)
  })

  describe('types', () => {
    it('ensures that only specified models can be used as subjects', () => {
      expect(createPrismaAbility<AppAbility>([
        {
          action: 'read',
          subject: 'Post'
        },
        {
          action: 'update',
          subject: 'User',
          conditions: {
            age: 11
          }
        },
        // @ts-expect-error unknown subject
        { action: 'read', subject: 'unknown' },
        {
          action: 'update',
          subject: 'Post',
          conditions: {
            // @ts-expect-error unknown model field in conditions
            unknown: 1,
          }
        },
        {
          action: 'read',
          subject: 'all'
        }
      ])).toBeInstanceOf(PureAbility)
    })

    it('provides type validation in `AbilityBuilder`', () => {
      const { can } = new AbilityBuilder<AppAbility>(createPrismaAbility)

      can('read', 'Post', {
        // @ts-expect-error referencing User property
        age: 1,
        id: 1,
        author: {
          is: {
            firstName: 'John'
          }
        }
      })
      // @ts-expect-error unknown subject type
      can('update', 'unknown')
      can('update', 'User', {
        // @ts-expect-error referencing Post property
        title: 'test',
        posts: {
          every: {
            title: 'test casl-prisma'
          }
        }
      })
      can('delete', 'all')
    })

    it('uses Prisma types when building `PrismaQuery<TModel>` type', () => {
      type ExpectTrue = Prisma.UserWhereInput extends PrismaQuery<M<User, 'User'>>
        ? true
        : false

      expect<ExpectTrue>(true).toBe(true)
    })

    it('supports per subject actions', () => {
      type Abilities =
        | ['read', Subjects<{ User: User }>]
        | ['read' | 'update', Subjects<{ Post: Post }>]
      type ThisAbility = PrismaAbility<Abilities>
      const ability = createPrismaAbility<ThisAbility>()

      ability.can('update', 'Post')

      // @ts-expect-error
      ability.can('update', 'User')
    })
  })
})
