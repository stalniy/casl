import { defineAbility } from '../src'
import { rulesToQuery } from '../src/extra'

function toQuery(ability, action, subject) {
  const convert = rule => rule.inverted ? { $not: rule.conditions } : rule.conditions
  return rulesToQuery(ability, action, subject, convert)
}

describe('rulesToQuery', () => {
  it('returns empty object if there are no rules with conditions', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query)).toHaveLength(0)
  })

  it('returns empty `$or` part if at least one regular rule does not have conditions', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { author: 123 })
      can('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query)).toHaveLength(0)
  })

  it('returns empty `$or` part if rule with conditions defined last', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query)).toHaveLength(0)
  })

  it('returns `null` if empty `Ability` instance is passed', () => {
    const ability = defineAbility(() => {})
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBe(null)
  })

  it('returns `null` if specified only inverted rules', () => {
    const ability = defineAbility((_, cannot) => {
      cannot('read', 'Post', { private: true })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBe(null)
  })

  it('returns `null` if inverted rule does not have conditions and there are no direct rules', () => {
    const ability = defineAbility((_, cannot) => {
      cannot('read', 'Post', { author: 123 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBe(null)
  })

  it('returns `null` if at least one inverted rule does not have conditions even if direct rule exists', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBe(null)
  })

  it('returns query if there is at least one regular rule after last inverted one without conditions', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [
        { author: 123 }
      ]
    })
  })

  it('OR-s conditions for regular rules', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      can('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [
        { status: 'published', createdBy: 'me' },
        { status: 'draft', createdBy: 'someoneelse' }
      ]
    })
  })

  it('AND-s conditions for inverted rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { status: 'draft', createdBy: 'someoneelse' })
      cannot('read', 'Post', { status: 'published', createdBy: 'me' })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $and: [
        { $not: { status: 'published', createdBy: 'me' } },
        { $not: { status: 'draft', createdBy: 'someoneelse' } }
      ]
    })
  })

  it('OR-s conditions for regular rules and AND-es for inverted ones', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { _id: 'mega' })
      can('read', 'Post', { state: 'draft' })
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { state: 'archived' })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
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

  it('returns empty query if inverted rule with conditions defined before regular rule without conditions', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', { private: true })
      can('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query)).toHaveLength(0)
  })

  it('should ignore inverted rules with fields and conditions', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', 'description', { private: true })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [{ author: 123 }]
    })
  })

  it('should ignore inverted rules with fields and without conditions', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', 'description')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [{ author: 123 }]
    })
  })
})
