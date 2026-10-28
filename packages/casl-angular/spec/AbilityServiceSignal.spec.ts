import { Component, DebugElement, inject, Input, Predicate } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Ability, createMongoAbility, MongoAbility, MongoQuery, TaggedSubject } from '@casl/ability'
import { AblePipe, AbilityService, AbilityServiceSignal } from '../src/public'
import { firstValueFrom } from 'rxjs'
import './spec_helper'
import { createComponent } from './spec_helper'

describe('AbilityServiceSignal', () => {
  it('preserves resolved subjects through services and the pipe', async () => {
    type Post = { resource: 'Post', title: string }
    type AppAbility = MongoAbility<['read', Post], MongoQuery, TaggedSubject<'resource'>>
    const ability = createMongoAbility<AppAbility>([], {
      detectSubjectType: object => object.resource
    })
    TestBed.configureTestingModule({
      providers: [
        AbilityServiceSignal,
        { provide: Ability, useValue: ability }
      ]
    })
    const service: AbilityServiceSignal<AppAbility> = TestBed.inject(
      AbilityServiceSignal<AppAbility>
    )
    const pipe = new AblePipe(service)
    const observableService = new AbilityService(ability)
    const providedAbility = await firstValueFrom(observableService.ability$)
    service.update([{ action: 'read', subject: 'Post', conditions: { title: 'public' } }])

    expect(providedAbility.can('read', 'Post')).toBe(true)
    expect(service.can('read', 'Post')).toBe(true)
    expect(service.cannot('read', { resource: 'Post', title: 'private' })).toBe(true)
    expect(pipe.transform('read', { resource: 'Post', title: 'public' })).toBe(true)
    // @ts-expect-error unknown resolved subject name
    service.can('read', 'User')
    // @ts-expect-error update is not an ability action
    pipe.transform('update', 'Post')
  })

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
        { provide: Ability, useValue: createMongoAbility() }
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
