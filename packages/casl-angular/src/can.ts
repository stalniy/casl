import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Ability, Unsubscribe, CanArgsType } from '@casl/ability';

const noop = () => {};

// TODO: `pure` can be removed after https://github.com/angular/angular/issues/15041
@Pipe({ name: 'can', pure: false })
export class CanPipe {
  protected _unsubscribeFromAbility: Unsubscribe = noop;

  constructor(protected ability: Ability, protected cd: ChangeDetectorRef) {
  }

  transform(subject: CanArgsType[1], action: CanArgsType[0], field?: CanArgsType[2]): boolean {
    if (this._unsubscribeFromAbility === noop) {
      this._unsubscribeFromAbility = this.ability.on('updated', () => this.cd.markForCheck());
    }

    return this.can(action, subject, field);
  }

  can(action: CanArgsType[0], subject: CanArgsType[1], field?: CanArgsType[2]) {
    return this.ability.can(action, subject, field);
  }

  ngOnDestroy() {
    this._unsubscribeFromAbility();
  }
}
