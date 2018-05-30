import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import { AbilityBuilder } from '@casl/ability'
import { abilitiesPlugin } from '../src'
import Can from '../src/component/can'

describe('`Can` component', () => {
  const LocalVue = createLocalVue()
  const ability = AbilityBuilder.define(can => {
    can('read', 'Plugin')
    can('update', 'Plugin', 'version')
  })

  beforeAll(() => {
    LocalVue.use(abilitiesPlugin, ability)
    LocalVue.component('Can', Can)
  })

  it('renders all children if `Ability` instance allows to do an action', () => {
    const wrapper = render(`
      <Can I="read" a="Plugin">
        <h1></h1>
        <h2></h2>
      </Can>
    `)

    expect(wrapper.contains('h1, h2')).to.be.true
  })

  it('renders all children if `Ability` instance allows to do an action on field', () => {
    const wrapper = render(`
      <Can I="update version" of="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(wrapper.contains('h1')).to.be.true
  })

  it('inverts permission condition when `not` prop is passed', () => {
    const wrapper = render(`
      <Can not I="read" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(wrapper.contains('h1')).to.be.false
  })

  it('does not render children if `Ability` instance disallows to do an action', () => {
    const wrapper = render(`
      <Can I="delete" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(wrapper.contains('h1')).to.be.false
  })

  describe('props validation', () => {
    beforeAll(() => {
      spy.on(Vue.config, 'errorHandler', (error, vm) => vm.error = error)
    })

    afterAll(() => {
      spy.restore(Vue.config, 'errorHandler')
    })

    it('throws error if action (i.e., `I` or `do`) is not specified', () => {
      const wrapper = render(`
        <Can a="Plugin">
          <h1></h1>
        </Can>
      `)

      expect(wrapper.vm.error).to.match(/`I` nor `do` property exist/)
    })

    it('throws error if subject (i.e., `a`, `of`, `this` or `on`) is not specified', () => {
      const wrapper = render(`
        <Can I="read">
          <h1></h1>
        </Can>
      `)

      expect(wrapper.vm.error).to.match(/`of` nor `a` nor `this` nor `on` property exist/)
    })
  })

  function render(template) {
    return mount({ template: `<div>${template.trim()}</div>` }, {
      localVue: LocalVue
    })
  }
})
