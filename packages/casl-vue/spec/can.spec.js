import { createLocalVue, mount } from '@vue/test-utils'
import { AbilityBuilder } from '@casl/ability'
import { abilitiesPlugin } from '../src'
import Can from '../src/component/can'

describe('vue Can component', () => {
  const localVue = createLocalVue()
  const abilityFromPlugin = AbilityBuilder.define(can => can('read', 'Plugin'))
  localVue.use(abilitiesPlugin, abilityFromPlugin)
  localVue.component('Can', Can)


  describe('`Can` component return single element when only have one element', () => {
    const Component = {
      template: `
                  <Can  I = 'read' of = 'Plugin'>
                    <h1></h1>
                  </Can>
      `
    }
    const wrapper = mount(Component, {
      localVue
    })

    it('use ability from plugin', () => {
      expect(wrapper.contains('h1')).to.equal(true)
    })
  })

  describe('use ability from plugin', () => {
    const Component = {
      template: `
                <div>
                  <Can  I = 'read' of = 'Plugin'>
                    <span></span>
                    <h1></h1>
                  </Can>
                  <button @click="updateAbility"></button>
                </div>
      `,
      methods: {
        updateAbility() {
          this.$ability.update([{
            action: 'read',
            subject: 'Provider'
          }])
        }
      }
    }
    const wrapper = mount(Component, {
      localVue
    })
    it('use ability from plugin', () => {
      expect(wrapper.contains('h1')).to.equal(true)
    })
    it('update ability to provider', () => {
      wrapper.find('button').trigger('click')
      expect(wrapper.contains('h1')).to.equal(false)
    })
  })

  describe('Validation props', () => {
    spy.on(console, 'error')

    it('prop no error', () => {
      const Component = {
        template: `
                    <Can do = 'update' on = 'Post'>
                      <h1></h1>
                    </Can>
        `
      }
      const wrapper = mount(Component, {
        localVue
      })
      expect(console.error).to.not.have.been.called()
    })

    it('prop no error', () => {
      const Component = {
        template: `
                    <Can I = 'update' this = 'Post'>
                      <h1></h1>
                    </Can>
        `
      }
      const wrapper = mount(Component, {
        localVue
      })
      expect(console.error).to.not.have.been.called()
    })

    it('lack action prop', () => {
      const Component = {
        template: `
                    <Can a = 'Plugin'>
                      <h1></h1>
                    </Can>
        `
      }
      const wrapper = mount(Component, {
        localVue
      })
      expect(console.error).to.have.been.called()
    })

    it('lack subject prop', () => {
      const Component = {
        template: `
                    <Can I = 'read'>
                      <h1></h1>
                    </Can>
        `
      }
      const wrapper = mount(Component, {
        localVue
      })
      expect(console.error).to.have.been.called(2)
    })
  })
})
