---
title: Permissions in Angular Todo list
categories: [example, angular]
meta:
  keywords: ~
  description: ~
---

This application is a basic Todo application with possibility to specify assignee for a task. By default, all users are able to create and read all tasks but can update and delete only those that are assigned to them. Any user may create a task and assign it to other users.

Ability configuration can be found in `src/services/ability.ts`, the function that creates Ability instance is in the same file.

## Technology Stack

* Language: [TypeScript]
* Framework: [Angular]
* Permissions: [@casl/ability] + [@casl/angular]

## Source code

The source code can be found either on [codesandbox](https://codesandbox.io/s/6y325ml5vk) or [Github](https://github.com/stalniy/casl-angular-example)

## Demo

<iframe
  src="https://codesandbox.io/embed/6y325ml5vk?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Fservices%2Fability.js&view=preview"
  class="editor"
  title="CASL Angular sample"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

[Angular]: https://angular.io
[TypeScript]: https://www.typescriptlang.org/
[@casl/ability]: ../../guide/intro
[@casl/angular]: ../../package/casl-angular
