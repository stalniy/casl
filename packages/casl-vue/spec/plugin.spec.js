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

  beforeAll(() => {
    ability = AbilityBuilder.define(can => can('read', 'Post'))
    Vue.use(abilitiesPlugin, ability)

    Component = Vue.extend({
      props: {
        post: { default: () => new Post() }
      },
      render(h) {
        return h('div', this.$can('read', this.post) ? 'Yes' : 'No')
      }
    })
  })

  it('defines `$can` for each component', () => {
    const vm = new Component()

    expect(vm.$can).to.be.a('function')
  })

  describe('`$can`', () => {
    let vm

    beforeEach(() => {
      vm = new Component().$mount()
    })

    it('calls `can` method of underlying ability instance', () => {
      spy.on(ability, 'can')
      vm.$can('read', vm.post)

      expect(ability.can).to.have.been.called.with.exactly('read', vm.post)

      spy.restore(ability, 'can')
    })

    it('can be used inside component template', () => {
      expect(vm.$el.textContent).to.equal('Yes')
    })

    it ('updates components when ability is updated', (done) => {
      ability.update([])

      vm.$nextTick(() => {
        expect(vm.$el.textContent).to.equal('No')
        done()
      })
    })
  })
})
