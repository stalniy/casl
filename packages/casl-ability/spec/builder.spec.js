import { AbilityBuilder, Ability } from '../src'
import { Post, ruleToObject } from './spec_helper'

describe('AbilityBuilder', () => {
  it('defines `Ability` instance using DSL', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules.map(ruleToObject)).to.deep.equal([
      { action: 'read', subject: 'Book' },
      { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
    ])
  })

  it('defines `Ability` instance using DSL with Constructor', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', Post)
      cannot('read', Post, { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules.map(ruleToObject)).to.deep.equal([
      { action: 'read', subject: Post },
      { inverted: true, action: 'read', subject: Post, conditions: { private: true } }
    ])
  })

  it('can define `Ability` instance using async DSL', async () => {
    const ability = await AbilityBuilder.define(async (can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules.map(ruleToObject)).to.deep.equal([
      { action: 'read', subject: 'Book' },
      { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
    ])
  })

  it('allows to pass options into `Ability` constructor as the 1st parameter for `define` method', () => {
    const subjectName = subject => typeof subject === 'string' ? subject : subject.ModelName
    const ability = AbilityBuilder.define({ subjectName }, (can) => {
      can('read', 'Book')
    })

    expect(ability.can('read', { ModelName: 'Book' })).to.be.true
  })

  it('allows to define forbidden rule with the reason', () => {
    const reason = 'is private'
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true }).because(reason)
    })

    expect(ability.rules.map(ruleToObject)).to.deep.eql([
      {
        action: 'read',
        subject: 'Book'
      },
      {
        inverted: true,
        action: 'read',
        subject: 'Book',
        conditions: { private: true },
        reason
      }
    ])
  })

  it('allows to specify multiple actions and match any', () => {
    const ability = AbilityBuilder.define(can => can(['read', 'update'], 'Post'))

    expect(ability).to.allow('read', 'Post')
    expect(ability).to.allow('update', 'Post')
  })

  it('allows to specify multiple subjects and match any', () => {
    const ability = AbilityBuilder.define(can => can('read', ['Post', 'User']))

    expect(ability).to.allow('read', 'Post')
    expect(ability).to.allow('read', 'User')
  })

  describe('`can` DSL method', () => {
    it('throws exception if the 1st argument is not a string or array of strings', () => {
      expect(() => {
        AbilityBuilder.define(can => can({}, 'Post'))
      }).to.throw(/to be an action or array of actions/)
    })
  })

  describe('`extract` method', () => {
    it('returns plain object with properties: `can`, `cannot` and `rules`', () => {
      const { can, cannot, rules } = AbilityBuilder.extract()

      expect(can).to.be.a('function')
      expect(cannot).to.be.a('function')
      expect(rules).to.be.an('array')
    })

    it('allows to define regular rules', () => {
      const { can, rules } = AbilityBuilder.extract()
      can('read', 'Post')
      can('read', 'Comment', { private: false })

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post' },
        { action: 'read', subject: 'Comment', conditions: { private: false } }
      ])
    })

    it('allows to define inverted rules', () => {
      const { can, cannot, rules } = AbilityBuilder.extract()
      can('read', 'Post')
      cannot('read', 'Comment', { private: true })

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post' },
        { action: 'read', subject: 'Comment', conditions: { private: true }, inverted: true }
      ])
    })

    it('allows to build claim based `Ability`', () => {
      const { can, cannot, rules } = AbilityBuilder.extract()

      can('read')
      can('write')
      cannot('delete')

      expect(rules).to.deep.equal([
        { action: 'read' },
        { action: 'write' },
        { action: 'delete', inverted: true }
      ])
    })

    it('provides `build` function which builds an instance of `Ability`', () => {
      const { can, build } = AbilityBuilder.extract()

      can('read', 'Post')
      const ability = build()

      expect(ability).to.be.an.instanceof(Ability)
      expect(ability.rules.map(ruleToObject)).to.deep.equal([
        { action: 'read', subject: 'Post' }
      ])
    })

    it('accepts optional `options` parameter which is them passed to `Ability` constructor', () => {
      const subjectName = () => 'all'
      const { can, build } = AbilityBuilder.extract({ subjectName })

      can('read', 'Post')
      const ability = build()

      expect(ability.subjectName).to.equal(subjectName)
    })
  })
})
