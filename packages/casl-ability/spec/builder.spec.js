import { AbilityBuilder, Ability } from '../src'

describe('AbilityBuilder', () => {
  it('defines `Ability` instance using DSL', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules).to.deep.equal([
      { actions: 'read', subject: 'Book' },
      { inverted: true, actions: 'read', subject: 'Book', conditions: { private: true } }
    ])
  })

  it('can define `Ability` instance using async DSL', async () => {
    const ability = await AbilityBuilder.define(async (can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules).to.deep.equal([
      { actions: 'read', subject: 'Book' },
      { inverted: true, actions: 'read', subject: 'Book', conditions: { private: true } }
    ])
  })
})
