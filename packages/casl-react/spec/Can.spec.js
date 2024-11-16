import { defineAbility, ForbiddenError } from '@casl/ability'
import { createElement as e } from 'react'
import renderer from 'react-test-renderer'
import { Can } from '../src'

describe('`Can` component', () => {
  let ability
  let children
  let cantChopWoodReason = 'You are not a lumberjack'

  beforeEach(() => {
    children = spy(() => null)
    ability = defineAbility((can, cannot) => {
      can('read', 'Post')
      cannot('chop', 'Wood').because(cantChopWoodReason)
    })
    
  })

  it('passes ability check value and instance as arguments to "children" function', () => {
    renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))

    expect(children).to.have.been.called.with.exactly(ability.can('read', 'Post'), ability, undefined)
  })

  it('passes forbidden reason message to "children" function when not allowed', () => {

    renderer.create(e(Can, { I: 'chop', a: 'Wood', ability, passThrough: true }, children))
    expect(children).to.have.been.called.with.exactly(ability.can('chop', 'Wood'), ability, ForbiddenError.from(ability).unlessCan('chop', 'Wood')?.message)
  })

  it('Does not pass forbidden reason message to "children" function when allowed', () => {
    renderer.create(e(Can, { not: true, I: 'chop', a: 'Wood', ability, passThrough: true }, children))

    expect(children).to.have.been.called.with.exactly(ability.cannot('chop', 'Wood'), ability, undefined)
  })
  

  it('has public "allowed" property which returns boolean indicating whether children will be rendered', () => {
    const canComponent = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))
    renderer.create(e(Can, { not: true, I: 'run', a: 'Marathon', ability }, children))

    expect(canComponent.getInstance().allowed).to.equal(ability.can('read', 'Post'))
    expect(canComponent.getInstance().allowed).to.equal(ability.cannot('run', 'Marathon'))
  })

  it('has public "forbiddenReason" property which returns the message for ForbiddenError ', () => {
    const canComponent = renderer.create(e(Can, { I: 'read', a: 'Post', ability }, children))
    renderer.create(e(Can, {  not: true, I: 'run', a: 'Marathon', ability }, children))

    expect(canComponent.getInstance().forbiddenReason).to.equal(ForbiddenError.from(ability).unlessCan('read', 'Post')?.message)
    expect(canComponent.getInstance().forbiddenReason).to.equal(ForbiddenError.from(ability).unlessCannot('run', 'Marathon')?.message)
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

    it('rerenders when `a` or `an` or `this` prop is changed', () => {
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
      const anotherAbility = defineAbility(can => can('manage', 'Post'))

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
})
