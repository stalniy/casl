import { expectTypeOf } from 'expect-type'
import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  defineAbility,
  ForbiddenError,
  subject,
  type AbilityOptionsOf,
  type BuiltinSubjectKey,
  type ClassSubject,
  type Container,
  type DefaultSubject,
  type ExtractSubjectType,
  type FactorySubject,
  type ForcedSubject,
  type Generics,
  type MongoAbility,
  type MongoQuery,
  type RawRuleOf,
  type SubjectResolverFactory,
  type TaggedSubject
} from '../../src'
import { permittedFieldsOf, rulesToAST, rulesToFields } from '../../src/extra'
import type { ResolveInstance, ResolveSubjects } from '../../src/SubjectResolver'

describe('subject resolvers', () => {
  describe('TaggedSubject', () => {
    type Permissions =
      | ['read' | 'update', Article]
      | ['read', User]
    type AppAbility = MongoAbility<Permissions, MongoQuery, TaggedSubject<'kind'>>

    it('infers names, conditions and action restrictions without an explicit name union', () => {
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', 'Article', { title: 'public' })
      builder.cannot('update', 'Article', 'title', { authorId: { $ne: 1 } })
      builder.can('read', 'User', { name: 'Alice' })
      // @ts-expect-error User has no title
      builder.can('read', 'User', { title: 'public' })
      // @ts-expect-error Article has a numeric authorId
      builder.can('read', 'Article', { authorId: '1' })
      // @ts-expect-error update is only allowed for Article
      builder.can('update', 'User')
      // @ts-expect-error unknown subject type
      builder.can('read', 'Comment')
      // @ts-expect-error explicitly constrained fields must belong to Article
      builder.can<Article, keyof Article>('read', 'Article', 'name')
    })

    it('propagates resolution through rules, options, events and ability methods', () => {
      const rules: RawRuleOf<AppAbility>[] = [{ action: 'read', subject: 'Article' }]
      const options: AbilityOptionsOf<AppAbility> = { detectSubjectType: object => object.kind }
      const ability = createMongoAbility<AppAbility>(rules, options)
      expectTypeOf<Generics<AppAbility>['subjectResolver']>().toEqualTypeOf<TaggedSubject<'kind'>>()
      expectTypeOf<Parameters<NonNullable<typeof options.detectSubjectType>>[0]>()
        .toEqualTypeOf<Article | User>()
      ability.on('update', event => {
        expectTypeOf(event.rules).toEqualTypeOf<RawRuleOf<AppAbility>[]>()
      })
      ability.update(rules)
      expect(ability.can('read', 'Article')).toBe(true)
      expect(ability.can('read', { kind: 'Article', title: 'test', authorId: 1 })).toBe(true)
      expect(ability.cannot('read', 'User')).toBe(true)
      expect(ability.rulesFor('read', 'Article')).toHaveLength(1)
      expect(ability.possibleRulesFor('read', 'Article')[0].subject).toBe('Article')
      expect(ability.actionsFor('Article')).toEqual(['read'])
      expect(ability.detectSubjectType({ kind: 'User', name: 'Alice' })).toBe('User')
      expect(() => ForbiddenError.from(ability).throwUnlessCan('read', 'Article')).not.toThrow()
      // @ts-expect-error cannot update User
      ability.can('update', 'User')
      // @ts-expect-error cannot define an update rule for User
      ability.update([{ action: 'update', subject: 'User' }])
    })

    it('supports core helpers with the resolved subject types', () => {
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', 'Article', 'title', { authorId: 1 })
      const ability = builder.build({ detectSubjectType: object => object.kind })
      const article: Article = { kind: 'Article', title: 'test', authorId: 1 }
      expect(permittedFieldsOf(ability, 'read', article, {
        fieldsFrom: rule => rule.fields || []
      })).toEqual(['title'])
      expect(rulesToFields(ability, 'read', 'Article')).toEqual({ authorId: 1 })
      expect(rulesToAST(ability, 'read', 'Article')).not.toBeNull()
      const error = ForbiddenError.from(ability)
      expectTypeOf(error.subject).toEqualTypeOf<Article | User | 'Article' | 'User'>()
    })

    it('supports the builtin tag set by subject()', () => {
      type Record = { title: string }
      type AppAbility = MongoAbility<
        ['read', Record & ForcedSubject<'Article'>],
        MongoQuery,
        TaggedSubject
      >
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', 'Article', { title: 'public' })
      const ability = builder.build()
      expect(ability.can('read', subject('Article', { title: 'public' }))).toBe(true)
      expect(ability.can('read', subject('Article', { title: 'private' }))).toBe(false)
    })

    it('works with Ability, MongoAbility and defineAbility', () => {
      type PlainAbility = Ability<['read', Article], unknown, TaggedSubject<'kind'>>
      const ability = new Ability<['read', Article], unknown, TaggedSubject<'kind'>>(
        [{ action: 'read', subject: 'Article' }], { detectSubjectType: object => object.kind }
      )
      expectTypeOf(ability).toEqualTypeOf<PlainAbility>()
      expect(ability.can('read', 'Article')).toBe(true)
      const mongo = createMongoAbility<['read', Article], MongoQuery, TaggedSubject<'kind'>>(
        [{ action: 'read', subject: 'Article' }], { detectSubjectType: object => object.kind }
      )
      expectTypeOf(mongo).toEqualTypeOf<MongoAbility<['read', Article], MongoQuery, TaggedSubject<'kind'>>>()
      const defined = defineAbility<AppAbility>(can => {
        can('read', 'Article', { title: 'public' })
      }, { detectSubjectType: object => object.kind })
      expect(defined.can('read', { kind: 'Article', title: 'public', authorId: 1 })).toBe(true)
      expect(defined.can('read', { kind: 'Article', title: 'private', authorId: 1 })).toBe(false)
    })

    it('supports custom keys and unions of tag keys without including unrelated properties', () => {
      type TypenameUser = { __typename: 'User', name: string }
      type ForcedArticle = { title: string } & ForcedSubject<'Article'>
      type Resolver = TaggedSubject<'kind' | '__typename' | BuiltinSubjectKey>
      expectTypeOf<ExtractSubjectType<Article | TypenameUser | ForcedArticle, Resolver>>()
        .toEqualTypeOf<'Article' | 'User'>()
      expectTypeOf<ResolveInstance<Article | TypenameUser, 'User', Resolver>>()
        .toEqualTypeOf<TypenameUser>()
      expectTypeOf<ResolveInstance<Article | TypenameUser, 'Article', Resolver>>()
        .toEqualTypeOf<Article>()
      expectTypeOf<ExtractSubjectType<Article, TaggedSubject<'__typename'>>>().toBeNever()
      type Entity = { resource: 'Article', kind: 'unrelated', title: string }
      type CustomAbility = MongoAbility<['read', Entity], MongoQuery, TaggedSubject<'resource'>>
      const builder = new AbilityBuilder<CustomAbility>(createMongoAbility)
      builder.can('read', 'Article', { title: 'public' })
      // @ts-expect-error kind is not the configured discriminator
      builder.can('read', 'unrelated')
      const ability = builder.build({ detectSubjectType: object => object.resource })
      expect(ability.can('read', { resource: 'Article', kind: 'unrelated', title: 'public' })).toBe(true)
    })

    interface Article {
      kind: 'Article'
      title: string
      authorId: number
    }
    interface User {
      kind: 'User'
      name: string
    }
  })

  describe('ClassSubject', () => {
    class PublicArticle {
      constructor(readonly title: string) {}
    }
    class ProtectedArticle {
      protected constructor(readonly title: string) {}
      static create(title: string) { return new ProtectedArticle(title) }
    }
    class PrivateArticle {
      private constructor(readonly title: string) {}
      static create(title: string) { return new PrivateArticle(title) }
    }
    abstract class AbstractArticle {
      constructor(readonly title: string) {}
    }
    type Classes = typeof PublicArticle | typeof ProtectedArticle |
    typeof PrivateArticle | typeof AbstractArticle
    type AppAbility = MongoAbility<['read', Classes], MongoQuery, ClassSubject>

    it('derives instances regardless of constructor visibility and abstractness', () => {
      expectTypeOf<ResolveSubjects<Classes, ClassSubject>>()
        .toEqualTypeOf<
        Classes | PublicArticle | ProtectedArticle | PrivateArticle | AbstractArticle
        >()
      expectTypeOf<ResolveInstance<Classes, typeof ProtectedArticle, ClassSubject>>()
        .toEqualTypeOf<ProtectedArticle>()
      expectTypeOf<ResolveInstance<Classes, typeof PrivateArticle, ClassSubject>>()
        .toEqualTypeOf<PrivateArticle>()
      expectTypeOf<ResolveInstance<Classes, typeof AbstractArticle, ClassSubject>>()
        .toEqualTypeOf<AbstractArticle>()
    })

    it.each([PublicArticle, ProtectedArticle, PrivateArticle, AbstractArticle])(
      'infers builder conditions for %p', SubjectClass => {
        const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
        builder.can('read', SubjectClass, { title: 'public' })
        // @ts-expect-error title is a string
        builder.can('read', SubjectClass, { title: 1 })
        // @ts-expect-error unknown instance property
        builder.cannot('read', SubjectClass, { missing: true })
      }
    )

    it('checks factory-created instances using class identity', () => {
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', PrivateArticle, { title: 'public' })
      const ability = builder.build()
      expect(ability.can('read', PrivateArticle.create('public'))).toBe(true)
      expect(ability.can('read', PrivateArticle.create('private'))).toBe(false)
      expect(ability.can('read', ProtectedArticle.create('public'))).toBe(false)
      expect(ability.detectSubjectType(PrivateArticle.create('public'))).toBe(PrivateArticle)
    })
  })

  describe('FactorySubject', () => {
    interface UserView { name: string }
    interface ArticleView { title: string }
    class User {
      protected constructor(readonly name: string, readonly internalId: number) {}

      static create(name: string): UserView {
        return new this(name, 1)
      }
    }
    class Article {
      private constructor(readonly title: string, readonly internalId: number) {}

      static create(title: string): ArticleView {
        return new Article(title, 1)
      }
    }
    type Classes = typeof User | typeof Article
    type AppAbility = MongoAbility<
      ['read' | 'update', typeof Article] | ['read', typeof User], MongoQuery, FactorySubject
    >

    it('uses public factory return types instead of class prototypes', () => {
      expectTypeOf<ResolveInstance<Classes, typeof User, FactorySubject>>()
        .toEqualTypeOf<UserView>()
      expectTypeOf<ResolveInstance<Classes, typeof Article, FactorySubject>>()
        .toEqualTypeOf<ArticleView>()
      expectTypeOf<ResolveSubjects<Classes, FactorySubject>>()
        .toEqualTypeOf<Classes | UserView | ArticleView>()
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', User, { name: 'Alice' })
      builder.can('update', Article, 'title', { title: 'public' })
      // @ts-expect-error conditions use the factory return type, not the prototype
      builder.can('read', User, { internalId: 1 })
      // @ts-expect-error fields explicitly constrained to the factory return type
      builder.can<UserView, keyof UserView>('read', User, 'internalId')
      // @ts-expect-error factory result fields remain strictly typed
      builder.can('read', Article, { title: 1 })
      // @ts-expect-error User only supports read
      builder.can('update', User)
    })

    it('checks objects produced by protected and private constructor factories', () => {
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', User, { name: 'Alice' })
      builder.can('read', Article, { title: 'public' })
      const ability = builder.build()
      expect(ability.can('read', User.create('Alice'))).toBe(true)
      expect(ability.can('read', User.create('Bob'))).toBe(false)
      expect(ability.can('read', Article.create('public'))).toBe(true)
      expect(ability.can('read', Article.create('private'))).toBe(false)
    })

    it('supports a custom factory name and products with a different constructor', () => {
      class UserFactory {
        private constructor(readonly internalId: number) {}

        static from(name: string) {
          return { name }
        }
      }
      type AppAbility = MongoAbility<['read', typeof UserFactory], MongoQuery, FactorySubject<'from'>>
      const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
      builder.can('read', UserFactory, { name: 'Alice' })
      const ability = builder.build({ detectSubjectType: () => UserFactory })
      expect(ability.can('read', UserFactory.from('Alice'))).toBe(true)
      expect(ability.can('read', UserFactory.from('Bob'))).toBe(false)
      expectTypeOf<ResolveInstance<typeof UserFactory, typeof UserFactory, FactorySubject>>()
        .toBeNever()
    })
  })

  it('allows application-defined HKTs', () => {
    type CustomResolution<S, Name> = {
      subject: Extract<S, { resource: string }> |
      (S extends { resource: infer N extends string } ? N : never)
      subjectType: S extends { resource: infer N extends string } ? N : never
      instance: Extract<S, { resource: Name }>
    }
    interface ResourceResolver extends SubjectResolverFactory {
      produce: CustomResolution<this[0], this[1]>
    }
    type Entity = { resource: 'Article', title: string }
    type AppAbility = MongoAbility<['read', Entity], MongoQuery, Container<ResourceResolver>>
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
    builder.can('read', 'Article', { title: 'public' })
    // @ts-expect-error title is a string
    builder.can('read', 'Article', { title: 1 })
    const ability = builder.build({ detectSubjectType: object => object.resource })
    expect(ability.can('read', { resource: 'Article', title: 'public' })).toBe(true)
  })

  it('infers default builder subjects and actions from tagged instance types alone', () => {
    type Subjects = { title: string } & ForcedSubject<'Article'>
    expectTypeOf<ResolveSubjects<Subjects, DefaultSubject>>().toEqualTypeOf<Subjects>()
    const builder = new AbilityBuilder<MongoAbility<['read', Subjects]>>(createMongoAbility)
    builder.can('read', 'Article', { title: 'public' })

    const ability = builder.build()
    expect(ability.can('read', subject('Article', { title: 'public' }))).toBe(true)
    expect(ability.can('read', subject('Article', { title: 'private' }))).toBe(false)

    // @ts-expect-error tagged subjects have strictly typed conditions
    builder.can('read', 'Article', { arbitrary: 1 })
    // @ts-expect-error title must be a string
    builder.can('read', 'Article', { title: 1 })
    // @ts-expect-error objects must still carry the required tag
    ability.can('read', { title: 'public' })
  })

  it('preserves default action restrictions for inferred subject names', () => {
    type TypenameArticle = { __typename: 'Article', title: string }
    type KindUser = { kind: 'User', name: string }
    type AppAbility = MongoAbility<['read' | 'update', TypenameArticle] | ['read', KindUser]>
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
    builder.can('update', 'Article', { title: 'public' })
    builder.can('read', 'User', { name: 'Alice' })
    // @ts-expect-error User only supports read
    builder.can('update', 'User')
    // @ts-expect-error User has no title
    builder.can('read', 'User', { title: 'public' })
  })

  it('keeps the default untagged builder fallback', () => {
    type Subjects = 'Article' | { title: string }
    const builder = new AbilityBuilder<MongoAbility<['read', Subjects]>>(createMongoAbility)
    builder.can('read', 'Article', { arbitrary: 1 })
  })
})
