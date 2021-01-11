import { defineAbility, ForbiddenError } from '@casl/ability'
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
      ability = defineAbility((can) => {
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

    it('does not change query return type', () => {
      const originalType = Post.findById(1).op
      const type = Post.findById(1).accessibleBy(ability).op

      expect(type).to.equal(originalType)
    })

    it('wraps `toMongoQuery` result with additional `$and` to prevent collisions when combined with `$or` query', () => {
      const query = toMongoQuery(ability, 'Post')
      spy.on(Post, 'where')
      Post.accessibleBy(ability)

      expect(Post.where).to.be.called.with.exactly({ $and: [query] })
    })

    it('properly merges `toMongoQuery` result with existing in query `$and` conditions', () => {
      const existingConditions = [{ prop: true }, { anotherProp: false }]
      const query = Post.find({ $and: existingConditions })
      const conditions = query.accessibleBy(ability).getQuery()

      expect(conditions.$and).to.eql([
        ...existingConditions,
        toMongoQuery(ability, 'Post')
      ])
    })

    describe('when ability disallow to perform an action', () => {
      let query

      beforeEach(() => {
        query = Post.find().accessibleBy(ability, 'notAllowedAction')
      })

      describe('when exist private `_pre` method', () => {
        it('throws `ForbiddenError` for collection request', async () => {
          await query.exec()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` when `find` operation is passed to `exec`', async () => {
          await query.exec('find')
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` when callback is passed to `exec`', async () => {
          await wrapInPromise(cb => query.exec(cb))
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for item request', async () => {
          await query.findOne().exec()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` when `findOne` operation is passed to `exec`', async () => {
          await query.exec('findOne')
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for item request when callback is passed to `exec`', async () => {
          await wrapInPromise(cb => query.findOne().exec(cb))
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for count request', async () => {
          await query.count()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for count request', async () => {
          await query.count()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for `countDocuments` request', async () => {
          await query.countDocuments()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })

        it('throws `ForbiddenError` for `countDocuments` request', async () => {
          await query.estimatedDocumentCount()
            .then(() => fail('should not execute'))
            .catch((error) => {
              expect(error).to.be.instanceOf(ForbiddenError)
              expect(error.message).to.match(/cannot execute/i)
            })
        })
      })
    })
  })

  function wrapInPromise(callback) {
    return new Promise((resolve, reject) => {
      callback((error, result) => error ? reject(error) : resolve(result))
    })
  }
})
