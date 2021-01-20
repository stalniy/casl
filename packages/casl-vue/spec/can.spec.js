import { createApp, h, nextTick } from 'vue'
import { defineAbility, subject } from '@casl/ability'
import { abilitiesPlugin, Can } from '../src'

describe('`Can` component', () => {
  it('renders all children if `Ability` instance allows to do an action', () => {
    const { root } = render(`
      <Can I="read" a="Plugin">
        <h1></h1>
        <h2></h2>
      </Can>
    `)

    expect(root.querySelectorAll('h1, h2')).to.have.length(2)
  })

  it('renders all children if `Ability` instance allows to do an action on field', () => {
    const { root } = render(`
      <Can I="update" a="Plugin" field="version">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).to.exist
  })

  it('inverts permission condition when `not` prop is passed', () => {
    const { root } = render(`
      <Can not I="read" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).not.to.exist
  })

  it('does not render children if `Ability` instance disallows to do an action', () => {
    const { root } = render(`
      <Can I="delete" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).not.to.exist
  })

  it('re-renders when `Ability` instance changes', async () => {
    const ability = createAppAbility()
    const { root } = render(`
      <Can I="read" a="Plugin">
        <h1></h1>
      </Can>
    `, ability)

    ability.update([])
    await nextTick()

    expect(root.querySelector('h1')).not.to.exist
  })

  it('uses `this` property as a subject', async () => {
    const { vm, root } = render(`
      <Can I="read" :this="subject">
        <h1></h1>
      </Can>
    `)
    vm.subject = subject('Plugin', {})
    await nextTick()

    expect(root.querySelector('h1')).to.exist
  })

  it('uses `an` property as a subject type', () => {
    const { root } = render(`
      <Can I="read" an="Article">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).not.to.exist
  })

  it('is possible to omit subject', () => {
    const ability = defineAbility(can => can('read', 'all'))
    const { root } = render(`
      <Can I="read">
        <h1></h1>
      </Can>
    `, ability)

    expect(root.querySelector('h1')).to.exist
  })

  describe('`passThrough` property', () => {
    const ability = createAppAbility()
    let scopedSlot

    beforeEach(() => {
      scopedSlot = spy(() => 'scoped default slot')
      render(() => h('div', [
        h(Can, {
          I: 'delete',
          a: 'Plugin',
          passThrough: true,
        }, {
          default: scopedSlot
        })
      ]), ability)
    })

    it('always renders passed in slot', () => {
      expect(scopedSlot).to.have.been.called()
    })

    it('passes `allowed` and `ability` vars into scoped slot', () => {
      expect(scopedSlot).to.have.been.called.with({ ability, allowed: false })
    })
  })

  describe('props validation', () => {
    it('throws error if action (i.e., `I` or `do`) is not specified', () => {
      expect(() => render(`
        <Can a="Plugin">
          <h1></h1>
        </Can>
      `)).to.throw(/`I` nor `do` prop was passed/i)
    })

    it('throws error if created without default slot', () => {
      expect(() => render(`
        <Can I="read" a="Post" />
      `)).to.throw(/expects to receive default slot/i)
    })
  })

  function render(template, appAbility = null) {
    const App = {
      name: 'App',
      data: () => ({
        action: 'read',
        subject: 'Plugin'
      })
    }

    if (typeof template === 'function') {
      App.render = template
    } else {
      App.template = template.trim()
    }

    const root = window.document.createElement('div')
    const app = createApp(App)
      .use(abilitiesPlugin, appAbility || createAppAbility())
      .component(Can.name, Can)
    app.config.warnHandler = () => {}
    const vm = app.mount(root)

    return { root, vm }
  }

  function createAppAbility() {
    return defineAbility((can) => {
      can('read', 'Plugin')
      can('update', 'Plugin', 'version')
    })
  }
})
