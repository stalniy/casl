import { Pipe, type PipeTransform } from '@angular/core';
import { type AnyAbility } from '@casl/ability';
import { AbilityServiceSignal } from './AbilityServiceSignal';

@Pipe({ name: 'able', pure: false, standalone: true })
export class AblePipe<T extends AnyAbility> implements PipeTransform {
  readonly transform: T['can'];

  constructor(abilityService: AbilityServiceSignal<T>) {
    this.transform = abilityService.can;
  }
}
