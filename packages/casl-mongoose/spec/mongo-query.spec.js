import { AbilityBuilder } from '@casl/ability'
import { toMongoQuery } from '../src'

describe('toMongoQuery', () => {
  it('accepts ability action as third argument', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('update', 'Post', { _id: 'mega' })
    })
    const query = toMongoQuery(ability, 'Post', 'update')

    expect(query).to.deep.equal({
      $or: [{ _id: 'mega' }]
    })
  })

  it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { _id: 'mega' })
      can('read', 'Post', { state: 'draft' })
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { state: 'archived' })
    })
    const query = toMongoQuery(ability, 'Post')

    expect(query).to.deep.equal({
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
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { isPublished: { $exists: true, $ne: null } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ isPublished: { $exists: true, $ne: null } }] })
    })

    it('is blank', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { isPublished: { $exists: false } })
        can('read', 'Post', { isPublished: null })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ isPublished: null }, { isPublished: { $exists: false } }] })
    })

    it('is defined by `$in` criteria', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { state: { $in: ['draft', 'archived'] } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ state: { $in: ['draft', 'archived'] } }] })
    })

    it('is defined by `$all` criteria', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { state: { $all: ['draft', 'archived'] } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ state: { $all: ['draft', 'archived'] } }] })
    })
    it('is defined by `$lt` and `$lte` criteria', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { views: { $lt: 10 } })
        can('read', 'Post', { views: { $lt: 5 } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ views: { $lt: 5 } }, { views: { $lt: 10 } }] })
    })

    it('is defined by `$gt` and `$gte` criteria', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { views: { $gt: 10 } })
        can('read', 'Post', { views: { $gte: 100 } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ views: { $gte: 100 } }, { views: { $gt: 10 } }] })
    })

    it('is defined by `$ne` criteria', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ creator: { $ne: 'me' } }] })
    })

    it('is defined by dot notation fields', () => {
      const ability = AbilityBuilder.define(can => {
        can('read', 'Post', { 'comments.author': 'Ted' })
      })
      const query = toMongoQuery(ability, 'Post')

      expect(query).to.deep.equal({ $or: [{ 'comments.author': 'Ted' }] })
    })
  })
})
