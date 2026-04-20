import { accessibleBy, createPrismaAbility } from '../src'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { AppAbility } from './AppAbility'

describe('Prisma E2E', () => {
  it("throws forbidden if no permissions are given to user model", async () => {
    const {prisma} = setup()

    await Promise.all(Array.from({ length: 5 }, async (_, index) => prisma.user.create({
      data: {
        firstName: `John ${index}`,
        lastName: `Doe ${index}`,
        age: 20 + index,
        verified: false,
        id: index + Math.floor(Date.now()),
      }
    })))

    let error: Error | undefined

    try {
      accessibleBy(createPrismaAbility<AppAbility>()).ofType('User')
    } catch (e: any) {
      error = e
    }

    expect(error?.message).toEqual('It\'s not allowed to run "read" on "User"')
  })

  function setup() {
    const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
    const prisma = new PrismaClient({ adapter, log: ['query'] })
    return { prisma }
  }
})
