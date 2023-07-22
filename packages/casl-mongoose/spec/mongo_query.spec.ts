import { defineAbility } from '@casl/ability'
import { toMongoQuery } from '../src'

describe('toMongoQuery', () => {
  testConversionToMongoQuery(toMongoQuery)

  it('returns `null` if there are no rules for specific subject/action', () => {
    const ability = defineAbility((can) => {
      can('update', 'Post')
    })

    const query = toMongoQuery(ability, 'Post', 'read')

    expect(query).toBe(null)
  })

  it('returns null if there is a rule that forbids previous one', () => {
    const ability = defineAbility((can, cannot) => {
      can('update', 'Post', { authorId: 1 })
      cannot('update', 'Post')
    })

    const query = toMongoQuery(ability, 'Post', 'update')

    expect(query).toBe(null)
  })
})

export function testConversionToMongoQuery(abilityToMongoQuery: typeof toMongoQuery) {
  it('accepts ability action as third argument', () => {
    const ability = defineAbility((can) => {
      can('update', 'Post', { _id: 'mega' })
    })
    const query = abilityToMongoQuery(ability, 'Post', 'update')

    expect(query).toEqual({
      $or: [{ _id: 'mega' }]
    })
  })

  it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { _id: 'mega' })
      can('read', 'Post', { state: 'draft' })
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { state: 'archived' })
    })
    const query = abilityToMongoQuery(ability, 'Post')

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
      const ability = defineAbility((can) => {
        can('read', 'Post', { isPublished: { $exists: true, $ne: null } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ isPublished: { $exists: true, $ne: null } }] })
    })

    it('is blank', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { isPublished: { $exists: false } })
        can('read', 'Post', { isPublished: null })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({
        $or: [
          { isPublished: null },
          { isPublished: { $exists: false } }
        ]
      })
    })

    it('is defined by `$in` criteria', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { state: { $in: ['draft', 'archived'] } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ state: { $in: ['draft', 'archived'] } }] })
    })

    it('is defined by `$all` criteria', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { state: { $all: ['draft', 'archived'] } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ state: { $all: ['draft', 'archived'] } }] })
    })
    it('is defined by `$lt` and `$lte` criteria', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { views: { $lt: 10 } })
        can('read', 'Post', { views: { $lt: 5 } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ views: { $lt: 5 } }, { views: { $lt: 10 } }] })
    })

    it('is defined by `$gt` and `$gte` criteria', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { views: { $gt: 10 } })
        can('read', 'Post', { views: { $gte: 100 } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ views: { $gte: 100 } }, { views: { $gt: 10 } }] })
    })

    it('is defined by `$ne` criteria', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ creator: { $ne: 'me' } }] })
    })

    it('is defined by dot notation fields', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { 'comments.author': 'Ted' })
      })
      const query = abilityToMongoQuery(ability, 'Post')

      expect(query).toEqual({ $or: [{ 'comments.author': 'Ted' }] })
    })
  })
}
