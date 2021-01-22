import { createApp, h } from 'vue'
import { Ability } from '@casl/ability'
import { provideAbility, useAbility } from '../src'

describe('Vue hooks', () => {
  let ability
  let root
  const Child = {
    setup() {
      try {
        useAbility()
        return () => 'Provided'
      } catch (e) {
        return () => e.message
      }
    }
  }

  beforeEach(() => {
    ability = new Ability()
    root = document.createElement('div')
  })

  describe('provideAbility', () => {
    it('provides reactive `Ability` instance', () => {
      createApp({
        setup() {
          provideAbility(ability)
          return () => h(Child)
        }
      }).mount(root)

      expect(root.innerHTML).to.equal('Provided')
    })
  })

  describe('`useAbility`', () => {
    it('throws if `Ability` instance has not been provided', () => {
      const app = createApp({
        setup: () => () => h(Child)
      })

      app.config.warnHandler = () => {}
      app.mount(root)

      expect(root.innerHTML).to.contain('Cannot inject Ability instance')
    })
  })
})
