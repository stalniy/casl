import { ChangeDetectorRef } from '@angular/core'
import { defineAbility, Ability } from '@casl/ability'
import { AblePipe } from '../src/public'

describe('Can pipe', () => {
  let ability: Ability
  let pipe: AblePipe<any>
  let changeDetectorRef: ChangeDetectorRef

  beforeEach(() => {
    ability = defineAbility<Ability>(can => can('read', 'all'))
    changeDetectorRef = { markForCheck: jest.fn() } as unknown as ChangeDetectorRef
    pipe = new AblePipe(ability, changeDetectorRef)
  })

  it('calls underlying `ability` `can` method', () => {
    const can = jest.spyOn(ability, 'can')
    pipe.transform('read', 'Post')

    expect(can).toHaveBeenCalledWith('read', 'Post')
  })

  it('marks change detector as dirty when ability updates', () => {
    pipe.transform('read', 'Post')
    ability.update([])

    expect(changeDetectorRef.markForCheck).toHaveBeenCalled()
  })

  it('does not subscribes to ability updates if it has not been executed', () => {
    ability.update([])

    expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled()
  })

  it('unsubscribes from ability when destroyed', () => {
    pipe.transform('read', 'Post')
    pipe.ngOnDestroy()
    ability.update([])

    expect(changeDetectorRef.markForCheck).not.toHaveBeenCalled()
  })
})
