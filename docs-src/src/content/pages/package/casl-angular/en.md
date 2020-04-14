---
title: CASL Angular
categories: [package]
order: 115
meta:
  keywords: ~
  description: ~
---

[![@casl/angular NPM version](https://badge.fury.io/js/%40casl%2Fangular.svg)](https://badge.fury.io/js/%40casl%2Fangular)
[![](https://img.shields.io/npm/dm/%40casl%2Fangular.svg)](https://www.npmjs.com/package/%40casl%2Fangular)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to integrate `@casl/ability` with [Angular] application. It provides `AblePipe` and **deprecated** `CanPipe` to Angular templates, so you can show or hide components, buttons, etc based on user ability to see them.

## Installation

```sh
npm install @casl/angular @casl/ability
# or
yarn add @casl/angular @casl/ability
# or
pnpm add @casl/angular @casl/ability
```

## Configure AppModule

To add pipes into your application's templates, you need to import `AbilityModule` in your `AppModule` and

```ts @{data-filename="app.module.ts"}
import { NgModule } from '@angular/core';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';

@NgModule({
  imports: [
    // other modules
    AbilityModule
  ],
  providers: [
    { provide: Ability, useValue: new Ability() },
    { provide: PureAbility, useExisting: Ability }
  ]
  // other properties
})
export class AppModule {}
```

The 2nd provider provides instance of `PureAbility`, so `CanPipe` and `AblePipe` can inject it later. This pipes inject `PureAbility` (not `Ability`) because this allows an application developer to decide how to configure actions, subjects and conditions. Also this is the only way to get maximum from tree shaking (e.g., if you don't need conditions you can use `PureAbility` and get rid of `sift` library).

> Read [CASL and TypeScript](../../advanced/typescript) to get more details about `Ability` type configuration.

## Update Ability instance

Majority of applications that need permission checking support have something like `AuthService` or `LoginService` or `Session` service (name it as you wish) which is responsible for user login/logout functionality. Whenever user login (and logout), we need to update `Ability` instance with new rules.

Let's imagine that server returns user with a role on login:

```ts @{data-filename="Session.ts"}
import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@angular/core';

@Injectable({ provideIn: 'root' })
export class Session {
  private token: string

  constructor(private ability: Ability) {}

  login(details) {
    const params = { method: 'POST', body: JSON.stringify(details) };
    return fetch('path/to/api/login', params)
      .then(response => response.json())
      .then((session) => {
        this.updateAbility(session.user);
        this.token = session.token;
      });
  }

  private updateAbility(user) {
    const { can, rules } = new AbilityBuilder();

    if (user.role === 'admin') {
      can('manage', 'all');
    } else {
      can('read', 'all');
    }

    this.ability.update(rules);
  }

  logout() {
    this.token = null;
    this.ability.update([]);
  }
}
```

> See [Define rules](../../guide/define-rules) to get more information of how to define `Ability`

Then use this `Session` service in `LoginComponent`:

```ts
import { Component } from '@angular/core';
import { Session } from '../services/Session';

@Component({
  selector: 'login-form',
  template: `
    <form (ngSubmit)="login()">
      <input type="email" [(ngModel)]="email" />
      <input type="password" [(ngModel)]="password" />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginForm {
  email: string;
  password: string;

  constructor(private session: Session) {}

  login() {
    const { email, password } = this;
    return this.session.login({ email, password });
  }
}
```

## Check permissions in templates

To check permissions in any template you can use `AblePipe`:

```html
<div *ngIf="'create' | able: 'Post'">
  <a (click)="createPost()">Add Post</a>
</div>
```

> You can read the expression in `ngIf` as "if creatable Post"

Or with **deprecated** `CanPipe`:

```html
<div *ngIf="'Post' | can: 'create'">
  <a (click)="createPost()">Add Post</a>
</div>
```

`CanPipe` was deprecated because it is less readable and it was harder to integrate it with all type definitions supported by `Ability`'s `can` method. That's why `CanPipe` has weaker typings than `AblePipe`.

## Why pipe and not directive?

Directive cannot be used to pass values into inputs of other components. For example, we need to enable or disable a button based on user's ability to create a post. With directive we cannot do this but we can do this with pipe:

```html
<button [disabled]="!('create' | able: 'Post')">Add Post</button>
```

To track status of directive implementation, check [#276](https://github.com/stalniy/casl/issues/276)

## Performance considerations

Due to [open feature in Angular](https://github.com/angular/angular/issues/15041), pipes were designed to be [impure](https://angular.io/guide/pipes#impure-pipes). This should work pretty fine for majority of cases but may become a bottleneck if you have more than 50 rules (depending on application size and computer characteristics).

Don't worry, there are several strategies which you can pick to make things fast when they become slower:

* use memoization, either on `Ability#can` or on `AblePipe#transform` method
* if you use immutable objects, you can extend existing pipe and make it pure
* use `ChangeDectionStrategy.OnPush` on your components whenever possible

To memoize results of `AblePipe`, you will need to create your own one and change its `transform` method to cache results. Also you will need to clear all memoized results when corresponding `Ability` instance is updated.

The similar strategy can be applied to `Ability` class. Don't forget to provide new pipe or `Ability` class in `AppModule`! For example

```ts
import { NgModule } from '@angular/core';
import { Ability } from '@casl/ability';
import { MemoizedAbility } from './ability';

@NgModule({
  // other configuration
  providers: [
    { provide: Ability, useValue: new MemoizedAbility() },
    { provide: PureAbility, useExisting: Ability },
  ]
})
export class AppModule {}
```

or if you want to provide custom pipe:

```ts
import { AblePipe } from '@casl/angular'

@Pipe({ name: 'able', pure: true })
class PureAblePipe extends AblePipe {}

@NgModule({
  // other configuration
  declarations: [
    PureAblePipe
  ]
})
export class AppModule {}
```

## TypeScript support

The package is written in TypeScript, so it will warn you about wrong usage.

It may be a bit tedious to use application specific abilities in Angular app because everywhere you inject `Ability` instance you will need to import its generic parameters:

```ts
import { Ability } from '@casl/ability';
import { Component } from '@angular/core';
import { AppAbilities } from '../services/AppAbility';

@Component({
  selector: 'todo-item'
})
export class TodoItem {
  constructor(
    private ability: Ability<AppAbilities>
  ) {}
}
```

To make the life easier, you can use `AbilityClass<TAbility>` class to utilize Companion object pattern:

```ts @{data-filename="AppAbility.ts"}
import { Ability, AbilityClass } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Article' | 'User'

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
```

And use `AppAbility` everywhere in your app:

```ts @{data-filename="AppModule.ts"}
import { NgModule } from '@angular/core';
import { AppAbility } from './services/AppAbility';

@NgModule({
  // other configuration
  providers: [
    { provide: AppAbility, useValue: new AppAbility() },
    { provide: PureAbility, useExisting: AppAbility },
  ]
})
export class AppModule {}
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](../../support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Angular]: https://angular.io/
