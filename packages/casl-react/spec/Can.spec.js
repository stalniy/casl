import { createElement as e } from 'react'
import { AbilityBuilder } from '@casl/ability'
import renderer from 'react-test-renderer'
import { assertPropTypes } from 'check-prop-types'
import { Can } from '../src'

describe('`Can` component', () => {
  let ability
  let children

  beforeEach(() => {
    children = spy(() => null)
    ability = AbilityBuilder.define(can => can('read', 'Post'))
  })

  it('may accept children as a function', () => {
    const props = { ability, I: 'read', a: 'subject', children: () => {} }

    expect(() => validateProps(Can, props)).not.to.throw(Error)
  })

  it('passes ability check value and instance as arguments to "children" function', () => {
    renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))

    expect(children).to.have.been.called.with.exactly(ability.can('read', 'Post'), ability)
  })

  it('has public "allowed" property which returns boolean indicating whether children will be rendered', () => {
    const canComponent = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))
    renderer.create(e(Can, { not: true, I: 'run', a: 'Marathon', ability }, children))

    expect(canComponent.getInstance().allowed).to.equal(ability.can('read', 'Post'))
    expect(canComponent.getInstance().allowed).to.equal(ability.cannot('run', 'Marathon'))
  })

  it('unsubscribes from ability updates when unmounted', () => {
    const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))

    spy.on(ability, 'can')
    component.unmount()
    ability.update([])

    expect(ability.can).not.to.have.been.called()
  })

  describe('#render', () => {
    let child

    beforeEach(() => {
      child = e('a', null, 'children')
    })

    it('renders children if ability allows to perform an action', () => {
      const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, child))

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })

    it('does not render children if ability does not allow to perform an action', () => {
      const component = renderer.create(e(Can, { I: 'update', a: 'Post', ability }, child))

      expect(component.toJSON()).to.be.null
    })

    it('does not render children if ability allows to perform an action, but `not` is set to true', () => {
      const component = renderer.create(e(Can, { not: true, I: 'read', a: 'Post', ability }, child))

      expect(component.toJSON()).to.be.null
    })

    it('rerenders when ability rules are changed', () => {
      const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, child))
      ability.update([])

      expect(component.toJSON()).to.be.null
    })

    it('rerenders when `I` prop is changed', () => {
      const component = renderer.create(e(Can, { I: 'update', a: 'Post', ability }, child))
      component.update(e(Can, { I: 'read', a: 'Post', ability }, child))

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })

    it('rerenders when `a` or `this` or `of` prop is changed', () => {
      const component = renderer.create(e(Can, { I: 'read', a: 'User', ability }, child))
      component.update(e(Can, { I: 'read', a: 'Post', ability }, child))

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })

    it('rerenders when `not` prop is changed', () => {
      const component = renderer.create(e(Can, { not: true, I: 'read', a: 'Post', ability }, child))
      component.update(e(Can, { not: false, I: 'read', a: 'Post', ability }, child))

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })

    it('does not rerender itself when previous ability rules are changed', () => {
      const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, child))
      const anotherAbility = AbilityBuilder.define(can => can('manage', 'Post'))

      component.update(e(Can, { I: 'read', a: 'Post', ability: anotherAbility }, child))
      ability.update([])

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })

    it('can render multiple children if `React.Fragment` is available', () => {
      const localChildren = [child, e('h1', null, 'another children')]
      const component = renderer.create(
        e(Can, { I: 'read', a: 'Post', ability }, ...localChildren)
      )
      const renderedChildren = localChildren.map(element => renderer.create(element).toJSON())

      expect(component.toJSON()).to.deep.equal(renderedChildren)
    })

    it('always renders children if `passThrough` prop is `true`', () => {
      const component = renderer.create(
        e(Can, { I: 'delete', a: 'Post', passThrough: true, ability }, child)
      )

      expect(ability.can('delete', 'Post')).to.be.false
      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })
  })

  function validateProps(Component, props) {
    assertPropTypes(Component.propTypes, props, 'prop', Component.name)
  }
})
