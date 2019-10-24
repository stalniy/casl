import { AbilityBuilder, ForbiddenError, Ability } from '../src'
import { Post } from './spec_helper'

describe('Ability', () => {
  let ability

  it('allows to add alias for actions', () => {
    Ability.addAlias('modify', ['update', 'delete'])
    ability = AbilityBuilder.define(can => can('modify', 'Post'))

    expect(ability).to.allow('modify', 'Post')
  })

  it('allows deeply nested aliased actions', () => {
    Ability.addAlias('sort', 'increment')
    Ability.addAlias('modify', ['sort'])
    ability = AbilityBuilder.define(can => can('modify', 'all'))

    expect(ability).to.allow('increment', 123)
  })

  it('throws exception when trying to define `manage` alias', () => {
    expect(() => Ability.addAlias('manage', 'crud')).to.throw(Error)
  })

  it('throws exception when trying to make `manage` a part of aliased action', () => {
    expect(() => Ability.addAlias('modify', ['crud', 'manage'])).to.throw(Error)
  })

  it('throws exception when trying to alias action to itself', () => {
    expect(() => Ability.addAlias('sort', 'sort')).to.throw(Error)
    expect(() => Ability.addAlias('sort', ['order', 'sort'])).to.throw(Error)
  })

  it('provides predefined `crud` alias for `create`, `read`, `update` and `delete` actions', () => {
    ability = AbilityBuilder.define(can => can('crud', 'Post'))

    expect(ability).to.allow('crud', 'Post')
    expect(ability).to.allow('create', 'Post')
    expect(ability).to.allow('read', 'Post')
    expect(ability).to.allow('update', 'Post')
    expect(ability).to.allow('delete', 'Post')
    expect(ability).not.to.allow('any other action', 'Post')
  })

  it('provides `can` and `cannot` methods to check abilities', () => {
    ability = AbilityBuilder.define(can => can('read', 'Post'))

    expect(ability.can('read', 'Post')).to.be.true
    expect(ability.cannot('read', 'Post')).to.be.false
  })

  it('lists all rules', () => {
    ability = AbilityBuilder.define((can, cannot) => {
      can('crud', 'all')
      can('learn', 'Range')
      cannot('read', 'String')
      cannot('read', 'Hash')
      cannot('preview', 'Array')
    })

    expect(ability.rules).to.deep.equal([
      { actions: 'crud', subject: ['all'] },
      { actions: 'learn', subject: ['Range'] },
      { actions: 'read', subject: ['String'], inverted: true },
      { actions: 'read', subject: ['Hash'], inverted: true },
      { actions: 'preview', subject: ['Array'], inverted: true },
    ])
  })

  it('allows to specify multiple actions and match any', () => {
    ability = AbilityBuilder.define(can => can(['read', 'update'], 'Post'))

    expect(ability).to.allow('read', 'Post')
    expect(ability).to.allow('update', 'Post')
  })

  it('allows to specify multiple subjects and match any', () => {
    ability = AbilityBuilder.define(can => can('read', ['Post', 'User']))

    expect(ability).to.allow('read', 'Post')
    expect(ability).to.allow('read', 'User')
  })

  it('allows to update rules', () => {
    ability = AbilityBuilder.define(can => can('read', ['Post', 'User']))

    expect(ability).to.allow('read', 'Post')

    ability.update([])

    expect(ability.rules).to.be.empty
    expect(ability).not.to.allow('read', 'Post')
    expect(ability).not.to.allow('read', 'User')
  })

  describe('by default', () => {
    beforeEach(() => {
      ability = AbilityBuilder.define((can, cannot) => {
        can(['read', 'update'], 'Post')
        can('delete', 'Post', { creator: 'admin' })
        cannot('publish', 'Post')
      })
    })

    it('allows to perform specified actions on target instance', () => {
      expect(ability).to.allow('read', new Post())
      expect(ability).to.allow('update', new Post())
    })

    it('allows to perform specified actions on target type', () => {
      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('update', 'Post')
    })

    it('disallows to perform unspecified action on target', () => {
      expect(ability).not.to.allow('archive', 'Post')
      expect(ability).not.to.allow('archive', new Post())
    })

    it('disallows to perform action if action or/and target is falsy', () => {
      expect(ability).not.to.allow(null, 'Post')
      expect(ability).not.to.allow('read', null)
    })

    it('disallows to perform action on unspecified target type', () => {
      expect(ability).not.to.allow('read', 'User')
    })

    it('allows to perform action if target type matches at least 1 rule with or without conditions', () => {
      expect(ability).to.allow('delete', 'Post')
    })

    it('allows to perform action if target instance matches conditions', () => {
      expect(ability).to.allow('delete', new Post({ creator: 'admin' }))
    })

    it('disallows to perform action if target instance does not match conditions', () => {
      expect(ability).not.to.allow('delete', new Post({ creator: 'user' }))
    })

    it('disallows to perform action for inverted rule when checks by subject type', () => {
      expect(ability).not.to.allow('publish', 'Post')
    })

    describe('`throwUnlessCan` method', () => {
      it('raises forbidden exception on disallowed action', () => {
        expect(() => ability.throwUnlessCan('archive', 'Post')).to.throw(ForbiddenError)
      })

      it('does not raise forbidden exception on allowed action', () => {
        expect(() => ability.throwUnlessCan('read', 'Post')).not.to.throw(Error)
      })

      it('raises error with context information', () => {
        let error = new Error('No error raised')

        try {
          ability.throwUnlessCan('archive', 'Post')
        } catch (abilityError) {
          error = abilityError
        }

        expect(error).to.have.property('action').that.equal('archive')
        expect(error).to.have.property('subject').that.equal('Post')
        expect(error).to.have.property('subjectName').that.equal('Post')
      })

      it('raises error with message provided in `reason` field of forbidden rule', () => {
        const NO_CARD_MESSAGE = 'No credit card provided'
        const userAbility = AbilityBuilder.define((can, cannot) => {
          cannot('update', 'Post').because(NO_CARD_MESSAGE)
        })

        expect(() => userAbility.throwUnlessCan('update', 'Post')).to.throw(NO_CARD_MESSAGE)
      })
    })

    describe('`update` method', () => {
      let updateHandler

      beforeEach(() => {
        updateHandler = spy()
      })

      it('triggers "update" event', () => {
        const rules = []
        ability.on('update', updateHandler)
        ability.update(rules)

        expect(updateHandler).to.have.been.called.with.exactly({ ability, rules })
      })

      it('triggers "updated" event after rules have been updated', () => {
        const rules = []
        ability.on('updated', updateHandler)
        ability.update(rules)

        expect(updateHandler).to.have.been.called.with.exactly({ ability, rules })
      })

      it('allows to remove subscription to "update" event', () => {
        const unsubscribe = ability.on('update', updateHandler)
        unsubscribe()
        ability.update([])

        expect(updateHandler).not.to.have.been.called()
      })

      it('does not remove 2nd subscription when unsubscribe called 2 times', () => {
        const anotherHandler = spy()
        const unsubscribe = ability.on('update', updateHandler)

        ability.on('update', anotherHandler)
        unsubscribe()
        unsubscribe()
        ability.update([])

        expect(updateHandler).not.to.have.been.called()
        expect(anotherHandler).to.have.been.called()
      })

      it('invokes all subscribers even if they are changed during "emit" phase', () => {
        const firstSubscription = setupListenerChangesInListener()
        const secondSubscription = setupListenerChangesInListener()

        ability.update([])

        expect(firstSubscription).to.have.been.called()
        expect(secondSubscription).to.have.been.called()
      })

      it('warns if ability contains only inverted rules', () => {
        spy.on(console, 'warn')
        ability.update([{ inverted: true, action: 'read', subject: 'Post' }])

        expect(console.warn).to.have.been.called()

        spy.restore(console, 'warn')
      })

      function setupListenerChangesInListener() {
        const unsubscribe = spy(ability.on('update', function listen() {
          unsubscribe()
          ability.on('update', listen)
        }))

        return unsubscribe
      }
    })
  })

  describe('rule precedence', () => {
    it('checks every rule using logical OR operator (the order matters!)', () => {
      ability = AbilityBuilder.define((can) => {
        can('delete', 'Post', { creator: 'me' })
        can('delete', 'Post', { sharedWith: { $in: ['me'] } })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
      expect(ability).to.allow('delete', new Post({ sharedWith: 'me' }))
    })

    it('checks rules in inverse order', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('delete', 'Post', { creator: 'me' })
        cannot('delete', 'Post', { archived: true })
      })

      expect(ability).not.to.allow('delete', new Post({ creator: 'me', archived: true }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows rule with conditions by the same rule without conditions', () => {
      ability = AbilityBuilder.define((can) => {
        can('crud', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('does not shadow rule with conditions by the same rule if the last one is disallowed by `cannot`', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('crud', 'Post')
        cannot('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).not.to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows inverted rule by regular one', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        cannot('delete', 'Post', { creator: 'me' })
        can('crud', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows `all` subject rule by specific one', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('delete', 'all')
        cannot('delete', 'Post')
      })

      expect(ability).not.to.allow('delete', 'Post')
      expect(ability).to.allow('delete', 'User')
    })
  })

  describe('rule conditions', () => {
    it('allows to use equality conditions', () => {
      ability = AbilityBuilder.define((can) => {
        can('read', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('read', new Post({ creator: 'me' }))
      expect(ability).not.to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$ne` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })

      expect(ability).not.to.allow('read', new Post({ creator: 'me' }))
      expect(ability).to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$in` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('read', 'Post', { state: { $in: ['shared', 'draft'] } })
      })

      expect(ability).to.allow('read', new Post({ state: 'draft' }))
      expect(ability).to.allow('read', new Post({ state: 'shared' }))
      expect(ability).to.allow('read', new Post({ state: ['shared', 'public'] }))
    })

    it('allows to use mongo like `$all` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('read', 'Post', { state: { $all: ['shared', 'draft'] } })
      })

      expect(ability).not.to.allow('read', new Post({ state: 'draft' }))
      expect(ability).not.to.allow('read', new Post({ state: 'shared' }))
      expect(ability).to.allow('read', new Post({ state: ['shared', 'draft'] }))
    })

    it('allows to use mongo like `$gt` and `$gte` condition', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('update', 'Post', { views: { $gt: 10 } })
        cannot('update', 'Post', { views: { $gte: 1000 } })
      })

      expect(ability).not.to.allow('update', new Post({ views: 9 }))
      expect(ability).to.allow('update', new Post({ views: 100 }))
      expect(ability).not.to.allow('update', new Post({ views: 1001 }))
    })

    it('allows to use mongo like `$lt` and `$lte` condition', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('update', 'Post', { views: { $lt: 5 } })
        cannot('update', 'Post', { views: { $lte: 2 } })
      })

      expect(ability).not.to.allow('update', new Post({ views: 2 }))
      expect(ability).to.allow('update', new Post({ views: 3 }))
    })

    it('allows to use mongo like `$exists` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('read', 'Post', { views: { $exists: true } })
      })

      expect(ability).not.to.allow('read', new Post())
      expect(ability).to.allow('read', new Post({ views: 3 }))
    })

    it('allows to use mongo like dot notation conditions', () => {
      ability = AbilityBuilder.define((can) => {
        can('delete', 'Post', { 'authors.0': { $exists: false } })
        can('update', 'Post', { 'comments.author': 'Ted' })
      })

      expect(ability).not.to.allow('delete', new Post({ authors: ['me', 'someoneelse'] }))
      expect(ability).to.allow('delete', new Post({ authors: [] }))
      expect(ability).to.allow('update', new Post({ comments: [{ author: 'Ted' }, { author: 'John' }] }))
      expect(ability).not.to.allow('update', new Post({ comments: [{ author: 'John' }] }))
    })

    it('properly compares object-primitives like `ObjectId` that have `toJSON` method', () => {
      const complexValue = value => ({ value, toJSON: () => value, toString: () => value })
      ability = AbilityBuilder.define((can) => {
        can('delete', 'Post', { creator: complexValue(321) })
        can('update', 'Post', { state: { $in: [complexValue('draft'), complexValue('shared')] } })
      })

      expect(ability).to.allow('delete', new Post({ creator: complexValue(321) }))
      expect(ability).not.to.allow('delete', new Post({ creator: complexValue(123) }))
      expect(ability).not.to.allow('update', new Post({ state: complexValue('archived') }))
      expect(ability).to.allow('update', new Post({ state: complexValue('draft') }))
    })

    it('allows to use mongo like `$regex` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('delete', 'Post', { title: { $regex: '\\[DELETED\\]' } })
      })

      expect(ability).not.to.allow('delete', new Post({ title: 'public' }))
      expect(ability).not.to.allow('delete', new Post({ title: '[deleted] title' }))
      expect(ability).to.allow('delete', new Post({ title: '[DELETED] title' }))
    })

    it('allows to use mongo like `$elemMatch` condition', () => {
      ability = AbilityBuilder.define((can) => {
        can('delete', 'Post', { authors: { $elemMatch: { id: 'me-id' } } })
      })

      expect(ability).not.to.allow('delete', new Post({ authors: [{ id: 'someone-else-id' }] }))
      expect(ability).to.allow('delete', new Post({ authors: [{ id: 'me-id' }] }))
      expect(ability).to.allow('delete', new Post({ authors: [{ id: 'someone-else-id' }, { id: 'me-id' }] }))
    })

    it('returns true for `Ability` which contains inverted rule and subject specified as string', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', { private: true })
      })

      expect(ability).to.allow('read', 'Post')
    })
  })

  describe('per field abilities', () => {
    it('allows to define per field rules', () => {
      ability = AbilityBuilder.define(can => can('read', 'Post', 'title'))

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to define rules for several fields', () => {
      ability = AbilityBuilder.define(can => can('read', 'Post', ['title', 'id']))

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).to.allow('read', 'Post', 'id')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to define inverted rules for a field', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'description')
      })

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to perform actions on all attributes if none is specified', () => {
      ability = AbilityBuilder.define(can => can('read', 'Post'))

      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).to.allow('read', 'Post', 'description')
    })

    it('throws exception if 3rd argument is not a string', () => {
      ability = AbilityBuilder.define(can => can('read', 'Post', 'title'))

      expect(() => ability.can('read', 'Post', { title: 'test' })).to.throw(/expects 3rd parameter to be a string/)
    })

    describe('when field patterns', () => {
      it('allows to act on any 1st level field (e.g., author.*)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author.*'))

        expect(ability).to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.*')
        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', 'author.age')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on field at any depth (e.g., author.**)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author.**'))

        expect(ability).to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.**')
        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', 'author.age')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by star in the middle of path (e.g., author.*.name)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author.*.name'))

        expect(ability).not.to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.*.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.startDate')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.country.name')
      })

      it('allows to act on fields defined by 2 stars in the middle of path (e.g., author.**.name)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author.**.name'))

        expect(ability).not.to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.**.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.startDate')
        expect(ability).to.allow('read', 'Post', 'author.publication.country.name')
      })

      it('allows to act on fields defined by star at the begining (e.g., *.name)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', '*.name'))

        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', '*.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by 2 stars at the begining (e.g., **.name)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', '**.name'))

        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', '**.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by stars (e.g., author.address.street*)', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author.address.street*'))

        expect(ability).to.allow('read', 'Post', 'author.address.street')
        expect(ability).to.allow('read', 'Post', 'author.address.street1')
        expect(ability).to.allow('read', 'Post', 'author.address.street2')
        expect(ability).not.to.allow('read', 'Post', 'author.address')
      })

      it('correctly works with special regexp symbols', () => {
        ability = AbilityBuilder.define(can => can('read', 'Post', 'author?.address+.street*'))

        expect(ability).to.allow('read', 'Post', 'author?.address+.street')
        expect(ability).to.allow('read', 'Post', 'author?.address+.street1')
        expect(ability).to.allow('read', 'Post', 'author?.address+.street2')
        expect(ability).not.to.allow('read', 'Post', 'author?.address+')
      })
    })

    describe('when `conditions` defined', () => {
      const myPost = new Post({ author: 'me' })

      beforeEach(() => {
        ability = AbilityBuilder.define((can) => {
          can('read', 'Post', ['title', 'description'], { author: myPost.author })
        })
      })

      it('allows to perform action on subject specified as string', () => {
        expect(ability).to.allow('read', 'Post')
      })

      it('allows to perform action on subject field, both specified as strings', () => {
        expect(ability).to.allow('read', 'Post', 'title')
        expect(ability).to.allow('read', 'Post', 'description')
      })

      it('does not allow to perform action on instance of the subject which mismatches specified conditions', () => {
        expect(ability).not.to.allow('read', new Post())
      })

      it('allows to perform action on instance which matches conditions', () => {
        expect(ability).to.allow('read', myPost)
      })

      it('allows to perform action on instance field if that instance matches conditions', () => {
        expect(ability).to.allow('read', myPost, 'title')
        expect(ability).to.allow('read', myPost, 'description')
      })

      it('does not allow to perform action on instance field if that instance matches conditions but field is not in specified list', () => {
        expect(ability).not.to.allow('read', myPost, 'id')
      })
    })
  })

  describe('`manage` action', () => {
    it('is an alias for any action', () => {
      ability = AbilityBuilder.define((can) => {
        can('manage', 'all')
      })

      expect(ability).to.allow('read', 'post')
      expect(ability).to.allow('do_whatever_anywhere', 'post')
    })

    it('honours `cannot` rules', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('manage', 'all')
        cannot('read', 'post')
      })

      expect(ability).not.to.allow('read', 'post')
      expect(ability).to.allow('update', 'post')
    })

    it('can be used with `cannot`', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'post')
        cannot('manage', 'all')
      })

      expect(ability).not.to.allow('read', 'post')
      expect(ability).not.to.allow('delete', 'post')
    })

    it('honours field specific rules', () => {
      ability = AbilityBuilder.define((can) => {
        can('manage', 'all', 'subject')
      })

      expect(ability).to.allow('read', 'post', 'subject')
    })
  })

  describe('`rulesFor`', () => {
    it('returns rules for specific subject and action', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'Post')
        can('update', 'Post')
        cannot('read', 'Post', { private: true })
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).to.deep.equal([
        { actions: 'read', subject: ['Post'], inverted: true, conditions: { private: true } },
        { actions: 'read', subject: ['Post'], inverted: false },
      ])
    })

    it('does not return inverted rules with fields when invoked for specific subject and action', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).to.deep.equal([
        { actions: 'read', subject: ['Post'], inverted: false },
      ])
    })

    it('returns rules for specific subject, action and field', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post', 'title').map(ruleToObject)

      expect(rules).to.deep.equal([
        { actions: 'read', subject: ['Post'], inverted: true, fields: ['title'] },
        { actions: 'read', subject: ['Post'], inverted: false }
      ])
    })

    function ruleToObject(rule) {
      return ['actions', 'subject', 'conditions', 'fields', 'inverted'].reduce((object, field) => {
        if (typeof rule[field] !== 'undefined') {
          object[field] = rule[field]
        }
        return object
      }, {})
    }
  })
})
