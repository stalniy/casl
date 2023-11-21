import { Pipe, Inject, PipeTransform } from '@angular/core';
import { PureAbility, AnyAbility } from '@casl/ability';
import { Observable } from 'rxjs';

@Pipe({ name: 'able', pure: false })
export class AblePipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;

  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }

  transform(...args: Parameters<T['can']>): boolean {
    return this._ability.can(...args);
  }
}

@Pipe({ name: 'ablePure' })
export class AblePurePipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;

  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }

  // TODO: use computed signals https://github.com/angular/angular/issues/47553
  transform(...args: Parameters<T['can']>): Observable<boolean> {
    return new Observable((s) => {
      const emit = () => s.next(this._ability.can(...args));
      emit();
      return this._ability.on('updated', emit);
    });
  }
}
