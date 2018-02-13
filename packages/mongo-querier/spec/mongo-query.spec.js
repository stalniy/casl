import { AbilityBuilder } from '@casl/ability'
import { toMongoQuery } from '../src'

describe('Mongo Query builder', () => {
  const { can, cannot } = AbilityBuilder.extract()

  it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
    const query = toMongoQuery([
      can('read', 'Post', { _id: 'mega' }),
      can('read', 'Post', { state: 'draft' }),
      cannot('read', 'Post', { private: true }),
      cannot('read', 'Post', { state: 'archived' })
    ])

    expect(query).to.deep.equal({
      $or: [
        { _id: 'mega' },
        { state: 'draft' }
      ],
      $and: [
        { $nor: [{ private: true }] },
        { $nor: [{ state: 'archived' }] }
      ]
    })
  })

  describe('can find records where property', () => {
    it('is present', () => {
      const query = toMongoQuery([
        can('read', 'Post', { isPublished: { $exists: true, $ne: null } })
      ])

      expect(query).to.deep.equal({ $or: [{ isPublished: { $exists: true, $ne: null } }] })
    })

    it('is blank', () => {
      const query = toMongoQuery([
        can('read', 'Post', { isPublished: { $exists: false } }),
        can('read', 'Post', { isPublished: null })
      ])

      expect(query).to.deep.equal({ $or: [{ isPublished: { $exists: false } }, { isPublished: null }] })
    })

    it('is defined by `$in` criteria', () => {
      const query = toMongoQuery([
        can('read', 'Post', { state: { $in: ['draft', 'archived'] } })
      ])

      expect(query).to.deep.equal({ $or: [{ state: { $in: ['draft', 'archived'] } }] })
    })

    it('is defined by `$all` criteria', () => {
      const query = toMongoQuery([
        can('read', 'Post', { state: { $all: ['draft', 'archived'] } })
      ])

      expect(query).to.deep.equal({ $or: [{ state: { $all: ['draft', 'archived'] } }] })
    })
    it('is defined by `$lt` and `$lte` criteria', () => {
      const query = toMongoQuery([
        can('read', 'Post', { views: { $lt: 10 } }),
        can('update', 'Post', { views: { $lt: 5 } })
      ])

      expect(query).to.deep.equal({ $or: [{ views: { $lt: 10 } }, { views: { $lt: 5 } }] })
    })

    it('is defined by `$gt` and `$gte` criteria', () => {
      const query = toMongoQuery([
        can('read', 'Post', { views: { $gt: 10 } }),
        can('update', 'Post', { views: { $gte: 100 } })
      ])

      expect(query).to.deep.equal({ $or: [{ views: { $gt: 10 } }, { views: { $gte: 100 } }] })
    })

    it('is defined by `$ne` criteria', () => {
      const query = toMongoQuery([
        can('read', 'Post', { creator: { $ne: 'me' } })
      ])

      expect(query).to.deep.equal({ $or: [{ creator: { $ne: 'me' } }] })
    })

    it('is defined by dot notation fields', () => {
      const query = toMongoQuery([
        can('read', 'Post', { 'comments.author': 'Ted' })
      ])

      expect(query).to.deep.equal({ $or: [{ 'comments.author': 'Ted' }] })
    })
  })
})
