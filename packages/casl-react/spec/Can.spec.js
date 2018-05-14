import { createElement as e } from 'react'
import { AbilityBuilder } from '@casl/ability'
import renderer from 'react-test-renderer'
import { assertPropTypes } from 'check-prop-types'
import { Can } from '../src'

describe('`Can` component', () => {
  let ability
  let children

  beforeEach(() => {
    children = spy(returns => null)
    ability = AbilityBuilder.define(can => can('read', 'Post'))
  })

  it('requires to pass children', () => {
    const props = { ability, I: 'read', a: 'subject' }

    expect(() => validateProps(Can, props)).to.throw(/`children` is marked as required/)
  })

  it('may accept children as a function', () => {
    const props = { ability, I: 'read', a: 'subject', children: () => {} }

    expect(() => validateProps(Can, props)).not.to.throw(Error)
  })

  it('passes ability instance as an argument to "children" function', () => {
    const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))

    expect(children).to.have.been.called.with.exactly(ability)
  })

  it('requires to pass "I" as string', () => {
    const props = { ability, children, a: 'subject' }

    expect(() => validateProps(Can, props)).to.throw(/`I` is marked as required/)
    expect(() => validateProps(Can, { I: {}, ...props })).to.throw(/expected `string`/)
    expect(() => validateProps(Can, { I: 'read', ...props })).not.to.throw(Error)
  })

  it('requires to pass "a" or "this" or "of" as string or object', () => {
    const props = { ability, children, I: 'test' }

    expect(() => validateProps(Can, props)).to.throw(/`a` is marked as required/)
    expect(() => validateProps(Can, { a: 123, ...props })).to.throw(/Invalid prop `a`/)
    expect(() => validateProps(Can, { a: {}, ...props })).not.to.throw(Error)
    expect(() => validateProps(Can, { a: 'subject', ...props })).not.to.throw(Error)
  })

  it('requires "ability" prop to be an instance of `Ability`', () => {
    const props = { children, I: 'test', a: 'subject' }

    expect(() => validateProps(Can, props)).to.throw(/`ability` is marked as required/)
    expect(() => validateProps(Can, { ability: {}, ...props })).to.throw(/Invalid prop `ability`/)
    expect(() => validateProps(Can, { ability, ...props })).not.to.throw(Error)
  })

  it('has public "allowed" property which returns boolean indicating wether children will be rendered', () => {
    const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))

    expect(component.getInstance().allowed).to.equal(ability.can('read', 'Post'))
  })

  it('unsubscribes from ability updates when unmounted', () => {
    const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))
    const instance = component.getInstance()

    component.unmount()
    spy.on(instance, 'recheck')
    ability.update([])

    expect(instance.recheck).not.to.have.been.called()
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

    it('does not rerender itself when previous ability rules are changed', () => {
      const component = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, child))
      const anotherAbility = AbilityBuilder.define(can => can('manage', 'Post'))

      component.update(e(Can, { I: 'read', a: 'Post', ability: anotherAbility }, child))
      ability.update([])

      expect(component.toJSON().children).to.deep.equal([child.props.children])
    })
  })

  function validateProps(Component, props, propName) {
    assertPropTypes(Component.propTypes, props, 'prop', Component.name)
  }
})
