import { AbilityBuilder, toMongoQuery } from '../src'

describe('Ability MongoDB query', () => {
  const { can, cannot } = AbilityBuilder.extract()

  it('is empty if there are no rules with conditions', () => {
    const query = toMongoQuery([can('read', 'Post')])

    expect(Object.keys(query)).to.be.empty
  })

  it('has empty `$or` part if at least one regular rule does not have conditions', () => {
    const query = toMongoQuery([
      can('read', 'Post', { author: 123 }),
      can('read', 'Post')
    ])

    expect(Object.keys(query)).to.be.empty
  })

  it('equals `null` if at least one inverted rule does not have conditions', () => {
    const query = toMongoQuery([
      cannot('read', 'Post', { author: 123 }),
      cannot('read', 'Post')
    ])

    expect(query).to.be.null
  })

  it('equals `null`  if at least one inverted rule does not have conditions', () => {
    const query = toMongoQuery([
      can('read', 'Post', { public: true }),
      cannot('read', 'Post', { author: 321 }),
      cannot('read', 'Post')
    ])

    expect(query).to.be.null
  })

  it('OR-es conditions for regular rules', () => {
    const query = toMongoQuery([
      can('read', 'Post', { status: 'draft', createdBy: 'someoneelse' }),
      can('read', 'Post', { status: 'published', createdBy: 'me' })
    ])

    expect(query).to.deep.equal({
      $or: [
        { status: 'draft', createdBy: 'someoneelse' },
        { status: 'published', createdBy: 'me' }
      ]
    })
  })

  it('AND-es conditions for inverted rules', () => {
    const query = toMongoQuery([
      cannot('read', 'Post', { status: 'draft', createdBy: 'someoneelse' }),
      cannot('read', 'Post', { status: 'published', createdBy: 'me' })
    ])

    expect(query).to.deep.equal({
      $and: [
        { $nor: [{ status: 'draft', createdBy: 'someoneelse' }] },
        { $nor: [{ status: 'published', createdBy: 'me' }] }
      ]
    })
  })

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
