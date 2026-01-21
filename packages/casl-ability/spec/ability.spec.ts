import { defineAbility, Ability, createAliasResolver, createMongoAbility, RuleOf, PureAbility } from '../src'
import { Post, ruleToObject } from './fixtures'

describe('Ability', () => {
  it('allows to add alias for actions', () => {
    const resolveAction = createAliasResolver({ modify: ['update', 'delete'] })
    const ability = defineAbility(can => can('modify', 'Post'), { resolveAction })

    expect(ability.can('modify', 'Post')).toBe(true)
    expect(ability.can('update', 'Post')).toBe(true)
    expect(ability.can('delete', 'Post')).toBe(true)
  })

  it('allows deeply nested aliased actions', () => {
    const resolveAction = createAliasResolver({ sort: 'increment', modify: 'sort' })
    const ability = defineAbility(can => can('modify', 'all'), { resolveAction })

    expect(ability.can('increment', '123')).toBe(true)
  })

  it('throws exception when trying to define `manage` alias', () => {
    expect(() => createAliasResolver({ manage: 'crud' })).toThrow(Error)
  })

  it('throws exception when trying to make `manage` a part of aliased action', () => {
    expect(() => createAliasResolver({ modify: ['crud', 'manage'] })).toThrow(Error)
  })

  it('throws exception when trying to alias action to itself', () => {
    expect(() => createAliasResolver({ sort: 'sort' })).toThrow(Error)
    expect(() => createAliasResolver({ sort: ['sort', 'order'] })).toThrow(Error)
  })

  it('lists all rules', () => {
    const ability = defineAbility((can, cannot) => {
      can('crud', 'all')
      can('learn', 'Range')
      cannot('read', 'String')
      cannot('read', 'Hash')
      cannot('preview', 'Array')
    })

    expect(ability.rules.map(ruleToObject)).toEqual([
      { action: 'crud', subject: 'all' },
      { action: 'learn', subject: 'Range' },
      { action: 'read', subject: 'String', inverted: true },
      { action: 'read', subject: 'Hash', inverted: true },
      { action: 'preview', subject: 'Array', inverted: true },
    ])
  })

  it('allows to update rules', () => {
    const ability = defineAbility(can => can('read', ['Post', 'User']))

    expect(ability.can('read', 'Post')).toBe(true)

    ability.update([])

    expect(ability.rules).toHaveLength(0)
    expect(ability.can('read', 'Post')).toBe(false)
    expect(ability.can('read', 'User')).toBe(false)
  })

  it('allows to check abilities only by action', () => {
    const ability = new PureAbility([{ action: 'read' }])

    expect(ability.can('read')).toBe(true)
  })

  it('allows to define custom `anyAction` and `anySubjectType` options', () => {
    const ability = new Ability([{ action: '*', subject: '*' }], {
      anyAction: '*',
      anySubjectType: '*',
    })

    expect(ability.can('read', 'Post')).toBe(true)
    expect(ability.can('update', 'Post')).toBe(true)
    expect(ability.can('doAnythingWith', 'Post')).toBe(true)
    expect(ability.can('*', '*')).toBe(true)
    expect(ability.can('*', 'Post')).toBe(true)
    expect(ability.can('read', '*')).toBe(true)
  })

  describe('by default', () => {
    it('allows to perform specified actions on target instance', () => {
      const ability = setup()
      expect(ability.can('read', new Post())).toBe(true)
      expect(ability.can('update', new Post())).toBe(true)
    })

    it('allows to perform specified actions on target type (string)', () => {
      const ability = setup()
      expect(ability.can('read', 'Post')).toBe(true)
      expect(ability.can('update', 'Post')).toBe(true)
    })

    it('allows to perform specified actions on target type (class)', () => {
      const ability = defineAbility((can) => {
        can('read', Post)
        can('update', Post, { authorId: 1 })
      })

      expect(ability.can('read', Post)).toBe(true)
      expect(ability.can('update', Post)).toBe(true)
      expect(ability.can('read', new Post())).toBe(true)
      expect(ability.can('update', new Post({ authorId: 1 }))).toBe(true)
    })

    it('disallows to perform unspecified action on target', () => {
      const ability = setup()

      expect(ability.can('archive', 'Post')).toBe(false)
      expect(ability.can('archive', new Post())).toBe(false)
    })

    it('disallows to perform action if action parameter is falsy', () => {
      const ability = setup()
      expect(ability.can(null as any, 'Post')).toBe(false)
    })

    it('checks by `all` subject if subject parameter is falsy', () => {
      const ability = setup()
      expect(ability.can('test', null as any)).toBe(true)
    })

    it('disallows to perform action on unspecified target type', () => {
      const ability = setup()
      expect(ability.can('read', 'User')).toBe(false)
    })

    it('allows to perform action if target type matches at least 1 rule with or without conditions', () => {
      const ability = setup()
      expect(ability.can('delete', 'Post')).toBe(true)
    })

    it('allows to perform action if target instance matches conditions', () => {
      const ability = setup()
      expect(ability.can('delete', new Post({ creator: 'admin' }))).toBe(true)
    })

    it('disallows to perform action if target instance does not match conditions', () => {
      const ability = setup()
      expect(ability.can('delete', new Post({ creator: 'user' }))).toBe(false)
    })

    it('disallows to perform action for inverted rule when checks by subject type', () => {
      const ability = setup()
      expect(ability.can('publish', 'Post')).toBe(false)
    })

    describe('`update` method and events', () => {
      it('triggers "update" event', () => {
        const ability = setup()
        const rules: RuleOf<typeof ability>[] = []
        const updateHandler = jest.fn()
        ability.on('update', updateHandler)
        ability.update(rules)

        expect(updateHandler).toHaveBeenCalledWith({ ability, target: ability, rules })
      })

      it('triggers "updated" event after rules have been updated', () => {
        const ability = setup()
        const rules: RuleOf<typeof ability>[] = []
        const updateHandler = jest.fn()
        ability.on('updated', updateHandler)
        ability.update(rules)

        expect(updateHandler).toHaveBeenCalledWith({ ability, target: ability, rules })
      })

      it('allows to remove subscription to "update" event', () => {
        const ability = setup()
        const updateHandler = jest.fn()
        const unsubscribe = ability.on('update', updateHandler)
        unsubscribe()
        ability.update([])

        expect(updateHandler).not.toHaveBeenCalled()
      })

      it('does not remove 2nd subscription when unsubscribe called 2 times', () => {
        const ability = setup()
        const [updateHandler, anotherHandler] = [jest.fn(), jest.fn()]
        const unsubscribe = ability.on('update', updateHandler)

        ability.on('update', anotherHandler)
        unsubscribe()
        unsubscribe()
        ability.update([])

        expect(updateHandler).not.toHaveBeenCalled()
        expect(anotherHandler).toHaveBeenCalled()
      })

      it('can unregister itself inside event handler', () => {
        const ability = setup()
        const handlers = [jest.fn(), jest.fn()]
        const unsubscribe1 = ability.on('updated', () => {
          handlers[0]()
          unsubscribe1()
        })
        ability.on('updated', handlers[1])

        ability.update([])

        expect(handlers[0]).toHaveBeenCalled()
        expect(handlers[1]).toHaveBeenCalled()
      })

      it('can unregister another event handler inside own handler', () => {
        const ability = setup()
        let results: number[] = []
        const handlers = [
          jest.fn(() => results.push(0)),
          jest.fn(() => results.push(1)),
          jest.fn(() => results.push(2)),
        ]
        const unsubscribe: (() => void)[] = []

        unsubscribe[0] = ability.on('updated', handlers[0])
        unsubscribe[1] = ability.on('updated', handlers[1])
        unsubscribe[2] = ability.on('updated', () => {
          handlers[2]()
          unsubscribe[1]()
        })
        ability.update([])

        expect(results).toEqual([2, 1, 0])

        results = []
        ability.update([{ action: 'read', subject: 'all' }])

        expect(results).toEqual([2, 0])
      })

      it('can unregister last handler', () => {
        const ability = setup()
        const results: number[] = []
        const handlers = [
          jest.fn(() => results.push(0)),
          jest.fn(() => results.push(1)),
          jest.fn(() => results.push(2)),
        ]
        const unsubscribe = []

        unsubscribe[0] = ability.on('updated', handlers[0])
        unsubscribe[1] = ability.on('updated', handlers[1])
        unsubscribe[2] = ability.on('updated', handlers[2])
        unsubscribe[2]()
        ability.update([])

        expect(results).toEqual([1, 0])
      })
    })

    function setup() {
      return defineAbility((can, cannot) => {
        can('test', 'all')
        can(['read', 'update'], 'Post')
        can('delete', 'Post', { creator: 'admin' })
        cannot('publish', 'Post')
      })
    }
  })

  describe('rule precedence', () => {
    it('checks every rule using logical OR operator (the order matters!)', () => {
      const ability = defineAbility((can) => {
        can('delete', 'Post', { creator: 'me' })
        can('delete', 'Post', { sharedWith: { $in: ['me'] } })
      })

      expect(ability.can('delete', new Post({ creator: 'me' }))).toBe(true)
      expect(ability.can('delete', new Post({ sharedWith: 'me' }))).toBe(true)
    })

    it('checks rules in inverse order', () => {
      const ability = defineAbility((can, cannot) => {
        can('delete', 'Post', { creator: 'me' })
        cannot('delete', 'Post', { archived: true })
      })

      expect(ability.can('delete', new Post({ creator: 'me', archived: true }))).toBe(false)
      expect(ability.can('delete', new Post({ creator: 'me' }))).toBe(true)
    })

    it('shadows rule with conditions by the same rule without conditions', () => {
      const ability = defineAbility((can) => {
        can('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability.can('delete', new Post({ creator: 'someoneelse' }))).toBe(true)
      expect(ability.can('delete', new Post({ creator: 'me' }))).toBe(true)
    })

    it('does not shadow rule with conditions by the same rule if the last one is disallowed by `cannot`', () => {
      const ability = defineAbility((can, cannot) => {
        can('manage', 'Post')
        cannot('delete', 'Post')
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability.can('delete', new Post({ creator: 'someoneelse' }))).toBe(false)
      expect(ability.can('delete', new Post({ creator: 'me' }))).toBe(true)
    })

    it('shadows inverted rule by regular one', () => {
      const ability = defineAbility((can, cannot) => {
        cannot('delete', 'Post', { creator: 'me' })
        can('delete', 'Post', { creator: 'me' })
      })

      expect(ability.can('delete', new Post({ creator: 'me' }))).toBe(true)
    })

    it('shadows `all` subject rule by specific one', () => {
      const ability = defineAbility((can, cannot) => {
        can('delete', 'all')
        cannot('delete', 'Post')
      })

      expect(ability.can('delete', 'Post')).toBe(false)
      expect(ability.can('delete', 'User')).toBe(true)
    })
  })

  describe('rule conditions', () => {
    it('allows to use equality conditions', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { creator: 'me' })
      })

      expect(ability.can('read', new Post({ creator: 'me' }))).toBe(true)
      expect(ability.can('read', new Post({ creator: 'someoneelse' }))).toBe(false)
    })

    it('allows to use mongo like `$ne` condition', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { creator: { $ne: 'me' } })
      })

      expect(ability.can('read', new Post({ creator: 'me' }))).toBe(false)
      expect(ability.can('read', new Post({ creator: 'someoneelse' }))).toBe(true)
    })

    it('allows to use mongo like `$in` condition', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { state: { $in: ['shared', 'draft'] } })
      })

      expect(ability.can('read', new Post({ state: 'draft' }))).toBe(true)
      expect(ability.can('read', new Post({ state: 'shared' }))).toBe(true)
      expect(ability.can('read', new Post({ state: ['shared', 'public'] }))).toBe(true)
    })

    it('allows to use mongo like `$all` condition', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { state: { $all: ['shared', 'draft'] } })
      })

      expect(ability.can('read', new Post({ state: 'draft' }))).toBe(false)
      expect(ability.can('read', new Post({ state: 'shared' }))).toBe(false)
      expect(ability.can('read', new Post({ state: ['shared', 'draft'] }))).toBe(true)
    })

    it('allows to use mongo like `$gt` and `$gte` condition', () => {
      const ability = defineAbility((can, cannot) => {
        can('update', 'Post', { views: { $gt: 10 } })
        cannot('update', 'Post', { views: { $gte: 1000 } })
      })

      expect(ability.can('update', new Post({ views: 9 }))).toBe(false)
      expect(ability.can('update', new Post({ views: 100 }))).toBe(true)
      expect(ability.can('update', new Post({ views: 1001 }))).toBe(false)
    })

    it('allows to use mongo like `$lt` and `$lte` condition', () => {
      const ability = defineAbility((can, cannot) => {
        can('update', 'Post', { views: { $lt: 5 } })
        cannot('update', 'Post', { views: { $lte: 2 } })
      })

      expect(ability.can('update', new Post({ views: 2 }))).toBe(false)
      expect(ability.can('update', new Post({ views: 3 }))).toBe(true)
    })

    it('allows to use mongo like `$exists` condition', () => {
      const ability = defineAbility((can) => {
        can('read', 'Post', { views: { $exists: true } })
      })

      expect(ability.can('read', new Post())).toBe(false)
      expect(ability.can('read', new Post({ views: 3 }))).toBe(true)
    })

    it('allows to use mongo like dot notation conditions', () => {
      const ability = defineAbility((can) => {
        can('delete', 'Post', { 'authors.0': { $exists: false } })
        can('update', 'Post', { 'comments.author': 'Ted' })
      })

      expect(ability.can('delete', new Post({ authors: ['me', 'someoneelse'] }))).toBe(false)
      expect(ability.can('delete', new Post({ authors: [] }))).toBe(true)
      expect(ability.can('update', new Post({ comments: [{ author: 'Ted' }, { author: 'John' }] }))).toBe(true)
      expect(ability.can('update', new Post({ comments: [{ author: 'John' }] }))).toBe(false)
    })

    it('properly compares object-primitives like `ObjectId` that have `toJSON` method', () => {
      const complexValue = (value: unknown) => ({
        value,
        toJSON: () => value,
        toString: () => value
      })
      const ability = defineAbility((can) => {
        can('delete', 'Post', { creator: complexValue(321) })
        can('update', 'Post', { state: { $in: [complexValue('draft'), complexValue('shared')] } })
      })

      expect(ability.can('delete', new Post({ creator: complexValue(321) }))).toBe(true)
      expect(ability.can('delete', new Post({ creator: complexValue(123) }))).toBe(false)
      expect(ability.can('update', new Post({ state: complexValue('archived') }))).toBe(false)
      expect(ability.can('update', new Post({ state: complexValue('draft') }))).toBe(true)
    })

    it('allows to use mongo like `$regex` condition', () => {
      const ability = defineAbility((can) => {
        can('delete', 'Post', { title: { $regex: '\\[DELETED\\]' } })
      })

      expect(ability.can('delete', new Post({ title: 'public' }))).toBe(false)
      expect(ability.can('delete', new Post({ title: '[deleted] title' }))).toBe(false)
      expect(ability.can('delete', new Post({ title: '[DELETED] title' }))).toBe(true)
    })

    it('allows to use mongo like `$elemMatch` condition', () => {
      const ability = defineAbility((can) => {
        can('delete', 'Post', { authors: { $elemMatch: { id: 'me-id' } } })
      })

      expect(ability.can('delete', new Post({ authors: [{ id: 'someone-else-id' }] }))).toBe(false)
      expect(ability.can('delete', new Post({ authors: [{ id: 'me-id' }] }))).toBe(true)
      expect(ability.can('delete', new Post({ authors: [{ id: 'someone-else-id' }, { id: 'me-id' }] }))).toBe(true)
    })

    it('returns true for `Ability` which contains inverted rule and subject specified as string', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', { private: true })
      })

      expect(ability.can('read', 'Post')).toBe(true)
    })
  })

  describe('per field abilities', () => {
    it('allows to define per field rules', () => {
      const ability = defineAbility(can => can('read', 'Post', 'title'))

      expect(ability.can('read', 'Post')).toBe(true)
      expect(ability.can('read', 'Post', 'title')).toBe(true)
      expect(ability.can('read', 'Post', 'description')).toBe(false)
    })

    it('allows to define rules for several fields', () => {
      const ability = defineAbility(can => can('read', 'Post', ['title', 'id']))

      expect(ability.can('read', 'Post')).toBe(true)
      expect(ability.can('read', 'Post', 'title')).toBe(true)
      expect(ability.can('read', 'Post', 'id')).toBe(true)
      expect(ability.can('read', 'Post', 'description')).toBe(false)
    })

    it('allows to check multiple fields at once', () => {
      const ability = defineAbility(can => can('read', 'Post', ['title', 'id']))

      expect(ability.can('read', 'Post', ['title'])).toBe(true)
      expect(ability.can('read', 'Post', ['title', 'id'])).toBe(true)
      expect(ability.can('read', 'Post', ['title', 'description'])).toBe(false)
    })

    it('allows to check multiple fields at once with `cannot`', () => {
      const ability = defineAbility(can => can('read', 'Post', ['title', 'id']))

      expect(ability.cannot('read', 'Post', ['title'])).toBe(false)
      expect(ability.cannot('read', 'Post', ['title', 'id'])).toBe(false)
      expect(ability.cannot('read', 'Post', ['title', 'description'])).toBe(true)
    })

    it('allows to define inverted rules for a field', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'description')
      })

      expect(ability.can('read', 'Post')).toBe(true)
      expect(ability.can('read', 'Post', 'title')).toBe(true)
      expect(ability.can('read', 'Post', 'description')).toBe(false)
    })

    it('allows to perform actions on all attributes if none is specified', () => {
      const ability = defineAbility(can => can('read', 'Post'))

      expect(ability.can('read', 'Post', 'title')).toBe(true)
      expect(ability.can('read', 'Post', 'description')).toBe(true)
    })

    it('throws exception if 3rd argument is not a string', () => {
      const ability = defineAbility(can => can('read', 'Post', 'title'))

      expect(() => ability.can('read', 'Post', { title: 'test' } as any)).toThrow(/`field` parameter is expected to be a string/)
    })

    it('throws exception if 3rd argument is passed but "fieldMatchher" options was not provided', () => {
      const rules = [{ action: 'read', subject: 'Post', fields: ['title'] }]
      expect(() => new PureAbility(rules)).toThrow(/"fieldMatcher" option/)
    })

    it('throws if there is a rule with "fields" property to be an empty array', () => {
      expect(() => defineAbility(can => can('read', 'Post', []))).toThrow(/`rawRule.fields` cannot be an empty array/)
    })

    describe('when field patterns defined', () => {
      it('allows to act on any 1st level field (e.g., author.*)', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author.*'))

        expect(ability.can('read', 'Post', 'author')).toBe(true)
        expect(ability.can('read', 'Post', 'author.*')).toBe(true)
        expect(ability.can('read', 'Post', 'author.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.age')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(false)
      })

      it('allows to act on field at any depth (e.g., author.**)', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author.**'))

        expect(ability.can('read', 'Post', 'author')).toBe(true)
        expect(ability.can('read', 'Post', 'author.**')).toBe(true)
        expect(ability.can('read', 'Post', 'author.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.age')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(true)
      })

      it('allows to act on fields defined by star in the middle of path (e.g., author.*.name)', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author.*.name'))

        expect(ability.can('read', 'Post', 'author')).toBe(false)
        expect(ability.can('read', 'Post', 'author.*.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.startDate')).toBe(false)
        expect(ability.can('read', 'Post', 'author.publication.country.name')).toBe(false)
      })

      it('allows to act on fields defined by 2 stars in the middle of path (e.g., author.**.name)', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author.**.name'))

        expect(ability.can('read', 'Post', 'author')).toBe(false)
        expect(ability.can('read', 'Post', 'author.**.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.startDate')).toBe(false)
        expect(ability.can('read', 'Post', 'author.publication.country.name')).toBe(true)
      })

      it('allows to act on fields defined by star at the beginning (e.g., *.name)', () => {
        const ability = defineAbility(can => can('read', 'Post', '*.name'))

        expect(ability.can('read', 'Post', 'author.name')).toBe(true)
        expect(ability.can('read', 'Post', '*.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(false)
      })

      it('allows to act on fields defined by 2 stars at the beginning (e.g., **.name)', () => {
        const ability = defineAbility(can => can('read', 'Post', '**.name'))

        expect(ability.can('read', 'Post', 'author.name')).toBe(true)
        expect(ability.can('read', 'Post', '**.name')).toBe(true)
        expect(ability.can('read', 'Post', 'author.publication.name')).toBe(true)
      })

      it('allows to act on fields defined by stars (e.g., author.address.street*)', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author.address.street*'))

        expect(ability.can('read', 'Post', 'author.address.street')).toBe(true)
        expect(ability.can('read', 'Post', 'author.address.street1')).toBe(true)
        expect(ability.can('read', 'Post', 'author.address.street2')).toBe(true)
        expect(ability.can('read', 'Post', 'author.address')).toBe(false)
      })

      it('correctly works with special regexp symbols', () => {
        const ability = defineAbility(can => can('read', 'Post', 'author?.address+.street*'))

        expect(ability.can('read', 'Post', 'author?.address+.street')).toBe(true)
        expect(ability.can('read', 'Post', 'author?.address+.street1')).toBe(true)
        expect(ability.can('read', 'Post', 'author?.address+.street2')).toBe(true)
        expect(ability.can('read', 'Post', 'author?.address+')).toBe(false)
      })

      it('can match field patterns', () => {
        const ability = defineAbility(can => can('read', 'Post', 'vehicle.*.generic.*'))

        expect(ability.can('read', 'Post', 'vehicle.profile.generic.item')).toBe(true)
        expect(ability.can('read', 'Post', 'vehicle.*.generic.signal')).toBe(true)
        expect(ability.can('read', 'Post', 'vehicle.profile.generic.*')).toBe(true)
        expect(ability.can('read', 'Post', 'vehicle.*.user.*')).toBe(false)
      })
    })

    describe('when `conditions` defined', () => {
      const myPost = new Post({ author: 'me', published: true })

      it('allows to perform action on subject specified as string', () => {
        const { ability } = setup()
        expect(ability.can('read', 'Post')).toBe(true)
      })

      it('allows to perform action on subject field, both specified as strings', () => {
        const { ability } = setup()
        expect(ability.can('read', 'Post', 'title')).toBe(true)
        expect(ability.can('read', 'Post', 'description')).toBe(true)
      })

      it('does not allow to perform action on instance of the subject which mismatches specified conditions', () => {
        const { ability } = setup()
        expect(ability.can('read', new Post())).toBe(false)
      })

      it('allows to perform action on instance which matches conditions', () => {
        const { ability } = setup()
        expect(ability.can('read', myPost)).toBe(true)
      })

      it('allows to perform action on instance field if that instance matches conditions', () => {
        const { ability } = setup()
        expect(ability.can('read', myPost, 'title')).toBe(true)
        expect(ability.can('read', myPost, 'description')).toBe(true)
      })

      it('does not allow to perform action on instance field if that instance matches conditions but field is not in specified list', () => {
        const { ability } = setup()
        expect(ability.can('read', myPost, 'id')).toBe(false)
      })

      it('ensures that both conditions are met', () => {
        const { ability } = setup()
        expect(ability.can('read', myPost)).toBe(true)
        expect(ability.can('read', new Post({ author: 'me', active: false }))).toBe(false)
      })

      it('has rules with `ast` property', () => {
        const { ability } = setup()
        const rule = ability.relevantRuleFor('read', 'Post')

        expect(typeof rule?.ast).toBe("object")
        expect(rule?.ast).toEqual({
          operator: 'and',
          value: [
            {
              field: 'author',
              operator: 'eq',
              value: rule?.conditions?.author
            },
            {
              field: 'published',
              operator: 'eq',
              value: rule?.conditions?.published
            }
          ]
        })
      })

      function setup() {
        const ability = defineAbility((can) => {
          can('read', 'Post', ['title', 'description'], { author: (myPost as any).author, published: true })
        })

        return {ability}
      }
    })
  })

  describe('`manage` action', () => {
    it('is an alias for any action', () => {
      const ability = defineAbility((can) => {
        can('manage', 'all')
      })

      expect(ability.can('read', 'post')).toBe(true)
      expect(ability.can('do_whatever_anywhere', 'post')).toBe(true)
    })

    it('honours `cannot` rules', () => {
      const ability = defineAbility((can, cannot) => {
        can('manage', 'all')
        cannot('read', 'post')
      })

      expect(ability.can('read', 'post')).toBe(false)
      expect(ability.can('update', 'post')).toBe(true)
    })

    it('can be used with `cannot`', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'post')
        cannot('manage', 'all')
      })

      expect(ability.can('read', 'post')).toBe(false)
      expect(ability.can('delete', 'post')).toBe(false)
    })

    it('honours field specific rules', () => {
      const ability = defineAbility((can) => {
        can('manage', 'all', 'subject')
      })

      expect(ability.can('read', 'post', 'subject')).toBe(true)
    })
  })

  describe('`rulesFor`', () => {
    it('returns rules for specific subject and action', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        can('update', 'Post')
        cannot('read', 'Post', { private: true })
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).toEqual([
        { action: 'read', subject: 'Post', inverted: true, conditions: { private: true } },
        { action: 'read', subject: 'Post' },
      ])
    })

    it('does not return inverted rules with fields when invoked for specific subject and action', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post').map(ruleToObject)

      expect(rules).toEqual([
        { action: 'read', subject: 'Post' },
      ])
    })

    it('returns rules for specific subject, action and field', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        cannot('read', 'Post', 'title')
      })

      const rules = ability.rulesFor('read', 'Post', 'title').map(ruleToObject)

      expect(rules).toEqual([
        { action: 'read', subject: 'Post', inverted: true, fields: ['title'] },
        { action: 'read', subject: 'Post' }
      ])
    })
  })

  describe('`actionsFor`', () => {
    it('returns all actions associated with provided subject type', () => {
      const ability = defineAbility((can, cannot) => {
        can('read', 'Post')
        can('update', 'Post')
        cannot('read', 'Post', { private: true })
      })

      expect(ability.actionsFor('Post')).toEqual([
        'read',
        'update'
      ])
    })

    it('returns all actions including aliases associated with provided subject type', () => {
      const resolveAction = createAliasResolver({
        modify: ['read', 'update']
      })
      const ability = defineAbility(can => can('modify', 'Post'), { resolveAction })

      expect(ability.actionsFor('Post')).toEqual([
        'modify',
        'read',
        'update'
      ])
    })

    it('returns all actions including those that are associated with "all" subject type', () => {
      const ability = defineAbility((can) => {
        can('read', 'all')
        can('update', 'Post')
      })

      expect(ability.actionsFor('Post')).toEqual([
        'update',
        'read',
      ])
    })

    it('returns actions associated with "all" subject type if there is no actions for provided one', () => {
      const ability = defineAbility(can => can('read', 'all'))

      expect(ability.actionsFor('Post')).toEqual([
        'read',
      ])
    })

    it('returns an empty array if there are no actions for provided subject type and no actions for "all" subject type', () => {
      const ability = createMongoAbility()

      expect(ability.actionsFor('Post')).toHaveLength(0)
    })
  })
})
