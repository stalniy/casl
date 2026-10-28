import type { Subjects } from '../src/runtime'

jest.mock('@prisma/client', () => {
  throw new Error('@prisma/client is not installed')
}, { virtual: true })

jest.mock('@prisma/client/extension', () => {
  throw new Error('@prisma/client is not installed')
}, { virtual: true })

describe('without Prisma Client', () => {
  it.each(['../src', '../src/runtime'])('evaluates rules imported from %s', (entry) => {
    jest.isolateModules(() => {
      const { createPrismaAbility } = jest.requireActual<typeof import('../src/runtime')>(entry)
      const { subject } = jest.requireActual<typeof import('@casl/ability')>('@casl/ability')
      const ability = createPrismaAbility<['read', Subjects<{ Post: { authorId: number } }>]>([
        { action: 'read', subject: 'Post', conditions: { authorId: 1 } }
      ])

      expect(ability.can('read', subject('Post', { authorId: 1 }))).toBe(true)
      expect(ability.can('read', subject('Post', { authorId: 2 }))).toBe(false)
    })
  })
})
