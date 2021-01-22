import { createApp, defineComponent, nextTick } from 'vue'
import { defineAbility } from '@casl/ability'
import { abilitiesPlugin, ABILITY_TOKEN, Can } from '../src'

describe('Abilities plugin', () => {
  let ability
  let vm
  let app
  let appRoot
  const App = defineComponent({
    inject: {
      ability: { from: ABILITY_TOKEN }
    },
    render() {
      return this.ability.can('read', 'Post') ? 'Yes' : 'No'
    }
  })

  beforeEach(() => {
    ability = defineAbility(can => can('read', 'Post'))
    appRoot = window.document.createElement('div')
  })

  it('throws if `Ability` instance is not passed', () => {
    expect(() => createApp().use(abilitiesPlugin))
      .to.throw(/Please provide an Ability instance/)
    expect(() => createApp().use(abilitiesPlugin, {}))
      .to.throw(/Please provide an Ability instance/)
  })

  describe('by default', () => {
    beforeEach(() => {
      app = createApp(App)
        .use(abilitiesPlugin, ability)
      vm = app.mount(appRoot)
    })

    it('does not define global `$ability` and `$can` if `useGlobalProperties` is falsy', () => {
      expect(vm.$ability).not.to.exist
      expect(vm.$can).not.to.exist
    })

    it('does not provide `Can` component', () => {
      expect(app.component(Can.name)).not.to.exist
    })

    it('provides `Ability` instance', () => {
      expect(vm.ability).to.equal(ability)
    })

    it('provides reactive `Ability` instance', async () => {
      expect(appRoot.innerHTML).to.equal('Yes')

      ability.update([])
      await nextTick()

      expect(appRoot.innerHTML).to.equal('No')
    })
  })

  describe('when `useGlobalProperties` is true', () => {
    beforeEach(() => {
      vm = createApp(App)
        .use(abilitiesPlugin, ability, {
          useGlobalProperties: true
        })
        .mount(appRoot)
    })

    it('defines `$can` and `$ability` for all components', () => {
      expect(vm.$can).to.be.a('function')
      expect(vm.$ability).to.equal(ability)
    })
  })
})
