import { AbilityBuilder, Ability } from '../src'
import { Post } from './spec_helper'

describe('AbilityBuilder', () => {
  it('defines `Ability` instance using DSL', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules).to.deep.equal([
      { actions: 'read', subject: ['Book'] },
      { inverted: true, actions: 'read', subject: ['Book'], conditions: { private: true } }
    ])
  })

  it('defines `Ability` instance using DSL with Constructor', () => {
    const ability = AbilityBuilder.define((can, cannot) => {
      can('read', Post)
      cannot('read', Post, { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules).to.deep.equal([
      { actions: 'read', subject: ['Post'] },
      { inverted: true, actions: 'read', subject: ['Post'], conditions: { private: true } }
    ])
  })

  it('can define `Ability` instance using async DSL', async () => {
    const ability = await AbilityBuilder.define(async (can, cannot) => {
      can('read', 'Book')
      cannot('read', 'Book', { private: true })
    })

    expect(ability).to.be.instanceof(Ability)
    expect(ability.rules).to.deep.equal([
      { actions: 'read', subject: ['Book'] },
      { inverted: true, actions: 'read', subject: ['Book'], conditions: { private: true } }
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

    expect(ability.rules).to.deep.eql([
      { actions: 'read', subject: ['Book'] },
      {
        inverted: true,
        actions: 'read',
        subject: ['Book'],
        conditions: { private: true },
        reason
      }
    ])
  })

  describe('`can` DSL method', () => {
    it('throws exception if the 1st argument is not a string or array of strings', () => {
      expect(() => {
        AbilityBuilder.define(can => can({}, 'Post'))
      }).to.throw(/to be an action or array of actions/)
    })

    it('throws exception if the 2nd argument is not a string (and no suitable getSubjectName)', () => {
      expect(() => {
        AbilityBuilder.define(can => can('read', null))
      }).to.throw(/to be a subject name\/type or an array of subject names\/types/)
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
        { actions: 'read', subject: ['Post'] },
        { actions: 'read', subject: ['Comment'], conditions: { private: false } }
      ])
    })

    it('allows to define inverted rules', () => {
      const { can, cannot, rules } = AbilityBuilder.extract()
      can('read', 'Post')
      cannot('read', 'Comment', { private: true })

      expect(rules).to.deep.equal([
        { actions: 'read', subject: ['Post'] },
        { actions: 'read', subject: ['Comment'], conditions: { private: true }, inverted: true }
      ])
    })
  })
})
