import { Component, DebugElement, inject, Input, Predicate, signal, Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { createMongoAbility, MongoAbility, PureAbility } from '@casl/ability'
import { AbilityServiceSignal } from '../src/public'
import './spec_helper'
import { createComponent } from './spec_helper'

describe('AbilityServiceSignal', () => {
  describe('can', () => {
    it('returns false when no rules are set', () => {
      const { abilityService } = setup()
      expect(abilityService.can('read', 'Article')).toBe(false)
    })

    it('returns true when matching rule exists', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(abilityService.can('read', 'Article')).toBe(true)
    })

    it('returns false when action does not match', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(abilityService.can('delete', 'Article')).toBe(false)
    })
  })

  describe('cannot', () => {
    it('returns true when no rules are set', () => {
      const { abilityService } = setup()
      expect(abilityService.cannot('read', 'Article')).toBe(true)
    })

    it('returns false when matching rule exists', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(abilityService.cannot('read', 'Article')).toBe(false)
    })

    it('returns true when action does not match', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(abilityService.cannot('delete', 'Article')).toBe(true)
    })
  })

  describe('whyCan', () => {
    it('returns null when no relevant rule exists', () => {
      const { abilityService } = setup()
      expect(abilityService.whyCan('read', 'Article')).toBeNull()
    })

    it('returns result with reason when rule has reason', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article', reason: 'allowed by policy' }])
      const result = abilityService.whyCan('read', 'Article')
      expect(result).toEqual({ result: true, reason: 'allowed by policy' })
    })

    it('returns result with undefined reason when rule has no reason', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      const result = abilityService.whyCan('read', 'Article')
      expect(result).toEqual({ result: true, reason: undefined })
    })

    it('returns result false for inverted rule', () => {
      const { abilityService } = setup()
      abilityService.update([
        { action: 'manage', subject: 'all' },
        { action: 'delete', subject: 'Article', inverted: true, reason: 'forbidden' }
      ])
      const result = abilityService.whyCan('delete', 'Article')
      expect(result).toEqual({ result: false, reason: 'forbidden' })
    })
  })

  describe('whyCannot', () => {
    it('returns null when no relevant rule exists', () => {
      const { abilityService } = setup()
      expect(abilityService.whyCannot('read', 'Article')).toBeNull()
    })

    it('returns inverted result compared to whyCan', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article', reason: 'allowed by policy' }])
      const result = abilityService.whyCannot('read', 'Article')
      expect(result).toEqual({ result: false, reason: 'allowed by policy' })
    })

    it('returns result true for inverted rule', () => {
      const { abilityService } = setup()
      abilityService.update([
        { action: 'manage', subject: 'all' },
        { action: 'delete', subject: 'Article', inverted: true, reason: 'forbidden' }
      ])
      const result = abilityService.whyCannot('delete', 'Article')
      expect(result).toEqual({ result: true, reason: 'forbidden' })
    })
  })

  describe('deferCan', () => {
    it('returns a signal that reflects current ability', () => {
      const { abilityService } = setup()
      const canRead = abilityService.deferCan('read', 'Article')
      expect(canRead()).toBe(false)

      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(canRead()).toBe(true)
    })

    it('accepts signal arguments and reacts to their changes', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      const action = signal<'read' | 'delete'>('read')
      const canDo = abilityService.deferCan(action, 'Article')
      expect(canDo()).toBe(true)

      action.set('delete')
      expect(canDo()).toBe(false)
    })
  })

  describe('deferCannot', () => {
    it('returns a signal that reflects inverse of current ability', () => {
      const { abilityService } = setup()
      const cannotRead = abilityService.deferCannot('read', 'Article')
      expect(cannotRead()).toBe(true)

      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(cannotRead()).toBe(false)
    })

    it('accepts signal arguments and reacts to their changes', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      const action = signal<'read' | 'delete'>('read')
      const cannotDo = abilityService.deferCannot(action, 'Article')
      expect(cannotDo()).toBe(false)

      action.set('delete')
      expect(cannotDo()).toBe(true)
    })
  })

  describe('deferWhyCan', () => {
    it('returns a signal that reflects whyCan result', () => {
      const { abilityService } = setup()
      const result = abilityService.deferWhyCan('read', 'Article')
      expect(result()).toBeNull()

      abilityService.update([{ action: 'read', subject: 'Article', reason: 'test' }])
      expect(result()).toEqual({ result: true, reason: 'test' })
    })

    it('accepts signal arguments', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article', reason: 'test' }])
      const action = signal<'read' | 'delete'>('read')
      const result = abilityService.deferWhyCan(action, 'Article')
      expect(result()).toEqual({ result: true, reason: 'test' })

      action.set('delete')
      expect(result()).toBeNull()
    })
  })

  describe('deferWhyCannot', () => {
    it('returns a signal that reflects whyCannot result', () => {
      const { abilityService } = setup()
      const result = abilityService.deferWhyCannot('read', 'Article')
      expect(result()).toBeNull()

      abilityService.update([{ action: 'read', subject: 'Article', reason: 'test' }])
      expect(result()).toEqual({ result: false, reason: 'test' })
    })

    it('accepts signal arguments', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article', reason: 'test' }])
      const action = signal<'read' | 'delete'>('read')
      const result = abilityService.deferWhyCannot(action, 'Article')
      expect(result()).toEqual({ result: false, reason: 'test' })

      action.set('delete')
      expect(result()).toBeNull()
    })
  })

  describe('update', () => {
    it('updates underlying ability rules', () => {
      const { abilityService } = setup()
      expect(abilityService.can('read', 'Article')).toBe(false)
      abilityService.update([{ action: 'read', subject: 'Article' }])
      expect(abilityService.can('read', 'Article')).toBe(true)
    })

    it('replaces previous rules', () => {
      const { abilityService } = setup()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      abilityService.update([{ action: 'delete', subject: 'Article' }])
      expect(abilityService.can('read', 'Article')).toBe(false)
      expect(abilityService.can('delete', 'Article')).toBe(true)
    })
  })

  describe('ngOnDestroy', () => {
    it('unsubscribes from ability updates', () => {
      const { abilityService } = setup()
      const canRead = abilityService.deferCan('read', 'Article')

      expect(canRead()).toBe(false)

      abilityService.ngOnDestroy()
      abilityService.update([{ action: 'read', subject: 'Article' }])
      // The deferred signal won't reflect updates made after destroy
      // because the internal _rules signal is no longer updated via subscription
      expect(canRead()).toBe(false)
    })
  })

  describe('template integration', () => {
    it('allows to use its `can` method in template', async () => {
      setup()
      const fixture = createComponent(App, { role: 'admin' })
      const deleteButton: Predicate<DebugElement> = (d) => d.nativeElement.textContent?.trim() === 'Delete'
      expect(fixture.debugElement.query(deleteButton)).toBeTruthy()

      Object.assign(fixture.componentInstance, { role: 'user' })
      fixture.detectChanges()
      expect(fixture.debugElement.query(deleteButton)).toBeFalsy()
    })
  })

  type AppAbility = MongoAbility<['read' | 'manage' | 'delete', 'all' | 'Article' | { kind: 'Article'; id: number }]>
  function setup() {
    const ability = createMongoAbility<AppAbility>()
    TestBed.configureTestingModule({
      providers: [
        AbilityServiceSignal,
        { provide: PureAbility, useValue: ability }
      ]
    })
    const abilityService = TestBed.inject(
      AbilityServiceSignal as Type<AbilityServiceSignal<AppAbility>>
    )
    return { ability, abilityService }
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

    private readonly abilityService = inject<AbilityServiceSignal<AppAbility>>(AbilityServiceSignal)
    protected can = this.abilityService.can
  }
})
