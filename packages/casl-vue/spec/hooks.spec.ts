import { createApp, h } from 'vue'
import { createMongoAbility } from '@casl/ability'
import { provideAbility, useAbility } from '../src'

describe('Vue hooks', () => {
  const Child = {
    setup() {
      try {
        useAbility()
        return () => 'Provided'
      } catch (e) {
        return () => (e as Error).message
      }
    }
  }

  describe('provideAbility', () => {
    it('provides reactive `Ability` instance', () => {
      const { ability, root } = setup()
      createApp({
        setup() {
          provideAbility(ability)
          return () => h(Child)
        }
      }).mount(root)

      expect(root.innerHTML).toEqual('Provided')
    })
  })

  describe('`useAbility`', () => {
    it('throws if `Ability` instance has not been provided', () => {
      const { root } = setup()
      const app = createApp({
        setup: () => () => h(Child)
      })

      app.config.warnHandler = () => {}
      app.mount(root)

      expect(root.innerHTML).toContain('Cannot inject Ability instance')
    })

    it('allows to use `can` and `cannot` directly', () => {
      const { ability, root } = setup()
      const app = createApp({
        setup() {
          provideAbility(ability)
          return () => h({
            setup() {
              const { can, cannot } = useAbility()
              return () => {
                return h('div', can('read', 'Post').toString() + cannot('read', 'Post').toString())
              }
            }
          })
        }
      })

      app.mount(root)
      expect(root.firstElementChild?.innerHTML).toEqual('falsetrue')
    })
  })

  function setup() {
    const ability = createMongoAbility()
    const root = document.createElement('div')

    return {
      ability,
      root
    }
  }
})
