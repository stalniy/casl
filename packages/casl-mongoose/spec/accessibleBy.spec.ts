import { defineAbility } from "@casl/ability"
import { accessibleBy } from "../src"
import { testConversionToMongoQuery } from "./mongo_query.spec"

declare module '../src' {
  interface RecordTypes {
    Post: true
  }
}

describe('accessibleBy', () => {
  it('returns `{ $expr: false }` when there are no rules for specific subject/action', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post')
    })

    const query = accessibleBy(ability, 'update').Post

    expect(query).toEqual({ $expr: false })
  })

  it('returns `{ $expr: false }` if there is a rule that forbids previous one', () => {
    const ability = defineAbility((can, cannot) => {
      can('update', 'Post', { authorId: 1 })
      cannot('update', 'Post')
    })

    const query = accessibleBy(ability, 'update').Post

    expect(query).toEqual({ $expr: false })
  })

  describe('it behaves like `toMongoQuery` when converting rules', () => {
    testConversionToMongoQuery((ability, subjectType, action) =>
      accessibleBy(ability, action)[subjectType])
  })
})
