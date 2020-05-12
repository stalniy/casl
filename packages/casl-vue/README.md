# CASL Vue [![@casl/vue NPM version](https://badge.fury.io/js/%40casl%2Fvue.svg)](https://badge.fury.io/js/%40casl%2Fvue) [![](https://img.shields.io/npm/dm/%40casl%2Fvue.svg)](https://www.npmjs.com/package/%40casl%2Fvue) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to integrate `@casl/ability` with [Vue] application. So, you can show or hide UI elements based on user ability to see them. This package provides a Vue plugin which defines `$ability` object and `$can` method for all components. Also package provides functional `Can` component (not included in the plugin), both allow to hide or show UI elements based on the user ability to see them.

## Installation

```sh
npm install @casl/vue @casl/ability
# or
yarn add @casl/vue @casl/ability
# or
pnpm add @casl/vue @casl/ability
```

## Getting started

If you don't plan to use multiple `Ability` instances across your application (99.9% likelihood that you don't), you can pass `Ability` instance as a 2nd argument to `Vue.use`:

```js @{data-filename="main.js"}
import Vue from 'vue';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';

Vue.use(abilitiesPlugin, ability);
```

but if you one from that 0.1%, you need to pass it in `Vue` constructor:

```js @{data-filename="main.js"}
import Vue from 'vue';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';

Vue.use(abilitiesPlugin);

new Vue({
  el: '#app',
  ability
})
```

The difference is that the 1st approach defines `Ability` instance on `Vue.prototype` and 2nd one passes ability from parent to child in component tree.

> The 2nd approach potentially may slowdown components creation but you will not notice this ;)

The plugin doesn't register `Can` component, so you can decide whether to use it or not. In most cases, `$can` function is enough and it's more lightweight than `Can` component.

To use `Can` functional component, you need to import it in a particular component or register it globally:

```js
import Vue from 'vue';
import { Can } from '@casl/vue';

Vue.component('Can', Can);
```

> See [CASL guide](../../guide/intro) to learn how to define `Ability` instance.

## Check permissions in templates

To check permissions, you can use `$can` method in any component, it accepts the same arguments as `Ability`'s `can`:

```html
<template>
  <div v-if="$can('create', 'Post')">
    <a @click="createPost">Add Post</a>
  </div>
</template>
```

## Can component

There is an alternative way you can check your permissions in the app by using the `Can` component. Instead of using `v-if="$can(...)"`, we can do this:

```html
<template>
  <Can I="create" a="Post">
    <a @click="createPost">Add Post</a>
  </Can>
</template>
```

It accepts default slot and 5 properties:

* `do` - name of the action (e.g., `read`, `update`). Has an alias `I`
* `on` - checked subject. Has `a`, `an`, `this` aliases
* `field` - checked field

  ```html
  <Can I="read" :this="post" field="title">
    Yes, you can do this! ;)
  </Can>
  ```

* `not` - inverts ability check and show UI if user cannot do some action:

  ```html
  <Can not I="create" a="Post">
    You are not allowed to create a post
  </Can>
  ```

* `passThrough` - renders children in spite of what `ability.can` returns. This is useful for creating custom components based on `Can`. For example, if you need to disable button based on user permissions:

  ```html
  <template>
    <div>
      <Can I="delete" a="Post" passThrough v-slot="{ allowed }">
        <button :disabled="!allowed">Delete post</button>
      </Can>
    </div>
  </template>
  ```

`Can` component has several downsides in comparison to `$can` function.

1. It's more expensive to use because Vue needs to spend some time creating it
2. It adds additional nesting, that makes code harder to read

### Property names and aliases

As you can see from the code above, the component name and its property names and values create an English sentence, actually a question. The example above reads as "Can I create a Post?".

There are several other property aliases which allow constructing a readable question:

* use the `a` (or `an`) alias when you check by Type

  ```html
  <Can I="read" a="Post">...</Can>
  ```

* use `this` alias instead of `a` when you check action on a particular instance. So, the question can be read as "Can I read this *particular* post?"

  ```html
  <Can I="read" :this="post">...</Can>
  ```

* use `do` and `on` if you are bored and don't want to make your code more readable :)

  ```html
  <Can do="read" :on="post">...</Can>
  <Can do="read" :on="post" field="title">...</Can>
  ```

## TypeScript support

The package is written in TypeScript, so don't worry that you need to keep all the properties and aliases in mind. If you use TypeScript, your IDE will suggest you the correct usage and TypeScript will warn you if you make a mistake.

To define application specific `Ability` type, create a separate file, for example:

```ts @{data-filename="AppAbility.ts"}
import { Ability, AbilityClass } from '@casl/angular';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Article' | 'User'

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
```

By default, `Vue['$ability']` is declared as `AnyAbility` type. So, to make it more useful for our app, we need to redeclare `Vue['$ability']` type. To do so, create `src/shims-ability.d.ts` file:

```ts @{data-filename="shims-ability.d.ts"}
import { AppAbility } from './AppAbility'

declare module 'vue/types/vue' {
  interface Vue {
    $ability: AppAbility;
    $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean;
  }
}
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: AppAbility;
  }
}
```

And update `tsconfig.json` to replace default vue modules augmentation with application specific:

```json
{
  "compilerOptions": {
    // other options
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "@casl/vue/patch": [
        "src/shims-ability.d.ts"
      ]
    }
  },
  // other options
}
```

> Read [Vue Typescript](https://vuejs.org/v2/guide/typescript.html) to understand why it's so hard to properly type Vue plugins.

## Update Ability instance

Majority of applications that need permission checking support have something like `AuthService` or `LoginService` or `Session` service (name it as you wish) which is responsible for user login/logout functionality. Whenever user login (and logout), we need to update `Ability` instance with new rules. Usually you will do this in your `LoginComponent`.

Let's imagine that server returns user with a role on login:

```html @{data-filename="Login.vue"}
<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { AbilityBuilder } from '@casl/ability';

export default {
  name: 'LoginForm',
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login() {
      const { email, password } = this;
      const params = { method: 'POST', body: JSON.stringify({ email, password }) };

      return fetch('path/to/api/login', params)
        .then(response => response.json())
        .then(({ user }) => this.updateAbility(user));
    },
    updateAbility(user) {
      const { can, rules } = new AbilityBuilder();

      if (user.role === 'admin') {
        can('manage', 'all');
      } else {
        can('read', 'all');
      }

      this.$ability.update(rules);
    }
  }
};
</script>
```

> See [Define rules](../../guide/define-rules) to get more information of how to define `Ability`

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](../../support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Vue]: https://vuejs.org/
