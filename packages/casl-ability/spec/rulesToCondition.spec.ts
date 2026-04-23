import { AnyAbility, createMongoAbility, defineAbility, RuleOf } from '../src'
import { rulesToCondition } from '../src/extra'

function toQuery<T extends AnyAbility>(ability: T, action: string, subject: string) {
  const convert = (rule: RuleOf<T>) => rule.inverted ? { $not: rule.conditions } : rule.conditions
  return rulesToCondition(ability.rulesFor(action, subject), convert, {
    and: (conditions) => ({ $and: conditions }),
    or: (conditions) => ({ $or: conditions }),
    empty: () => ({}),
  })
}

describe(rulesToCondition.name, () => {
  it('returns empty object if there are no rules with conditions', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query!)).toHaveLength(0)
  })

  it('returns empty `$or` part if at least one regular rule does not have conditions', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { author: 123 })
      can('read', 'Post')
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query!)).toHaveLength(0)
  })

  it('returns empty `$or` part if rule with conditions defined last', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toBeInstanceOf(Object)
    expect(Object.keys(query!)).toHaveLength(0)
  })

  it('returns `null` if empty `Ability` instance is passed', () => {
    const ability = createMongoAbility()
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

  it('keeps higher priority regular rules when lower priority inverted rule is unconditional', () => {
    const ability = defineAbility((can, cannot) => {
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
        {
          $and: [
            { state: 'draft' },
            { $not: { state: 'archived' } },
            { $not: { private: true } }
          ]
        },
        {
          $and: [
            { _id: 'mega' },
            { $not: { state: 'archived' } },
            { $not: { private: true } }
          ]
        }
      ]
    })
  })

  it('builds query for a complex mix of priority ordered regular and inverted rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { ownerId: 1 })
      cannot('read', 'Post', { archived: true })
      can('read', 'Post', { shared: true })
      cannot('read', 'Post', { hidden: true })
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { groupped: true })
      cannot('read', 'Post', { flagged: true })
      can('read', 'Post', { status: 'pinned' })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [
        { status: 'pinned' },
        {
          $and: [
            { public: true },
            { $not: { flagged: true } },
            { $not: { groupped: true } },
          ]
        },
        {
          $and: [
            { shared: true },
            { $not: { flagged: true } },
            { $not: { groupped: true } },
            { $not: { hidden: true } }
          ]
        },
        {
          $and: [
            { ownerId: 1 },
            { $not: { flagged: true } },
            { $not: { groupped: true } },
            { $not: { hidden: true } },
            { $not: { archived: true } }
          ]
        }
      ]
    })
  })

  it('ignores inverted rules that are overridden by higher priority regular rules', () => {
    const ability = defineAbility((can, cannot) => {
      cannot('manage', 'Post', { id: 1 })
      can('manage', 'Post', { id: 1 })
    })
    const query = toQuery(ability, 'manage', 'Post')

    expect(query).toEqual({
      $or: [{ id: 1 }]
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
    expect(Object.keys(query!)).toHaveLength(0)
  })

  it('adds a fallback branch bounded by higher priority inverted rules for lower priority unconditional regular rule', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { private: true })
      can('read', 'Post', { author: 123 })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [
        { author: 123 },
        {
          $and: [
            { $not: { private: true } }
          ]
        }
      ]
    })
  })

  it('ignores inverted rules with fields and conditions', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', 'description', { private: true })
    })
    const query = toQuery(ability, 'read', 'Post')

    expect(query).toEqual({
      $or: [{ author: 123 }]
    })
  })

  it('ignores inverted rules with fields and without conditions', () => {
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
