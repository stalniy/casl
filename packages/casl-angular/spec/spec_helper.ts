import { Component, provideZoneChangeDetection, Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing'
import { Ability, createMongoAbility } from '@casl/ability'
import { AblePipe } from '../src/public'

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
)

let appIndex = 0
export const createApp = (template: string) => {
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
  constructor(attrs: Record<string, unknown>) {
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
    imports: [AblePipe],
    declarations,
    providers: [
      provideZoneChangeDetection(),
      { provide: Ability, useFactory: () => createMongoAbility() }
    ]
  })
}
