import Vue from 'vue'
import { AbilityBuilder } from '@casl/ability'
import { abilitiesPlugin } from '../src'

class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

describe('Abilities plugin', () => {
  let ability
  let Component

  before(() => {
    ability = AbilityBuilder.define(can => {
      can('read', 'Post')
      can(['update', 'delete'], 'Post', { userId: 'me' })
    })
    Vue.use(abilitiesPlugin, ability)

    Component = Vue.extend({
      props: {
        post: { default: () => new Post() }
      },
      template: `{{ $can('read', post) ? 'Yes' : 'No' }}`
    })
  })

  it('defines `$can` for each component', () => {
    const vm = new Component()

    expect(vm.$can).to.be.a('function')
  })

  describe('`$can`', () => {
    it('calls `can` method of underlying ability instance', () => {
      const vm = new Component()
      spy.on(ability, 'can')
      vm.$can('read', vm.post)

      expect(ability.can).to.have.been.called.with.exactly('read', vm.post)

      spy.restore(ability, 'can')
    })

    it('updates components when ability is updated', () => {
      // TODO
    })
  })
})
