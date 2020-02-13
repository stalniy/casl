import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Ability, Unsubscribe, Subject } from '@casl/ability';

const noop = () => {};

// TODO: `pure` can be removed after https://github.com/angular/angular/issues/15041
@Pipe({ name: 'can', pure: false })
export class CanPipe<A extends string, S extends Subject, C> {
  protected _unsubscribeFromAbility: Unsubscribe = noop;

  constructor(
    protected ability: Ability<A, S, C>,
    protected cd: ChangeDetectorRef
  ) {
  }

  transform(subject: S, action: A, field?: string): boolean {
    if (this._unsubscribeFromAbility === noop) {
      this._unsubscribeFromAbility = this.ability.on('updated', () => this.cd.markForCheck());
    }

    return this.can(action, subject, field);
  }

  can(...args: Parameters<Ability<A, S, C>['can']>) {
    return this.ability.can(...args);
  }

  ngOnDestroy() {
    this._unsubscribeFromAbility();
  }
}
