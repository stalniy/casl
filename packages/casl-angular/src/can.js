import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Ability } from '@casl/ability';

const noop = () => {};

export class CanPipe {
  static parameters = [[Ability], [ChangeDetectorRef]];
  static annotations = [
    // TODO: `pure` can be removed after https://github.com/angular/angular/issues/15041
    new Pipe({ name: 'can', pure: false })
  ]

  constructor(ability, cd) {
    this.ability = ability;
    this.cd = cd;
    this.unsubscribeFromAbility = noop;
  }

  transform(resource, action) {
    if (this.unsubscribeFromAbility === noop) {
      this.unsubscribeFromAbility = this.ability.on('updated', () => this.cd.markForCheck());
    }

    return this.can(action, resource);
  }

  can(action, resource) {
    return this.ability.can(action, resource);
  }

  ngOnDestroy() {
    this.unsubscribeFromAbility();
  }
}
