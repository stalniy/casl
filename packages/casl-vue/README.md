# CASL Vue [![@casl/vue NPM version](https://badge.fury.io/js/%40casl%2Fvue.svg)](https://badge.fury.io/js/%40casl%2Fvue) [![](https://img.shields.io/npm/dm/%40casl%2Fvue.svg)](https://www.npmjs.com/package/%40casl%2Fvue) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package allows to integrate [@casl/ability](/packages/casl-ability) into [Vue][vue] application. So, you can show or hide UI elements based on user ability to see them.

## Installation

```sh
npm install @casl/vue @casl/ability
```

## Getting Started

### 1. Including plugin

This package provides Vue plugin which defines `$ability` object and `$can` method for all components

```js
import { abilitiesPlugin } from '@casl/vue'
import Vue from 'vue'

Vue.use(abilitiesPlugin)
```

### 2. Defining Abilities

By default, `$ability` object is an empty `Ability` instance. So, you either need to update it or provide your own.
In case if you want to provide your own, just define it using `AbilityBuilder` or whatever way you prefer:

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

Alternatively, you can just update existing instance, for example, in `SignIn.vue` component when receive rules list from server API (or other sources).

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

Obviously, in this case your server API should provide the list of user abilities in `rules` field of the response.
See [@casl/ability](/packages/casl-ability) package for more information on how to define abilities.

### 3. Check permissions in templates

To check permissions in any component you can use `$can` method:

```html
<template>
  <div v-if="$can('create', 'Post')">
    <a @click="createPost">Add Post</a>
  </div>
</template>
```

See [casl-vue-example][casl-vue-example] and [casl-vuex-example][casl-vuex-example] for more examples.

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: /CONTRIBUTING.md
[vue]: https://vuejs.org/
[casl-vue-example]: https://github.com/stalniy/casl-vue-example
[casl-vuex-example]: https://github.com/stalniy/casl-vue-api-example
