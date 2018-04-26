import { ChangeDetectorRef, OnDestroy } from '@angular/core'
import { Ability } from '@casl/ability'

/**
 * The module that provides `can` pipe and empty `Ability` instance
 *
 */
export declare class AbilityModule {
}

export declare class CanPipe implements OnDestroy {
  constructor(ability: Ability, cd: ChangeDetectorRef)

  transform(subject: any, action: string): boolean

  can(action: string, subject: any): boolean

  ngOnDestroy(): void
}
