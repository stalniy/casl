import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'
import { accessibleBy, createCaslExtension, createPrismaAbility, WhereInput } from '../src'
import { AppAbility } from './AppAbility'

describe('Prisma E2E', () => {
  describe('intercepts all operations to return hardcoded values', () => {
    describe.each([
      {
        name: 'when empty condition is at the root',
        getWhere: (emptyCondition: WhereInput<'User'>) => emptyCondition
      },
      {
        name: 'when empty condition is inside an array',
        getWhere: (emptyCondition: WhereInput<'User'>) => [emptyCondition]
      },
      {
        name: 'when empty condition is inside AND: [] array',
        getWhere: (emptyCondition: WhereInput<'User'>) => ({
          AND: [emptyCondition]
        })
      },
      {
        name: 'when empty condition is deeply in the where condition',
        getWhere: (emptyCondition: WhereInput<'User'>) => ({
          posts: {
            some: {
              author: {
                is: {
                  firstName: 'John',
                  NOT: emptyCondition
                }
              }
            }
          }
        })
      },
    ])('$name', ({ getWhere }) => {
      it('returns fallback value for findMany', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>

        expect(await prisma.user.findMany({ where })).toEqual([])
        expect((await prisma.user.findMany()).length).toBeGreaterThan(1)
      })

      it('returns fallback value for groupBy', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.groupBy({ where, by: ['age'] })).toEqual([])
        expect((await prisma.user.groupBy({ by: ['age'] })).length).toBeGreaterThan(1)
      })

      it('returns fallback value for aggregate', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.aggregate({
          where,
          _avg: {
            age: true
          }
        })).toEqual({
          _avg: {
            age: null
          }
        })
        expect(await prisma.user.aggregate({
          _avg: {
            age: true
          }
        })).toEqual({
          _avg: {
            age: expect.any(Number)
          }
        })
      })

      it('returns fallback value for findFirst', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.findFirst({ where })).toBeNull()
        expect(await prisma.user.findFirst()).not.toBeNull()
      })

      it('returns fallback value for findUnique', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition)
        expect(await prisma.user.findUnique({ where: {
          id: 1,
          AND: where
        } })).toBeNull()
        expect(await prisma.user.findUnique({ where: {
          id: 1,
        } })).not.toBeNull()
      })

      it('returns fallback value for findUniqueOrThrow', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition)
        await expect(prisma.user.findUniqueOrThrow({ where: {
          id: 1,
          AND: where
        } })).rejects.toThrow(/No record was found for a query/)
        await expect(prisma.user.findUniqueOrThrow({ where: {
          id: 1,
        } })).resolves.toHaveProperty('id', 1)
      })

      it('returns fallback value for findFirstOrThrow', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        await expect(prisma.user.findFirstOrThrow({ where })).rejects
          .toThrow(/No record was found for a query/)
        await expect(prisma.user.findFirstOrThrow()).resolves.toBeTruthy()
      })

      it('returns fallback value for count', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.count({ where })).toBe(0)
        expect(await prisma.user.count()).toBeGreaterThan(0)
      })

      it('returns fallback value for updateMany', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.updateMany({ where, data: { age: 1 } })).toEqual({ count: 0 })
        expect(await prisma.user.updateMany({
          where: { id: 1 },
          data: { age: 1 }
        })).toEqual({ count: 1 })
      })

      it('returns fallback value for deleteMany', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        expect(await prisma.user.deleteMany({ where })).toEqual({ count: 0 })
        expect(await prisma.user.deleteMany()).toEqual({ count: expect.any(Number) })
      })

      it('returns fallback value for update', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        await expect(prisma.user.update({ where: {
          id: 1,
          AND: where
        }, data: { age: 1 } })).rejects.toThrow(/No record was found for an update/)
        await expect(prisma.user.update({ where: {
          id: 1,
        }, data: { age: 1 } })).resolves.toHaveProperty('age', 1)
      })

      it('returns fallback value for delete', async () => {
        const { prisma, emptyCondition } = await setup()
        const where = getWhere(emptyCondition) as WhereInput<'User'>
        await expect(prisma.user.delete({ where: {
          id: 1,
          AND: where
        } })).rejects.toThrow(/No record was found for a delete/)
        await expect(prisma.user.delete({ where: {
          id: 1,
        } })).resolves.toHaveProperty('id', 1)
      })
    })
  })

  let cleanup: (() => Promise<void>) | undefined
  afterEach(async () => {
    await cleanup?.()
  })
  async function setup() {
    const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
    const basePrisma = new PrismaClient({ adapter })
    const prisma = basePrisma.$extends(createCaslExtension())

    const ability = createPrismaAbility<AppAbility>([])
    const emptyCondition = accessibleBy(ability).ofType('User')
    cleanup = () => prisma.$disconnect()


    await Promise.all(Array.from({ length: 5 }, async (_, index) => {
      const id = index + 1
      await prisma.user.upsert({
        where: { id },
        update: {},
        create: {
          firstName: `John ${index}`,
          lastName: `Doe ${index}`,
          age: 20 + index,
          verified: false,
          id,
        }
      })
    }))

    return { prisma, ability, emptyCondition }
  }
})
