# CASL Aurelia

[![@casl/aurelia NPM version](https://badge.fury.io/js/%40casl%2Faurelia.svg)](https://badge.fury.io/js/%40casl%2Faurelia)
[![](https://img.shields.io/npm/dm/%40casl%2Faurelia.svg)](https://www.npmjs.com/package/%40casl%2Faurelia)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to integrate `@casl/ability` with [Aurelia] application. It provides `AbleValueConverter` and **deprecated** `CanValueConverter` to Aurelia templates, so you can show or hide components, buttons, etc based on user ability to see them.

## Installation

```sh
npm install @casl/aurelia @casl/ability
# or
yarn add @casl/aurelia @casl/ability
# or
pnpm add @casl/aurelia @casl/ability
```

## Getting started

`@casl/aurelia` exports `configure` function which fulfills requirements of [Aurelia plugin](https://aurelia.io/docs/plugins/write-new-plugin). So, you can pass it in `plugin` function:

```js @{data-filename="main.js"}
import ability from './services/ability';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@casl/aurelia', ability); // <-- add plugin

  aurelia.start().then(() => aurelia.setRoot());
}
```

The plugin accepts an optional 2nd argument, ability instance for your app. You can also register the instance by calling `container`'s API directly but make sure that you register `PureAbility` key, value converters request `Ability` instance by this key. This allows an application developer to decide how to configure actions, subjects and conditions. Also this is the only way to get maximum from tree shaking (e.g., if you don't need conditions, you can use `PureAbility` and get rid of `sift` library).

```js
import { Ability, PureAbility } from '@casl/ability';
import ability from './services/ability';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@casl/aurelia'); // <-- add plugin

  aurelia.container.registerInstance(PureAbility, ability);
  aurelia.container.registerInstance(Ability, ability);
  aurelia.start().then(() => aurelia.setRoot());
}
```

> Read [CASL and TypeScript](https://stalniy.github.io/casl/v4/en/advanced/typescript) to get more details about `Ability` type configuration.

## Update Ability instance

Majority of applications that need permission checking support have something like `AuthService` or `LoginService` or `Session` service (name it as you wish) which is responsible for user login/logout functionality. Whenever user login (and logout), we need to update `Ability` instance with new rules.

Let's imagine that server returns user with a role on login:

```ts @{data-filename="Session.ts"}
import { autoinject } from 'aurelia-framework';
import { Ability, AbilityBuilder } from '@casl/ability';

@autoinject
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
    const { can, rules } = new AbilityBuilder(Ability);

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

> See [Define rules](https://stalniy.github.io/casl/v4/en/guide/define-rules) to get more information of how to define `Ability`

Then use this `Session` service in `LoginComponent`:

```ts
import { autoinject, bindable } from 'aurelia-framework';
import { Session } from '../services/Session';

@autoinject
export class LoginFormCustomElement {
  @bindable email: string;
  @bindable password: string;

  constructor(private session: Session) {}

  login() {
    const { email, password } = this;
    return this.session.login({ email, password });
  }
}
```

## Check permissions in templates

To check permissions in any template you can use `AbleValueConverter`:

```html
<div if.bind="'create' | able: 'Post'">
  <a click.trigger="createPost()">Add Post</a>
</div>
```

> You can read the expression in `if` as "if creatable Post"

Or with **deprecated** `CanPipe`:

```html
<div *ngIf="'Post' | can: 'create'">
  <a click.trigger="createPost()">Add Post</a>
</div>
```

`CanValueConverter` was deprecated because it is less readable and it was harder to integrate it with all type definitions supported by `Ability`'s `can` method. That's why `CanValueConverter` has weaker typings than `AbleValueConverter`.

## Why value converter and not custom attribute?

Custom attribute cannot be used to pass values into inputs of other components. For example, we need to enable or disable a button based on user's ability to create a post. With directive we cannot do this but we can do this with value converter:

```html
<button disabled.bind="!('create' | able: 'Post')">Add Post</button>
```

Value converters in Aurelia are very good in terms of performance, they are not called if their arguments are not changed. Also they support signal bindings, so can be easily updated when you update `Ability` instance.

## TypeScript support

The package is written in TypeScript, so it will warn you about wrong usage.

It may be a bit tedious to use application specific abilities in Aurelia app because everywhere you inject `Ability` instance you will need to import its generic parameters:

```ts
import { Ability } from '@casl/ability';
import { autoinject } from 'aurelia-framework';
import { AppAbilities } from '../services/AppAbility';

@autoinject
export class TodoItemCustomElement {
  constructor(private ability: Ability<AppAbilities>) {}
}
```

To make the life easier, instead of creating a separate type you can create a separate class:

```ts @{data-filename="AppAbility.ts"}
import { Ability } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Article' | 'User'

export type AppAbilities = [Actions, Subjects];

export class AppAbility extends Ability<AppAbilities> {
}
```

And register this class in Aurelia's container:

```ts @{data-filename="main.ts"}
import { AppAbility } from './services/AppAbility';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@casl/aurelia'); // <-- add plugin

  const ability = new AppAbility();
  aurelia.container.registerInstance(PureAbility, ability);
  aurelia.container.registerInstance(AppAbility, ability);
  aurelia.start().then(() => aurelia.setRoot());
}
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://stalniy.github.io/casl/v4/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Aurelia]: https://aurelia.io/
