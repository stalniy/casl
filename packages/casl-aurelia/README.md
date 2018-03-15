# CASL Aurelia

[![@casl/aurelia NPM version](https://badge.fury.io/js/%40casl%2Faurelia.svg)](https://badge.fury.io/js/%40casl%2Faurelia)
[![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/)
[![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package allows to integrate [@casl/ability](/packages/casl-ability) into [Aurelia][aurelia] application. So, you can show or hide some components, buttons, etc based on user ability to see them.

## Installation

```sh
npm install @casl/aurelia @casl/ability
```

## Getting Started

### 1. Including module

This package provides Aurelia plugin which provides `CanValueConverter` to templates and `Ability` instance to dependency injection container

```js
// main.js

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@casl/aurelia')

  aurelia.start().then(() => aurelia.setRoot())
}
```

### 2. Defining Abilities

This plugin provides an empty `Ability` instance, so you either need to provide your own or update existing one. In case if you want to provide your own, just define it using `AbilityBuilder` (or whatever way you prefer):

```js
// ability.js
import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define(can => {
  can('read', 'all')
})
```

Later in you can register your `Ability` in dependency injection container:

```js
import { Ability } from '@casl/ability'
import { ability } from './ability'

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@casl/aurelia')

  aurelia.container.registerInstance(Ability, ability)
  aurelia.start().then(() => aurelia.setRoot())
}
```

Alternatively, you can just inject existing instance and update rules. 
Imagine that we have a `Session` service which is responsible for user login/logout functionality. Whenever user login, we need to update ability rules with rules which server returns and reset them back on logout. Lets do this:

```js
// session.js
import { Ability } from '@casl/ability'

export class Session {
  static inject = [Ability]

  constructor(ability) {
    this.ability = ability
    this.token = ''
  }
  
  login(details) {
    return fetch('path/to/api/login', { methods: 'POST', body: JSON.stringify(details) })
      .then(response => response.json())
      .then(session => {
        this.ability.update(session.rules)
        this.token = session.token
      })
  }
  
  logout() {
    this.token = ''
    this.ability.update([])
    // or this.ability.update([{ actions: 'read', subject: 'all' }]) to make everything to be readonly
  }
}
```

See [@casl/ability](/packages/casl-ability) package for more information on how to define abilities.

### 3. Check permissios in templates

To check permissions in any template you can use `CanPipe`:

```html
<div if.bind="'Post' | can: 'create'">
  <a click.trigger="createPost()">Add Post</a>
</div>
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

[contributing]: /CONTRIBUTING.md
[aurelia]: https://aurelia.io/
[update-ability]: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html#update-abilities
