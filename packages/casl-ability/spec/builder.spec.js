import { AbilityBuilder, defineAbility, PureAbility, createMongoAbility } from '../src'
import { Post, ruleToObject } from './spec_helper'

describe('AbilityBuilder', () => {
  describe('by default', () => {
    let b

    beforeEach(() => {
      b = new AbilityBuilder()
    })

    it('allows to construct rules using helper `can` and `cannot` functions', () => {
      b.can('read', 'Post')
      b.cannot('read', 'User')

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: 'Post' },
        { action: 'read', subject: 'User', inverted: true },
      ])
    })

    it('allows to specify multiple actions', () => {
      b.can(['read', 'update'], 'Post')

      expect(b.rules).to.deep.equal([
        { action: ['read', 'update'], subject: 'Post' }
      ])
    })

    it('allows to specify multiple subjects', () => {
      b.can('read', ['Post', 'User'])

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: ['Post', 'User'] }
      ])
    })

    it('allows to pass class or constructor function as a subject parameter to `can` and `cannot`', () => {
      b.can('read', Post)
      b.cannot('read', Post, { private: true })

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: Post },
        { inverted: true, action: 'read', subject: Post, conditions: { private: true } }
      ])
    })

    it('allows to build claim based rules (without subjects)', () => {
      b.can('read')
      b.can('write')
      b.cannot('delete')

      expect(b.rules).to.deep.equal([
        { action: 'read' },
        { action: 'write' },
        { action: 'delete', inverted: true }
      ])
    })

    it('allows to define rules with conditions', () => {
      b.can('read', 'Post', { author: 'me' })
      b.cannot('read', 'Post', { private: true })

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: 'Post', conditions: { author: 'me' } },
        { action: 'read', subject: 'Post', conditions: { private: true }, inverted: true },
      ])
    })

    it('allows to define rules with fields', () => {
      b.can('read', 'Post', ['title', 'id'])

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: 'Post', fields: ['title', 'id'] }
      ])
    })

    it('allows to define rules with fields and conditions', () => {
      b.can('read', 'Post', ['title'], { private: true })

      expect(b.rules).to.deep.equal([
        { action: 'read', subject: 'Post', fields: ['title'], conditions: { private: true } }
      ])
    })

    it('allows to define forbidden rule with the reason', () => {
      const reason = 'is private'
      b.can('read', 'Book')
      b.cannot('read', 'Book', { private: true }).because(reason)

      expect(b.rules).to.deep.eql([
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
  })

  it('can create Ability instance from a factory function', () => {
    const factory = spy(createMongoAbility)
    const { can, build, rules } = new AbilityBuilder(factory)
    const options = {}
    can('read', 'Post')
    build(options)

    expect(factory).to.have.been.called.with(rules, options)
  })

  it('can create Ability instance from a factory arrow function', () => {
    const factorySpy = spy()
    const factory = (...args) => factorySpy(...args)
    const { can, build, rules } = new AbilityBuilder(factory)
    const options = {}
    can('read', 'Post')
    build(options)

    expect(factorySpy).to.have.been.called.with(rules, options)
  })

  describe('defineAbility', () => {
    it('defines `Ability` instance using DSL', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Book')
        cannot('read', 'Book', { private: true })
      })

      expect(ability).to.be.instanceof(PureAbility)
      expect(ability.rules.map(ruleToObject)).to.deep.equal([
        { action: 'read', subject: 'Book' },
        { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
      ])
    })

    it('returns `Promise<Ability>` when used async DSL', async () => {
      const ability = await defineAbility(async (can, cannot) => {
        can('read', 'Book')
        cannot('read', 'Book', { private: true })
      })

      expect(ability).to.be.instanceof(PureAbility)
      expect(ability.rules.map(ruleToObject)).to.deep.equal([
        { action: 'read', subject: 'Book' },
        { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
      ])
    })

    it('accepts options for `Ability` instance as the 2nd parameter', () => {
      const detectSubjectType = subject => typeof subject === 'string' ? subject : subject.ModelName
      const ability = defineAbility((can) => {
        can('read', 'Book')
      }, { detectSubjectType })

      expect(ability.can('read', { ModelName: 'Book' })).to.be.true
    })
  })
})
