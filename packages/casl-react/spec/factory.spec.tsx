import { createMongoAbility, defineAbility, MongoAbility } from '@casl/ability'
import React, { createContext } from 'react'
import { render, screen } from '@testing-library/react'
import { BoundCanProps, createContextualCan } from '../src'

describe('`createContextualCan`', () => {
  let ability: MongoAbility
  let AbilityContext: React.Context<MongoAbility>
  let ContextualCan: React.FunctionComponent<BoundCanProps<MongoAbility>>

  beforeEach(() => {
    ability = defineAbility(can => can('read', 'Post'))
    AbilityContext = createContext(createMongoAbility())
    ContextualCan = createContextualCan(AbilityContext.Consumer)
  })

  it('allows to override `Ability` instance by passing it in props', () => {
    render(<ContextualCan I="read" a="Post" ability={ability}>I see it</ContextualCan>)

    expect(screen.queryByText('I see it')).toBeTruthy()
  })

  it('expects `Ability` instance to be provided by context Provider', () => {
    render(<AbilityContext.Provider value={ability}>
      <ContextualCan I="read" a="Post">I see it</ContextualCan>
    </AbilityContext.Provider>)

    expect(screen.queryByText('I see it')).toBeTruthy()
  })

  it('should not render anything if ability does not have rules', () => {
    render(<ContextualCan I="read" a="Post">I see it</ContextualCan>)
    expect(screen.queryByText('I see it')).not.toBeTruthy()
  })
})
