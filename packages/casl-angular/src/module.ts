import { NgModule } from '@angular/core';
import { Ability } from '@casl/ability';
import { CanPipe } from './can';

export function createAbility() {
  return new Ability([]);
}

@NgModule({
  declarations: [
    CanPipe
  ],
  exports: [
    CanPipe
  ],
  providers: [
    { provide: Ability, useFactory: createAbility }
  ]
})
export class AbilityModule {
}
