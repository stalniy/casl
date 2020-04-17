import { createContext } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Ability } from '@casl/ability'
import { useAbility } from '../src'

describe('`useAbility` hook', () => {
  let ability
  let AbilityContext

  beforeEach(() => {
    ability = new Ability()
    AbilityContext = createContext(ability)
  })

  it('provides an `Ability` instance from context', () => {
    const { result } = renderHook(() => useAbility(AbilityContext))
    expect(result.current).to.equal(ability)
  })

  it('triggers re-render when `Ability` rules are changed', () => {
    const component = spy(() => useAbility(AbilityContext))

    renderHook(component)
    act(() => {
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).to.have.been.called.exactly(2)
  })

  it('subscribes to `Ability` instance only once', () => {
    spy.on(ability, 'on')
    const { rerender } = renderHook(() => useAbility(AbilityContext))

    act(() => {
      rerender()
      rerender()
    })

    expect(ability.on).to.have.been.called.once
  })

  it('unsubscribes from `Ability` when component is destroyed', () => {
    const component = spy(() => useAbility(AbilityContext))
    const { unmount } = renderHook(component)

    act(() => {
      unmount()
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).to.have.been.called.once
  })
})
