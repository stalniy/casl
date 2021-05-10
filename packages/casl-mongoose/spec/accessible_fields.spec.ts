import { defineAbility, Ability } from '@casl/ability'
import mongoose from 'mongoose'
import { AccessibleFieldsModel, accessibleFieldsPlugin, AccessibleFieldsDocument } from '../src'

describe('Accessible fields plugin', () => {
  interface Post extends AccessibleFieldsDocument {
    title: string;
    state: string;
  }
  let PostSchema: mongoose.Schema<Post>

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
    const Post = mongoose.model<Post, AccessibleFieldsModel<Post>>(
      'Post',
      PostSchema.plugin(accessibleFieldsPlugin)
    )
    const post = new Post()

    expect(typeof Post.accessibleFieldsBy).toBe('function')
    expect(post.accessibleFieldsBy).toBe(Post.accessibleFieldsBy)
  })

  describe('`accessibleFieldsBy` method', () => {
    let Post: AccessibleFieldsModel<Post>

    describe('by default', () => {
      beforeEach(() => {
        PostSchema.plugin(accessibleFieldsPlugin)
        Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema)
      })

      it('returns empty array for empty `Ability` instance', () => {
        const fields = Post.accessibleFieldsBy(new Ability())

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
    })

    describe('when plugin options are provided', () => {
      let ability: Ability

      beforeEach(() => {
        ability = defineAbility<Ability>(can => can('read', 'Post'))
      })

      it('returns fields provided in `only` option specified as string', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { only: 'title' })
        Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title'])
      })

      it('returns fields provided in `only` option specified as array', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { only: ['title', 'state'] })
        Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state'])
      })

      it('returns all fields except one specified in `except` option as string', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { except: '_id' })
        Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state', '__v'])
      })

      it('returns all fields except specified in `except` option as array', () => {
        PostSchema.plugin(accessibleFieldsPlugin, { except: ['_id', '__v'] })
        Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema)

        expect(Post.accessibleFieldsBy(ability)).toEqual(['title', 'state'])
      })
    })
  })
})
