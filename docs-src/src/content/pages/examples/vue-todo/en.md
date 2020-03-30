---
title: Permissions in Vue Todo list
categories: [example, vue]
meta:
  keywords: ~
  description: ~
---

This application is a basic Todo application with possibility to specify assignee for a task. By default, all users are able to create and read all tasks but can update and delete only those that are assigned to them. Any user may create a task and assign it to other users.

Ability configuration can be found in `src/config/ability.ts`.

## Technology Stack

* Language: [TypeScript]
* Framework: [Vue]
* Permissions: [@casl/ability] + [@casl/vue]

## Source code

The source code can be found either on [codesandbox](https://codesandbox.io/s/github/stalniy/casl-vue-example) or [Github](https://github.com/stalniy/casl-vue-example)

## Demo

<iframe
  src="https://codesandbox.io/embed/github/stalniy/casl-vue-example/tree/master/?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fconfig%2Fability.js&theme=dark&view=preview"
  class="editor"
  title="CASL Vue example"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

[Vue]: https://vuejs.org/
[TypeScript]: https://www.typescriptlang.org/
[@casl/ability]: ../../guide/intro
[@casl/vue]: ../../package/casl-vue
