# CASL Vue

[![@casl/vue NPM version](https://badge.fury.io/js/%40casl%2Fvue.svg)](https://badge.fury.io/js/%40casl%2Fvue)
[![](https://img.shields.io/npm/dm/%40casl%2Fvue.svg)](https://www.npmjs.com/package/%40casl%2Fvue)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to integrate `@casl/ability` with [Vue 3] application. So, you can show or hide UI elements based on user ability to see them.

## Installation

**For Vue 2.x**:

```sh
npm install @casl/vue@1.x @casl/ability
# or
yarn add @casl/vue@1.x @casl/ability
# or
pnpm add @casl/vue@1.x @casl/ability
```

**For Vue 3.x**:

```sh
npm install @casl/vue @casl/ability
# or
yarn add @casl/vue @casl/ability
# or
pnpm add @casl/vue @casl/ability
```

## Getting started

This package provides a Vue plugin, several hooks for new [Vue Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) and `Can` component.

### The plugin

The plugin provides reactive `Ability` instance and optionally defines `$ability` and `$can` global properties, in the same way as it was for Vue 2.x. The only difference with the previous version is that it requires `Ability` instance to be passed as a mandatory argument:

```js
import { createApp } from 'vue';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';

createApp()
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })
  .mount('#app');
```

Later, we can use either `$ability` or `$can` method in any component:

```html
<template>
  <div v-if="$can('create', 'Post')">
    <a @click="createPost">Add Post</a>
  </div>
</template>
```

`globalProperties` is the same concept as global variables which may make life a bit more complicated because any component has access to them (i.e., implicit dependency) and we need to ensure they don't introduce name collisions by prefixing them. So, instead of exposing `$ability` and `$can` as globals, we can use [provide/inject API](https://v3.vuejs.org/guide/component-provide-inject.html) to inject `$ability`:

```js
createApp()
  .use(abilitiesPlugin, ability)
  .mount('#app');
```

And to inject an `Ability` instance in a component, we can use `ABILITY_TOKEN`:

```html
<template>
  <div>
    <div v-if="$ability.can('create', 'Post')">
      <a @click="createPost">Add Post</a>
    </div>
  </div>
</template>

<script>
import { ABILITY_TOKEN } from '@casl/vue';

export default {
  inject: {
    $ability: { from: ABILITY_TOKEN }
  }
}
</script>
```

This is a bit more verbose but allows us to be explicit. This works especially good with new [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html):

```html
<template>
  <div>
    <div v-if="can('create', 'Post')">
      <a @click="createPost">Add Post</a>
    </div>
  </div>
</template>

<script>
import { useAbility } from '@casl/vue';

export default {
  setup() {
    // some code
    const { can } = useAbility();

    return {
      // other props
      can
    };
  }
}
</script>
```

### provideAbility hook

Very rarely, we may need to provide a different `Ability` instance for a sub-tree of components, and to do this we can use `provideAbility` hook:

```html
<template>
  <!-- a template -->
</template>

<script>
import { provideAbility } from '@casl/vue';
import { defineAbility } from '@casl/ability';

export default {
  setup() {
    const myCustomAbility = defineAbility((can) => {
      // ...
    });

    provideAbility(myCustomAbility)
  }
}
</script>
```

> See [CASL guide](https://casl.js.org/v5/en/guide/intro) to learn how to define `Ability` instance.


### Can component

There is an alternative way we can check permissions in the app, by using `Can` component. `Can` component is not registered by the plugin, so we can decide whether we want to use component or `v-if` + `$can` method. Also, this helps tree shaking to remove it if we decide to not use it.

To register component globally, we can use global API (we can also register component locally in components that use it):

```js
import { Can, abilitiesPlugin } from '@casl/vue';

createApp()
  .use(abilitiesPlugin, ability)
  .component(Can.name, Can) // component registration
  .mount('#app');
```

And this is how we can use it:

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
  <template>
    <Can I="read" :this="post" field="title">
      Yes, you can do this! ;)
    </Can>
  </template>
  ```

* `not` - inverts ability check and show UI if user cannot do some action:

  ```html
  <template>
    <Can not I="create" a="Post">
      You are not allowed to create a post
    </Can>
  </template>
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

#### Property names and aliases

As you can see from the code above, the component name and its property names and values create an English sentence, actually a question. The example above reads as "Can I delete a Post?".

There are several other property aliases which allow constructing a readable question. And here is a guidance to help you do this:

* use the `a` (or `an`) alias when you check by Type

  ```html
  <Can I="read" a="Post">...</Can>
  ```

* use `this` alias when you check action on a particular instance. So, the question can be read as "Can I read this *particular* post?"

  ```html
  <Can I="read" :this="post">...</Can>
  ```

* use `do` and `on` if you are bored and don't want to make your code more readable :)

  ```html
  <Can do="read" :on="post">...</Can>
  <Can do="read" :on="post" field="title">...</Can>
  ```

#### Component vs reactive Ability

Let's consider PROS and CONS of both solutions in order to make the decision.

**Can Component**:

**PROS**:
* declarative
* can cache permissions check results until props or ability changes (currently does not)

**CONS**:
* more expensive to create
* adds nesting in template
* harder to use in complex boolean expressions
* harder to pass permission check as a prop to another component

**Reactive Ability**:

**PROS**:
* easy to use
* declarative in template with `v-if`
* easy to pass as a prop to another component
* easy to use in complex boolean expressions (either in js or in template)

**CONS**:
* more expensive to check, conditions are re-evaluated on each re-render

Despite the fact that reactive ability check is a bit more expensive, they are still very fast and it's recommended to use reactive ability instead of `<Can>` component.

## TypeScript support

The package is written in TypeScript, so don't worry that you need to keep all the properties and aliases in mind. If you use TypeScript, your IDE will suggest you the correct usage and TypeScript will warn you if you make a mistake.

There are few ways to use TypeScript in a Vue app, depending on your preferences. But let's first define our `AppAbility` type:


```ts @{data-filename="AppAbility.ts"}
import { Ability, AbilityClass } from '@casl/ability';

type Actions = 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Article' | 'User'

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
```

### Augment Vue types

There is no other way for TypeScript to know types of global properties without augmentation. To do this, let's add `src/shims-ability.d.ts` file with the next content:

```ts @{data-filename="shims-ability.d.ts"}
import { AppAbility } from './AppAbility'

declare module 'vue' {
  interface ComponentCustomProperties {
    $ability: AppAbility;
    $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean;
  }
}
```

### Composition API

With composition API, we don't need to augment Vue types and can use `useAbility` hook:

```ts
import { useAbility } from '@casl/vue';
import { AppAbility } from './AppAbility';

export default {
  setup(props) {
    const { can } = useAbility<AppAbility>();

    return () => can('read', 'Post') ? 'Yes' : 'No';
  }
}
```

Additionally, we can create a separate `useAppAbility` hook, so we don't need to import `useAbility` and `AppAbility` in every component we want to check permissions but instead just import a single hook:


```ts @{data-filename="hooks/useAppAbility.ts"}
import { useAbility } from '@casl/vue';
import { AppAbility } from '../AppAbility';

export const useAppAbility = () => useAbility<AppAbility>();
```

### Options API

It's also possible to use `@casl/vue` and TypeScript with options API. By default, `ABILITY_TOKEN` is typed as `InjectionKey<Ability>`, to cast it to `InjectionKey<AppAbility>`, we need to use a separate variable:

```ts @{data-filename="AppAbility.ts"}
import { InjectionKey } from 'vue';
import { ABILITY_TOKEN } from '@casl/vue';

// previous content that defines `AppAbility`

export const TOKEN = ABILITY_TOKEN as InjectionKey<AppAbility>;
```

and now, when we inject `AppAbility` instance, we will have the correct types:

```html
<script lang="ts">
import { defineComponent } from 'vue';
import { TOKEN } from './AppAbility';

export default defineComponent({
  inject: {
    ability: { from: TOKEN }
  },
  created() {
    this.ability // AppAbility
  }
});
</script>
```

> Read [Vue TypeScript](https://v3.vuejs.org/guide/typescript-support.html) for more details.

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
import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';

export default {
  name: 'LoginForm',
  inject: {
    $ability: { from: ABILITY_TOKEN }
  },
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
      const { can, rules } = new AbilityBuilder(Ability);

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

> See [Define rules](https://casl.js.org/v5/en/guide/define-rules) to get more information of how to define `Ability`

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v5/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Vue 3]: https://v3.vuejs.org/guide/introduction.html
