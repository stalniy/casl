import { createMongoAbility, MongoAbility } from '@casl/ability'
import { act, renderHook } from '@testing-library/react'
import { createContext } from 'react'
import { useAbility } from '../src'

describe('`useAbility` hook', () => {
  let ability: MongoAbility
  let AbilityContext: React.Context<MongoAbility>

  beforeEach(() => {
    ability = createMongoAbility()
    AbilityContext = createContext(ability)
  })

  it('provides an `Ability` instance from context', () => {
    const { result } = renderHook(() => useAbility(AbilityContext))
    expect(result.current).toBe(ability)
  })

  it('triggers re-render when `Ability` rules are changed', () => {
    const component = jest.fn(() => useAbility(AbilityContext))

    renderHook(component)
    act(() => {
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).toHaveBeenCalledTimes(2)
  })

  it('subscribes to `Ability` instance only once', () => {
    jest.spyOn(ability, 'on')
    const { rerender } = renderHook(() => useAbility(AbilityContext))

    act(() => {
      rerender()
      rerender()
    })

    expect(ability.on).toHaveBeenCalledTimes(1)
  })

  it('unsubscribes from `Ability` when component is destroyed', () => {
    const component = jest.fn(() => useAbility(AbilityContext))
    const { unmount } = renderHook(component)

    act(() => {
      unmount()
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).toHaveBeenCalledTimes(1)
  })
})
