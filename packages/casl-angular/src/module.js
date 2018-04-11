import { NgModule } from '@angular/core';
import { Ability } from '@casl/ability';
import { CanPipe } from './can';

export class AbilityModule {
  static annotations = [
    new NgModule({
      declarations: [
        CanPipe
      ],
      exports: [
        CanPipe
      ],
      providers: [
        { provide: Ability, useValue: new Ability([]) }
      ]
    })
  ]
}
