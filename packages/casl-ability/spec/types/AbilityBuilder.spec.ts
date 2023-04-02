import { expectTypeOf } from 'expect-type'
import {
  AbilityBuilder,
  AbilityClass, AbilityTuple, createMongoAbility, MongoAbility, PureAbility
} from '../../src'

describe('AbilityBuilder types', () => {
  it('infers types from `PureAbility` default generics', () => {
    const builder = new AbilityBuilder<PureAbility<AbilityTuple>>(PureAbility)

    builder.can('read', 'Subject')
    builder.can('read', class {})
    // @ts-expect-error only `string | class` can be a subject type
    builder.can('read', {})

    builder.can(['read', 'update'], ['Subject1', 'Subject2'])
    builder.can('update', ['Subject1', 'Subject2'])
    builder.can(['read', 'update'], 'Subject')
    // @ts-expect-error only `string | string[]` can be used as action
    builder.can(1, 'Subject')

    builder.can('read', 'Subject', {})
    builder.can('read', 'Subject', { title: 'new' })
    builder.can('read', 'Subject', { title: 'new2', anyOtherProperty: true })
    builder.can('read', 'Subject', 1)
    builder.can('read', 'Subject', () => {})
    builder.can('read', 'Subject', 'field1')
    builder.can('read', 'Subject', 'field1', { condition: true })
    builder.can('read', 'Subject', ['field1', 'field2'])
    builder.can('read', 'Subject', ['field1', 'field2'], () => {})
    // @ts-expect-error expects 3rd parameter to fields -> `string | string[]`
    builder.can('read', 'Subject', {}, () => {})
  })

  it('infers types from `createMongoAbility` default generics', () => {
    const builder = new AbilityBuilder(createMongoAbility)

    builder.can('read', 'Subject')
    builder.can('read', class {})
    // @ts-expect-error only `string | class` can be a subject type
    builder.can('read', {})

    builder.can(['read', 'update'], ['Subject1', 'Subject2'])
    builder.can('update', ['Subject1', 'Subject2'])
    builder.can(['read', 'update'], 'Subject')
    // @ts-expect-error only `string | string[]` can be used as action
    builder.can(1, 'Subject')

    builder.can('read', 'Subject', {})
    builder.can('read', 'Subject', {
      title: {
        unknownOperator$: true, // TODO: change types to error this
      }
    })
    builder.can('read', 'Subject', {
      published: {
        $eq: true
      }
    })
    // @ts-expect-error conditions is expected to be a MongoQuery
    builder.can('read', 'Subject', () => {})
    // @ts-expect-error conditions is expected to be a MongoQuery
    builder.can('read', 'Subject', 1)

    builder.can('read', 'Subject', 'field')
    builder.can('read', 'Subject', 'field', {
      published: {
        $eq: true
      }
    })
    builder.can('read', 'Subject', ['field1', 'field2'], {
      published: {
        $eq: true
      }
    })
    builder.can('read', 'Subject', ['field1', 'field2'])
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
    type AppAbility = MongoAbility<['read', 'Post' | Post | 'User' | User]>
    let builder: AbilityBuilder<AppAbility>

    beforeEach(() => {
      builder = new AbilityBuilder<AppAbility>(createMongoAbility)
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

  describe('action and subject pairs restrictions', () => {
    type Post = { id: number, title: string, kind: 'Post' }
    type User = { id: number, name: string, kind: 'User' }
    type AppAbility = MongoAbility<
    ['read' | 'update' | 'delete' | 'create', 'Post' | Post] |
    ['read' | 'update', 'User' | User]
    >
    let builder: AbilityBuilder<AppAbility>

    beforeEach(() => {
      builder = new AbilityBuilder<AppAbility>(createMongoAbility)
    })

    it('allows to use only specified actions for specified subjects', () => {
      builder.can('read', 'Post', { id: 1 })
      builder.can('read', 'Post', { id: 1, title: 'test' })
      builder.can(['update', 'delete', 'create'], 'Post', { id: 1, title: 'test' })
      // @ts-expect-error "manage" is not in allowed list of actions for this subject
      builder.can('manage', 'Post')

      builder.can(['read', 'update'], 'User', { id: 1 })
      // @ts-expect-error "delete" is not in allowed list of actions for this subject
      builder.can('delete', 'User', { id: 1 })
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

    type AppAbility = MongoAbility<['read', Post | typeof Post | User | typeof User]>
    let builder: AbilityBuilder<AppAbility>

    beforeEach(() => {
      builder = new AbilityBuilder<AppAbility>(createMongoAbility)
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
