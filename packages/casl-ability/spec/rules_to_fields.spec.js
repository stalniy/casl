import { rulesToFields } from '../src/extra'
import { AbilityBuilder, Ability } from '../src'

describe('rulesToFields', () => {
  it('returns an empty object for an empty `Ability` instance', () => {
    const object = rulesToFields(new Ability(), 'read', 'Post')

    expect(object).to.be.an('object').and.empty
  })

  it('returns an empty object if `Ability` contains only inverted rules', () => {
    const ability = AbilityBuilder.define((_, cannot) => {
      cannot('read', 'Post', { id: 5 })
      cannot('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).to.be.an('object').and.empty
  })

  it('extracts field values from direct rule conditions', () => {
    const ability = AbilityBuilder.define((can) => {
      can('read', 'Post', { id: 5 })
      can('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).to.deep.equal({ id: 5, private: true })
  })

  it('correctly sets values for fields declared with `dot notation`', () => {
    const ability = AbilityBuilder.define((can) => {
      can('read', 'Post', { id: 5 })
      can('read', 'Post', { 'state.private': true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).to.deep.equal({
      id: 5,
      state: {
        private: true
      }
    })
  })

  it('skips plain object values (i.e., mongo query expressions)', () => {
    const ability = AbilityBuilder.define((can) => {
      can('read', 'Post', { state: { $in: ['draft', 'review'] } })
      can('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).to.deep.equal({ private: true })
  })
})
