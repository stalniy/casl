import { Ability, defineAbility, ForbiddenError } from '@casl/ability'
import mongoose from 'mongoose'
import { AccessibleRecordModel, accessibleRecordsPlugin, toMongoQuery } from '../src'

describe('Accessible Records Plugin', () => {
  interface Post extends mongoose.Document {
    title: string;
    state: string;
  }
  const PostSchema = new mongoose.Schema<Post>({
    title: String,
    state: String
  })
  let ability: Ability
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  let Post: AccessibleRecordModel<Post>

  beforeAll(() => {
    PostSchema.plugin(accessibleRecordsPlugin)
  })

  beforeEach(() => {
    Post = mongoose.model<Post, AccessibleRecordModel<Post>>('Post', PostSchema)
  })

  afterEach(() => {
    (mongoose as any).models = {}
  })

  it('injects `accessibleBy` static method', () => {
    expect(typeof Post.accessibleBy).toBe('function')
  })

  it('injects `accessibleBy` query method', () => {
    expect(typeof Post.find().accessibleBy).toBe('function')
    expect(Post.find().accessibleBy).toBe(Post.accessibleBy)
  })

  describe('`accessibleBy` method', () => {
    beforeEach(() => {
      ability = defineAbility<Ability>((can) => {
        can('read', 'Post', { state: 'draft' })
        can('update', 'Post', { state: 'published' })
      })
      ability.rulesFor = jest.fn(ability.rulesFor)
    })

    it('creates query from ability and `read` action by default', () => {
      Post.accessibleBy(ability)
      expect(ability.rulesFor).toHaveBeenCalledWith('read', Post.modelName)
    })

    it('creates query from ability and specified action', () => {
      Post.accessibleBy(ability, 'delete')
      expect(ability.rulesFor).toHaveBeenCalledWith('delete', Post.modelName)
    })

    it('wraps `toMongoQuery` result with additional `$and` to prevent collisions when combined with `$or` query', () => {
      const query = Post.accessibleBy(ability).getQuery()

      expect(query).toEqual({
        $and: [toMongoQuery(ability, 'Post')]
      })
    })

    it('properly merges `toMongoQuery` result with existing in query `$and` conditions', () => {
      const existingConditions = [{ prop: true }, { anotherProp: false }]
      const query = Post.find({ $and: existingConditions })
      const conditions = query.accessibleBy(ability).getQuery()

      expect(conditions.$and).toEqual([
        ...existingConditions,
        toMongoQuery(ability, 'Post')
      ])
    })

    describe('when ability disallow to perform an action', () => {
      let query: mongoose.QueryWithHelpers<Post, Post>

      beforeEach(() => {
        query = Post.find().accessibleBy(ability, 'notAllowedAction')
      })

      it('throws `ForbiddenError` for collection request', async () => {
        await query.exec()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` when `find` is called', async () => {
        await query.find()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` when callback is passed to `exec`', async () => {
        await wrapInPromise(cb => query.exec(cb))
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for item request', async () => {
        await query.findOne().exec()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` when `findOne` is called', async () => {
        await query.findOne()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for item request when callback is passed to `exec`', async () => {
        await wrapInPromise(cb => query.findOne().exec(cb))
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for count request', async () => {
        await query.count()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for count request', async () => {
        await query.count()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for `countDocuments` request', async () => {
        await query.countDocuments()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })

      it('throws `ForbiddenError` for `countDocuments` request', async () => {
        await query.estimatedDocumentCount()
          .then(() => fail('should not execute'))
          .catch((error) => {
            expect(error).toBeInstanceOf(ForbiddenError)
            expect(error.message).toMatch(/cannot execute/i)
          })
      })
    })
  })

  type Callback = (err: mongoose.CallbackError, result: unknown) => void
  function wrapInPromise(callback: (fn: Callback) => void) {
    return new Promise((resolve, reject) => {
      callback((error, result) => error ? reject(error) : resolve(result))
    })
  }
})
