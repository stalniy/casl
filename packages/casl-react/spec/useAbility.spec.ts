import { createMongoAbility, MongoAbility } from '@casl/ability'
import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { AbilityProvider, useAbility } from '../src'

describe('`useAbility` hook', () => {
  let ability: MongoAbility

  beforeEach(() => {
    ability = createMongoAbility()
  })

  it('provides an `Ability` instance from context', () => {
    const { result } = renderHook(() => useAbility(), { wrapper })
    expect(result.current).toBe(ability)
  })

  it('triggers re-render when `Ability` rules are changed', () => {
    const component = jest.fn(() => useAbility())

    renderHook(component, { wrapper })
    act(() => {
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).toHaveBeenCalledTimes(2)
  })

  it('subscribes to `Ability` instance only once', () => {
    jest.spyOn(ability, 'on')
    const { rerender } = renderHook(() => useAbility(), { wrapper })

    act(() => {
      rerender()
      rerender()
    })

    expect(ability.on).toHaveBeenCalledTimes(1)
  })

  it('unsubscribes from `Ability` when component is destroyed', () => {
    const component = jest.fn(() => useAbility())
    const { unmount } = renderHook(component, { wrapper })

    act(() => {
      unmount()
      ability.update([{ action: 'read', subject: 'Post' }])
    })

    expect(component).toHaveBeenCalledTimes(1)
  })

  it('throws when used outside of `AbilityProvider`', () => {
    expect(() => renderHook(() => useAbility())).toThrow(
      'AbilityContext is not provided. Please make sure to wrap your component tree with <AbilityProvider>.'
    )
  })

  function wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(AbilityProvider, { value: ability, children })
  }
})
