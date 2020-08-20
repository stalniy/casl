import { defineAbility } from '../src'
import { rulesToAST } from '../src/extra'

describe('rulesToAST', () => {
  it('returns empty "and" `Condition` if there are no conditions in `Ability`', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const ast = rulesToAST(ability, 'read', 'Post')

    expect(ast.operator).to.equal('and')
    expect(ast.value).to.be.an('array').that.is.empty
  })

  it('returns `null` if there is no ability to do an action', () => {
    const ability = defineAbility(can => can('read', 'Post'))
    const ast = rulesToAST(ability, 'update', 'Post')

    expect(ast).to.be.null
  })

  it('returns only "or" `Condition` if there are no forbidden rules', () => {
    const ability = defineAbility((can) => {
      can('read', 'Post', { author: 1 })
      can('read', 'Post', { private: false })
    })
    const ast = rulesToAST(ability, 'read', 'Post')

    expect(ast).to.deep.equal({
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

    expect(ast).to.deep.equal({
      operator: 'and',
      value: [
        { operator: 'eq', field: 'private', value: true },
        {
          operator: 'or',
          value: [
            { operator: 'eq', field: 'sharedWith', value: 1 },
            { operator: 'eq', field: 'author', value: 1 },
          ]
        }
      ]
    })
  })
})
