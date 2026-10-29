import { expectTypeOf } from 'expect-type'
import {
  AbilityClass,
  AbilityOptionsOf,
  SubjectType,
  createAliasResolver,
  MongoAbility,
  Ability,
  createMongoAbility,
  MongoQuery,
  CanParametersForAction,
  TaggedSubject
} from '../../src'

describe('Ability types', () => {
  type Post = { id: number }
  type AppAbility = MongoAbility<['read', 'Post' | Post]>
  type AnyClass = new (...args: any[]) => any

  it('accepts any string and any Subject by default as parameters to `can`', () => {
    type Args = Parameters<MongoAbility['can']>

    expectTypeOf<[string, string, string]>().toMatchTypeOf<Args>()
    expectTypeOf<[string, string]>().toMatchTypeOf<Args>()
    expectTypeOf<[string, {}]>().toMatchTypeOf<Args>()
    expectTypeOf<[string, {}, string]>().toMatchTypeOf<Args>()
    expectTypeOf<[string, AnyClass, string]>().toMatchTypeOf<Args>()
    expectTypeOf<[string, AnyClass]>().toMatchTypeOf<Args>()

    expectTypeOf<[123, AnyClass]>().not.toMatchTypeOf<Args>()
    expectTypeOf<[AnyClass]>().not.toMatchTypeOf<Args>()
    expectTypeOf<[{}, AnyClass]>().not.toMatchTypeOf<Args>()
    expectTypeOf<[string, string, {}]>().not.toMatchTypeOf<Args>()
  })

  it('can be casted to `AbilityClass`', () => {
    const AppAbility = Ability as AbilityClass<AppAbility>
    expectTypeOf(AppAbility).toEqualTypeOf<AbilityClass<AppAbility>>()
  })

  it('allows to pass arguments to `can`, `cannot` and `relevantRuleFor` methods that are assignable to corresponding generic types', () => {
    type CanArgs = Parameters<AppAbility['can']>

    expectTypeOf<['read', 'Post']>().toMatchTypeOf<CanArgs>()
    expectTypeOf<['read', { id: 1 }]>().toMatchTypeOf<CanArgs>()
    expectTypeOf<['read', 'Post', 'any field']>().toMatchTypeOf<CanArgs>()
    expectTypeOf<['read', { id: 1 }, 'any field']>().toMatchTypeOf<CanArgs>()

    expectTypeOf<['update', 'Post']>().not.toMatchTypeOf<CanArgs>()
    expectTypeOf<['read', 'User']>().not.toMatchTypeOf<CanArgs>()
    expectTypeOf<['read', { firstName: 'test' }]>().not.toMatchTypeOf<CanArgs>()
  })

  it('accepts only subject types as the 2nd argument in `possibleRulesFor`', () => {
    type RulesForArgs = Parameters<AppAbility['rulesFor']>

    expectTypeOf<['read', 'Post']>().toMatchTypeOf<RulesForArgs>()
    expectTypeOf<['read', 'User']>().not.toMatchTypeOf<RulesForArgs>()
    expectTypeOf<['read', { id: 1 }]>().not.toMatchTypeOf<RulesForArgs>()
  })

  it('accepts only known event names in `on` method', () => {
    type Events = Parameters<AppAbility['on']>[0]

    expectTypeOf<'update' | 'updated'>().toEqualTypeOf<Events>()
  })

  it('preserves action-only abilities', () => {
    const ability = new Ability<'read' | 'write'>()

    ability.can('read')
    ability.cannot('write')
    ability.relevantRuleFor('read')
    // @ts-expect-error action-only abilities do not accept a subject
    ability.can('read', 'campaign')
    // @ts-expect-error unknown action
    ability.can('delete')
  })

  it('infers actions from arrays and multiple rules', () => {
    const fromArray = new Ability([{ action: ['read', 'write'] }])
    const fromRules = new Ability([{ action: 'read' }, { action: 'write' }])

    expectTypeOf(fromArray).toEqualTypeOf<Ability<'read' | 'write'>>()
    expectTypeOf(fromRules).toEqualTypeOf<Ability<'read' | 'write'>>()
  })

  it('resolves the combined subjects with a custom resolver', () => {
    type User = { kind: 'User', name: string }
    type Post = { kind: 'BlogPost', title: string }
    type AppAbility = Ability<['read', User] | ['read', Post], unknown, TaggedSubject<'kind'>>

    expectTypeOf<Parameters<AppAbility['can']>>().toEqualTypeOf<
      | [action: 'read', subject: User | 'User', field?: string]
      | [action: 'read', subject: Post | 'BlogPost', field?: string]
    >()
    expectTypeOf<Parameters<Ability<never>['can']>>().toBeNever()
  })

  it('preserves literal action branches alongside unrestricted string actions', () => {
    type AppAbilities = ['read', 'User'] | [string, 'BlogPost']
    const ability = new Ability<AppAbilities>()

    ability.can('read', 'User')
    ability.can('read', 'BlogPost')
    ability.can('update', 'BlogPost')
    ability.cannot('read', 'User')
    ability.relevantRuleFor('read', 'User')

    // @ts-expect-error only read is allowed for User
    ability.can('update', 'User')
    // @ts-expect-error only read is allowed for User
    ability.cannot('update', 'User')
    // @ts-expect-error only read is allowed for User
    ability.relevantRuleFor('update', 'User')

    const action = 'read' as string
    ability.can(action, 'BlogPost')
    // @ts-expect-error an unrestricted action cannot guarantee read for User
    ability.can(action, 'User')

    expectTypeOf<['read', 'User']>().toMatchTypeOf<CanParametersForAction<'read', AppAbilities>>()
    expectTypeOf<['update', 'BlogPost']>().toMatchTypeOf<CanParametersForAction<string, AppAbilities>>()
    expectTypeOf<['update', 'User']>().not.toMatchTypeOf<CanParametersForAction<string, AppAbilities>>()
  })

  it('preserves valid pairs, fields and tuple arguments', () => {
    type AppAbilities =
      | ['create' | 'manage', 'campaign']
      | ['create' | 'delete', 'user:invite']
    const ability = createMongoAbility<AppAbilities>()

    const method = 'can' as 'can' | 'cannot' | 'relevantRuleFor'
    ability[method]('delete', 'user:invite')

    ability.can('delete', 'user:invite')
    ability.can('manage', 'campaign', 'title')
    ability.can('create', 'campaign')
    ability.can('create', 'user:invite')
    ability.cannot('delete', 'user:invite')
    ability.cannot('manage', 'campaign', 'title')
    ability.relevantRuleFor('delete', 'user:invite')
    ability.relevantRuleFor('manage', 'campaign', 'title')

    // @ts-expect-error campaign does not support delete
    ability.can('delete', 'campaign')
    // @ts-expect-error user:invite does not support manage
    ability.can('manage', 'user:invite')
    // @ts-expect-error unknown action
    ability.can('read', 'campaign')
    // @ts-expect-error unknown subject
    ability.can('create', 'unknown')
    // @ts-expect-error campaign does not support delete
    ability.cannot('delete', 'campaign')
    // @ts-expect-error user:invite does not support manage
    ability.relevantRuleFor('manage', 'user:invite')
  })

  describe('AbilityOptions', () => {
    type AppAbilityOptions = Required<AbilityOptionsOf<AppAbility>>
    type MongoAbilityOptions = Required<AbilityOptionsOf<MongoAbility>>

    describe('`detectSubjectType`', () => {
      it('accepts only subject type instances', () => {
        type AppAbilityParam = Parameters<AppAbilityOptions['detectSubjectType']>[0]
        type MongoAbilityParam = Parameters<MongoAbilityOptions['detectSubjectType']>[0]

        expectTypeOf<AppAbilityParam>().toEqualTypeOf<Post>()
        expectTypeOf<MongoAbilityParam>().toEqualTypeOf<Record<any, any>>()
      })

      it('returns subject type', () => {
        type AppAbilityResult = ReturnType<AppAbilityOptions['detectSubjectType']>
        type MongoAbilityResult = ReturnType<MongoAbilityOptions['detectSubjectType']>

        expectTypeOf<AppAbilityResult>().toEqualTypeOf<'Post'>()
        expectTypeOf<MongoAbilityResult>().toEqualTypeOf<SubjectType>()
      })
    })

    describe('resolveAction', () => {
      // eslint-disable-next-line
      const resolveAction = createAliasResolver({
        modify: ['delete', 'update']
      })

      expectTypeOf<typeof resolveAction>()
        .toMatchTypeOf<AbilityOptionsOf<AppAbility>['resolveAction']>()
    })
  })

  describe('createMongoAbility', () => {
    it('can accept Ability type as a single generic parameter', () => {
      // eslint-disable-next-line
      const ability = createMongoAbility<AppAbility>()
      expectTypeOf<typeof ability>().toEqualTypeOf<AppAbility>()
    })

    it('can accept abilities and conditions generics', () => {
      // eslint-disable-next-line
      const ability = createMongoAbility<['read', 'Post' | Post], MongoQuery>()
      expectTypeOf<typeof ability>().toEqualTypeOf<AppAbility>()
    })
  })
})
