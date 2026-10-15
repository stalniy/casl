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

  it.each([
    ['toString', 'toString'],
    ['hasOwnProperty', 'hasOwnProperty'],
    ['valueOf', 'valueOf'],
    ['state.toString', 'toString'],
    ['state.hasOwnProperty', 'hasOwnProperty']
  ])(
    'creates an own object for inherited `%s` instead of modifying the builtin',
    (path, property) => {
      const builtin = (Object.prototype as any)[property]
      const originalCall = Object.getOwnPropertyDescriptor(builtin, 'call')
      const ability = createMongoAbility([{
        action: 'create',
        subject: 'Post',
        conditions: { [`${path}.call`]: 'yes' }
      }])
      let object
      let actualCall

      try {
        object = rulesToFields(ability, 'create', 'Post')
        actualCall = builtin.call
      } finally {
        if (originalCall) {
          Object.defineProperty(builtin, 'call', originalCall)
        } else {
          delete builtin.call
        }
      }

      expect(actualCall).toBe(Function.prototype.call)
      const fields = { [property]: { call: 'yes' } }
      expect(object).toEqual(path.includes('.') ? { state: fields } : fields)
    }
  )

  it('replaces an own function instead of modifying it when expanding a dotted path', () => {
    const fn = () => {}
    const ability = createMongoAbility([{
      action: 'create',
      subject: 'Post',
      conditions: { field: fn, 'field.call': 'yes' }
    }])
    const object = rulesToFields(ability, 'create', 'Post')

    expect(fn.call).toBe(Function.prototype.call)
    expect(object).toEqual({ field: { call: 'yes' } })
  })

  it.each(['toString', 'hasOwnProperty', 'valueOf'])(
    'assigns `%s` as an own final property without modifying the prototype',
    (property) => {
      const original = Object.getOwnPropertyDescriptor(Object.prototype, property)
      const ability = createMongoAbility([{
        action: 'create',
        subject: 'Post',
        conditions: { [property]: 'yes', [`state.${property}`]: 'yes' }
      }])
      const object = rulesToFields(ability, 'create', 'Post')

      expect(Object.hasOwn(object, property)).toBe(true)
      const state = object.state as Record<string, unknown>
      expect(Object.hasOwn(state, property)).toBe(true)
      expect(object[property]).toBe('yes')
      expect(state[property]).toBe('yes')
      expect(Object.getOwnPropertyDescriptor(Object.prototype, property)).toEqual(original)
    }
  )

  it.each(['__proto__', 'constructor', 'prototype'])(
    'skips `%s` as a final property at the root and in a nested path',
    (property) => {
      const ability = createMongoAbility([{
        action: 'create',
        subject: 'Post',
        conditions: { [property]: 'yes', [`state.${property}`]: 'yes' }
      }])
      const object = rulesToFields(ability, 'create', 'Post')

      expect(Object.hasOwn(object, property)).toBe(false)
      expect(Object.hasOwn(object.state as object, property)).toBe(false)
      expect(Object.getPrototypeOf(object)).toBeNull()
      expect(Object.getPrototypeOf(object.state)).toBeNull()
      expect(object).toEqual({ state: {} })
    }
  )

  it.each([0, false, '', 'value', 1, null, undefined])(
    'replaces a non-object intermediate value (%p) when expanding a dotted path',
    (value) => {
      const ability = createMongoAbility([{
        action: 'create',
        subject: 'Post',
        conditions: { field: value, 'field.nested': 'yes' }
      }])
      const object = rulesToFields(ability, 'create', 'Post')

      expect(object).toEqual({ field: { nested: 'yes' } })
    }
  )

  it('replaces an array intermediate value when expanding a dotted path', () => {
    const value: unknown[] = []
    const ability = createMongoAbility([{
      action: 'create',
      subject: 'Post',
      conditions: { field: value, 'field.nested': 'yes' }
    }])
    const object = rulesToFields(ability, 'create', 'Post')

    expect(object).toEqual({ field: { nested: 'yes' } })
    expect(Object.hasOwn(value, 'nested')).toBe(false)
  })

  class Model {
    id = 5
  }

  it.each([new Date(0), new Model(), Object.create(null)])(
    'preserves an own object intermediate value (%p) when expanding a dotted path',
    (value) => {
      const ability = createMongoAbility([{
        action: 'create',
        subject: 'Post',
        conditions: { field: value, 'field.nested': 'yes' }
      }])
      const object = rulesToFields(ability, 'create', 'Post')

      expect(object.field).toBe(value)
      expect(Object.hasOwn(value, 'nested')).toBe(true)
      expect((object.field as Record<string, unknown>).nested).toBe('yes')
    }
  )

  it('merges dotted paths sharing an intermediate object', () => {
    const ability = createMongoAbility([{
      action: 'create',
      subject: 'Post',
      conditions: { 'state.private': true, 'state.owner.id': 5 }
    }])

    expect(rulesToFields(ability, 'create', 'Post')).toEqual({
      state: { private: true, owner: { id: 5 } }
    })
  })
})
