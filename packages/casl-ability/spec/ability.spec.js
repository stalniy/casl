import { defineAbility, Ability, PureAbility, createAliasResolver } from '../src'
import { Post, ruleToObject } from './spec_helper'

describe('Ability', () => {
  let ability

  it('allows to add alias for actions', () => {
    const resolveAction = createAliasResolver({ modify: ['update', 'delete'] })
    ability = defineAbility(can => can('modify', 'Post'), { resolveAction })

    expect(ability).to.allow('modify', 'Post')
    expect(ability).to.allow('update', 'Post')
    expect(ability).to.allow('delete', 'Post')
  })

  it('allows deeply nested aliased actions', () => {
    const resolveAction = createAliasResolver({ sort: 'increment', modify: 'sort' })
    ability = defineAbility(can => can('modify', 'all'), { resolveAction })

    expect(ability).to.allow('increment', 123)
  })

  it('throws exception when trying to define `manage` alias', () => {
    expect(() => createAliasResolver({ manage: 'crud' })).to.throw(Error)
  })

  it('throws exception when trying to make `manage` a part of aliased action', () => {
    expect(() => createAliasResolver({ modify: ['crud', 'manage'] })).to.throw(Error)
  })

  it('throws exception when trying to alias action to itself', () => {
    expect(() => createAliasResolver({ sort: 'sort' })).to.throw(Error)
    expect(() => createAliasResolver({ sort: ['sort', 'order'] })).to.throw(Error)
  })

  it('provides `can` and `cannot` methods to check abilities', () => {
    ability = defineAbility(can => can('read', 'Post'))

    expect(ability.can('read', 'Post')).to.be.true
    expect(ability.cannot('read', 'Post')).to.be.false
  })

  it('lists all rules', () => {
    ability = defineAbility((can, cannot) => {
      can('crud', 'all')
      can('learn', 'Range')
      cannot('read', 'String')
      cannot('read', 'Hash')
      cannot('preview', 'Array')
    })

    expect(ability.rules.map(ruleToObject)).to.deep.equal([
      { action: 'crud', subject: 'all' },
      { action: 'learn', subject: 'Range' },
      { action: 'read', subject: 'String', inverted: true },
      { action: 'read', subject: 'Hash', inverted: true },
      { action: 'preview', subject: 'Array', inverted: true },
    ])
  })

  it('allows to update rules', () => {
    ability = defineAbility(can => can('read', ['Post', 'User']))

    expect(ability).to.allow('read', 'Post')

    ability.update([])

    expect(ability.rules).to.be.empty
    expect(ability).not.to.allow('read', 'Post')
    expect(ability).not.to.allow('read', 'User')
  })

  it('allows to check abilities only by action', () => {
    ability = new Ability([{ action: 'read' }])

    expect(ability).to.allow('read')
  })

  describe('by default', () => {
    beforeEach(() => {
      ability = defineAbility((can, cannot) => {
        can('test', 'all')
        can(['read', 'update'], 'Post')
        can('delete', 'Post', { creator: 'admin' })
        cannot('publish', 'Post')
      })
    })

    it('allows to perform specified actions on target instance', () => {
      expect(ability).to.allow('read', new Post())
      expect(ability).to.allow('update', new Post())
    })

    it('allows to perform specified actions on target type (string)', () => {
      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('update', 'Post')
    })

    it('allows to perform specified actions on target type (class)', () => {
      ability = defineAbility((can) => {
        can('read', Post)
        can('update', Post)
      })
      expect(ability).to.allow('read', Post)
      expect(ability).to.allow('update', Post)
    })

    it('disallows to perform unspecified action on target', () => {
      expect(ability).not.to.allow('archive', 'Post')
      expect(ability).not.to.allow('archive', new Post())
    })

    it('disallows to perform action if action parameter is falsy', () => {
      expect(ability).not.to.allow(null, 'Post')
    })

    it('checks by `all` subject if subject parameter is falsy', () => {
      expect(ability).to.allow('test', null)
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

    describe('`update` method', () => {
      let updateHandler

      beforeEach(() => {
        updateHandler = spy()
      })

      it('triggers "update" event', () => {
        const rules = []
        ability.on('update', updateHandler)
        ability.update(rules)

        expect(updateHandler).to.have.been.called.with({ ability, target: ability, rules })
      })

      it('triggers "updated" event after rules have been updated', () => {
        const rules = []
        ability.on('updated', updateHandler)
        ability.update(rules)

        expect(updateHandler).to.have.been.called.with({ ability, target: ability, rules })
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
      ability = defineAbility((can) => {
        can('delete', 'Post', { creator: 'me' })
        can('delete', 'Post', { sharedWith: { $in: ['me'] } })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
      expect(ability).to.allow('delete', new Post({ sharedWith: 'me' }))
    })

    it('checks rules in inverse order', () => {
      ability = defineAbility((can, cannot) => {
        can('delete', 'Post', { creator: 'me' })
        cannot('delete', 'Post', { archived: true })
      })

      expect(ability).not.to.allow('delete', new Post({ creator: 'me', archived: true }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows rule with conditions by the same rule without conditions', () => {
      ability = defineAbility((can) => {
        can('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('does not shadow rule with conditions by the same rule if the last one is disallowed by `cannot`', () => {
      ability = defineAbility((can, cannot) => {
        can('manage', 'Post')
        cannot('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).not.to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows inverted rule by regular one', () => {
      ability = defineAbility((can, cannot) => {
        cannot('delete', 'Post', { creator: 'me' })
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows `all` subject rule by specific one', () => {
      ability = defineAbility((can, cannot) => {
        can('delete', 'all')
        cannot('delete', 'Post')
      })

      expect(ability).not.to.allow('delete', 'Post')
      expect(ability).to.allow('delete', 'User')
    })
  })

  describe('rule conditions', () => {
    it('allows to use equality conditions', () => {
      ability = defineAbility((can) => {
        can('read', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('read', new Post({ creator: 'me' }))
      expect(ability).not.to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$ne` condition', () => {
      ability = defineAbility((can) => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })

      expect(ability).not.to.allow('read', new Post({ creator: 'me' }))
      expect(ability).to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$in` condition', () => {
      ability = defineAbility((can) => {
        can('read', 'Post', { state: { $in: ['shared', 'draft'] } })
      })

      expect(ability).to.allow('read', new Post({ state: 'draft' }))
      expect(ability).to.allow('read', new Post({ state: 'shared' }))
      expect(ability).to.allow('read', new Post({ state: ['shared', 'public'] }))
    })

    it('allows to use mongo like `$all` condition', () => {
      ability = defineAbility((can) => {
        can('read', 'Post', { state: { $all: ['shared', 'draft'] } })
      })

      expect(ability).not.to.allow('read', new Post({ state: 'draft' }))
      expect(ability).not.to.allow('read', new Post({ state: 'shared' }))
      expect(ability).to.allow('read', new Post({ state: ['shared', 'draft'] }))
    })

    it('allows to use mongo like `$gt` and `$gte` condition', () => {
      ability = defineAbility((can, cannot) => {
        can('update', 'Post', { views: { $gt: 10 } })
        cannot('update', 'Post', { views: { $gte: 1000 } })
      })

      expect(ability).not.to.allow('update', new Post({ views: 9 }))
      expect(ability).to.allow('update', new Post({ views: 100 }))
      expect(ability).not.to.allow('update', new Post({ views: 1001 }))
    })

    it('allows to use mongo like `$lt` and `$lte` condition', () => {
      ability = defineAbility((can, cannot) => {
        can('update', 'Post', { views: { $lt: 5 } })
        cannot('update', 'Post', { views: { $lte: 2 } })
      })

      expect(ability).not.to.allow('update', new Post({ views: 2 }))
      expect(ability).to.allow('update', new Post({ views: 3 }))
    })

    it('allows to use mongo like `$exists` condition', () => {
      ability = defineAbility((can) => {
        can('read', 'Post', { views: { $exists: true } })
      })

      expect(ability).not.to.allow('read', new Post())
      expect(ability).to.allow('read', new Post({ views: 3 }))
    })

    it('allows to use mongo like dot notation conditions', () => {
      ability = defineAbility((can) => {
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
      ability = defineAbility((can) => {
        can('delete', 'Post', { creator: complexValue(321) })
        can('update', 'Post', { state: { $in: [complexValue('draft'), complexValue('shared')] } })
      })

      expect(ability).to.allow('delete', new Post({ creator: complexValue(321) }))
      expect(ability).not.to.allow('delete', new Post({ creator: complexValue(123) }))
      expect(ability).not.to.allow('update', new Post({ state: complexValue('archived') }))
      expect(ability).to.allow('update', new Post({ state: complexValue('draft') }))
    })

    it('allows to use mongo like `$regex` condition', () => {
      ability = defineAbility((can) => {
        can('delete', 'Post', { title: { $regex: '\\[DELETED\\]' } })
      })

      expect(ability).not.to.allow('delete', new Post({ title: 'public' }))
      expect(ability).not.to.allow('delete', new Post({ title: '[deleted] title' }))
      expect(ability).to.allow('delete', new Post({ title: '[DELETED] title' }))
    })

    it('allows to use mongo like `$elemMatch` condition', () => {
      ability = defineAbility((can) => {
        can('delete', 'Post', { authors: { $elemMatch: { id: 'me-id' } } })
      })

      expect(ability).not.to.allow('delete', new Post({ authors: [{ id: 'someone-else-id' }] }))
      expect(ability).to.allow('delete', new Post({ authors: [{ id: 'me-id' }] }))
      expect(ability).to.allow('delete', new Post({ authors: [{ id: 'someone-else-id' }, { id: 'me-id' }] }))
    })

    it('returns true for `Ability` which contains inverted rule and subject specified as string', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', { private: true })
      })

      expect(ability).to.allow('read', 'Post')
    })
  })

  describe('per field abilities', () => {
    it('allows to define per field rules', () => {
      ability = defineAbility(can => can('read', 'Post', 'title'))

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to define rules for several fields', () => {
      ability = defineAbility(can => can('read', 'Post', ['title', 'id']))

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).to.allow('read', 'Post', 'id')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to define inverted rules for a field', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'description')
      })

      expect(ability).to.allow('read', 'Post')
      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).not.to.allow('read', 'Post', 'description')
    })

    it('allows to perform actions on all attributes if none is specified', () => {
      ability = defineAbility(can => can('read', 'Post'))

      expect(ability).to.allow('read', 'Post', 'title')
      expect(ability).to.allow('read', 'Post', 'description')
    })

    it('throws exception if 3rd argument is not a string', () => {
      ability = defineAbility(can => can('read', 'Post', 'title'))

      expect(() => ability.can('read', 'Post', { title: 'test' })).to.throw(/`field` parameter is expected to be a string/)
    })

    it('throws exception if 3rd argument is passed but "fieldMatchher" options was not provided', () => {
      const rules = [{ action: 'read', subject: 'Post', fields: ['title'] }]
      expect(() => new PureAbility(rules)).to.throw(/"fieldMatcher" option/)
    })

    it('throws if there is a rule with "fields" property to be an empty array', () => {
      expect(() => defineAbility(can => can('read', 'Post', []))).to.throw(/`rawRule.fields` cannot be an empty array/)
    })

    describe('when field patterns defined', () => {
      it('allows to act on any 1st level field (e.g., author.*)', () => {
        ability = defineAbility(can => can('read', 'Post', 'author.*'))

        expect(ability).to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.*')
        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', 'author.age')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on field at any depth (e.g., author.**)', () => {
        ability = defineAbility(can => can('read', 'Post', 'author.**'))

        expect(ability).to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.**')
        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', 'author.age')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by star in the middle of path (e.g., author.*.name)', () => {
        ability = defineAbility(can => can('read', 'Post', 'author.*.name'))

        expect(ability).not.to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.*.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.startDate')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.country.name')
      })

      it('allows to act on fields defined by 2 stars in the middle of path (e.g., author.**.name)', () => {
        ability = defineAbility(can => can('read', 'Post', 'author.**.name'))

        expect(ability).not.to.allow('read', 'Post', 'author')
        expect(ability).to.allow('read', 'Post', 'author.**.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.startDate')
        expect(ability).to.allow('read', 'Post', 'author.publication.country.name')
      })

      it('allows to act on fields defined by star at the beginning (e.g., *.name)', () => {
        ability = defineAbility(can => can('read', 'Post', '*.name'))

        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', '*.name')
        expect(ability).not.to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by 2 stars at the beginning (e.g., **.name)', () => {
        ability = defineAbility(can => can('read', 'Post', '**.name'))

        expect(ability).to.allow('read', 'Post', 'author.name')
        expect(ability).to.allow('read', 'Post', '**.name')
        expect(ability).to.allow('read', 'Post', 'author.publication.name')
      })

      it('allows to act on fields defined by stars (e.g., author.address.street*)', () => {
        ability = defineAbility(can => can('read', 'Post', 'author.address.street*'))

        expect(ability).to.allow('read', 'Post', 'author.address.street')
        expect(ability).to.allow('read', 'Post', 'author.address.street1')
        expect(ability).to.allow('read', 'Post', 'author.address.street2')
        expect(ability).not.to.allow('read', 'Post', 'author.address')
      })

      it('correctly works with special regexp symbols', () => {
        ability = defineAbility(can => can('read', 'Post', 'author?.address+.street*'))

        expect(ability).to.allow('read', 'Post', 'author?.address+.street')
        expect(ability).to.allow('read', 'Post', 'author?.address+.street1')
        expect(ability).to.allow('read', 'Post', 'author?.address+.street2')
        expect(ability).not.to.allow('read', 'Post', 'author?.address+')
      })

      it('can match field patterns', () => {
        ability = defineAbility(can => can('read', 'Post', 'vehicle.*.generic.*'))

        expect(ability).to.allow('read', 'Post', 'vehicle.profile.generic.item')
        expect(ability).to.allow('read', 'Post', 'vehicle.*.generic.signal')
        expect(ability).to.allow('read', 'Post', 'vehicle.profile.generic.*')
        expect(ability).not.to.allow('read', 'Post', 'vehicle.*.user.*')
      })
    })

    describe('when `conditions` defined', () => {
      const myPost = new Post({ author: 'me', published: true })

      beforeEach(() => {
        ability = defineAbility((can) => {
          can('read', 'Post', ['title', 'description'], { author: myPost.author, published: true })
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

      it('ensures that both conditions are met', () => {
        expect(ability).to.allow('read', myPost)
        expect(ability).not.to.allow('read', new Post({ author: 'me', active: false }))
      })

      it('has rules with `ast` property', () => {
        const rule = ability.relevantRuleFor('read', 'Post')

        expect(rule).to.have.property('ast').that.is.an('object')
        expect(rule.ast).to.deep.equal({
          operator: 'and',
          value: [
            {
              field: 'author',
              operator: 'eq',
              value: rule.conditions.author
            },
            {
              field: 'published',
              operator: 'eq',
              value: rule.conditions.published
            }
          ]
        })
      })
    })
  })

  describe('`manage` action', () => {
    it('is an alias for any action', () => {
      ability = defineAbility((can) => {
        can('manage', 'all')
      })

      expect(ability).to.allow('read', 'post')
      expect(ability).to.allow('do_whatever_anywhere', 'post')
    })

    it('honours `cannot` rules', () => {
      ability = defineAbility((can, cannot) => {
        can('manage', 'all')
        cannot('read', 'post')
      })

      expect(ability).not.to.allow('read', 'post')
      expect(ability).to.allow('update', 'post')
    })

    it('can be used with `cannot`', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'post')
        cannot('manage', 'all')
      })

      expect(ability).not.to.allow('read', 'post')
      expect(ability).not.to.allow('delete', 'post')
    })

    it('honours field specific rules', () => {
      ability = defineAbility((can) => {
        can('manage', 'all', 'subject')
      })

      expect(ability).to.allow('read', 'post', 'subject')
    })
  })

  describe('`rulesFor`', () => {
    it('returns rules for specific subject and action', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        can('update', 'Post')
        cannot('read', 'Post', { private: true })
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post', inverted: true, conditions: { private: true } },
        { action: 'read', subject: 'Post' },
      ])
    })

    it('does not return inverted rules with fields when invoked for specific subject and action', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post' },
      ])
    })

    it('returns rules for specific subject, action and field', () => {
      ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post', 'title').map(ruleToObject)

      expect(rules).to.deep.equal([
        { action: 'read', subject: 'Post', inverted: true, fields: ['title'] },
        { action: 'read', subject: 'Post' }
      ])
    })
  })
})
