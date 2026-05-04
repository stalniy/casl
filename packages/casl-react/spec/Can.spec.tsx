import React from 'react'
import { defineAbility, MongoAbility } from '@casl/ability'
import { AbilityProvider, Can, CanProps } from '../src'
import { act, render, screen } from '@testing-library/react'

describe('`Can` component', () => {
  let ability: MongoAbility

  beforeEach(() => {
    ability = defineAbility(can => can('read', 'Post'))
  })

  it('passes ability check value and instance as arguments to "children" function', () => {
    const children = jest.fn()
    setup({ I: 'read', a: 'Post', children })

    expect(children).toHaveBeenCalledWith({
      isAllowed: true,
      ability,
      reason: undefined
    })
  })

  it('unsubscribes from ability updates when unmounted', () => {
    jest.spyOn(ability, 'relevantRuleFor')
    const component = setup({ I: 'read', a: 'Post', children: 'test' })

    component.unmount()
    act(() => ability.update([]))

    expect(ability.relevantRuleFor).toHaveBeenCalledTimes(1)
  })

  it('does not recompute permission check when rerendered with the same props', () => {
    jest.spyOn(ability, 'relevantRuleFor')
    const component = setup({ I: 'read', a: 'Post', children: 'test' })

    component.rerenderWithAbility({ I: 'read', a: 'Post', children: 'test' })

    expect(ability.relevantRuleFor).toHaveBeenCalledTimes(1)
  })

  describe('rendering', () => {
    it('renders children if ability allows to perform an action', () => {
      setup({ I: 'read', a: 'Post', children: 'I can see it' })

      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('does not render children if ability does not allow to perform an action', () => {
      setup({ I: 'update', a: 'Post', children: 'I can see it' })

      expect(screen.queryByText('I can see it')).not.toBeTruthy()
    })

    it('does not render children if ability allows to perform an action, but `not` is set to true', () => {
      setup({ not: true, I: 'read', a: 'Post', children: 'I can see it' })

      expect(screen.queryByText('I can see it')).not.toBeTruthy()
    })

    it('rerenders when ability rules are changed', () => {
      setup({ I: 'read', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).toBeTruthy()

      act(() => ability.update([]))
      expect(screen.queryByText('I can see it')).not.toBeTruthy()
    })

    it('rerenders when `I` prop is changed', () => {
      const component = setup({ I: 'update', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerenderWithAbility({ I: 'read', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('rerenders when `a` or `an` or `this` prop is changed', () => {
      const component = setup({ I: 'read', a: 'User', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerenderWithAbility({ I: 'read', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('rerenders when `not` prop is changed', () => {
      const component = setup({ not: true, I: 'read', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).not.toBeTruthy()

      component.rerenderWithAbility({ not: false, I: 'read', a: 'Post', children: 'I can see it' })
      expect(screen.queryByText('I can see it')).toBeTruthy()
    })

    it('does not rerender itself when previous ability rules are changed', () => {
      const component = setup({ I: 'read', a: 'Post', children: 'I can see it' })
      const anotherAbility = defineAbility(can => can('manage', 'Post'))

      jest.spyOn(ability, 'relevantRuleFor')
      component.rerenderWithAbility({ I: 'read', a: 'Post', children: 'I can see it' }, anotherAbility)
      act(() => ability.update([]))

      expect(screen.queryByText('I can see it')).toBeTruthy()
      expect(ability.relevantRuleFor).not.toHaveBeenCalled()
    })

    it('can render multiple children with `React.Fragment`', () => {
      setup({ I: 'read', a: 'Post', children: <>
        <p>line 1</p>
        <p>line 2</p>
      </> })

      expect(screen.queryByText('line 1')).toBeTruthy()
      expect(screen.queryByText('line 2')).toBeTruthy()
    })

    it('always renders children if `passThrough` prop is `true`', () => {
      const children = jest.fn()
      setup({ I: 'delete', a: 'Post', passThrough: true, children })

      expect(ability.can('delete', 'Post')).toBe(false)
      expect(children).toHaveBeenCalledWith({
        isAllowed: false,
        ability,
        reason: undefined
      })
    })
  })

  function setup(props: CanProps<MongoAbility>, currentAbility = ability) {
    const view = render(
      <AbilityProvider value={currentAbility}>
        <Can {...props} />
      </AbilityProvider>
    )

    return {
      ...view,
      rerenderWithAbility(nextProps: CanProps<MongoAbility>, nextAbility = currentAbility) {
        view.rerender(
          <AbilityProvider value={nextAbility}>
            <Can {...nextProps} />
          </AbilityProvider>
        )
      }
    }
  }
})
