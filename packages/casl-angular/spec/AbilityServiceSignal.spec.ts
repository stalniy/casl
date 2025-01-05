import { Component, DebugElement, inject, Input, Predicate } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { createMongoAbility, PureAbility } from '@casl/ability'
import { AbilityServiceSignal } from '../src/public'
import './spec_helper'
import { createComponent } from './spec_helper'

describe('AbilityServiceSignal', () => {
  it('allows to use its `can` method in template', async () => {
    setup()
    const fixture = createComponent(App, { role: 'admin' })
    const deleteButton: Predicate<DebugElement> = (d) => d.nativeElement.textContent?.trim() === 'Delete'
    expect(fixture.debugElement.query(deleteButton)).toBeTruthy()

    Object.assign(fixture.componentInstance, { role: 'user' })
    fixture.detectChanges()
    expect(fixture.debugElement.query(deleteButton)).toBeFalsy()
  })

  function setup() {
    TestBed.configureTestingModule({
      providers: [
        AbilityServiceSignal,
        { provide: PureAbility, useValue: createMongoAbility() }
      ]
    })
  }

  @Component({
    selector: 'pfa-app',
    standalone: true,
    template: `
      <h1>An article</h1>

      @if (can('delete', 'Article')) {
        <button>Delete</button>
      }
    `
  })
  class App {
    @Input() 
    set role(value: 'admin' | 'user') {
      if (value === 'admin') {
        this.abilityService.update([{ action: 'manage', subject: 'all' }])
      } else {
        this.abilityService.update([{ action: 'read', subject: 'all' }])
      }
    }

    private readonly abilityService = inject(AbilityServiceSignal)
    protected can = this.abilityService.can
  }
})
