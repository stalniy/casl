import { Ability, defineAbility, SubjectType } from '@casl/ability'
import mongoose from 'mongoose'
import { accessibleBy, AccessibleRecordModel, accessibleRecordsPlugin } from '../src'

describe('Accessible Records Plugin', () => {
  interface Post {
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
        $and: [accessibleBy(ability).ofType('Post')]
      })
    })

    it('properly merges `toMongoQuery` result with existing in query `$and` conditions', () => {
      const existingConditions = [{ prop: true }, { anotherProp: false }]
      const query = Post.find({ $and: existingConditions.slice(0) })
      const conditions = query.accessibleBy(ability).getQuery()

      expect(conditions.$and).toEqual([
        ...existingConditions,
        accessibleBy(ability).ofType('Post')
      ])
    })

    it('allows to chain `accessibleBy` method', () => {
      Post.find().accessibleBy(ability).accessibleBy(ability, 'update')
      Post.accessibleBy(ability).where({ title: /test/ }).accessibleBy(ability, 'delete')
    })

    it('has proper typing for `accessibleBy` methods', () => {
      let expectedQueryType: mongoose.Query<mongoose.HydratedDocument<Post>[], any>
      expectedQueryType = Post.find()
      expectedQueryType = Post.find().accessibleBy(ability)
      expectedQueryType = Post.find().accessibleBy(ability).accessibleBy(ability, 'update')
      expectedQueryType = Post.accessibleBy(ability).where({ title: /test/ }).accessibleBy(ability, 'delete')
      expectedQueryType = Post.accessibleBy(ability).find()
      expectedQueryType = Post.accessibleBy(ability).accessibleBy(ability, 'update').find()
      expect(expectedQueryType).not.toBeUndefined()
    })

    it('returns query for Ability that uses classes as subject type', () => {
      ability = defineAbility<Ability>((can) => {
        can('read', Post, { state: 'draft' })
        can('update', Post, { state: 'published' })
      }, {
        detectSubjectType: o => o.constructor as SubjectType
      })
      const query = Post.accessibleBy(ability).getQuery()

      expect(query).toEqual({
        $and: [
          {
            $or: [{ state: 'draft' }]
          }
        ]
      })
    })

    it('returns always empty result query if ability disallow to perform action', () => {
      const q = Post.find().accessibleBy(ability, 'notAllowedAction')
      expect(q.getQuery()).toEqual({
        $and: [
          { $expr: { $eq: [0, 1] } }
        ]
      })
    })
  })
})
