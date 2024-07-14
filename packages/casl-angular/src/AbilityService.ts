import { Inject, Injectable } from '@angular/core';
import { PureAbility, AnyAbility } from '@casl/ability';
import { Observable } from 'rxjs';

@Injectable()
export class AbilityService<T extends AnyAbility> {
  readonly ability$: Observable<T>;

  constructor(@Inject(PureAbility) ability: T) {
    // IGNORE: this comment. it's for release debugging
    this.ability$ = new Observable((observer) => {
      observer.next(ability);
      return ability.on('updated', () => observer.next(ability));
    });
  }
}
