import { Pipe, ChangeDetectorRef, Inject, PipeTransform, Injectable } from '@angular/core';
import { PureAbility, Unsubscribe, AnyAbility } from '@casl/ability';
import { Observable } from 'rxjs';

@Injectable()
class AbilityPipe<T extends AnyAbility> {
  protected _unsubscribeFromAbility?: Unsubscribe;
  private _ability: T;
  private _cd: ChangeDetectorRef;

  constructor(ability: T, cd: ChangeDetectorRef) {
    this._ability = ability;
    this._cd = cd;
  }

  transform(...args: Parameters<T['can']>): boolean {
    if (!this._unsubscribeFromAbility) {
      this._unsubscribeFromAbility = this._ability.on('updated', () => this._cd.markForCheck());
    }
    return this._ability.can(...args);
  }

  ngOnDestroy() {
    if (this._unsubscribeFromAbility) {
      this._unsubscribeFromAbility();
    }
  }
}

@Pipe({ name: 'can', pure: false })
export class CanPipe<T extends AnyAbility> implements PipeTransform {
  protected pipe: AbilityPipe<T>;

  constructor(@Inject(PureAbility) ability: T, cd: ChangeDetectorRef) {
    this.pipe = new AbilityPipe(ability, cd);
  }

  transform(
    subject: Parameters<T['can']>[1],
    action: Parameters<T['can']>[0],
    field?: string
  ): boolean {
    return (this.pipe as any).transform(action, subject, field);
  }

  ngOnDestroy() {
    this.pipe.ngOnDestroy();
  }
}

@Pipe({ name: 'able', pure: false })
export class AblePipe<T extends AnyAbility> implements PipeTransform {
  protected pipe: AbilityPipe<T>;

  constructor(@Inject(PureAbility) ability: T, cd: ChangeDetectorRef) {
    this.pipe = new AbilityPipe(ability, cd);
  }

  transform(...args: Parameters<T['can']>): boolean {
    return this.pipe.transform(...args);
  }

  ngOnDestroy() {
    this.pipe.ngOnDestroy();
  }
}

@Pipe({ name: 'ablePure' })
export class AblePurePipe<T extends AnyAbility> implements PipeTransform {
  private _ability: T;

  constructor(@Inject(PureAbility) ability: T) {
    this._ability = ability;
  }

  // TODO: `Observable` can be removed after https://github.com/angular/angular/issues/15041
  transform(...args: Parameters<T['can']>): Observable<boolean> {
    return new Observable((s) => {
      const emit = () => s.next(this._ability.can(...args));
      emit();
      return this._ability.on('updated', emit);
    });
  }
}
