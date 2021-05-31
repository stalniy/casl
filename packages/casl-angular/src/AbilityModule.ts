import { NgModule } from '@angular/core';
import { AblePipe, AblePurePipe } from './pipes';

@NgModule({
  declarations: [
    AblePipe,
    AblePurePipe,
  ],
  exports: [
    AblePipe,
    AblePurePipe,
  ],
})
export class AbilityModule {
}
