import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ability, AnyAbility } from '@casl/ability';
import { CanPipe, AblePipe } from './can';

@NgModule({
  declarations: [
    CanPipe,
    AblePipe,
  ],
  exports: [
    CanPipe,
    AblePipe
  ],
})
export class AbilityModule {
  static forRoot<T extends AnyAbility>(): ModuleWithProviders<AbilityModule> {
    return {
      ngModule: AbilityModule,
      providers: [
        {
          provide: Ability,
          useFactory: () => (new Ability([]) as T)
        },
      ]
    };
  }
}
