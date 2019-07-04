import { rulesToFields } from '../src/extra'
import { AbilityBuilder, Ability } from '../src'

describe('rulesToFields', () => {
  it('returns an empty object if there are no rules with conditions', () => {
    const ability = AbilityBuilder.define(can => can('read', 'Post'))
    const query = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if an empty `Ability` instance is passed', () => {
    const ability = AbilityBuilder.define(() => {})
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns an empty object if at least one regular rule does not have conditions', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { author: 123 })
      can('read', 'Post')
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns an empty object if a rule with conditions defined last', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
  })

  it('returns `null` if specified only inverted rules', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Mind');
      cannot('read', 'Post', { private: true })
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns `null` if at least one inverted rule does not have conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Mind');
      cannot('read', 'Post', { author: 123 })
      cannot('read', 'Post')
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns `null` if at least one inverted rule does not have conditions even if direct condition exists', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.be.null
  })

  it('returns non-`null` if there is at least one regular rule after last inverted one without conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { public: true })
      cannot('read', 'Post', { author: 321 })
      cannot('read', 'Post')
      can('read', 'Post', { author: 123 })
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.deep.equal({ author: 123 })
  })

  it('extracts field values from regular rule conditions', () => {
    const ability = AbilityBuilder.define(can => {
      can('read', 'Post', { status: 'draft' })
      can('read', 'Post', { createdBy: 'me' })
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.deep.equal({ status: 'draft', createdBy: 'me' })
  })

  it('ignores inverted rules with conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { _id: 'mega' })
      can('read', 'Post', { state: 'draft' })
      cannot('read', 'Post', { private: true })
      cannot('read', 'Post', { state: 'archived' })
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(query).to.deep.equal({ _id: 'mega', state: 'draft' })
  })

  it('returns an empty object if an inverted rule with conditions defined before a regular rule without conditions', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Post', { author: 123 })
      cannot('read', 'Post', { private: true })
      can('read', 'Post')
    })
    const query = rulesToFields(ability, 'read', 'Post')

    expect(Object.keys(query)).to.be.empty
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
      can('read', 'Post', { status: { $in: ['draft', 'review'] } })
      can('read', 'Post', { private: true })
    })
    const object = rulesToFields(ability, 'read', 'Post')

    expect(object).to.deep.equal({ private: true })
  })
})
