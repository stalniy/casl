import { AbilityBuilder, Ability, defineAbility } from '../src'
import { Post, ruleToObject } from './spec_helper'

describe('AbilityBuilder', () => {
  describe('by default', () => {
    let can
    let cannot
    let rules

    beforeEach(() => {
      const builder = new AbilityBuilder()
      can = builder.can
      cannot = builder.cannot
      rules = builder.rules
    })

    it('allows to construct rules using helper `can` and `cannot` functions', () => {
      can('read', 'Post')
      cannot('read', 'User')

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post' },
        { action: 'read', subject: 'User', inverted: true },
      ])
    })

    it('allows to specify multiple actions', () => {
      can(['read', 'update'], 'Post')

      expect(rules).to.deep.equal([
        { action: ['read', 'update'], subject: 'Post' }
      ])
    })

    it('allows to specify multiple subjects', () => {
      can('read', ['Post', 'User'])

      expect(rules).to.deep.equal([
        { action: 'read', subject: ['Post', 'User'] }
      ])
    })

    it('allows to pass class or constructor function as a subject parameter to `can` and `cannot`', () => {
      can('read', Post)
      cannot('read', Post, { private: true })

      expect(rules).to.deep.equal([
        { action: 'read', subject: Post },
        { inverted: true, action: 'read', subject: Post, conditions: { private: true } }
      ])
    })

    it('allows to build claim based rules (without subjects)', () => {
      can('read')
      can('write')
      cannot('delete')

      expect(rules).to.deep.equal([
        { action: 'read' },
        { action: 'write' },
        { action: 'delete', inverted: true }
      ])
    })

    it('allows to define rules with conditions', () => {
      can('read', 'Post', { author: 'me' })
      cannot('read', 'Post', { private: true })

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post', conditions: { author: 'me' } },
        { action: 'read', subject: 'Post', conditions: { private: true }, inverted: true },
      ])
    })

    it('allows to define rules with fields', () => {
      can('read', 'Post', ['title', 'id'])

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post', fields: ['title', 'id'] }
      ])
    })

    it('allows to define rules with fields and conditions', () => {
      can('read', 'Post', ['title'], { private: true })

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post', fields: ['title'], conditions: { private: true } }
      ])
    })

    it('allows to define forbidden rule with the reason', () => {
      const reason = 'is private'
      can('read', 'Book')
      cannot('read', 'Book', { private: true }).because(reason)

      expect(rules).to.deep.eql([
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

  describe('defineAbility', () => {
    it('defines `Ability` instance using DSL', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Book')
        cannot('read', 'Book', { private: true })
      })

      expect(ability).to.be.instanceof(Ability)
      expect(ability.rules.map(ruleToObject)).to.deep.equal([
        { action: 'read', subject: 'Book' },
        { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
      ])
    })

    it('can define `Ability` instance using async DSL', async () => {
      const ability = await defineAbility(async (can, cannot) => {
        can('read', 'Book')
        cannot('read', 'Book', { private: true })
      })

      expect(ability).to.be.instanceof(Ability)
      expect(ability.rules.map(ruleToObject)).to.deep.equal([
        { action: 'read', subject: 'Book' },
        { inverted: true, action: 'read', subject: 'Book', conditions: { private: true } }
      ])
    })

    it('accepts options for `Ability` instance as the 1st parameter', () => {
      const detectSubjectType = subject => typeof subject === 'string' ? subject : subject.ModelName
      const ability = defineAbility({ detectSubjectType }, (can) => {
        can('read', 'Book')
      })

      expect(ability.can('read', { ModelName: 'Book' })).to.be.true
    })
  })
})
