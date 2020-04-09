import { NgModule } from '@angular/core';
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
}
