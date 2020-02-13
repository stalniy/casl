import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ability, Subject } from '@casl/ability';
import { CanPipe } from './can';

@NgModule({
  declarations: [
    CanPipe
  ],
  exports: [
    CanPipe
  ],
})
export class AbilityModule {
  static forRoot<
    Actions extends string,
    Subjects extends Subject,
    Conditions
  >(): ModuleWithProviders<AbilityModule> {
    return {
      ngModule: AbilityModule,
      providers: [
        {
          provide: Ability,
          useFactory: () => new Ability<Actions, Subjects, Conditions>([])
        },
      ]
    };
  }
}
