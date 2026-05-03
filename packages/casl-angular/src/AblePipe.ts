import { Pipe, type PipeTransform } from '@angular/core';
import { type AnyAbility } from '@casl/ability';
import { AbilityServiceSignal } from './AbilityServiceSignal';

@Pipe({ name: 'able', pure: false, standalone: true })
export class AblePipe<T extends AnyAbility> implements PipeTransform {
  private readonly _abilityService: AbilityServiceSignal<T>;

  constructor(abilityService: AbilityServiceSignal<T>) {
    this._abilityService = abilityService;
  }

  transform(...args: Parameters<T['can']>): boolean {
    return this._abilityService.can(...args);
  }
}
