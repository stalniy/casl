import { MongoAbility, defineAbility } from "@casl/ability"
import { accessibleBy } from "../src"

describe('accessibleBy', () => {
  type AppAbility = MongoAbility<[string, Post['kind'] | Post]>
  interface Post {
    kind: 'Post';
    _id: string;
    state: string;
    private: boolean;
    isPublished: boolean | null;
    authorId: number;
    views: number;
    'comments.author': string;
  }

  it('returns `{ $expr: false }` when there are no rules for specific subject/action', () => {
    const ability = defineAbility<AppAbility>((can) => {
      can('read', 'Post')
    })

    const query = accessibleBy(ability, 'update').ofType('Post')

    expect(query).toEqual({ $expr: { $eq: [0, 1] } })
  })

  it('returns `{ $expr: false }` if there is a rule that forbids previous one', () => {
    const ability = defineAbility<AppAbility>((can, cannot) => {
      can('update', 'Post', { authorId: 1 })
      cannot('update', 'Post')
    })

    const query = accessibleBy(ability, 'update').ofType('Post')

    expect(query).toEqual({ $expr: { $eq: [0, 1] } })
  })

  describe('it behaves like `toMongoQuery` when converting rules', () => {
    it('accepts ability action as third argument', () => {
      const ability = defineAbility<AppAbility>((can) => {
        can('update', 'Post', { _id: 'mega' })
      })
      const query = accessibleBy(ability, 'update').ofType('Post')

      expect(query).toEqual({
        $or: [{ _id: 'mega' }]
      })
    })

    it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
      const ability = defineAbility<AppAbility>((can, cannot) => {
        can('read', 'Post', { _id: 'mega' })
        can('read', 'Post', { state: 'draft' })
        cannot('read', 'Post', { private: true })
        cannot('read', 'Post', { state: 'archived' })
      })
      const query = accessibleBy(ability).ofType('Post')

      expect(query).toEqual({
        $or: [
          { state: 'draft' },
          { _id: 'mega' }
        ],
        $and: [
          { $nor: [{ state: 'archived' }] },
          { $nor: [{ private: true }] }
        ]
      })
    })

    describe('can find records where property', () => {
      it('is present', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', {
            isPublished: { $exists: true, $ne: null }
          })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ isPublished: { $exists: true, $ne: null } }] })
      })

      it('is blank', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { isPublished: { $exists: false } })
          can('read', 'Post', { isPublished: null })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({
          $or: [
            { isPublished: null },
            { isPublished: { $exists: false } }
          ]
        })
      })

      it('is defined by `$in` criteria', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { state: { $in: ['draft', 'archived'] } })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ state: { $in: ['draft', 'archived'] } }] })
      })

      it('is defined by `$all` criteria', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { state: { $all: ['draft', 'archived'] } })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ state: { $all: ['draft', 'archived'] } }] })
      })
      it('is defined by `$lt` and `$lte` criteria', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { views: { $lt: 10 } })
          can('read', 'Post', { views: { $lt: 5 } })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ views: { $lt: 5 } }, { views: { $lt: 10 } }] })
      })

      it('is defined by `$gt` and `$gte` criteria', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { views: { $gt: 10 } })
          can('read', 'Post', { views: { $gte: 100 } })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ views: { $gte: 100 } }, { views: { $gt: 10 } }] })
      })

      it('is defined by `$ne` criteria', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { authorId: { $ne: 5 } })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ authorId: { $ne: 5 } }] })
      })

      it('is defined by dot notation fields', () => {
        const ability = defineAbility<AppAbility>((can) => {
          can('read', 'Post', { 'comments.author': 'Ted' })
        })
        const query = accessibleBy(ability).ofType('Post')

        expect(query).toEqual({ $or: [{ 'comments.author': 'Ted' }] })
      })
    })
  })
})
