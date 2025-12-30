import { createApp, defineComponent, nextTick } from 'vue'
import { defineAbility, MongoAbility } from '@casl/ability'
import { abilitiesPlugin, ABILITY_TOKEN, AbilityPluginOptions, Can } from '../src'

describe('Abilities plugin', () => {
  const App = defineComponent({
    inject: {
      ability: { from: ABILITY_TOKEN }
    },
    render() {
      return (this as any).ability.can('read', 'Post') ? 'Yes' : 'No'
    }
  })

  it('throws if `Ability` instance is not passed', () => {
    setup()
    // @ts-expect-error - we want to test the error case
    expect(() => createApp(App).use(abilitiesPlugin, undefined))
      .toThrow(/Please provide an Ability instance/)
    // @ts-expect-error - we want to test the error case
    expect(() => createApp(App).use(abilitiesPlugin, { something: 'something' }))
      .toThrow(/Please provide an Ability instance/)
  })

  describe('by default', () => {
    it('does not define global `$ability` and `$can` if `useGlobalProperties` is falsy', () => {
      const { vm } = setup()
      expect(vm.$ability).toBeFalsy()
      expect(vm.$can).toBeFalsy()
    })

    it('does not provide `Can` component', () => {
      const { app } = setup()
      expect(app.component(Can.name!)).toBeFalsy()
    })

    it('provides `Ability` instance', () => {
      const { vm, ability } = setup()
      expect((vm as any).ability).toBe(ability)
    })

    it('provides reactive `Ability` instance', async () => {
      const { appRoot, ability } = setup()
      expect(appRoot.innerHTML).toBe('Yes')

      ability.update([])
      await nextTick()

      expect(appRoot.innerHTML).toBe('No')
    })
  })

  describe('when `useGlobalProperties` is true', () => {
    it('defines `$can` and `$ability` for all components', () => {
      const { vm } = setup({
        useGlobalProperties: true
      })
      expect(vm.$can('read', 'Post')).toBe(true)
      expect(vm.$ability.can('read', 'Post')).toBe(true)
    })
  })

  function setup(pluginOptions?: AbilityPluginOptions) {
    const ability = defineAbility(can => can('read', 'Post'))
    const appRoot = window.document.createElement('div')

    const app = createApp(App)
      .use(abilitiesPlugin, ability, pluginOptions)
    const vm = app.mount(appRoot)
    return {
      ability,
      appRoot,
      vm,
      app
    }
  }
})

declare module 'vue' {
  interface ComponentCustomProperties {
    $ability: MongoAbility
    $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean
  }
}
