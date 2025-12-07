import { AbilityBuilder, subject } from '@casl/ability'
import { createPrismaAbilityFor, PrismaTypeMap } from '../src'

describe('createPrismaAbilityFor', () => {
  it('builds an ability factory bound to provided Prisma type map', () => {
    const createFooAbility = createPrismaAbilityFor<PrismaTypeMap<'Foo'>>()
    const { can, build } = new AbilityBuilder(createFooAbility)

    can('read', 'Foo', { id: 1 })

    const ability = build()

    expect(ability.can('read', subject('Foo', { id: 1 }))).toBe(true)
    expect(ability.can('read', subject('Foo', { id: 2 }))).toBe(false)
  })
})
