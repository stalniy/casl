import { AbilityBuilder, PureAbility, subject } from '@casl/ability'
import { createTypeormAbility } from '../src'
import { AppAbility, Post, User } from './AppAbility'

describe('TypeormAbility', () => {
  it('uses typeormQuery to evaluate conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createTypeormAbility)
    can('read', 'Post', {
      authorId: { notIn: [1, 2] }
    })
    can('read', 'User', {
      firstName: { ilike: 'john%' }
    })
    const ability = build()

    expect(ability.can('read', 'all')).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 1 } as Post))).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 2 } as Post))).toBe(false)
    expect(ability.can('read', subject('Post', { authorId: 3 } as Post))).toBe(true)
    expect(ability.can('read', subject('User', { firstName: 'John' } as User))).toBe(true)
    expect(ability.can('read', subject('User', { firstName: 'john doe' } as User))).toBe(true)
    expect(ability.can('read', subject('User', { firstName: 'Tom' } as User))).toBe(false)
  })

  it('evaluates "between" conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createTypeormAbility)
    can('read', 'User', {
      age: { between: [18, 65] }
    })
    const ability = build()

    expect(ability.can('read', subject('User', { age: 25 } as User))).toBe(true)
    expect(ability.can('read', subject('User', { age: 10 } as User))).toBe(false)
    expect(ability.can('read', subject('User', { age: 70 } as User))).toBe(false)
  })

  it('evaluates "like" conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createTypeormAbility)
    can('read', 'Post', {
      title: { like: '%tutorial%' }
    })
    const ability = build()

    expect(ability.can('read', subject('Post', { title: 'A tutorial on CASL' } as Post))).toBe(true)
    expect(ability.can('read', subject('Post', { title: 'Random post' } as Post))).toBe(false)
  })

  it('evaluates "isNull" conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createTypeormAbility)
    can('read', 'Post', {
      status: { isNull: true }
    })
    const ability = build()

    expect(ability.can('read', subject('Post', { status: null } as unknown as Post))).toBe(true)
    expect(ability.can('read', subject('Post', { status: 'published' } as Post))).toBe(false)
  })

  it('evaluates array conditions', () => {
    const { can, build } = new AbilityBuilder<AppAbility>(createTypeormAbility)
    can('read', 'Post', {
      tags: { arrayContains: ['typescript'] }
    })
    const ability = build()

    expect(ability.can('read', subject('Post', { tags: ['typescript', 'casl'] } as Post))).toBe(true)
    expect(ability.can('read', subject('Post', { tags: ['javascript'] } as Post))).toBe(false)
  })

  describe('types', () => {
    it('ensures that only specified models can be used as subjects', () => {
      expect(createTypeormAbility<AppAbility>([
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
        {
          action: 'read',
          subject: 'all'
        }
      ])).toBeInstanceOf(PureAbility)
    })

    it('provides type validation in `AbilityBuilder`', () => {
      const { can } = new AbilityBuilder<AppAbility>(createTypeormAbility)

      can('read', 'Post', {
        id: 1,
        authorId: 1,
      })
      // @ts-expect-error unknown subject type
      can('update', 'unknown')
      can('delete', 'all')
    })
  })
})
