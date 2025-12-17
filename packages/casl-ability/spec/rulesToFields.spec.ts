import { rulesToFields } from '../src/extra'
import { createMongoAbility, defineAbility } from '../src'

describe(rulesToFields.name, () => {
  it('returns an empty object for an empty `Ability` instance', () => {
    const object = rulesToFields(createMongoAbility(), 'read', 'Post')

    expect(Object.keys(object)).toHaveLength(0)
  })

  it('returns an empty object if `Ability` contains only inverted rules', () => {
    const ability = defineAbility((_, cannot) => {
      cannot('read', 'Post', { id: 5 })
      cannot('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(object)).toHaveLength(0)
  })

  it('returns an empty object for `Ability` instance with rules without conditions', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const object = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(object)).toHaveLength(0)
  })

  it('extracts field values from direct rule conditions', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { id: 5 })
      can('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).toEqual({ id: 5, private: true })
  })

  it('correctly sets values for fields declared with `dot notation`', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { id: 5 })
      can('read', 'Post', { 'state.private': true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).toEqual({
      id: 5,
      state: {
        private: true
      }
    })
  })

  it('skips plain object values (i.e., mongo query expressions)', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { state: { $in: ['draft', 'review'] } })
      can('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).toEqual({ private: true })
  })

  it('skips forbidden properties', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { '__proto__.__pollutedValue__': 1 })
      can('read', 'Post', { constructor: 1 })
      can('read', 'Post', { prototype: 2 })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(({} as any).__pollutedValue__).toBeUndefined()
    expect(Object.keys(object)).toEqual(['__pollutedValue__'])
  })
})
