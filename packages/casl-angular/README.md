# CASL Angular

[![@casl/angular NPM version](https://badge.fury.io/js/%40casl%2Fangular.svg)](https://badge.fury.io/js/%40casl%2Fangular)
[![](https://img.shields.io/npm/dm/%40casl%2Fangular.svg)](https://www.npmjs.com/package/%40casl%2Fangular)
[![Support](https://img.shields.io/badge/Support-github%20discussions-green?style=flat&link=https://github.com/stalniy/casl/discussions)](https://github.com/stalniy/casl/discussions)

This package allows to integrate `@casl/ability` with [Angular] application. It provides deprecated `AblePipe`, `AblePurePipe` and new `AbilityService` and `AbilityServiceSignal` to Angular templates, so you can show or hide components, buttons, etc based on user ability to see them.

## Installation

```sh
npm install @casl/angular @casl/ability
# or
yarn add @casl/angular @casl/ability
# or
pnpm add @casl/angular @casl/ability
```

## Configure AppModule

To add pipes into your application's templates, you need to import the one you need

```ts @{data-filename="app.module.ts"}
import { NgModule } from '@angular/core';
import { AblePipe } from '@casl/angular';
import { createMongoAbility, Ability } from '@casl/ability';

@NgModule({
  imports: [
    // other modules
    AblePipe
  ],
  providers: [
    { provide: Ability, useValue: createMongoAbility() }
  ]
  // other properties
})
export class AppModule {}
```

> Read [CASL and TypeScript](https://casl.js.org/v5/en/advanced/typescript) to get more details about `MongoAbility` type configuration.

## Update Ability instance

Majority of applications that need permission checking support have something like `AuthService` or `LoginService` or `Session` service (name it as you wish) which is responsible for user login/logout functionality. Whenever user login (and logout), we need to update `Ability` instance with new rules.

Let's imagine that server returns user with a role on login:

```ts @{data-filename="Session.ts"}
import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@angular/core';

@Injectable({ provideIn: 'root' })
export class Session {
  #token: string

  constructor(@Inject(Ability) private ability: MongoAbility) {}

  login(details) {
    const params = { method: 'POST', body: JSON.stringify(details) };
    return fetch('path/to/api/login', params)
      .then(response => response.json())
      .then((session) => {
        this.updateAbility(session.user);
        this.#token = session.token;
      });
  }

  private updateAbility(user) {
    const { can, rules } = new AbilityBuilder(createMongoAbility);

    if (user.role === 'admin') {
      can('manage', 'all');
    } else {
      can('read', 'all');
    }

    this.ability.update(rules);
  }

  logout() {
    this.#token = null;
    this.ability.update([]);
  }
}
```

> See [Define rules](https://casl.js.org/v5/en/guide/define-rules) to get more information of how to define `Ability`

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

## Check permissions in templates using AbilityService

`AbilityService` is a service that provides `ability$` observable. This observable injects provided in DI `Ability` instance and emits it each time its rules are changed. This allows efficiently use permissions checks, especially in case we use `ChangeDetectionStrategy.OnPush`.

Let's first see how it can be used in any component:

```ts
@Component({
  selector: 'my-home',
  template: `
    @if (ability$ | async as ability) {
      <h1>Home Page</h1>
      @if (ability.can('create', 'Post')) {
        <button>Create Post</button>
      }
    }
  `
})
export class HomeComponent {
  readonly ability$: Observable<AppAbility>;

  constructor(abilityService: AbilityService<AppAbility>) {
    this.ability$ = abilityService.ability$;
  }
}
```

It also can be safely used inside `*ngFor` and other directives. If we use `ChangeDetectionStrategy.OnPush`, it will give us additional performance improvements because `ability.can(...)` won't be called without a need.

This approach works good from performance point of view because it creates only single subscription per component (not per check as in case of `ablePure` pipe) and doesn't require our component to use `Default` or `OnPush` strategy.

But let's also see how we can do permission checks using pipes and what are performance implications of that:

## Signals support

The latest version of @casl/angular also supports new `signal`. To utilize it in your app, instead of `AbilityService` use `AbilityServiceSignal`:

```ts
import { AbilityServiceSignal } from '@casl/angular';
import { AppAbility } from './AppAbility';

@Component({
  selector: 'my-home',
  template: `
      <h1>Home Page</h1>
      @if (can('create', 'Post')) {
        <button>Create Post</button>
      }
  `
})
export class HomeComponent {
  private readonly abilityService = inject<AbilityServiceSignal<AppAbility>>(AbilityServiceSignal);
  protected readonly can = this.abilityService.can;
}
```

## Check permissions in templates using pipe (deprecated)

To check permissions in any template you can use `AblePipe`:

```html
@if ('create' | able: 'Post') {
  <a (click)="createPost()">Add Post</a>
}
```

### Why pipe and not directive?

Directive cannot be used to pass values into inputs of other components. For example, we need to enable or disable a button based on user's ability to create a post. With directive we cannot do this but we can do this with pipe:

```html
<button [disabled]="!('create' | able: 'Post')">Add Post</button>
```

## TypeScript support

This package is written in TypeScript, so it will warn you about wrong usage.

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
type Subjects = 'Article' | 'User';

export type AppAbility = MongoAbility<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
```

And use `AppAbility` everywhere in your app:

```ts @{data-filename="AppModule.ts"}
import { NgModule } from '@angular/core';
import { AppAbility } from './services/AppAbility';

@NgModule({
  // other configuration
  providers: [
    { provide: AppAbility, useValue: createMongoAbility() },
  ]
})
export class AppModule {}
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v5/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Angular]: https://angular.io/
