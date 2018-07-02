import { AbilityBuilder, Ability } from '@casl/ability'
import mongoose from 'mongoose'
import { accessibleFieldsPlugin } from '../src'

describe('Accessible fields plugin', () => {
  let PostSchema

  beforeEach(() => {
    PostSchema = mongoose.Schema({
      title: String,
      state: String
    })
    PostSchema.toModel = name => mongoose.model(name, PostSchema)
  })

  afterEach(() => {
    mongoose.models = {}
  })

  it('adds static and instace `accessibleFieldsBy` method', () => {
    const Post = PostSchema.plugin(accessibleFieldsPlugin).toModel('Post')
    const post = new Post()

    expect(Post.accessibleFieldsBy).to.be.a('function')
    expect(post.accessibleFieldsBy).to.equal(Post.accessibleFieldsBy)
  })

  describe('`accessibleFieldsBy` method', () => {
    let Post

    describe('by default', () => {
      beforeEach(() => {
        Post = PostSchema.plugin(accessibleFieldsPlugin).toModel('Post')
      })

      it('returns empty array for empty `Ability` instance', () => {
        const fields = Post.accessibleFieldsBy(new Ability())

        expect(fields).to.be.an('array').that.is.empty
      })

      it('returns all fields for model if ability does not have restrictions on rules', () => {
        const ability = AbilityBuilder.define(can => can('read', 'Post'))

        expect(Post.accessibleFieldsBy(ability)).to.have.all.members(['_id', '__v', 'title', 'state'])
      })

      it('returns fields for `read` action by default', () => {
        const ability = AbilityBuilder.define(can => can('read', 'Post', ['title', 'state']))

        expect(Post.accessibleFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })

      it('returns fields for an action specified as 2nd parameter', () => {
        const ability = AbilityBuilder.define(can => can('update', 'Post', ['title', 'state']))

        expect(Post.accessibleFieldsBy(ability, 'update')).to.deep.equal(['title', 'state'])
      })

      it('returns fields permitted for the instance when called on model instance', () => {
        const ability = AbilityBuilder.define(can => {
          can('update', 'Post', ['title', 'state'], { state: 'draft' })
          can('update', 'Post', ['title'], { state: 'public' })
        })
        const post = new Post({ state: 'public' })

        expect(post.accessibleFieldsBy(ability, 'update')).to.deep.equal(['title'])
      })
    })

    describe('when plugin options are provided', () => {
      let ability

      beforeEach(() => {
        ability = AbilityBuilder.define(can => can('read', 'Post'))
      })

      it('returns fields provided in `only` option specified as string', () => {
        Post = PostSchema.plugin(accessibleFieldsPlugin, { only: 'title' }).toModel('Post')

        expect(Post.accessibleFieldsBy(ability)).to.deep.equal(['title'])
      })

      it('returns fields provided in `only` option specified as array', () => {
        Post = PostSchema.plugin(accessibleFieldsPlugin, { only: ['title', 'state'] }).toModel('Post')

        expect(Post.accessibleFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })

      it('returns all fields except one specified in `except` option as string', () => {
        Post = PostSchema.plugin(accessibleFieldsPlugin, { except: '_id' }).toModel('Post')

        expect(Post.accessibleFieldsBy(ability)).to.deep.equal(['title', 'state', '__v'])
      })

      it('returns all fields except specified in `except` option as array', () => {
        Post = PostSchema.plugin(accessibleFieldsPlugin, { except: ['_id', '__v'] }).toModel('Post')

        expect(Post.accessibleFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })
    })
  })
})
