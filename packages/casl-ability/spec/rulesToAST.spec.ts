import { interpret } from '@ucast/js'
import { defineAbility, subject } from '../src'
import { rulesToAST } from '../src/extra'
import { Condition } from '@ucast/mongo2js'

describe(rulesToAST.name, () => {
  it('returns empty "and" `Condition` if there are no conditions in `Ability`', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const ast = rulesToAST(ability, 'read', 'Post')

    expect(ast?.operator).toEqual('and')
    expect(ast?.value).toBeInstanceOf(Array)
    expect(ast?.value).toHaveLength(0)
  })

  it('returns `null` if there is no ability to do an action', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const ast = rulesToAST(ability, 'update', 'Post')

    expect(ast).toBeNull()
  })

  it('returns only "or" `Condition` if there are no forbidden rules', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { author: 1 })
      can('read', 'Post', { private: false })
    })
    const ast = rulesToAST(ability, 'read', 'Post')

    expect(ast).toEqual({
      operator: 'or',
      value: [
        { operator: 'eq', field: 'private', value: false },
        { operator: 'eq', field: 'author', value: 1 },
      ]
    })
  })

  it('returns "and" condition that includes "or" if there are forbidden and regular rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { author: 1 })
      can('read', 'Post', { sharedWith: 1 })
      cannot('read', 'Post', { private: true })
    })
    const ast = rulesToAST(ability, 'read', 'Post')

    expect(ast).toEqual({
      operator: 'or',
      value: [
        {
          operator: 'and',
          value: [
            { operator: 'eq', field: 'sharedWith', value: 1 },
            {
              operator: 'not',
              value: [
                { operator: 'eq', field: 'private', value: true }
              ]
            }
          ]
        },
        {
          operator: 'and',
          value: [
            { operator: 'eq', field: 'author', value: 1 },
            {
              operator: 'not',
              value: [
                { operator: 'eq', field: 'private', value: true }
              ]
            }
          ]
        }
      ]
    })
  })

  it('interprets AST the same way as `Ability` for OR-ed regular rules', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { authorId: 1 })
      can('read', 'Post', { status: { $in: ['review', 'published'] } })
    })
    const posts = [
      { authorId: 1, status: 'draft' },
      { authorId: 2, status: 'published' },
      { authorId: 2, status: 'archived' },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` for priority ordered rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { ownerId: 1 })
      cannot('read', 'Post', { archived: true })
      can('read', 'Post', { shared: true })
      cannot('read', 'Post', { hidden: true })
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { flagged: true })
      can('read', 'Post', { status: 'pinned' })
    })
    const posts = [
      { status: 'pinned', flagged: true },
      { public: true, flagged: true },
      { public: true, hidden: true },
      { shared: true, hidden: true },
      { ownerId: 1, archived: true },
      { ownerId: 1 },
      { public: false, shared: false, ownerId: 2 },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
    expect(ability.can('read', posts[4])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[4]))
    expect(ability.can('read', posts[5])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[5]))
    expect(ability.can('read', posts[6])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[6]))
  })

  it('interprets AST the same way as `Ability` for nested priority overrides', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { author: 'me' })
      can('read', 'Post', { author: 'me', admin: true })
    })
    const posts = [
      { author: 'me', admin: true },
      { author: 'me', admin: false },
      { author: 'someoneelse', admin: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` when general allow is followed by specific deny', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { secret: true })
    })
    const posts = [
      { secret: true },
      { secret: false },
      { title: 'Public' },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` when specific deny is followed by general allow', () => {
    const ability = defineAbility((can, cannot) => {
      cannot('read', 'Post', { secret: true })
      can('read', 'Post')
    })
    const posts = [
      { secret: true },
      { secret: false },
      { title: 'Public' },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` when conditional allow overrides global deny', () => {
    const ability = defineAbility((can, cannot) => {
      cannot('read', 'Post')
      can('read', 'Post', { owner: 'me' })
    })
    const posts = [
      { owner: 'me' },
      { owner: 'someoneelse' },
      { title: 'Public' },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` for multiple negative overrides', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { archived: true })
      cannot('read', 'Post', { locked: true })
    })
    const posts = [
      { archived: true, locked: true },
      { archived: true, locked: false },
      { archived: false, locked: true },
      { archived: false, locked: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
  })

  it('interprets AST the same way as `Ability` when unconditional deny shadows lower priority allow', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post')
    })
    const posts = [
      { author: 'me' },
      { secret: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
  })

  it('interprets AST the same way as `Ability` for OR-ed simple and composite conditions', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { status: 'published' })
      can('read', 'Post', { status: 'draft', owner: 'me' })
    })
    const posts = [
      { status: 'published', owner: 'someoneelse' },
      { status: 'draft', owner: 'me' },
      { status: 'draft', owner: 'someoneelse' },
      { status: 'archived', owner: 'me' },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
  })

  it('interprets AST the same way as `Ability` when unconditional `can` is bounded by higher priority `cannot` rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('read', 'Post', { private: true })
      can('read', 'Post', { authorId: 1 })
    })
    const posts = [
      { authorId: 1, private: true },
      { authorId: 2, private: true },
      { authorId: 2, private: false },
      { authorId: 2 },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
  })

  it('interprets AST the same way as `Ability` when unconditional `cannot` stops lower priority rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post')
      can('read', 'Post', { authorId: 1 })
    })

    const posts = [
      { authorId: 1, public: false },
      { authorId: 2, public: true },
      { authorId: 2, public: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` when a higher priority `can` overrides lower priority `cannot`', () => {
    const ability = defineAbility((can, cannot) => {
      cannot('manage', 'Post', { id: 1 })
      can('manage', 'Post', { id: 1 })
    })
    const posts = [
      { id: 1 },
      { id: 2 },
    ].map(post => subject('Post', post))

    expect(ability.can('manage', posts[0])).toBe(interpretAST(rulesToAST(ability, 'manage', 'Post'), posts[0]))
    expect(ability.can('manage', posts[1])).toBe(interpretAST(rulesToAST(ability, 'manage', 'Post'), posts[1]))
  })

  it('interprets AST the same way as `Ability` when only `cannot` rules are defined', () => {
    const ability = defineAbility((_, cannot) => {
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { archived: true })
    })
    const posts = [
      { private: true },
      { archived: true },
      { private: false, archived: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` when unrelated action and subject rules exist', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { published: true })
      cannot('read', 'Post', { archived: true })
      can('update', 'Post', { authorId: 1 })
      cannot('update', 'Post', { locked: true })
      can('read', 'Comment', { approved: true })
    })
    const posts = [
      { published: true, archived: false },
      { published: true, archived: true },
      { authorId: 1, published: false },
      { approved: true, published: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
  })

  it('interprets AST the same way as `Ability` when field-specific rules are mixed with subject-level rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { authorId: 1 })
      cannot('read', 'Post', 'description', { private: true })
      cannot('read', 'Post', 'metadata')
    })
    const posts = [
      { authorId: 1, private: true },
      { authorId: 1, private: false },
      { authorId: 2, private: false },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
  })

  it('interprets AST the same way as `Ability` for alternating `can` and `cannot` rules with different operators', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { score: { $gte: 10 } })
      cannot('read', 'Post', { tags: { $in: ['blocked'] } })
      can('read', 'Post', { reviewerIds: { $in: [1] } })
      cannot('read', 'Post', { deletedAt: { $exists: true } })
      can('read', 'Post', { status: { $in: ['featured', 'pinned'] } })
    })
    const posts = [
      { score: 12, tags: ['news'] },
      { score: 12, tags: ['blocked'] },
      { reviewerIds: [1], deletedAt: new Date() },
      { status: 'featured', deletedAt: new Date() },
      { status: 'draft', reviewerIds: [2], score: 1 },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
    expect(ability.can('read', posts[4])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[4]))
  })

  it('interprets AST the same way as `Ability` when higher priority `cannot` shadows an overlapping `can` branch', () => {
    const ability = defineAbility((can, cannot) => {
      can('read', 'Post', { private: true });
      can('read', 'Post', { draft: false });
      cannot('read', 'Post', { private: true });
    });

    const posts = [
      { private: true, draft: false },
      { private: true, draft: true },
      { private: false, draft: false },
      { private: false, draft: true },
    ].map(post => subject('Post', post))

    expect(ability.can('read', posts[0])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[0]))
    expect(ability.can('read', posts[1])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[1]))
    expect(ability.can('read', posts[2])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[2]))
    expect(ability.can('read', posts[3])).toBe(interpretAST(rulesToAST(ability, 'read', 'Post'), posts[3]))
  })
})

function interpretAST(ast: Condition | null, instance: {}): boolean  {
  return ast === null ? false : interpret(ast, instance)
}
