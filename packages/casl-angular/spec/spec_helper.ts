import { Component, Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing'
import { createMongoAbility, PureAbility } from '@casl/ability'
import { AblePipe, AblePurePipe } from '../src/public'

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

let appIndex = 0
export const createApp = (template) => {
  @Component({
    selector: `app-ability-${++appIndex}`,
    template,
    inputs: ['post'],
    standalone: false,
  })
  class App {}

  return App
}

export class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

export function createComponent<T extends Type<unknown>>(
  ComponentType: T,
  inputs?: Record<string, unknown>
): ComponentFixture<InstanceType<T>> {
  const cmp = TestBed.createComponent(ComponentType) as ComponentFixture<InstanceType<T>>
  Object.assign(cmp.componentInstance, inputs)
  cmp.detectChanges()

  return cmp
}

export function configureTestingModule(declarations: Type<unknown>[] = []) {
  TestBed.configureTestingModule({
    imports: [AblePipe, AblePurePipe],
    declarations,
    providers: [
      { provide: PureAbility, useFactory: () => createMongoAbility() }
    ]
  })
}
