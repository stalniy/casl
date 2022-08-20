import { defineAbility, Ability } from '@casl/ability'
import { AblePipe } from '../src/public'

describe('Able pipe', () => {
  let ability: Ability
  let pipe: AblePipe<any>

  beforeEach(() => {
    ability = defineAbility<Ability>(can => can('read', 'all'))
    pipe = new AblePipe(ability)
  })

  it('calls underlying `ability` `can` method', () => {
    const can = jest.spyOn(ability, 'can')
    pipe.transform('read', 'Post')

    expect(can).toHaveBeenCalledWith('read', 'Post')
  })
})
