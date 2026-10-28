import React from 'react'
import { ClassSubject, defineAbility, MongoAbility, MongoQuery, TaggedSubject } from '@casl/ability'
import { AbilityProvider, Can, CanProps } from '../src'
import { act, render, screen } from '@testing-library/react'

describe('`Can` component', () => {
  it('resolves custom subject names and preserves per-subject actions', () => {
    type Post = { resource: 'Post', title: string }
    type User = { resource: 'User', name: string }
    type AppAbility = MongoAbility<['read' | 'update', Post] | ['read', User], MongoQuery, TaggedSubject<'resource'>>
    const customAbility = defineAbility<AppAbility>(can => {
      can('read', 'Post', { title: 'public' })
    }, { detectSubjectType: object => object.resource })
    const props: CanProps<AppAbility>[] = [
      { I: 'read', a: 'Post', children: <span>name</span> },
      { I: 'read', an: 'Post', children: <span>alias</span> },
      { do: 'read', on: 'Post', children: <span>on name</span> },
      { I: 'read', this: { resource: 'Post', title: 'public' }, children: <span>instance</span> },
      { do: 'read', on: { resource: 'Post', title: 'private' }, children: <span>hidden</span> }
    ]
    render(<AbilityProvider value={customAbility}>
      {props.map((value, index) => <Can<AppAbility> key={index} {...value} />)}
    </AbilityProvider>)

    expect(screen.queryByText('name')).toBeTruthy()
    expect(screen.queryByText('alias')).toBeTruthy()
    expect(screen.queryByText('on name')).toBeTruthy()
    expect(screen.queryByText('instance')).toBeTruthy()
    expect(screen.queryByText('hidden')).toBeFalsy()
    // @ts-expect-error User only supports read
    const invalidAction: CanProps<AppAbility> = { I: 'update', a: 'User', children: null }
    // @ts-expect-error unknown subject name
    const invalidSubject: CanProps<AppAbility> = { I: 'read', a: 'Comment', children: null }
    expect(invalidAction).toBeDefined()
    expect(invalidSubject).toBeDefined()
  })

  it('derives class instance props from ClassSubject', () => {
    class Post {
      constructor(readonly title: string) {}
    }
    type AppAbility = MongoAbility<['read', typeof Post], MongoQuery, ClassSubject>
    const customAbility = defineAbility<AppAbility>(can => can('read', Post, { title: 'public' }))
    render(<AbilityProvider value={customAbility}>
      <Can<AppAbility> I="read" this={new Post('public')}>instance</Can>
      <Can<AppAbility> do="read" on={new Post('private')}>hidden</Can>
    </AbilityProvider>)

    expect(screen.queryByText('instance')).toBeTruthy()
    expect(screen.queryByText('hidden')).toBeFalsy()
  })

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
