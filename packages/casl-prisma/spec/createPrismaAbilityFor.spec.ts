import { AbilityBuilder, subject } from '@casl/ability'
import { createPrismaAbilityFor, PrismaTypeMap } from '../src'

describe('createPrismaAbilityFor', () => {
  it('builds an ability factory bound to provided Prisma type map', () => {
    type FooTypeMap = PrismaTypeMap<'Foo'>

    // Minimal Prisma TypeMap stub for runtime checks
    const fooTypeMap: FooTypeMap = {
      model: {
        Foo: {
          operations: {
            findFirst: {
              args: {
                where: {},
              },
            },
          },
        },
      },
    }

    const createFooAbility = createPrismaAbilityFor<typeof fooTypeMap>()
    const { can, build } = new AbilityBuilder(createFooAbility)
    expect(fooTypeMap.model.Foo.operations.findFirst.args.where).toEqual({})

    can('read', 'Foo', { id: 1 })

    const ability = build()

    expect(ability.can('read', subject('Foo', { id: 1 }))).toBe(true)
    expect(ability.can('read', subject('Foo', { id: 2 }))).toBe(false)
  })
})
