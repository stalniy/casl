import { createElement as e, createContext } from 'react'
import renderer from 'react-test-renderer'
import { AbilityBuilder } from '@casl/ability'
import { Can, createCanBoundTo, createContextualCan } from '../src'

describe('Factory methods which create `Can` component', () => {
  let ability
  let child

  beforeEach(() => {
    ability = AbilityBuilder.define(can => can('read', 'Post'))
    child = spy(() => e('p', null, 'children'))
  })

  describe('`createCanBoundTo`', () => {
    let BoundCan

    beforeEach(() => {
      BoundCan = createCanBoundTo(ability)
    })

    it('creates another component with bound ability instance', () => {
      const component = renderer.create(e(BoundCan, { I: 'read', a: 'Post' }, child))

      expect(component.toJSON().children).to.deep.equal([child().props.children])
    })

    it('extends `Can` component', () => {
      const component = renderer.create(e(BoundCan, { I: 'read', a: 'Post' }, child))
      const instance = component.getInstance()

      expect(instance).to.be.instanceof(Can)
      expect(instance).to.be.instanceof(BoundCan)
    })

    it('allows to override ability by passing "ability" property', () => {
      const anotherAbility = AbilityBuilder.define(can => can('update', 'Post'))
      const component = renderer.create(e(BoundCan, { I: 'read', a: 'Post', ability: anotherAbility }, child))

      expect(component.toJSON()).to.be.null
    })
  })

  describe('`createContextualCan`', () => {
    let AbilityContext
    let ContextualCan

    beforeEach(() => {
      AbilityContext = createContext()
      ContextualCan = createContextualCan(AbilityContext.Consumer)
    })

    it('allows to override `Ability` instance by passing it in props', () => {
      const element = e(ContextualCan, { I: 'read', a: 'Post', ability }, child)
      renderer.create(element)

      expect(child).to.have.been.called.with(ability)
    })

    it('expects `Ability` instance to be provided by context Provider', () => {
      const App = e(
        AbilityContext.Provider,
        { value: ability },
        e(ContextualCan, { I: 'read', a: 'Post' }, child)
      )
      renderer.create(App)

      expect(child).to.have.been.called.with(ability)
    })
  })
})
