import { expectTypeOf } from 'expect-type'
import {
  Ability,
  AbilityClass,
  AbilityOptionsOf,
  SubjectType,
  createAliasResolver
} from '../../src'

describe('Ability types', () => {
  type Post = { id: number }
  type AppAbility = Ability<['read', 'Post' | Post]>
  type AnyClass = new (...args: any[]) => any

  it('accepts any string and any Subject by default as parameters to `can`', () => {
    type Args = Parameters<Ability['can']>

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

  describe('AbilityOptions', () => {
    type AppAbilityOptions = Required<AbilityOptionsOf<AppAbility>>
    type MongoAbilityOptions = Required<AbilityOptionsOf<Ability>>

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

    describe('`resolveAction`', () => {
      const resolveAction = createAliasResolver({
        modify: ['delete', 'update']
      })

      expectTypeOf<typeof resolveAction>()
        .toMatchTypeOf<AbilityOptionsOf<AppAbility>['resolveAction']>()
    })
  })
})
