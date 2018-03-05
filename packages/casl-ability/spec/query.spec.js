import { AbilityBuilder } from '../src'
import { rulesToQuery } from '../src/query'
import './spec_helper'

function toQuery(rules) {
  return rulesToQuery(rules, rule => {
    return rule.inverted ? { $not: rule.conditions } : rule.conditions
  })
}

describe('rulesToQuery', () => {
  const { can, cannot } = AbilityBuilder.extract()

  it('is empty if there are no rules with conditions', () => {
    const query = toQuery([can('read', 'Post')])

    expect(Object.keys(query)).to.be.empty
  })

  it('has empty `$or` part if at least one regular rule does not have conditions', () => {
    const query = toQuery([
      can('read', 'Post', { author: 123 }),
      can('read', 'Post')
    ])

    expect(Object.keys(query)).to.be.empty
  })

  it('equals `null` if at least one inverted rule does not have conditions', () => {
    const query = toQuery([
      cannot('read', 'Post', { author: 123 }),
      cannot('read', 'Post')
    ])

    expect(query).to.be.null
  })

  it('equals `null` if at least one inverted rule does not have conditions even if direct condition exists', () => {
    const query = toQuery([
      can('read', 'Post', { public: true }),
      cannot('read', 'Post', { author: 321 }),
      cannot('read', 'Post')
    ])

    expect(query).to.be.null
  })

  it('OR-es conditions for regular rules', () => {
    const query = toQuery([
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
    const query = toQuery([
      cannot('read', 'Post', { status: 'draft', createdBy: 'someoneelse' }),
      cannot('read', 'Post', { status: 'published', createdBy: 'me' })
    ])

    expect(query).to.deep.equal({
      $and: [
        { $not: { status: 'draft', createdBy: 'someoneelse' } },
        { $not: { status: 'published', createdBy: 'me' } }
      ]
    })
  })

  it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
    const query = toQuery([
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
        { $not: { private: true } },
        { $not: { state: 'archived' } }
      ]
    })
  })
})
