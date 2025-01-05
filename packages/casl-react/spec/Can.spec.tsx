import React from 'react'
import { defineAbility, MongoAbility } from '@casl/ability'
import { Can } from '../src'
import { act, render, screen } from '@testing-library/react'

describe('`Can` component', () => {
  let ability: MongoAbility

  beforeEach(() => {
    ability = defineAbility(can => can('read', 'Post'))
  })

  it('passes ability check value and instance as arguments to "children" function', () => {
    const children = jest.fn()
    render(<Can I="read" a="Post" ability={ability}>{children}</Can>)

    expect(children).toHaveBeenCalledWith(ability.can('read', 'Post'), ability)
  })

  it('unsubscribes from ability updates when unmounted', () => {
    jest.spyOn(ability, 'can')
    const component = render(<Can I='read' a='Post' ability={ability}>test</Can>)

    component.unmount()
    act(() => ability.update([]))

    expect(ability.can).toHaveBeenCalledTimes(1)
  })

  describe('rendering', () => {
    it('renders children if ability allows to perform an action', () => {
      render(<Can I='read' a='Post' ability={ability}>I can see it</Can>)

      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('does not render children if ability does not allow to perform an action', () => {
      render(<Can I="update" a="Post" ability={ability}>I can see it</Can>)

      expect(screen.queryByText('I can see it')).not.toBeTruthy()
    })

    it('does not render children if ability allows to perform an action, but `not` is set to true', () => {
      render(<Can not={true} I="read" a="Post" ability={ability}>I can see it</Can>)

      expect(screen.queryByText('I can see it')).not.toBeTruthy()
    })

    it('rerenders when ability rules are changed', () => {
      render(<Can I="read" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).toBeTruthy()

      act(() => ability.update([]))
      expect(screen.findByText('I can see it')).toBeTruthy()
    })

    it('rerenders when `I` prop is changed', () => {
      const component = render(<Can I="update" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerender(<Can I="read" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('rerenders when `a` or `an` or `this` prop is changed', () => {
      const component = render(<Can I="read" a="User" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerender(<Can I="read" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('rerenders when `not` prop is changed', () => {
      const component = render(<Can not={true} I="read" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerender(<Can not={false} I="read" a="Post" ability={ability}>I can see it</Can>)
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('does not rerender itself when previous ability rules are changed', () => {
      const component = render(<Can I="read" a="Post" ability={ability}>I can see it</Can>)
      const anotherAbility = defineAbility(can => can('manage', 'Post'))

      jest.spyOn(ability, 'can')
      component.rerender(<Can I="read" a="Post" ability={anotherAbility}>I can see it</Can>)
      act(() => ability.update([]))

      expect(screen.queryByText('I can see it')).toBeTruthy()
      expect(ability.can).not.toHaveBeenCalled()
    })

    it('can render multiple children with `React.Fragment`', () => {
      render(<Can I="read" a="Post" ability={ability}><>
        <p>line 1</p>
        <p>line 2</p>
      </></Can>)

      expect(screen.queryByText('line 1')).toBeTruthy()
      expect(screen.queryByText('line 2')).toBeTruthy()
    })

    it('always renders children if `passThrough` prop is `true`', () => {
      const children = jest.fn()
      render(<Can I="delete" a="Post" passThrough={true} ability={ability}>{children}</Can>)

      expect(ability.can('delete', 'Post')).toBe(false)
      expect(children).toHaveBeenCalledWith(false, ability)
    })
  })
})
