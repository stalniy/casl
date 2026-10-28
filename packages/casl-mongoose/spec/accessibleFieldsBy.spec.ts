import { ClassSubject, MongoAbility, MongoQuery, TaggedSubject, createMongoAbility, defineAbility } from "@casl/ability"
import { accessibleFieldsBy } from "../src"
import mongoose from "mongoose"

describe('accessibleFieldsBy', () => {
  type AppAbility = MongoAbility<[string, Post | mongoose.Model<Post> | 'Post']>
  interface Post {
    _id: string;
    title: string;
    state: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const Post = mongoose.model('Post', new mongoose.Schema<Post>({
    title: String,
    state: String,
  }))

  it('resolves custom subject names and instances for field queries', () => {
    type TaggedPost = { resource: 'Post', title: string }
    type CustomAbility = MongoAbility<['read', TaggedPost], MongoQuery, TaggedSubject<'resource'>>
    const ability = defineAbility<CustomAbility>(can => {
      can('read', 'Post', 'title', { title: 'public' })
    }, { detectSubjectType: object => object.resource })
    const fields = accessibleFieldsBy(ability)

    expect(fields.ofType('Post')).toEqual(['title'])
    expect(fields.of({ resource: 'Post', title: 'public' })).toEqual(['title'])
    expect(fields.of({ resource: 'Post', title: 'private' })).toEqual([])
    // @ts-expect-error instances must carry the configured discriminator
    fields.of({ title: 'public' })
    // @ts-expect-error subject names must use ofType
    fields.of('Post')
  })

  it('derives model instances when using ClassSubject', () => {
    type CustomAbility = MongoAbility<['read', typeof Post], MongoQuery, ClassSubject>
    const ability = defineAbility<CustomAbility>(can => {
      can('read', Post, 'title', { state: 'public' })
    })
    const fields = accessibleFieldsBy(ability)

    expect(fields.ofType(Post)).toEqual(['title'])
    expect(fields.of(new Post({ state: 'public' }))).toEqual(['title'])
    expect(fields.of(new Post({ state: 'draft' }))).toEqual([])
  })

  describe('when subject type is a mongoose model', () => {
    testWithSubjectType(Post, Post)
  })

  describe('when subject type is a mongoose model name', () => {
    testWithSubjectType('Post', Post)
  })

  function testWithSubjectType(type: mongoose.Model<Post> | 'Post', Model: mongoose.Model<Post>) {
    it('returns empty array for empty `Ability` instance', () => {
      const fields = accessibleFieldsBy(createMongoAbility<AppAbility>()).ofType(type)

      expect(fields).toBeInstanceOf(Array)
      expect(fields).toHaveLength(0)
    })

    it('returns all fields for model if ability does not have restrictions on rules', () => {
      const ability = defineAbility<AppAbility>(can => can('read', type))

      expect(accessibleFieldsBy(ability).ofType(type).sort())
        .toEqual(['_id', '__v', 'title', 'state'].sort())
    })

    it('returns fields for `read` action by default', () => {
      const ability = defineAbility<AppAbility>(can => can('read', type, ['title', 'state']))

      expect(accessibleFieldsBy(ability).ofType(type)).toEqual(['title', 'state'])
    })

    it('returns fields for an action specified as 2nd parameter', () => {
      const ability = defineAbility<AppAbility>(can => can('update', type, ['title', 'state']))

      expect(accessibleFieldsBy(ability, 'update').ofType(type)).toEqual(['title', 'state'])
    })

    it('returns fields permitted for the instance when called on model instance', () => {
      const ability = defineAbility<AppAbility>((can) => {
        can('update', type, ['title', 'state'], { state: 'draft' })
        can('update', type, ['title'], { state: 'public' })
      })
      const post = new Model({ state: 'public' })

      expect(accessibleFieldsBy(ability, 'update').of(post)).toEqual(['title'])
    })
  }
})
