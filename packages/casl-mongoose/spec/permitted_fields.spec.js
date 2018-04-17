import { AbilityBuilder, Ability } from '@casl/ability'
import mongoose from 'mongoose'
import { permittedFieldsPlugin } from '../src'

describe('Permitted fields plugin', () => {
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

  it('adds static and instace `permittedFieldsBy` method', () => {
    const Post = PostSchema.plugin(permittedFieldsPlugin).toModel('Post')
    const post = new Post()

    expect(Post.permittedFieldsBy).to.be.a('function')
    expect(post.permittedFieldsBy).to.equal(Post.permittedFieldsBy)
  })

  describe('`permittedFieldsBy` method', () => {
    let Post

    describe('by default', () => {
      beforeEach(() => {
        Post = PostSchema.plugin(permittedFieldsPlugin).toModel('Post')
      })

      it('returns empty array for empty `Ability` instance', () => {
        const fields = Post.permittedFieldsBy(new Ability())

        expect(fields).to.be.an('array').that.is.empty
      })

      it('returns all fields for model if ability does not have restrictions on rules', () => {
        const ability = AbilityBuilder.define(can => can('read', 'Post'))

        expect(Post.permittedFieldsBy(ability)).to.have.all.members(['_id', '__v', 'title', 'state'])
      })

      it('returns fields for `read` action by default', () => {
        const ability = AbilityBuilder.define(can => can('read', 'Post', ['title', 'state']))

        expect(Post.permittedFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })

      it('returns fields for an action specified as 2nd parameter', () => {
        const ability = AbilityBuilder.define(can => can('update', 'Post', ['title', 'state']))

        expect(Post.permittedFieldsBy(ability, 'update')).to.deep.equal(['title', 'state'])
      })

      it('returns fields permitted for the instance when called on model instance', () => {
        const ability = AbilityBuilder.define(can => {
          can('update', 'Post', ['title', 'state'], { state: 'draft' })
          can('update', 'Post', ['title'], { state: 'public' })
        })
        const post = new Post({ state: 'public' })

        expect(post.permittedFieldsBy(ability, 'update')).to.deep.equal(['title'])
      })
    })

    describe('when plugin options are provided', () => {
      let ability

      beforeEach(() => {
        ability = AbilityBuilder.define(can => can('read', 'Post'))
      })

      it('returns fields provided in `only` option specified as string', () => {
        Post = PostSchema.plugin(permittedFieldsPlugin, { only: 'title' }).toModel('Post')

        expect(Post.permittedFieldsBy(ability)).to.deep.equal(['title'])
      })

      it('returns fields provided in `only` option specified as array', () => {
        Post = PostSchema.plugin(permittedFieldsPlugin, { only: ['title', 'state'] }).toModel('Post')

        expect(Post.permittedFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })

      it('returns all fields except one specified in `except` option as string', () => {
        Post = PostSchema.plugin(permittedFieldsPlugin, { except: '_id' }).toModel('Post')

        expect(Post.permittedFieldsBy(ability)).to.deep.equal(['title', 'state', '__v'])
      })

      it('returns all fields except specified in `except` option as array', () => {
        Post = PostSchema.plugin(permittedFieldsPlugin, { except: ['_id', '__v'] }).toModel('Post')

        expect(Post.permittedFieldsBy(ability)).to.deep.equal(['title', 'state'])
      })
    })
  })
})
