import { AbilityBuilder } from '../src'
import { rulesToQuery } from '../src/extra'

function toQuery(ability, action, subject) {
  return rulesToQuery(ability, action, subject, rule => {
    return rule.inverted ? { $not: rule.conditions } : rule.conditions
  })
}

describe('rulesToQuery', () => {
  it('returns empty object if there are no rules with conditions', () => {
    const ability = AbilityBuilder.define(can => can('read', 'Post'))
    const query = toQuery(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if empty `Ability` instance is passed', () => {
    const ability = AbilityBuilder.define(() => {})
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns empty `$or` part if at least one regular rule does not have conditions', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { author: 123 })
      can('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns empty `$or` part if rule with conditions defined last', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if specified only inverted rules', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      cannot('read', 'Post', { private: true })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns `null` if at least one inverted rule does not have conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      cannot('read', 'Post', { author: 123 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns `null` if at least one inverted rule does not have conditions even if direct condition exists', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns non-`null` if there is at least one regular rule after last inverted one without conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.deep.equal({
      $or: [
        { author: 123 }
      ]
    })
  })

  it('OR-es conditions for regular rules', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      can('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).to.deep.equal({
      $or: [
        { status: 'published', createdBy: 'me' },
        { status: 'draft', createdBy: 'someoneelse' }
      ]
    })
  })

  it('AND-es conditions for inverted rules', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      cannot('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability, 'read', 'Post')

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
    const query = toQuery(ability, 'read', 'Post')

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

  it('returns empty `$and` part if inverted rule with conditions defined before regular rule without conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', { private: true })
      can('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })
})
