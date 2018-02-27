import { createElement } from 'react'
import renderer from 'react-test-renderer'
import { Can, createCanBoundTo, createCanFrom } from '../src'

describe('`Can` component', () => {
  describe('by default', () => {
    it('requires to pass children')

    it('may accept children as function')

    it('passes ability instance as an argument to "children" function')

    it('accepts 3 properties: "run" as action, "on" as subject and "ability"')

    it('requires to pass "run" as string')

    it('requires to pass "on" as string or object')

    it('requires "ability" prop to be an instance of `Ability`')

    it('renders children if ability allows to `run` action `on` specified subject')

    it('does not render children if ability does not allow to `run` action `on` subject')

    it('has public "allowed" property which returns boolean indicating wether children will be rendered')

    it('rerenders when ability rules are changed')

    it('does not rerender itself when previous ability rules are changed')
  })

  describe('`createCanBoundTo`', () => {
    it('creates another component with bound ability instance')

    it('extends `Can` component')

    it('allows to override ability by passing "ability" property')
  })

  describe('`createContextualCan`', () => {
    it('creates component from React context Consumer')
  })
})
