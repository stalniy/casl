import { createLocalVue } from '@vue/test-utils'
import { AbilityBuilder, Ability } from '@casl/ability'
import { abilitiesPlugin } from '../src'

describe('Abilities plugin', () => {
  let ability
  let Component
  let Vue
  let vm

  beforeEach(() => {
    Vue = createLocalVue()
    Component = Vue.extend({
      props: {
        post: { default: () => new Post() }
      },
      render(h) {
        return h('div', this.$can('read', this.post) ? 'Yes' : 'No')
      }
    })
  })


  describe('when ability is provided', () => {
    beforeEach(() => {
      ability = AbilityBuilder.define(can => can('read', 'Post'))
      Vue.use(abilitiesPlugin, ability)
      vm = new Component()
    })

    it('defines `$can` for each component', () => {
      expect(vm.$can).to.be.a('function')
    })

    it('defines `$ability` instance for all components', () => {
      expect(vm.$ability).to.equal(ability)
    })
  })

  describe('when ability is not provided', () => {
    beforeEach(() => {
      Vue.use(abilitiesPlugin)
      vm = new Component()
    })

    it('defines empty `$ability` instance for all components', () => {
      expect(vm.$ability).to.be.instanceof(Ability)
      expect(vm.$ability.rules).to.be.empty
    })
  })

  describe('`$can`', () => {
    beforeEach(() => {
      ability = AbilityBuilder.define(can => can('read', 'Post'))
      Vue.use(abilitiesPlugin, ability)
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

    it('updates components when ability is updated', (done) => {
      ability.update([])

      vm.$nextTick(() => {
        expect(vm.$el.textContent).to.equal('No')
        done()
      })
    })
  })

  class Post {
    constructor(attrs) {
      Object.assign(this, attrs)
    }
  }
})
