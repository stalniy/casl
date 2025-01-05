import { Inject, Injectable } from '@angular/core';
import { AnyAbility, PureAbility } from '@casl/ability';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbilityService<T extends AnyAbility> {
  readonly ability$: Observable<T>;

  constructor(@Inject(PureAbility) ability: T) {
    this.ability$ = new Observable((observer) => {
      observer.next(ability);
      return ability.on('updated', () => observer.next(ability));
    });
  }
}
