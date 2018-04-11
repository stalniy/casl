import './spec_helper'
import { AbilityBuilder, Ability } from '@casl/ability'
import { ComponentTester } from 'aurelia-testing'
import { bootstrap } from 'aurelia-bootstrapper'
import { configure } from '../src'

describe('CASL Aurelia plugin', () => {
  let component
  let container
  let ability

  beforeEach(() => {
    component = new ComponentTester()
      .inView('${post | can: "read"}')
      .boundTo({ post: new Post() })
  })

  afterEach(() => {
    component.dispose()
  })

  describe('when `Ability` instance is passed as a plugin parameter', () => {
    beforeEach(async () => {
      ability = AbilityBuilder.define(can => can('read', 'Post'))
      await configureApp(component, aurelia => configure(aurelia.use, ability))
    })

    it('registers that instance in DI container', () => {
      expect(component.container.get(Ability)).to.equal(ability)
    })

    it('allows to check abilities using `can` value converter', () => {
      expect(document.body.textContent).to.equal('true')
    })

    it('re-calls `can` value converter when that instance is updated', async () => {
      ability.update([])
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(document.body.textContent).to.equal('false')
    })
  })

  describe('when `Ability` instance is not passed as a plugin parameter', () => {
    beforeEach(async () => {
      await configureApp(component, aurelia => configure(aurelia.use))
    })

    it('creates an empty instance and registers it in DI container', () => {
      ability = component.container.get(Ability)

      expect(ability).to.be.instanceof(Ability)
      expect(ability.rules).to.be.empty
    })

    it('allows to check abilities using `can` value converter', () => {
      expect(document.body.textContent).to.equal('false')
    })

    it('re-calls `can` value converter when that instance is updated', async () => {
      component.container.get(Ability).update([{ subject: 'Post', actions: 'read' }])
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(document.body.textContent).to.equal('true')
    })
  })

  describe('when `Ability` instance is not passed as a plugin parameter but was registered in DI container', () => {
    beforeEach(async () => {
      ability = AbilityBuilder.define(can => can('read', 'Post'))
      await configureApp(component, aurelia => {
        aurelia.container.registerInstance(Ability, ability)
        configure(aurelia.use)
      })
    })

    it('allows to check abilities using `can` value converter', () => {
      expect(document.body.textContent).to.equal('true')
    })

    it('re-calls `can` value converter when that instance is updated', async () => {
      ability.update([])
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(document.body.textContent).to.equal('false')
    })
  })

  class Post {
    constructor(attrs) {
      Object.assign(this, attrs)
    }
  }

  function configureApp(component, callback) {
    component.bootstrap(aurelia => {
      component.container = aurelia.container
      aurelia.use.standardConfiguration()
      callback(aurelia)
    })

    return component.create(bootstrap)
  }
})
