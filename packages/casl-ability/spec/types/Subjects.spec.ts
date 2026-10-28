import { expectTypeOf } from 'expect-type'
import {
  AbilityBuilder, createMongoAbility, ForcedSubject, InferSubjects, MongoAbility,
  SubjectClass, SubjectType
} from '../../src'

class PublicSubject {
  constructor(readonly id: number) {}
}

class ProtectedSubject {
  static modelName = 'ProtectedSubject' as const

  protected constructor(readonly id: number) {}

  static create(id: number) {
    return new ProtectedSubject(id)
  }
}

class PrivateSubject {
  private constructor(readonly id: number) {}
}

abstract class AbstractSubject {
  constructor(readonly id: number) {}
}

class TaggedSubject implements ForcedSubject<'TaggedSubject'> {
  readonly __caslSubjectType__ = 'TaggedSubject' as const

  protected constructor(readonly id: number) {}
}

describe('subject class types', () => {
  it('preserves the public constructor contract of SubjectClass', () => {
    const SubjectConstructor: SubjectClass = PublicSubject
    expect(new SubjectConstructor(1)).toBeInstanceOf(PublicSubject)
  })

  it('preserves inference from explicit construct signatures', () => {
    const SubjectConstructor: new (id: number) => PublicSubject = PublicSubject
    expectTypeOf<InferSubjects<typeof SubjectConstructor>>()
      .toEqualTypeOf<typeof SubjectConstructor | PublicSubject>()

    type AppAbility = MongoAbility<['read', InferSubjects<typeof SubjectConstructor>]>
    const { can } = new AbilityBuilder<AppAbility>(createMongoAbility)
    can('read', SubjectConstructor, { id: 1 })
    // @ts-expect-error condition values must match the constructor return type
    can('read', SubjectConstructor, { id: '1' })
  })

  it('infers instances regardless of constructor visibility or abstractness', () => {
    expectTypeOf<InferSubjects<typeof PublicSubject>>()
      .toEqualTypeOf<typeof PublicSubject | PublicSubject>()
    expectTypeOf<InferSubjects<typeof ProtectedSubject>>()
      .toEqualTypeOf<typeof ProtectedSubject | ProtectedSubject>()
    expectTypeOf<InferSubjects<typeof PrivateSubject>>()
      .toEqualTypeOf<typeof PrivateSubject | PrivateSubject>()
    expectTypeOf<InferSubjects<typeof AbstractSubject>>()
      .toEqualTypeOf<typeof AbstractSubject | AbstractSubject>()
  })

  it('preserves optional model and instance tag names', () => {
    expectTypeOf<InferSubjects<typeof ProtectedSubject, true>>()
      .toEqualTypeOf<typeof ProtectedSubject | ProtectedSubject | 'ProtectedSubject'>()
    expectTypeOf<InferSubjects<typeof TaggedSubject, true>>()
      .toEqualTypeOf<typeof TaggedSubject | TaggedSubject | 'TaggedSubject'>()
    expectTypeOf<InferSubjects<TaggedSubject>>()
      .toEqualTypeOf<TaggedSubject | 'TaggedSubject'>()
  })

  it('accepts classes and rejects plain objects as subject types', () => {
    expectTypeOf<typeof PublicSubject>().toMatchTypeOf<SubjectType>()
    expectTypeOf<typeof ProtectedSubject>().toMatchTypeOf<SubjectType>()
    expectTypeOf<typeof PrivateSubject>().toMatchTypeOf<SubjectType>()
    expectTypeOf<typeof AbstractSubject>().toMatchTypeOf<SubjectType>()
    expectTypeOf<{ prototype: PublicSubject }>().not.toMatchTypeOf<SubjectType>()
  })

  it.each([PublicSubject, ProtectedSubject, PrivateSubject, AbstractSubject])(
    'checks conditions and fields for %p',
    (SubjectClass) => {
      type AppAbility = MongoAbility<['read', InferSubjects<typeof SubjectClass>]>
      const { can, cannot } = new AbilityBuilder<AppAbility>(createMongoAbility)

      can('read', SubjectClass, { id: 1 })
      cannot('read', SubjectClass, { id: { $in: [1, 2] } })
      can('read', SubjectClass, 'id', { id: 1 })
      // @ts-expect-error condition values must match the instance property type
      can('read', SubjectClass, { id: '1' })
      // @ts-expect-error unknown instance property
      can('read', SubjectClass, { missing: true })
      // @ts-expect-error invalid condition when fields are specified
      can('read', SubjectClass, 'id', { id: '1' })
      // @ts-expect-error explicitly constrained fields must exist on the instance
      can<PublicSubject, keyof PublicSubject>('read', SubjectClass, 'missing')
    }
  )

  it('infers conditions for individual non-public and abstract classes', () => {
    type ProtectedAbility = MongoAbility<['read', InferSubjects<typeof ProtectedSubject>]>
    const protectedBuilder = new AbilityBuilder<ProtectedAbility>(createMongoAbility)
    protectedBuilder.can('read', ProtectedSubject, { id: 1 })
    // @ts-expect-error condition values must match the instance property type
    protectedBuilder.can('read', ProtectedSubject, { id: '1' })

    type PrivateAbility = MongoAbility<['read', InferSubjects<typeof PrivateSubject>]>
    const privateBuilder = new AbilityBuilder<PrivateAbility>(createMongoAbility)
    privateBuilder.can('read', PrivateSubject, { id: 1 })
    // @ts-expect-error condition values must match the instance property type
    privateBuilder.can('read', PrivateSubject, { id: '1' })

    type AbstractAbility = MongoAbility<['read', InferSubjects<typeof AbstractSubject>]>
    const abstractBuilder = new AbilityBuilder<AbstractAbility>(createMongoAbility)
    abstractBuilder.can('read', AbstractSubject, { id: 1 })
    // @ts-expect-error condition values must match the instance property type
    abstractBuilder.can('read', AbstractSubject, { id: '1' })
  })

  it('matches factory-created instances against class rules', () => {
    type AppAbility = MongoAbility<['read', InferSubjects<typeof ProtectedSubject>]>
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility)
    builder.can('read', ProtectedSubject, { id: 1 })
    const ability = builder.build()

    expect(ability.can('read', ProtectedSubject.create(1))).toBe(true)
    expect(ability.can('read', ProtectedSubject.create(2))).toBe(false)
    expect(ability.detectSubjectType(ProtectedSubject.create(1))).toBe(ProtectedSubject)
  })
})
