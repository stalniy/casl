import { createLocalVue, mount } from '@vue/test-utils'
import { AbilityBuilder } from '@casl/ability'
import { abilitiesPlugin } from '../src'
import Can from '../src/component/can'

describe('`Can` component', () => {
  const LocalVue = createLocalVue()
  const ability = AbilityBuilder.define((can) => {
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

  describe('`passThrough` property', () => {
    let scopedSlot

    beforeEach(() => {
      scopedSlot = spy()
      render(h => h('div', [
        h(Can, {
          props: { I: 'delete', a: 'Plugin', passThrough: true },
          scopedSlots: { default: scopedSlot }
        })
      ]))
    })

    it('allows to always render scoped slot', () => {
      expect(scopedSlot).to.have.been.called()
    })

    it('passes `allowed` and `ability` vars into scoped slot', () => {
      expect(scopedSlot).to.have.been.called.with({ ability, allowed: false })
    })
  })

  describe('props validation', () => {
    beforeAll(() => {
      spy.on(console, 'error', () => {})
    })

    afterAll(() => {
      spy.restore(console, 'error')
    })

    it('throws error if action (i.e., `I` or `do`) is not specified', () => {
      expect(() => render(`
        <Can a="Plugin">
          <h1></h1>
        </Can>
      `)).to.throw(/`I` nor `do` prop was passed/)
    })

    it('throws error if `passThrough` is passed without scoped slot', () => {
      expect(() => render(`
        <Can I="read" a="Post" passThrough>
          <h1></h1>
        </Can>
      `)).to.throw(/`passThrough` expects default scoped slot/)
    })
  })

  function render(template) {
    const defs = {}

    if (typeof template === 'function') {
      defs.render = template
    } else {
      defs.template = `<div>${template.trim()}</div>`
    }

    return mount(defs, {
      localVue: LocalVue
    })
  }
})
