import { Inject, Injectable } from '@angular/core';
import { type AnyAbility, Ability } from '@casl/ability';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AbilityService<T extends AnyAbility> {
  readonly ability$: Observable<T>;

  constructor(@Inject(Ability) ability: T) {
    this.ability$ = new Observable((observer) => {
      observer.next(ability);
      return ability.on('updated', () => observer.next(ability));
    });
  }
}
