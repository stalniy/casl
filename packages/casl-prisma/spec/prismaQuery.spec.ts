import { prismaQuery } from "../src"

describe('PrismaQuery evaluation', () => {
  it('uses "equals" as default operator', () => {
    const test = prismaQuery({ id: 1 })

    expect(test({ id: 1 })).toBe(true)
    expect(test({ id: 2 })).toBe(false)
  })

  describe('equals', () => {
    it('throws when comparing with object or array', () => {
      expect(() => prismaQuery({ items: {} })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({ items: Object.create(null) })).toThrow(/does not supports comparison of arrays and objects/)
      expect(() => prismaQuery({ items: [] })).toThrow(/does not supports comparison of arrays and objects/)
    })

    it('can compare `Date`s', () => {
      const test = prismaQuery({ createdAt: new Date() })
      expect(test({ createdAt: new Date() })).toBe(true)
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

  describe('in', () => {
    it('throws if passed value is not an array', () => {
      expect(() => prismaQuery({ items: { in: {} } })).toThrow(/expects to receive an array/);
    })

    it('checks that object value is in specified enum values', () => {
      const test = prismaQuery({ id: { in: [1, 2] } });

      expect(test({ id: 1 })).toBe(true);
      expect(test({ id: 2 })).toBe(true);
      expect(test({ id: 3 })).toBe(false);
    })
  })

  describe('lt, lte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => prismaQuery({ name: { lt: true } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { lte: [] } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { lte: NaN } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { lt: Infinity } })).toThrow(/expects to get comparable value/)
    })

    it('checks that object value is less than specified one when using "lt"', () => {
      const test = prismaQuery({ age: { lt: 10 } });
      expect(test({ age: 9 })).toBe(true);
      expect(test({ age: 10 })).toBe(false);
    })

    it('checks that object value is less or equal to specified one when using "lte"', () => {
      const test = prismaQuery({ age: { lte: 10 } });
      expect(test({ age: 9 })).toBe(true);
      expect(test({ age: 10 })).toBe(true);
    })
  })

  describe('gt, gte', () => {
    it('throws if value is not comparable (string, number or Date)', () => {
      expect(() => prismaQuery({ name: { gt: true } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { gte: [] } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { gte: NaN } })).toThrow(/expects to get comparable value/)
      expect(() => prismaQuery({ name: { gt: Infinity } })).toThrow(/expects to get comparable value/)
    })

    it('checks that object value is greater than specified one when using "lt"', () => {
      const test = prismaQuery({ age: { gt: 10 } });
      expect(test({ age: 11 })).toBe(true);
      expect(test({ age: 10 })).toBe(false);
    })

    it('checks that object value is greater or equal to specified one when using "lte"', () => {
      const test = prismaQuery({ age: { gte: 10 } });
      expect(test({ age: 11 })).toBe(true);
      expect(test({ age: 10 })).toBe(true);
    })
  })
})
