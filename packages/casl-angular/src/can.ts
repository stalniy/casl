import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Ability } from '@casl/ability';

const noop = () => {};

// TODO: `pure` can be removed after https://github.com/angular/angular/issues/15041
@Pipe({ name: 'can', pure: false })
export class CanPipe {
  protected unsubscribeFromAbility: Function = noop;

  constructor(protected ability: Ability, protected cd: ChangeDetectorRef) {
  }

  transform(resource: any, action: string, field?: string) {
    if (this.unsubscribeFromAbility === noop) {
      this.unsubscribeFromAbility = this.ability.on('updated', () => this.cd.markForCheck());
    }

    return this.can(action, resource, field);
  }

  can(action: string, subject: any, field?: string) {
    return this.ability.can(action, subject, field);
  }

  ngOnDestroy() {
    this.unsubscribeFromAbility();
  }
}
