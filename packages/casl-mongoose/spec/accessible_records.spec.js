import { AbilityBuilder, Ability } from '@casl/ability'
import mongoose from 'mongoose'
import { accessibleRecordsPlugin, toMongoQuery } from '../src'

describe('Accessible Records Plugin', () => {
  const PostSchema = mongoose.Schema({
    title: String,
    state: String
  })
  let ability
  let Post

  beforeAll(() => {
    PostSchema.plugin(accessibleRecordsPlugin)
  })

  beforeEach(() => {
    Post = mongoose.model('Post', PostSchema)
  })

  afterEach(() => {
    mongoose.models = {}
  })

  it('injects `accessibleBy` static method', () => {
    expect(Post.accessibleBy).to.be.a('function')
  })

  it('injects `accessibleBy` query method', () => {
    expect(Post.find().accessibleBy).to.be.a('function')
    expect(Post.find().accessibleBy).to.equal(Post.accessibleBy)
  })

  describe('`accessibleBy` method', () => {
    beforeEach(() => {
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { state: 'draft' })
        can('update', 'Post', { state: 'published' })
      })

      spy.on(ability, 'rulesFor')
    })

    it('creates query from ability and `read` action by default', () => {
      Post.accessibleBy(ability)
      expect(ability.rulesFor).to.have.been.called.with.exactly('read', Post.modelName)
    })

    it('creates query from ability and specified action', () => {
      Post.accessibleBy(ability, 'delete')
      expect(ability.rulesFor).to.have.been.called.with.exactly('delete', Post.modelName)
    })

    it('calls `where` method of the query', () => {
      spy.on(Post, 'where')
      Post.accessibleBy(ability)

      expect(Post.where).to.be.called()
    })

    it('passes query created by `toMongoQuery` in `where` method of the query', () => {
      const query = toMongoQuery(ability, 'Post')
      spy.on(Post, 'where')
      Post.accessibleBy(ability)

      expect(Post.where).to.be.called.with.exactly(query)
    })

    it('does not change query return type', () => {
      const originalType = Post.findById(1).op
      const type = Post.findById(1).accessibleBy(ability).op

      expect(type).to.equal(originalType)
    })

    describe('when ability disallow to perform an action', () => {
      let query

      beforeEach(() => {
        Post.Query.prototype.exec = spy(() => Promise.resolve('original `exec` method call'))
        query = Post.find().accessibleBy(ability, 'notAllowedAction')
      })

      it('adds non-existing property check to conditions for other callback based cases', async () => {
        expect(query.getQuery()).to.have.property('__forbiddenByCasl__').that.equal(1)
      })

      it('returns empty array for collection request', async () => {
        const items = await query.exec()

        expect(items).to.be.an('array').that.is.empty
      })

      it('returns empty array when `find` operation is passed to `exec`', async () => {
        const items = await query.exec('find')

        expect(items).to.be.an('array').that.is.empty
      })

      it('returns empty array for collection request when callback is passed to `exec`', async () => {
        const items = await wrapInPromise(cb => query.exec(cb))

        expect(items).to.be.an('array').that.is.empty
      })

      it('returns `null` for item request', async () => {
        const item = await query.findOne().exec()

        expect(item).to.be.null
      })

      it('returns `null` when `findOne` operation is passed to `exec`', async () => {
        const item = await query.exec('findOne')

        expect(item).to.be.null
      })

      it('returns `null` for item request when callback is passed to `exec`', async () => {
        const item = await wrapInPromise(cb => query.findOne().exec(cb))

        expect(item).to.be.null
      })

      it('returns `0` for count request', async () => {
        const count = await query.count()

        expect(count).to.equal(0)
      })

      it('calls original `exec` for other cases', async () => {
        await query.update({ $set: { state: 'draft' } }).exec()

        expect(Post.Query.prototype.exec).to.have.been.called()
      })
    })
  })

  function wrapInPromise(callback) {
    return new Promise((resolve, reject) => {
      callback((error, result) => error ? reject(error) : resolve(result))
    })
  }
})
