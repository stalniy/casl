import { AbilityBuilder, type Ability, type TaggedSubject } from '@casl/ability'
import type { Post, Prisma } from '@prisma/client'
import { accessibleBy, createPrismaAbility, type PrismaAbility, type PrismaQuery } from '../src'

describe('custom subject resolvers', () => {
  type TaggedPost = Post & { resource: 'Post' }
  type AppAbility = PrismaAbility<['read', TaggedPost], PrismaQuery, TaggedSubject<'resource'>>

  it('propagates the resolver through the factory, builder and accessibleBy', () => {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility)
    builder.can('read', 'Post', { title: 'public' })
    const ability = builder.build({ detectSubjectType: object => object.resource })
    const query: Prisma.PostWhereInput = accessibleBy(ability).ofType('Post')

    expect(query).toEqual({ OR: [{ title: 'public' }] })
    expect(ability.can('read', { resource: 'Post', title: 'public' } as TaggedPost)).toBe(true)
    expect(ability.can('read', { resource: 'Post', title: 'private' } as TaggedPost)).toBe(false)
    // @ts-expect-error User is not a resolved subject name
    accessibleBy(ability).ofType('User')
    // @ts-expect-error update is not an ability action
    accessibleBy(ability, 'update')
  })

  it('accepts an ability type or explicit resolver generic in the factory', () => {
    const fromType = createPrismaAbility<AppAbility>(
      [{ action: 'read', subject: 'Post' }],
      { detectSubjectType: object => object.resource }
    )
    const fromGenerics = createPrismaAbility<['read', TaggedPost], PrismaQuery, TaggedSubject<'resource'>>(
      [{ action: 'read', subject: 'Post' }],
      { detectSubjectType: object => object.resource }
    )
    const ability: Ability<['read', TaggedPost], PrismaQuery, TaggedSubject<'resource'>> = fromGenerics

    expect(fromType.can('read', 'Post')).toBe(true)
    expect(ability.can('read', 'Post')).toBe(true)
    // @ts-expect-error unknown subject name in raw rules
    createPrismaAbility<AppAbility>([{ action: 'read', subject: 'User' }])
  })
})
