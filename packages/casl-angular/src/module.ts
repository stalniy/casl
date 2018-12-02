import { NgModule, ModuleWithProviders } from '@angular/core';
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
})
export class AbilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AbilityModule,
      providers: [
        { provide: Ability, useFactory: createAbility },
      ]
    };
  }
}
