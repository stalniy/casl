# CASL Vue [![@casl/vue NPM version](https://badge.fury.io/js/%40casl%2Fvue.svg)](https://badge.fury.io/js/%40casl%2Fvue) [![](https://img.shields.io/npm/dm/%40casl%2Fvue.svg)](https://www.npmjs.com/package/%40casl%2Fvue) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package allows integrating [@casl/ability][casl-ability] into a [Vue][vue] application. So, you can show or hide UI elements based on user ability to see them.

## Installation

```sh
npm install @casl/vue @casl/ability
```

## Getting Started

### 1. Including plugin

This package provides a Vue plugin which defines `$ability` object and `$can` method for all components

```js
import { abilitiesPlugin } from '@casl/vue'
import Vue from 'vue'

Vue.use(abilitiesPlugin)
```

### 2. Defining Abilities

By default, the `$ability` object is an empty `Ability` instance. So you either need to update it or provide your own.
In case you want to provide your own, just define it using `AbilityBuilder` or whatever way you prefer:

```js
// ability.js
import { AbilityBuilder } from '@casl/ability'

export default AbilityBuilder.define(can => {
  can('read', 'all')
})
```

And just pass it as an argument to `abilitiesPlugin`:

```js
import { abilitiesPlugin } from '@casl/vue'
import Vue from 'vue'
import ability from './ability'

Vue.use(abilitiesPlugin, ability)
```

Alternatively, you can just update an existing instance, for example, in the `SignIn.vue` component when receiving a rules list from a server API (or other sources).

```html
<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
  export default {
    name: 'SignIn',
    data: () => ({
      email: '',
      password: ''
    }),
    methods: {
      login() {
        const { email, password } = this

        return fetch('path/to/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
          .then(response => response.json())
          .then(session => this.$ability.update(session.rules))
      }
    }
  }
</script>
```

Obviously, in this case your server API should provide the list of user abilities in the `rules` field of the response.
See the [@casl/ability][casl-ability] package for more information on how to define abilities.

### 3. Check permissions in templates

To check permissions in any component you can use the `$can` method:

```html
<template>
  <div v-if="$can('create', 'Post')">
    <a @click="createPost">Add Post</a>
  </div>
</template>
```

See [casl-vue-example][casl-vue-example] and [casl-vuex-example][casl-vuex-example] for more examples.

### 4. Provide ability for a components tree

Another way to provide an `Ability` instance is to pass it as option into your root component:

```js
// main.js

import App from './App'
import ability from './ability'

new Vue({
  store,
  router,
  ability,
  render: h => h(App)
}).$mount('#app')
```

That instance will be available under the `$ability` property, and the `$can` method will use it to check permissions.
That way, you can also provide a different ability for a component's subtree.

```js
// TodoList.vue

<template>...</template>
<script>
  import { AbilityBuilder } from '@casl/ability'

  export default {
    name: 'TodoList',
    ability: AbilityBuilder.define(can => {
      ...
    })
  }
</script>
```

**Note**: I don't recommend trying to manage more than one `Ability` instance in the app
because this contradicts to the main goal of CASL: keep all permissions in a single place and manage them from the single location (`Ability` instance).

### 5. `Can` component

There is an alternative way you can check your permissions in the app by using the `Can` component. To enable this feature you need to register it globally:

```js
import Vue from 'vue'
import { Can } from '@casl/vue'

Vue.component('Can', Can)
```

Now, instead of using `v-if="$can(...)"`, we can do this:

```html
<template>
  <can I="create" a="Post">
    <a @click="createPost">Add Post</a>
  </can>
</template>
```

#### Property names and aliases

As you can see from the code above, the component name and its property names and values create an English sentence, basically a question.
For example, the code above reads as `Can I create a Post`.

There are several other property aliases which allow constructing a readable question:

* use the `a` alias when you check by Type

```html
<Can I="read" a="Post">...</Can>
```

* use the `of` alias instead of `a` when you check by subject field

```html
<Can I="read title" of="Post">...</Can>

<!-- or when checking on instance. `post` is an instance of `Post` class (i.e., model instance) -->

<Can I="read title" :of="post">...</Can>
```

* use the `this` alias instead of `of` and `a` when you check action on instance

```html
<!-- `post` is an instance of `Post` class (i.e., model instance) -->

<Can I="read" :this="post">...</Can>
```

* use `do` and `on` if you are bored and don't want to make your code more readable :)

```html
<!-- `post` is an instance of `Post` class (i.e., model instance) -->

<Can do="read" :on="post">...</Can>

<!-- or per field check -->
<Can do="read title" :on="post">...</Can>
```

* use `not` when you want to invert the render method (renders children only if user can't read a post)

```html
<Can not I="read" a="Post">...</Can>
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: /CONTRIBUTING.md
[vue]: https://vuejs.org/
[casl-vue-example]: https://github.com/stalniy/casl-vue-example
[casl-vuex-example]: https://github.com/stalniy/casl-vue-api-example
[casl-ability]: https://www.npmjs.com/package/@casl/ability
