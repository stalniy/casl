import { Pipe, Inject, PipeTransform } from '@angular/core';
import { PureAbility, AnyAbility } from '@casl/ability';
import { Observable } from 'rxjs';

/**
 * @deprecated use AbilityService instead
 */
@Pipe({ name: 'able', pure: false, standalone: true })
export class AblePipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;

  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }

  transform(...args: Parameters<T['can']>): boolean {
    return this._ability.can(...args);
  }
}

/**
 * @deprecated use AbilityService instead
 */
@Pipe({ name: 'ablePure', standalone: true })
export class AblePurePipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;

  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }

  transform(...args: Parameters<T['can']>): Observable<boolean> {
    return new Observable((s) => {
      const emit = () => s.next(this._ability.can(...args));
      emit();
      return this._ability.on('updated', emit);
    });
  }
}
