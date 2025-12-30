import { createApp, h, nextTick, VNode } from 'vue'
import { defineAbility, MongoAbility, subject } from '@casl/ability'
import { abilitiesPlugin, Can } from '../src'

describe('`Can` component', () => {
  it('renders all children if `Ability` instance allows to do an action', () => {
    const { root } = render(`
      <Can I="read" a="Plugin">
        <h1></h1>
        <h2></h2>
      </Can>
    `)

    expect(root.querySelectorAll('h1, h2')).toHaveLength(2)
  })

  it('renders all children if `Ability` instance allows to do an action on field', () => {
    const { root } = render(`
      <Can I="update" a="Plugin" field="version">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).toBeTruthy()
  })

  it('inverts permission condition when `not` prop is passed', () => {
    const { root } = render(`
      <Can not I="read" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).toBeFalsy()
  })

  it('does not render children if `Ability` instance disallows to do an action', () => {
    const { root } = render(`
      <Can I="delete" a="Plugin">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).toBeFalsy()
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

    expect(root.querySelector('h1')).toBeFalsy()
  })

  it('uses `this` property as a subject', async () => {
    const { vm, root } = render(`
      <Can I="read" :this="subject">
        <h1></h1>
      </Can>
    `)
    ;(vm as any).subject = subject('Plugin', {})
    await nextTick()

    expect(root.querySelector('h1')).toBeTruthy()
  })

  it('uses `an` property as a subject type', () => {
    const { root } = render(`
      <Can I="read" an="Article">
        <h1></h1>
      </Can>
    `)

    expect(root.querySelector('h1')).toBeFalsy()
  })

  it('is possible to omit subject', () => {
    const ability = defineAbility(can => can('read', 'all'))
    const { root } = render(`
      <Can I="read">
        <h1></h1>
      </Can>
    `, ability)

    expect(root.querySelector('h1')).toBeTruthy()
  })

  describe('`passThrough` property', () => {
    it('always renders passed in slot', () => {
      const { scopedSlot } = setup()
      expect(scopedSlot).toHaveBeenCalled()
    })

    it('passes `allowed` and `ability` vars into scoped slot', () => {
      const { scopedSlot, ability } = setup()
      expect(scopedSlot).toHaveBeenCalledWith({ ability, allowed: false })
    })

    function setup() {
      const ability = createAppAbility()
      const scopedSlot = jest.fn(() => h('span', 'scoped default slot'))

      render(() => h('div', [
        h(Can, {
          I: 'delete',
          a: 'Plugin',
          passThrough: true,
        }, {
          default: scopedSlot
        })
      ]), ability)

      return {
        ability,
        scopedSlot
      }
    }
  })

  describe('props validation', () => {
    it('throws error if action (i.e., `I` or `do`) is not specified', () => {
      expect(() => render(`
        <Can a="Plugin">
          <h1></h1>
        </Can>
      `)).toThrow(/`I` nor `do` prop was passed/i)
    })

    it('throws error if created without default slot', () => {
      expect(() => render(`
        <Can I="read" a="Post" />
      `)).toThrow(/expects to receive default slot/i)
    })
  })

  function render(template: string | (() => VNode), appAbility: MongoAbility | null = null) {
    const App = typeof template === 'function'
      ? {
          name: 'App',
          render: template
        }
      : {
          name: 'App',
          data: () => ({
            action: 'read',
            subject: 'Plugin'
          }),
          template: template.trim()
        }

    const root = window.document.createElement('div')
    const app = createApp(App)
      .use(abilitiesPlugin, appAbility || createAppAbility())
      .component(Can.name!, Can)
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
