# CASL Angular

[![@casl/angular NPM version](https://badge.fury.io/js/%40casl%2Fangular.svg)](https://badge.fury.io/js/%40casl%2Fangular)
[![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/)
[![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package allows to integrate [@casl/ability](/packages/casl-ability) into [Angular][angular] application. So, you can show or hide some components, buttons, etc based on user ability to see them.

## Installation

```sh
npm install @casl/angular @casl/ability
```

## Getting Started

### 1. Including module

This package provides `AbilityModule` module which adds `CanPipe` to templates and `Ability` instance to dependency injection container

```ts
// app.module.ts

import { NgModule } from '@angular/core'
import { AbilityModule } from '@casl/angular'
// ...

@NgModule({
  imports: [
    ...,
    AbilityModule
  ],
  declarations: [...],
  bootstrap: [...],
})
export class AppModule {}
```

### 2. Defining Abilities

This module provides an empty `Ability` instance, so you either need to provide your own or update existing one. In case if you want to provide your own, just define it using `AbilityBuilder` (or whatever way you prefer):

```ts
// ability.ts
import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define(can => {
  can('read', 'all')
})
```

Later in your `AppModule` add additional provider:

```ts
import { AbilityModule } from ....
....
import { Ability } from '@casl/ability'
import { ability } from './ability'

@NgModule({
  imports: [
    ...,
    AbilityModule
  ],
  declarations: [...],
  providers: [
    { provide: Ability, useValue: ability }
  ],
  bootstrap: [...],
})
export class AppModule {}
```

Alternatively, you can just inject existing instance and update rules. 
Imagine that we have a `Session` service which is responsible for user login/logout functionality. Whenever user login, we need to update ability rules with rules which server returns and reset them back on logout. Lets do this:

```ts
// session.ts
import { Ability } from '@casl/ability'

export class Session {
  private token: string

  constructor(private ability: Ability) {}
  
  login(details) {
    return fetch('path/to/api/login', { methods: 'POST', body: JSON.stringify(details) })
      .then(response => response.json())
      .then(session => {
        this.ability.update(session.rules)
        this.token = session.token
       })
  }
  
  logout() {
    this.token = null
    this.ability.update([])
    // or this.ability.update([{ actions: 'read', subject: 'all' }]) to make everything to be readonly
  }
}
```

See [@casl/ability](/packages/casl-ability) package for more information on how to define abilities.

### 3. Check permissios in templates

To check permissions in any template you can use `CanPipe`:

```html
<div *ngIf="'Post' | can: 'create'">
  <a (click)="createPost()">Add Post</a>
</div>
```

#### Performance considerations

Due to [open feature in Angular](https://github.com/angular/angular/issues/15041), `CanPipe` was designed to be impure. This should work pretty fine if you have simple list of rules but may become a bottleneck when you have a lot of them.
Don't worry, as there are several strategies which you can pick to make it faster:

* use memoization (either on `Ability#can` or on `CanPipe#can` methods)
* use immutable objects and overwrite existing pipe to be pure
* use `ChangeDectionStrategy.OnPush` on your components whenever possible

To memoize results of `CanPipe`, you will need to create your own one and change its `can` method to cache results (this method was specifically designed to be overloaded by child class). Also you will need to clear all memoized results when corresponding `Ability` instance is updated (see [update ability][update-ability] for details). 
The similar strategy can be applied to `Ability` class. Don't forget to provide new pipe or `Ability` class in Dependency injection! For example

```ts
import { MemoizedAbility } from './ability'
import { Ability } from '@casl/ability'

@NgModule({
  ...,
  providers: [
    { provide: Ability, useClass: MemoizedAbility }
  ]
})
export class AppModule {}
```

or if you want to provide custom pipe:

```ts
// pure-can.pipe.ts
import { CanPipe } from '@casl/angular'

@Pipe({ name: 'can' })
export class MyCanPipe extends CanPipe {}

// app.module.ts
import { MyCanPipe } from './pure-can.pipe'

@NgModule({
  ...,
  declarations: [
    MyCanPipe
  ]
})
export class AppModule {}
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

[contributing]: /CONTRIBUTING.md
[angular]: https://angular.io/
[update-ability]: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html#update-abilities
