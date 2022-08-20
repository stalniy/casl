import { Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Ability, PureAbility } from '@casl/ability'
import { firstValueFrom } from 'rxjs'
import { AbilityService } from '../src/public'
import './spec_helper'

describe('AbilityService', () => {
  it('provides ability through `ability$` Observable', async () => {
    const { abilityService, ability } = setup()
    const providedAility = await firstValueFrom(abilityService.ability$)

    expect(providedAility).toBe(ability)
  })

  it('emits ability instance when its rules are updated', () => {
    const { abilityService, ability } = setup()
    const listener = jest.fn()

    abilityService.ability$.subscribe(listener)
    ability.update([{ action: 'manage', subject: 'all' }])
    ability.update([])

    expect(listener).toHaveBeenCalledTimes(3) // initial emit + 2 updates
    expect(listener).toHaveBeenCalledWith(ability)
  })

  function setup() {
    const ability = new Ability()
    TestBed.configureTestingModule({
      providers: [
        AbilityService,
        { provide: PureAbility, useValue: ability }
      ]
    })

    return {
      ability,
      abilityService: TestBed.inject(AbilityService as Type<AbilityService<Ability>>)
    }
  }
})
