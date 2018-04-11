import 'zone.js/dist/zone.js'
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

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
)

export class App {
  static get annotations() {
    return new Component({
      selector: 'app-ability',
      template: '{{ post | can: "read" }}',
      inputs: ['post']
    })
  }
}

export class Post {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}
