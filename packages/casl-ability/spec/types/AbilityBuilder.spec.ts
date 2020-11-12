import { expectTypeOf } from 'expect-type'
import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  PureAbility,
  SubjectType,
  MongoQuery
} from '../../src'

describe('AbilityBuilder types', () => {
  type Method<T extends any[]> = (...args: T) => any

  it('infers types from `PureAbility` default generics', () => {
    const builder = new AbilityBuilder(PureAbility)
    type Can = typeof builder.can

    expectTypeOf<Method<[string, SubjectType]>>().toMatchTypeOf<Can>()
    expectTypeOf<Method<[string[], SubjectType[]]>>().toMatchTypeOf<Can>()
    expectTypeOf<Method<[string, SubjectType, unknown]>>().toMatchTypeOf<Can>()
    expectTypeOf<[string, SubjectType, string | string[]]>().toMatchTypeOf<Parameters<Can>>()
    expectTypeOf<[string, SubjectType, string | string[], unknown]>()
      .toMatchTypeOf<Parameters<Can>>()
    expectTypeOf<[string, SubjectType, {}]>().not.toMatchTypeOf<Parameters<Can>>()
    expectTypeOf<[string, SubjectType, string]>().not.toEqualTypeOf<Parameters<Can>>()
    expectTypeOf<[string]>().not.toEqualTypeOf<Parameters<Can>>()
  })

  it('infers types from `Ability` default generics', () => {
    const builder = new AbilityBuilder(Ability)
    type Can = typeof builder.can

    expectTypeOf<Method<[string, SubjectType]>>().toMatchTypeOf<Can>()
    expectTypeOf<Method<[string[], SubjectType[]]>>().toMatchTypeOf<Can>()
    expectTypeOf<Method<[string, SubjectType, MongoQuery]>>().toMatchTypeOf<Can>()
    expectTypeOf<[string, SubjectType, string | string[]]>().toMatchTypeOf<Parameters<Can>>()
    expectTypeOf<[string, SubjectType, string | string[], MongoQuery]>()
      .toMatchTypeOf<Parameters<Can>>()
  })

  it('infers single action argument type from ClaimAbility', () => {
    const ClaimAbility = PureAbility as AbilityClass<PureAbility<string>>
    const builder = new AbilityBuilder(ClaimAbility)
    type Can = typeof builder.can

    expectTypeOf<[string | string[]]>().toEqualTypeOf<Parameters<Can>>()
  })

  describe('tagged interface as subject', () => {
    type Post = { id: number, title: string, kind: 'Post' }
    type User = { id: number, name: string, kind: 'User' }
    type AppAbility = Ability<['read', 'Post' | Post | 'User' | User]>
    const AppAbility = Ability as AbilityClass<AppAbility> // eslint-disable-line
    let builder: AbilityBuilder<AppAbility>

    beforeEach(() => {
      builder = new AbilityBuilder(AppAbility)
    })

    it('infers properties from `AppAbility` for specified subject conditions', () => {
      builder.can('read', 'Post', { id: 1 })
      builder.can('read', 'Post', { id: 1, title: 'test' })
      // @ts-expect-error
      builder.can('read', 'Post', { id: 'test' })
      // @ts-expect-error
      builder.can('read', 'Post', { unknown: 'test' })
      // @ts-expect-error
      builder.can('read', 'Post', { name: 'test' })

      builder.can('read', 'User', { id: 1 })
      builder.can('read', 'User', { id: 1, name: 'test' })
      // @ts-expect-error
      builder.can('read', 'User', { id: 'test' })
      // @ts-expect-error
      builder.can('read', 'User', { unknown: 'test' })
      // @ts-expect-error
      builder.can('read', 'User', { title: 'test' })
    })

    it('infers shared properties from `AppAbility` for specified subjects conditions', () => {
      builder.can('read', ['Post', 'User'], { id: 1 })
      // @ts-expect-error
      builder.can('read', ['Post', 'User'], { id: 1, title: 'test' })
      // @ts-expect-error
      builder.can('read', ['Post', 'User'], { id: 1, name: 'test' })
    })

    it('infers fields from `AppAbility` for specified subject conditions', () => {
      builder.can('read', 'Post', 'id')
      builder.can('read', 'Post', ['id', 'title'])
      builder.can('read', 'Post', 'unknown')
      // @ts-expect-error
      builder.can<Post, keyof Post>('read', 'Post', 'unknown')
    })
  })

  describe('class type as a subject', () => {
    class Post {
      id!: number
      title!: string
    }

    class User {
      id!: number
      name!: string
    }

    type AppAbility = Ability<['read', Post | typeof Post | User | typeof User]>
    const AppAbility = Ability as AbilityClass<AppAbility> // eslint-disable-line
    let builder: AbilityBuilder<AppAbility>

    beforeEach(() => {
      builder = new AbilityBuilder(AppAbility)
    })

    it('infers properties from `AppAbility` for specified subject conditions', () => {
      builder.can('read', Post, { id: 1 })
      builder.can('read', Post, { id: 1, title: 'test' })
      // @ts-expect-error
      builder.can('read', Post, { id: 'test' })
      // @ts-expect-error
      builder.can('read', Post, { unknown: 'test' })
      // @ts-expect-error
      builder.can('read', Post, { name: 'test' })

      builder.can('read', User, { id: 1 })
      builder.can('read', User, { id: 1, name: 'test' })
      // @ts-expect-error
      builder.can('read', User, { id: 'test' })
      // @ts-expect-error
      builder.can('read', User, { unknown: 'test' })
      // @ts-expect-error
      builder.can('read', User, { title: 'test' })
    })

    it('infers shared properties from `AppAbility` for specified subjects conditions', () => {
      builder.can('read', [Post, User], { id: 1 })
      // for some reason the next code is valid for classes only
      builder.can('read', [Post, User], { id: 1, title: 'test' })
      // @ts-expect-error
      builder.can<Post | User>('read', [Post, User], { id: 1, title: 'test' })
      // @ts-expect-error
      builder.can('read', [Post, User], { id: 1, unknown: 'test' })
      // @ts-expect-error
      builder.can('read', [Post, User], { title: 'test' })
      // @ts-expect-error
      builder.can('read', [Post, User], { name: 'test' })
    })

    it('infers fields from `AppAbility` for specified subject conditions', () => {
      builder.can('read', Post, 'id')
      builder.can('read', Post, ['id', 'title'])
      builder.can('read', Post, 'unknown')
      // @ts-expect-error
      builder.can<Post, keyof Post>('read', 'Post', 'unknown')
    })
  })
})
