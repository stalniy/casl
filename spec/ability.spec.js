import { AbilityBuilder, ForbiddenError, Ability } from '../src'

class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

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

  it('throws exception when trying to alias action to itself', () => {
    expect(() => Ability.addAlias('sort', 'sort')).to.throw(Error)
    expect(() => Ability.addAlias('sort', ['order', 'sort'])).to.throw(Error)
  })

  it('provides predefined to use "manage" alias for create, read, update, delete', () => {
    ability = AbilityBuilder.define(can => can('manage', 'Post'))

    expect(ability).to.allow('manage', 'Post')
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
      can('manage', 'all')
      can('learn', 'Range')
      cannot('read', 'String')
      cannot('read', 'Hash')
      cannot('preview', 'Array')
    })

    expect(ability.rules).to.deep.equal([
      { actions: 'manage', subject: 'all' },
      { actions: 'learn', subject: 'Range' },
      { actions: 'read', subject: 'String', inverted: true },
      { actions: 'read', subject: 'Hash', inverted: true },
      { actions: 'preview', subject: 'Array', inverted: true },
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
      expect(ability).to.allow('update','Post')
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
      it('relies on `cannot` method', () => {
        ability.cannot = spy(() => false)
        ability.throwUnlessCan('read', 'Post')

        expect(ability.cannot).to.have.been.called.with.exactly('read', 'Post')
      })

      it('raises forbidden exception on disallowed action', () => {
        expect(() => ability.throwUnlessCan('archive', 'Post')).to.throw(ForbiddenError)
      })

      it('does not raise forbidden exception on allowed action', () => {
        expect(() => ability.throwUnlessCan('read', 'Post')).not.to.throw(Error)
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
    })
  })

  describe('rule precedence', () => {
    it('checks every rule using logical OR operator (the order matters!)', () => {
      ability = AbilityBuilder.define(can => {
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
      ability = AbilityBuilder.define(can => {
        can('manage', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('does not shadow rule with conditions by the same rule if the last one is disallowed by `cannot`', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('manage', 'Post')
        cannot('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability).not.to.allow('delete', new Post({ creator: 'someoneelse' }))
      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('shadows inverted rule by regular one', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        cannot('delete', 'Post', { creator: 'me' })
        can('manage', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('delete', new Post({ creator: 'me' }))
    })

    it('checks rules for "all" first', () => {
      ability = AbilityBuilder.define((can, cannot) => {
        can('delete', 'all')
        cannot('delete', 'Post')
      })

      expect(ability).to.allow('delete', 'Post')
    })
  })

  describe('rule conditions', () => {
    it('allows to use equality conditions', () => {
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { creator: 'me' })
      })

      expect(ability).to.allow('read', new Post({ creator: 'me' }))
      expect(ability).not.to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$ne` condition', () => {
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })

      expect(ability).not.to.allow('read', new Post({ creator: 'me' }))
      expect(ability).to.allow('read', new Post({ creator: 'someoneelse' }))
    })

    it('allows to use mongo like `$in` condition', () => {
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { state: { $in: ['shared', 'draft'] } })
      })

      expect(ability).to.allow('read', new Post({ state: 'draft' }))
      expect(ability).to.allow('read', new Post({ state: 'shared' }))
      expect(ability).to.allow('read', new Post({ state: ['shared', 'public'] }))
    })

    it('allows to use mongo like `$all` condition', () => {
      ability = AbilityBuilder.define(can => {
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
      ability = AbilityBuilder.define(can => {
        can('read', 'Post', { views: { $exists: true } })
      })

      expect(ability).not.to.allow('read', new Post())
      expect(ability).to.allow('read', new Post({ views: 3 }))
    })

    it('allows to use mongo like dot notation conditions', () => {
      ability = AbilityBuilder.define(can => {
        can('delete', 'Post', { 'authors.0': { $exists: false } })
        can('update', 'Post', { 'comments.author': 'Ted' })
      })

      expect(ability).not.to.allow('delete', new Post({ authors: ['me', 'someoneelse'] }))
      expect(ability).to.allow('delete', new Post({ authors: [] }))
      expect(ability).to.allow('update', new Post({ comments: [{ author: 'Ted' }, { author: 'John'}] }))
      expect(ability).not.to.allow('update', new Post({ comments: [{ author: 'John'}] }))
    })

    it('properly compares object-primitives like `ObjectId` that have `toJSON` method', () => {
      const value = value => ({ value, toJSON: () => value, toString: () => value })
      ability = AbilityBuilder.define(can => {
        can('delete', 'Post', { creator: value(321) })
        can('update', 'Post', { state: { $in: [value('draft'), value('shared')] } })
      })

      expect(ability).to.allow('delete', new Post({ creator: value(321) }))
      expect(ability).not.to.allow('delete', new Post({ creator: value(123) }))
      expect(ability).not.to.allow('update', new Post({ state: value('archived') }))
      expect(ability).to.allow('update', new Post({ state: value('draft') }))
    })

    it('allows to use mongo like `$regexp` condition', () => {
      ability = AbilityBuilder.define(can => {
        can('delete', 'Post', { title: { $regex: '\\[DELETED\\]' } })
      })

      expect(ability).not.to.allow('delete', new Post({ title: 'public' }))
      expect(ability).not.to.allow('delete', new Post({ title: '[deleted] title' }))
      expect(ability).to.allow('delete', new Post({ title: '[DELETED] title' }))
    })
  })
})
