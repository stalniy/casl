import { MongoAbility, SubjectType, createMongoAbility, defineAbility } from '@casl/ability'
import mongoose from 'mongoose'
import { AccessibleFieldsModel, accessibleFieldsPlugin } from '../src'

describe('Accessible fields plugin', () => {
  interface Post {
    title: string;
    state: string;
  }

  type PostModel = AccessibleFieldsModel<Post>
  let PostSchema: mongoose.Schema<Post, PostModel>

  beforeEach(() => {
    PostSchema = new mongoose.Schema<Post>({
      title: String,
      state: String
    })
  })

  afterEach(() => {
    (mongoose as any).models = {}
  })

  it('adds static and instace `accessibleFieldsBy` method', () => {
    const Post = mongoose.model<Post, PostModel>(
      'Post',
      PostSchema.plugin(accessibleFieldsPlugin)
    )
    const post = new Post()

    expect(typeof Post.accessibleFieldsBy).toBe('function')
    expect(typeof post.accessibleFieldsBy).toBe('function')
  })

  describe('`accessibleFieldsBy` method', () => {
    let Post: PostModel

    describe('by default', () => {
      beforeEach(() => {
        PostSchema.plugin(accessibleFieldsPlugin)
        Post = mongoose.model<Post, PostModel>('Post', PostSchema)
      })

      it('returns empty array for empty `Ability` instance', () => {
        const fields = Post.accessibleFieldsBy(createMongoAbility())

        expect(fields).toBeInstanceOf(Array)
        expect(fields).toHaveLength(0)
      })

      it('returns all fields for model if ability does not have restrictions on rules', () => {
        const ability = defineAbility(can => can('read', 'Post'))

        expect(Post.accessibleFieldsBy(ability).sort())
          .toEqual(['_id', '__v', 'title', 'state'].sort())
      })

      it('returns fields for `read` action by default', () => {
        const ability = defineAbility(can => can('read', 'Post', ['title', 'state']))

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state'])
      })

      it('returns fields for an action specified as 2nd parameter', () => {
        const ability = defineAbility(can => can('update', 'Post', ['title', 'state']))

        expect(Post.accessibleFieldsBy(ability, 'update')).toEqual(['title', 'state'])
      })

      it('returns fields permitted for the instance when called on model instance', () => {
        const ability = defineAbility((can) => {
          can('update', 'Post', ['title', 'state'], { state: 'draft' })
          can('update', 'Post', ['title'], { state: 'public' })
        })
        const post = new Post({ state: 'public' })

        expect(post.accessibleFieldsBy(ability, 'update')).toEqual(['title'])
      })

      it('returns fields for Ability that uses classes as subject type', () => {
        const ability = defineAbility((can) => {
          can('update', Post, ['title', 'state'], { state: 'draft' })
          can('update', Post, ['title'], { state: 'public' })
        }, {
          detectSubjectType: o => o.constructor as SubjectType
        })
        const post = new Post({ state: 'public' })

        expect(post.accessibleFieldsBy(ability, 'update')).toEqual(['title'])
      })
    })

    describe('when plugin options are provided', () => {
      let ability: MongoAbility

      beforeEach(() => {
        ability = defineAbility<MongoAbility>(can => can('read', 'Post'))
      })

      it('returns fields provided in `only` option specified as string', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { only: 'title' })
        Post = mongoose.model<Post, PostModel>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title'])
      })

      it('returns fields provided in `only` option specified as array', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { only: ['title', 'state'] })
        Post = mongoose.model<Post, PostModel>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state'])
      })

      it('returns all fields except one specified in `except` option as string', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { except: '_id' })
        Post = mongoose.model<Post, PostModel>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state', '__v'])
      })

      it('returns all fields except specified in `except` option as array', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { except: ['_id', '__v'] })
        Post = mongoose.model<Post, PostModel>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state'])
      })
    })
  })
})
