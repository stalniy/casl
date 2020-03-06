import { Pipe, ChangeDetectorRef, Inject, PipeTransform } from '@angular/core';
import { PureAbility, Unsubscribe, AnyAbility, AbilityParameters } from '@casl/ability';

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
    return this._ability.can(...args as [any, any?, any?]);
  }

  ngOnDestroy() {
    if (this._unsubscribeFromAbility) {
      this._unsubscribeFromAbility();
    }
  }
}

// TODO: `pure` can be removed after https://github.com/angular/angular/issues/15041
@Pipe({ name: 'can', pure: false })
export class CanPipe<T extends AnyAbility> implements PipeTransform {
  protected pipe: AbilityPipe<T>;

  constructor(@Inject(PureAbility) ability: T, cd: ChangeDetectorRef) {
    this.pipe = new AbilityPipe(ability, cd);
  }

  transform(
    subject: AbilityParameters<T>['subject'],
    action: AbilityParameters<T>['action'],
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
