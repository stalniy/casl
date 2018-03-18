import { AbilityBuilder } from '../src'
import { rulesToQuery } from '../src/query'
import './spec_helper'

function toQuery(rules) {
  return rulesToQuery(rules, rule => {
    return rule.inverted ? { $not: rule.conditions } : rule.conditions
  })
}

describe('rulesToQuery', () => {
  it('returns empty object if there are no rules with conditions', () => {
    const ability = AbilityBuilder.define(can => can('read', 'Post'))
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if empty list rules is passed', () => {
    const query = toQuery([])

    expect(query).to.be.null
  })

  it('returns empty `$or` part if at least one regular rule does not have conditions', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { author: 123 })
      can('read', 'Post')
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if at least one inverted rule does not have conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      cannot('read', 'Post', { author: 123 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(query).to.be.null
  })

  it('returns `null` if at least one inverted rule does not have conditions even if direct condition exists', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(query).to.be.null
  })

  it('OR-es conditions for regular rules', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      can('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(query).to.deep.equal({
      $or: [
        { status: 'published', createdBy: 'me' },
        { status: 'draft', createdBy: 'someoneelse' }
      ]
    })
  })

  it('AND-es conditions for inverted rules', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      cannot('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      cannot('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(query).to.deep.equal({
      $and: [
        { $not: { status: 'published', createdBy: 'me' } },
        { $not: { status: 'draft', createdBy: 'someoneelse' } }
      ]
    })
  })

  it('OR-es conditions for regular rules and AND-es for inverted ones', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { _id: 'mega' })
      can('read', 'Post', { state: 'draft' })
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { state: 'archived' })
    })
    const query = toQuery(ability.rulesFor('read', 'Post'))

    expect(query).to.deep.equal({
      $or: [
        { state: 'draft' },
        { _id: 'mega' }
      ],
      $and: [
        { $not: { state: 'archived' } },
        { $not: { private: true } }
      ]
    })
  })
})
