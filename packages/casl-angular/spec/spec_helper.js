import 'zone.js/dist/zone'
import 'zone.js/dist/proxy'
import 'zone.js/dist/sync-test'
import 'zone.js/dist/async-test'
import 'zone.js/dist/fake-async-test'
import 'jest-zone-patch'
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing'
import { TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { Ability, PureAbility } from '@casl/ability'
import { AbilityModule } from '../dist/es6'

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

let appIndex = 0
export const createApp = template => class App {
  static get annotations() {
    return [
      new Component({
        selector: `app-ability-${++appIndex}`,
        template,
        inputs: ['post']
      })
    ]
  }
}

export class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

export function createComponent(Type, inputs) {
  const cmp = TestBed.createComponent(Type)
  Object.assign(cmp.componentInstance, inputs)
  cmp.detectChanges()

  return cmp
}

export function configureTestingModule(declarations) {
  TestBed.configureTestingModule({
    imports: [AbilityModule],
    declarations,
    providers: [
      { provide: PureAbility, useFactory: () => new Ability() }
    ]
  })
}
