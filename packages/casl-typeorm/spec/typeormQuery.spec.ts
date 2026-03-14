import { typeormQuery } from '../src'

describe('TypeormQuery evaluation', () => {
  it('uses "equals" as default operator', () => {
    const test = typeormQuery({ id: 1 })

    expect(test({ id: 1 })).toBe(true)
    expect(test({ id: 2 })).toBe(false)
  })

  describe('equals', () => {
    it('throws when comparing with object or array', () => {
      expect(() => typeormQuery({
        items: {}
      })).toThrow(/does not support comparison of arrays and objects/)
      expect(() => typeormQuery({
        items: Object.create(null)
      })).toThrow(/does not support comparison of arrays and objects/)
      expect(() => typeormQuery({
        items: []
      })).toThrow(/does not support comparison of arrays and objects/)
    })

    it('can compare `Date`s', () => {
      const now = new Date()
      const test = typeormQuery({ createdAt: now })

      expect(test({ createdAt: new Date(now.toISOString()) })).toBe(true)
      expect(test({ createdAt: new Date(1980) })).toBe(false)
    })

    it('can be specified using "equals" operator', () => {
      const test = typeormQuery({
        createdAt: { equals: 'test' }
      })
      expect(test({ createdAt: 'test' })).toBe(true)
      expect(test({ createdAt: 'test2' })).toBe(false)
    })
  })

  describe('not', () => {
    it('throws when comparing with object without nested operators or array', () => {
      expect(() => typeormQuery({
        items: { not: {} }
      })).toThrow(/does not support comparison of arrays and objects/)
      expect(() => typeormQuery({
        items: { not: Object.create(null) }
      })).toThrow(/does not support comparison of arrays and objects/)
      expect(() => typeormQuery({
        items: { not: [] }
      })).toThrow(/does not support comparison of arrays and objects/)
    })

    it('checks that object value does not equal provided primitive', () => {
      const test = typeormQuery({ age: { not: 10 } })

      expect(test({ age: 10 })).toBe(false)
      expect(test({ age: 11 })).toBe(true)
    })

    it('checks that value satisfies nested operators', () => {
      const test = typeormQuery({
        age: {
          not: {
            gt: 18,
            lt: 65
          }
        }
      })

      expect(test({ age: 30 })).toBe(false)
      expect(test({ age: 10 })).toBe(true)
      expect(test({ age: 70 })).toBe(true)
    })
  })

  describe('in', () => {
    it('throws if passed value is not an array', () => {
      expect(() => typeormQuery({
        items: { in: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that object value is in specified enum values', () => {
      const test = typeormQuery({ id: { in: [1, 2] } })

      expect(test({ id: 1 })).toBe(true)
      expect(test({ id: 2 })).toBe(true)
      expect(test({ id: 3 })).toBe(false)
    })
  })

  describe('notIn', () => {
    it('throws if passed value is not an array', () => {
      expect(() => typeormQuery({
        items: { notIn: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that object value is NOT in specified enum values', () => {
      const test = typeormQuery({ id: { notIn: [1, 2] } })

      expect(test({ id: 1 })).toBe(false)
      expect(test({ id: 2 })).toBe(false)
      expect(test({ id: 3 })).toBe(true)
    })
  })

  describe('lt, lte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => typeormQuery({
        name: { lt: true }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { lte: [] }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { lte: NaN }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { lt: Infinity }
      })).toThrow(/expects to receive comparable value/)
    })

    it('checks that object value is less than specified one when using "lt"', () => {
      const test = typeormQuery({ age: { lt: 10 } })
      expect(test({ age: 9 })).toBe(true)
      expect(test({ age: 10 })).toBe(false)
    })

    it('checks that object value is less or equal to specified one when using "lte"', () => {
      const test = typeormQuery({ age: { lte: 10 } })
      expect(test({ age: 9 })).toBe(true)
      expect(test({ age: 10 })).toBe(true)
    })
  })

  describe('gt, gte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => typeormQuery({
        name: { gt: true }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { gte: [] }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { gte: NaN }
      })).toThrow(/expects to receive comparable value/)
      expect(() => typeormQuery({
        name: { gt: Infinity }
      })).toThrow(/expects to receive comparable value/)
    })

    it('checks that object value is greater than specified one when using "gt"', () => {
      const test = typeormQuery({ age: { gt: 10 } })
      expect(test({ age: 11 })).toBe(true)
      expect(test({ age: 10 })).toBe(false)
    })

    it('checks that object value is greater or equal to specified one when using "gte"', () => {
      const test = typeormQuery({ age: { gte: 10 } })
      expect(test({ age: 11 })).toBe(true)
      expect(test({ age: 10 })).toBe(true)
    })
  })

  describe('like', () => {
    it('throws if value is not a string', () => {
      expect(() => typeormQuery({
        name: { like: 1 }
      })).toThrow(/expects to receive string/)
      expect(() => typeormQuery({
        name: { like: {} }
      })).toThrow(/expects to receive string/)
    })

    it('checks that value matches LIKE pattern (% = wildcard)', () => {
      const test = typeormQuery({ name: { like: '%john%' } })

      expect(test({ name: 'john' })).toBe(true)
      expect(test({ name: 'John' })).toBe(false)
      expect(test({ name: 'mr john doe' })).toBe(true)
      expect(test({ name: 'tom' })).toBe(false)
    })

    it('supports _ as single character wildcard', () => {
      const test = typeormQuery({ code: { like: 'A_C' } })

      expect(test({ code: 'ABC' })).toBe(true)
      expect(test({ code: 'AXC' })).toBe(true)
      expect(test({ code: 'ABBC' })).toBe(false)
    })
  })

  describe('ilike', () => {
    it('throws if value is not a string', () => {
      expect(() => typeormQuery({
        name: { ilike: 1 }
      })).toThrow(/expects to receive string/)
    })

    it('checks case-insensitive LIKE pattern', () => {
      const test = typeormQuery({ name: { ilike: '%john%' } })

      expect(test({ name: 'john' })).toBe(true)
      expect(test({ name: 'John' })).toBe(true)
      expect(test({ name: 'JOHN DOE' })).toBe(true)
      expect(test({ name: 'tom' })).toBe(false)
    })
  })

  describe('between', () => {
    it('throws if value is not an array of 2 elements', () => {
      expect(() => typeormQuery({
        age: { between: 5 }
      })).toThrow(/expects to receive an array of 2 elements/)
      expect(() => typeormQuery({
        age: { between: [1] }
      })).toThrow(/expects to receive an array of 2 elements/)
      expect(() => typeormQuery({
        age: { between: [1, 2, 3] }
      })).toThrow(/expects to receive an array of 2 elements/)
    })

    it('checks that value is between min and max (inclusive)', () => {
      const test = typeormQuery({ age: { between: [18, 65] } })

      expect(test({ age: 18 })).toBe(true)
      expect(test({ age: 30 })).toBe(true)
      expect(test({ age: 65 })).toBe(true)
      expect(test({ age: 17 })).toBe(false)
      expect(test({ age: 66 })).toBe(false)
    })
  })

  describe('isNull', () => {
    it('throws if value is not a boolean', () => {
      expect(() => typeormQuery({ name: { isNull: 1 } })).toThrow(/expects to receive a boolean/)
      expect(() => typeormQuery({ name: { isNull: {} } })).toThrow(/expects to receive a boolean/)
    })

    it('checks that value is null when isNull is true', () => {
      const test = typeormQuery({ name: { isNull: true } })

      expect(test({ name: null })).toBe(true)
      expect(test({ name: 'john' })).toBe(false)
    })

    it('checks that value is not null when isNull is false', () => {
      const test = typeormQuery({ name: { isNull: false } })

      expect(test({ name: null })).toBe(false)
      expect(test({ name: 'john' })).toBe(true)
    })
  })

  describe('arrayContains', () => {
    it('throws if value is not an array', () => {
      expect(() => typeormQuery({
        tags: { arrayContains: 'test' }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that array contains all specified values', () => {
      const test = typeormQuery({ tags: { arrayContains: ['a', 'b'] } })

      expect(test({ tags: ['a', 'b', 'c'] })).toBe(true)
      expect(test({ tags: ['a', 'b'] })).toBe(true)
      expect(test({ tags: ['a'] })).toBe(false)
      expect(test({ tags: ['c'] })).toBe(false)
    })
  })

  describe('arrayContainedBy', () => {
    it('throws if value is not an array', () => {
      expect(() => typeormQuery({
        tags: { arrayContainedBy: 'test' }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that array is contained by specified values', () => {
      const test = typeormQuery({ tags: { arrayContainedBy: ['a', 'b', 'c'] } })

      expect(test({ tags: ['a', 'b'] })).toBe(true)
      expect(test({ tags: ['a'] })).toBe(true)
      expect(test({ tags: ['a', 'b', 'c'] })).toBe(true)
      expect(test({ tags: ['a', 'd'] })).toBe(false)
    })
  })

  describe('arrayOverlap', () => {
    it('throws if value is not an array', () => {
      expect(() => typeormQuery({
        tags: { arrayOverlap: 'test' }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that array has at least one common element', () => {
      const test = typeormQuery({ tags: { arrayOverlap: ['a', 'b'] } })

      expect(test({ tags: ['a', 'c'] })).toBe(true)
      expect(test({ tags: ['b', 'c'] })).toBe(true)
      expect(test({ tags: ['c', 'd'] })).toBe(false)
    })
  })

  describe('AND', () => {
    it('throws if value is not an object or array', () => {
      expect(() => typeormQuery({
        AND: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => typeormQuery({
        AND: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines criteria passed as an array using logical AND', () => {
      const test = typeormQuery({
        AND: [
          { age: { gte: 18 } },
          { active: true }
        ]
      })

      expect(test({})).toBe(false)
      expect(test({ active: true, age: 5 })).toBe(false)
      expect(test({ active: false, age: 18 })).toBe(false)
      expect(test({ active: true, age: 18 })).toBe(true)
      expect(test({ active: true, age: 19 })).toBe(true)
    })

    it('combines criteria passed as an object using logical AND', () => {
      const test = typeormQuery({
        AND: {
          age: { gte: 18 },
          active: true
        },
      })

      expect(test({})).toBe(false)
      expect(test({ active: true, age: 5 })).toBe(false)
      expect(test({ active: false, age: 18 })).toBe(false)
      expect(test({ active: true, age: 18 })).toBe(true)
      expect(test({ active: true, age: 19 })).toBe(true)
    })
  })

  describe('OR', () => {
    it('throws if value is not an object or array', () => {
      expect(() => typeormQuery({
        OR: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => typeormQuery({
        OR: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines criteria passed as an array using logical OR', () => {
      const test = typeormQuery({
        OR: [
          { age: { gte: 18 } },
          { active: true }
        ]
      })

      expect(test({})).toBe(false)
      expect(test({ active: true, age: 5 })).toBe(true)
      expect(test({ active: false, age: 18 })).toBe(true)
      expect(test({ active: true, age: 18 })).toBe(true)
      expect(test({ active: true, age: 19 })).toBe(true)
      expect(test({ active: false, age: 5 })).toBe(false)
    })

    it('combines criteria passed as an object using logical AND (mimics compound behavior)', () => {
      const test = typeormQuery({
        OR: {
          age: { gte: 18 },
          active: true
        },
      })

      expect(test({})).toBe(false)
      expect(test({ active: true, age: 5 })).toBe(false)
      expect(test({ active: false, age: 18 })).toBe(false)
      expect(test({ active: true, age: 18 })).toBe(true)
      expect(test({ active: true, age: 19 })).toBe(true)
    })
  })

  describe('NOT', () => {
    it('throws if value is not an object or array', () => {
      expect(() => typeormQuery({
        NOT: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => typeormQuery({
        NOT: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines an array of criteria with logical AND NOTs', () => {
      const test = typeormQuery({
        NOT: [
          { age: { gte: 18 } },
          { active: true }
        ]
      })

      expect(test({})).toBe(true)
      expect(test({ active: true, age: 5 })).toBe(false)
      expect(test({ active: false, age: 18 })).toBe(false)
      expect(test({ active: false, age: 19 })).toBe(false)
      expect(test({ active: true, age: 18 })).toBe(false)
      expect(test({ active: true, age: 19 })).toBe(false)
      expect(test({ active: false, age: 5 })).toBe(true)
    })

    it('inverts criteria passed as an object', () => {
      const test = typeormQuery({
        NOT: {
          age: { gte: 18 },
          active: true
        },
      })

      expect(test({})).toBe(true)
      expect(test({ active: true, age: 5 })).toBe(true)
      expect(test({ active: false, age: 18 })).toBe(true)
      expect(test({ active: true, age: 18 })).toBe(false)
    })
  })
})
