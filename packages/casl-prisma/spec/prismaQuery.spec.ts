import { prismaQuery } from '../src'

describe('PrismaQuery evaluation', () => {
  it('uses "equals" as default operator', () => {
    const test = prismaQuery({ id: 1 })

    expect(test({ id: 1 })).toBe(true)
    expect(test({ id: 2 })).toBe(false)
  })

  describe('equals', () => {
    it('throws when comparing with object or array', () => {
      expect(() => prismaQuery({
        items: {}
      })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({
        items: Object.create(null)
      })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({
        items: []
      })).toThrow(/does not supports comparison of arrays and objects/)
    })

    it('can compare `Date`s', () => {
      const now = new Date()
      const test = prismaQuery({ createdAt: now })

      expect(test({ createdAt: new Date(now.toISOString()) })).toBe(true)
      expect(test({ createdAt: new Date(1980) })).toBe(false)
    })

    it('can be specified using "equals" operator', () => {
      const test = prismaQuery({
        createdAt: { equals: 'test' }
      })
      expect(test({ createdAt: 'test' })).toBe(true)
      expect(test({ createdAt: 'test2' })).toBe(false)
    })
  })

  describe('not', () => {
    it('throws when comparing with object without nested operators or array', () => {
      expect(() => prismaQuery({
        items: { not: {} }
      })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({
        items: { not: Object.create(null) }
      })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({
        items: { not: [] }
      })).toThrow(/does not supports comparison of arrays and objects/)
    })

    it('checks that object value does not equal provided primitive', () => {
      const test = prismaQuery({ age: { not: 10 } })

      expect(test({ age: 10 })).toBe(false)
      expect(test({ age: 11 })).toBe(true)
    })

    it('checks that value satisfies nested operators', () => {
      const test = prismaQuery({
        name: {
          not: {
            endsWith: 'oe',
            startsWith: 'J'
          }
        }
      })

      expect(test({ name: 'John Doe' })).toBe(false)
      expect(test({ name: 'John Smith' })).toBe(true)
      expect(test({ name: 'Tady Smith' })).toBe(true)
      expect(test({ name: 'Tady Doe' })).toBe(true)
      expect(test({ name: 'Jane Doe' })).toBe(false)
    })
  })

  describe('in', () => {
    it('throws if passed value is not an array', () => {
      expect(() => prismaQuery({
        items: { in: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that object value is in specified enum values', () => {
      const test = prismaQuery({ id: { in: [1, 2] } })

      expect(test({ id: 1 })).toBe(true)
      expect(test({ id: 2 })).toBe(true)
      expect(test({ id: 3 })).toBe(false)
    })
  })

  describe('notIn', () => {
    it('throws if passed value is not an array', () => {
      expect(() => prismaQuery({
        items: { notIn: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that object value is NOT in specified enum values', () => {
      const test = prismaQuery({ id: { notIn: [1, 2] } })

      expect(test({ id: 1 })).toBe(false)
      expect(test({ id: 2 })).toBe(false)
      expect(test({ id: 3 })).toBe(true)
    })
  })

  describe('lt, lte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => prismaQuery({
        name: { lt: true }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { lte: [] }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { lte: NaN }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { lt: Infinity }
      })).toThrow(/expects to receive comparable value/)
    })

    it('checks that object value is less than specified one when using "lt"', () => {
      const test = prismaQuery({ age: { lt: 10 } })
      expect(test({ age: 9 })).toBe(true)
      expect(test({ age: 10 })).toBe(false)
    })

    it('checks that object value is less or equal to specified one when using "lte"', () => {
      const test = prismaQuery({ age: { lte: 10 } })
      expect(test({ age: 9 })).toBe(true)
      expect(test({ age: 10 })).toBe(true)
    })
  })

  describe('gt, gte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => prismaQuery({
        name: { gt: true }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { gte: [] }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { gte: NaN }
      })).toThrow(/expects to receive comparable value/)
      expect(() => prismaQuery({
        name: { gt: Infinity }
      })).toThrow(/expects to receive comparable value/)
    })

    it('checks that object value is greater than specified one when using "lt"', () => {
      const test = prismaQuery({ age: { gt: 10 } })
      expect(test({ age: 11 })).toBe(true)
      expect(test({ age: 10 })).toBe(false)
    })

    it('checks that object value is greater or equal to specified one when using "lte"', () => {
      const test = prismaQuery({ age: { gte: 10 } })
      expect(test({ age: 11 })).toBe(true)
      expect(test({ age: 10 })).toBe(true)
    })
  })

  describe('startsWith', () => {
    it('throws if value is not a string', () => {
      expect(() => prismaQuery({
        name: { startsWith: 1 }
      })).toThrow(/expects to receive string/)
      expect(() => prismaQuery({
        name: { startsWith: {} }
      })).toThrow(/expects to receive string/)
    })

    it('checks that value starts with specified one', () => {
      const test = prismaQuery({ name: { startsWith: 'j' } })

      expect(test({ name: 'john' })).toBe(true)
      expect(test({ name: 'John' })).toBe(false)
      expect(test({ name: 'tom' })).toBe(false)
    })

    it('ignores case during check when "mode" is "insensitive"', () => {
      const test = prismaQuery({ name: { startsWith: 'j', mode: 'insensitive' } })

      expect(test({ name: 'john' })).toBe(true)
      expect(test({ name: 'John' })).toBe(true)
      expect(test({ name: 'tom' })).toBe(false)
    })
  })

  describe('endsWith', () => {
    it('throws if value is not a string', () => {
      expect(() => prismaQuery({
        name: { endsWith: 1 }
      })).toThrow(/expects to receive string/)
      expect(() => prismaQuery({
        name: { endsWith: {} }
      })).toThrow(/expects to receive string/)
    })

    it('checks that value ends with specified one', () => {
      const test = prismaQuery({ name: { endsWith: 'Doe' } })

      expect(test({ name: 'John Doe' })).toBe(true)
      expect(test({ name: 'John doe' })).toBe(false)
      expect(test({ name: 'Tom Clark' })).toBe(false)
    })

    it('ignores case during check when "mode" is "insensitive"', () => {
      const test = prismaQuery({ name: { startsWith: 'j', mode: 'insensitive' } })

      expect(test({ name: 'john' })).toBe(true)
      expect(test({ name: 'John doe' })).toBe(true)
      expect(test({ name: 'Tom Clark' })).toBe(false)
    })
  })

  describe('contains', () => {
    it('throws if value is not a string', () => {
      expect(() => prismaQuery({ name: { contains: 1 } })).toThrow(/expects to receive string/)
      expect(() => prismaQuery({ name: { contains: {} } })).toThrow(/expects to receive string/)
    })

    it('checks that value contains specified one', () => {
      const test = prismaQuery({ name: { contains: 'Doe' } })

      expect(test({ name: 'John Doe' })).toBe(true)
      expect(test({ name: 'John Doe Clark' })).toBe(true)
      expect(test({ name: 'John Doek' })).toBe(true)
      expect(test({ name: 'John doek' })).toBe(false)
      expect(test({ name: 'Tom Clark' })).toBe(false)
    })

    it('ignores case during check when "mode" is "insensitive"', () => {
      const test = prismaQuery({ name: { contains: 'Doe', mode: 'insensitive' } })

      expect(test({ name: 'John Doe' })).toBe(true)
      expect(test({ name: 'John Doe Clark' })).toBe(true)
      expect(test({ name: 'John Doek' })).toBe(true)
      expect(test({ name: 'John doek' })).toBe(true)
      expect(test({ name: 'Tom Clark' })).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('throws if value is not a boolean', () => {
      expect(() => prismaQuery({ items: { isEmpty: 1 } })).toThrow(/expects to receive a boolean/)
      expect(() => prismaQuery({ items: { isEmpty: {} } })).toThrow(/expects to receive a boolean/)
    })

    it('checks that array is empty', () => {
      const test = prismaQuery({ items: { isEmpty: true } })

      expect(test({ items: [] })).toBe(true)
      expect(test({ items: [1] })).toBe(false)
    })
  })

  describe('has', () => {
    it('checks that value is in array', () => {
      const test = prismaQuery({ items: { has: 'test' } })

      expect(test({ items: ['test'] })).toBe(true)
      expect(test({ items: [1, 2, 3] })).toBe(false)
      expect(test({ items: ['test me'] })).toBe(false)
    })
  })

  describe('hasSome', () => {
    it('throws if value is not an array', () => {
      expect(() => prismaQuery({
        items: { hasSome: 1 }
      })).toThrow(/expects to receive an array/)
      expect(() => prismaQuery({
        items: { hasSome: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that value has at least one of the specified values', () => {
      const test = prismaQuery({ items: { hasSome: ['test', 'me'] } })

      expect(test({ items: ['test'] })).toBe(true)
      expect(test({ items: ['test', 'me', 'test2'] })).toBe(true)
      expect(test({ items: ['some', 'or', 'me'] })).toBe(true)
      expect(test({ items: ['some', 'others'] })).toBe(false)
    })
  })

  describe('hasEvery', () => {
    it('throws if value is not an array', () => {
      expect(() => prismaQuery({
        items: { hasEvery: 1 }
      })).toThrow(/expects to receive an array/)
      expect(() => prismaQuery({
        items: { hasEvery: {} }
      })).toThrow(/expects to receive an array/)
    })

    it('checks that value has all specified values', () => {
      const test = prismaQuery({ items: { hasEvery: ['test', 'me'] } })

      expect(test({ items: ['test'] })).toBe(false)
      expect(test({ items: ['test', 'me', 'test2'] })).toBe(true)
      expect(test({ items: ['me', 'me2', 'test', 'here'] })).toBe(true)
      expect(test({ items: ['some', 'or', 'me'] })).toBe(false)
      expect(test({ items: ['some', 'others'] })).toBe(false)
    })
  })

  describe('every', () => {
    it('throws if value is not a nested query', () => {
      expect(() => prismaQuery({
        posts: { every: 1 }
      })).toThrow(/expects to receive a query for nested relation/)
      expect(() => prismaQuery({
        posts: { every: [] }
      })).toThrow(/expects to receive a query for nested relation/)
    })

    it('checks that every object in nested relation matches criteria', () => {
      const test = prismaQuery({
        posts: {
          every: {
            active: true,
            authorId: 1
          }
        }
      })

      expect(test({ posts: [] })).toBe(false)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 1 }
        ]
      })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: false, authorId: 1 }
        ]
      })).toBe(false)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 2 }
        ]
      })).toBe(false)
    })
  })

  describe('none', () => {
    it('throws if value is not a nested query', () => {
      expect(() => prismaQuery({
        posts: { none: 1 }
      })).toThrow(/expects to receive a query for nested relation/)
      expect(() => prismaQuery({
        posts: { none: [] }
      })).toThrow(/expects to receive a query for nested relation/)
    })

    it('checks that zero objects in nested relation matches criteria', () => {
      const test = prismaQuery({
        posts: {
          none: {
            active: true,
            authorId: 1
          }
        }
      })

      expect(test({ posts: [] })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 1 }
        ]
      })).toBe(false)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: false, authorId: 1 }
        ]
      })).toBe(false)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 3 },
          { id: 2, active: true, authorId: 2 }
        ]
      })).toBe(true)
    })
  })

  describe('some', () => {
    it('throws if value is not a nested query', () => {
      expect(() => prismaQuery({
        posts: { some: 1 }
      })).toThrow(/expects to receive a query for nested relation/)
      expect(() => prismaQuery({
        posts: { some: [] }
      })).toThrow(/expects to receive a query for nested relation/)
    })

    it('checks that at least one object in nested relation matches criteria', () => {
      const test = prismaQuery({
        posts: {
          some: {
            active: true,
            authorId: 1
          }
        }
      })

      expect(test({ posts: [] })).toBe(false)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 1 }
        ]
      })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: false, authorId: 1 }
        ]
      })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 2 }
        ]
      })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: true, authorId: 1 },
          { id: 2, active: true, authorId: 2 }
        ]
      })).toBe(true)
      expect(test({
        posts: [
          { id: 1, active: false, authorId: 1 },
          { id: 2, active: true, authorId: 2 }
        ]
      })).toBe(false)
    })
  })

  describe('is', () => {
    it('throws if value is not a nested query', () => {
      expect(() => prismaQuery({
        posts: { is: 1 }
      })).toThrow(/expects to receive a query for nested relation/)
      expect(() => prismaQuery({
        posts: { is: [] }
      })).toThrow(/expects to receive a query for nested relation/)
    })

    it('checks that object matches criteria', () => {
      const test = prismaQuery({
        author: {
          is: {
            active: true,
            age: { gte: 18 }
          }
        }
      })

      expect(test({ author: {} })).toBe(false)
      expect(test({ author: { active: true, age: 5 } })).toBe(false)
      expect(test({ author: { active: false, age: 18 } })).toBe(false)
      expect(test({ author: { active: true, age: 18 } })).toBe(true)
      expect(test({ author: { active: true, age: 19 } })).toBe(true)
    })
  })

  describe('isNot', () => {
    it('throws if value is not a nested query', () => {
      expect(() => prismaQuery({
        posts: { isNot: 1 }
      })).toThrow(/expects to receive a query for nested relation/)
      expect(() => prismaQuery({
        posts: { isNot: [] }
      })).toThrow(/expects to receive a query for nested relation/)
    })

    it('checks that object not matches criteria', () => {
      const test = prismaQuery({
        author: {
          isNot: {
            active: true,
            age: { gte: 18 }
          }
        }
      })

      expect(test({ author: {} })).toBe(true)
      expect(test({ author: { active: true, age: 5 } })).toBe(true)
      expect(test({ author: { active: false, age: 18 } })).toBe(true)
      expect(test({ author: { active: true, age: 18 } })).toBe(false)
      expect(test({ author: { active: true, age: 19 } })).toBe(false)
    })
  })

  describe('AND', () => {
    it('throws if value is not an object or array', () => {
      expect(() => prismaQuery({
        AND: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => prismaQuery({
        AND: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines criteria passed as an array using logical AND', () => {
      const test = prismaQuery({
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
      const test = prismaQuery({
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
      expect(() => prismaQuery({
        OR: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => prismaQuery({
        OR: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines criteria passed as an array using logical OR', () => {
      const test = prismaQuery({
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

    it('combines criteria passed as an object using logical AND (mimics Prisma behavior)', () => {
      const test = prismaQuery({
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
      expect(() => prismaQuery({
        NOT: 1
      })).toThrow(/expects to receive an array or object/)
      expect(() => prismaQuery({
        NOT: 'test'
      })).toThrow(/expects to receive an array or object/)
    })

    it('combines an array of criteria with logical AND NOTs', () => {
      const test = prismaQuery({
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
      const test = prismaQuery({
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
