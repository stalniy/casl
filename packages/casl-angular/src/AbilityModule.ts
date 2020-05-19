import { NgModule } from '@angular/core';
import { CanPipe, AblePipe, AblePurePipe } from './pipes';

@NgModule({
  declarations: [
    CanPipe,
    AblePipe,
    AblePurePipe,
  ],
  exports: [
    CanPipe,
    AblePipe,
    AblePurePipe,
  ],
})
export class AbilityModule {
}
