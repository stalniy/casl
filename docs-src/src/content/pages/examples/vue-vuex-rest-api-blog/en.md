---
title: Permissions in Vue Blog + REST API
categories: [example, vue]
order: 25
meta:
  keywords: ~
  description: ~
---

This application is a Blog app with possibility to login, logout and manage articles. User abilities are received from REST API and later stored in `localStorage`.

Ability plugin for `Vuex` store can be found in `src/store/ability.js`. When user successfully login (i.e., `createSession` mutation is dispatched in store), ability is updated and when user logs out (i.e., `destroySession` mutation is dispatched) ability is reset to read-only mode.

http service is built on top of [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) with some hacky code (it is not important for this example).

## Technology Stack

* Language: [TypeScript]
* Framework: [Vue]
* State management: [Vuex]
* UI library: [vuetify]
* Permissions: [@casl/ability] + [@casl/vue]
* REST API: [on rails](https://github.com/stalniy/rails-cancan-api-example) or [on expressjs](https://github.com/stalniy/casl-express-example/tree/vue-api).

> Read more about integration with REST API in [Source Code](#source-code)

## Source Code

The source code can be found on [Github](https://github.com/stalniy/casl-vue-api-example)

## Demo

This is a fullstack example, including database and REST API, so it's hard to setup in-browser demo for it. Look into source and follow installation instructions to test the app on your local computer.

[Vue]: https://vuejs.org/
[Vuex]: https://vuex.vuejs.org/
[vuetify]: https://vuetifyjs.com/en/
[TypeScript]: https://www.typescriptlang.org/
[@casl/ability]: ../../guide/intro
[@casl/vue]: ../../package/casl-vue
