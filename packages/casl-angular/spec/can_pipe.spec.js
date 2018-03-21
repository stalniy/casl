import { AbilityBuilder } from '@casl/ability'
import { CanPipe } from '../src'

describe('Can pipe', () => {
  let ability
  let pipe
  let changeDetectorRef

  beforeEach(() => {
    ability = AbilityBuilder.define(can => can('read', 'all'))
    changeDetectorRef = spy.interface('ChangeDetector', ['markForCheck'])
    pipe = new CanPipe(ability, changeDetectorRef)
  })

  it('calls underlying `ability` `can` method', () => {
    const can = spy.on(ability, 'can')

    pipe.transform('Post', 'read')
    spy.restore(ability)

    expect(can).to.have.been.called.with.exactly('read', 'Post')
  })

  it('marks change detector as dirty when ability updates', () => {
    pipe.transform('Post', 'read')
    ability.update([])

    expect(changeDetectorRef.markForCheck).to.have.been.called()
  })

  it('does not subscribes to ability updates if it has not been executed', () => {
    ability.update([])

    expect(changeDetectorRef.markForCheck).not.to.have.been.called()
  })

  it('unsubscribes from ability when destroyed', () => {
    pipe.transform('Post', 'read')
    pipe.ngOnDestroy()
    ability.update([])

    expect(changeDetectorRef.markForCheck).not.to.have.been.called()
  })
})
