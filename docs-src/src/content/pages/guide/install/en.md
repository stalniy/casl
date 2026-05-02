---
title: Installation
categories: [guide]
order: 0
meta:
  keywords: casl install, npm, yarn, pnpm, cdn, @casl/ability, semantic versioning, webpack, es modules
  description: How to install CASL — npm, yarn, pnpm, CDN. Requirements, official packages (@casl/ability, mongoose, prisma, angular, react, vue, aurelia), builds and Webpack.
---

## Requirements

CASL is isomorphic, so can be used in browsers and in Nodejs environments. It requires an ES2020-compatible environment or newer.

Additionally, `@casl/vue` and `@casl/aurelia` use [ES6 WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), so it requires either polyfill or newer versions of browsers.

## Semantic Versioning

CASL follows [Semantic Versioning](https://semver.org/) in all its official projects. Changes can be found in [release notes](https://github.com/stalniy/casl/releases) or in `CHANGELOG.md` file inside each package.

## Official packages and its versions

| Project           | Status                               | Description |
|-------------------|--------------------------------------|-------------|
| [@casl/ability]   | [![@casl/ability-status]][@casl/ability-package]   | CASL's core package |
| [@casl/mongoose]  | [![@casl/mongoose-status]][@casl/mongoose-package] | integration with [Mongoose][mongoose] |
| [@casl/prisma]  | [![@casl/prisma-status]][@casl/prisma-package] | integration with [Prisma][prisma] |
| [@casl/angular]   | [![@casl/angular-status]][@casl/angular-package]   | integration with  [Angular][angular] |
| [@casl/react]     | [![@casl/react-status]][@casl/react-package]       | integration with  [React][react] |
| [@casl/vue]       | [![@casl/vue-status]][@casl/vue-package]           | integration with  [Vue][vue] |
| [@casl/aurelia]   | [![@casl/aurelia-status]][@casl/aurelia-package]   | integration with  [Aurelia][aurelia] |

[@casl/ability]: ../intro
[@casl/mongoose]: ../../package/casl-mongoose
[@casl/prisma]: ../../package/casl-prisma
[@casl/angular]: ../../package/casl-angular
[@casl/react]: ../../package/casl-react
[@casl/vue]: ../../package/casl-vue
[@casl/aurelia]: ../../package/casl-aurelia

[@casl/ability-status]: https://img.shields.io/npm/v/@casl/ability.svg
[@casl/mongoose-status]: https://img.shields.io/npm/v/@casl/mongoose.svg
[@casl/prisma-status]: https://img.shields.io/npm/v/@casl/prisma.svg
[@casl/angular-status]: https://img.shields.io/npm/v/@casl/angular.svg
[@casl/react-status]: https://img.shields.io/npm/v/@casl/react.svg
[@casl/vue-status]: https://img.shields.io/npm/v/@casl/vue.svg
[@casl/aurelia-status]: https://img.shields.io/npm/v/@casl/aurelia.svg

[@casl/ability-package]: https://www.npmjs.com/package/@casl/ability
[@casl/mongoose-package]: https://www.npmjs.com/package/@casl/mongoose
[@casl/prisma-package]: https://www.npmjs.com/package/@casl/prisma
[@casl/angular-package]: https://www.npmjs.com/package/@casl/angular
[@casl/react-package]: https://www.npmjs.com/package/@casl/react
[@casl/vue-package]: https://www.npmjs.com/package/@casl/vue
[@casl/aurelia-package]: https://www.npmjs.com/package/@casl/aurelia

[mongoose]: http://mongoosejs.com/
[vue]: https://vuejs.org
[angular]: https://angular.io/
[react]: https://reactjs.org/
[aurelia]: http://aurelia.io
[prisma]: https://www.prisma.io/


## 3rd party packages

There are also 3rd party packages which we can utilize in our projects. To find them, just [search on NPM using "casl" keyword](https://www.npmjs.com/search?q=keywords:casl)

> Add "casl" in [package.json#keywords](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#keywords) array to show up your CASL based package in that list

## NPM, YARN, PNPM

Installation through package manager is the recommended way to install CASL. To install the latest stable version run:

```sh
npm install @casl/ability
# or
yarn add @casl/ability
# or
pnpm add @casl/ability
```

## CDN

For prototyping or learning purposes, you can use the latest version with:

```html
<script type="module">
  import { Ability } from 'https://esm.sh/@casl/ability';
</script>
```

For production, we recommend linking to a specific version number to avoid unexpected breakage from newer versions:

```html
<script type="module">
  import { Ability } from 'https://esm.sh/@casl/ability@6';
</script>
```

[@ucast/core]: https://www.npmjs.com/package/@ucast/core
[@ucast/js]: https://www.npmjs.com/package/@ucast/js
[@ucast/mongo]: https://www.npmjs.com/package/@ucast/mongo
[@ucast/mongo2js]: https://www.npmjs.com/package/@ucast/mongo

## Download and use ESM

CASL no longer ships a standalone UMD build. If you want to load it without a package manager, use an ESM-capable CDN and import it from a `<script type="module">`.

## Explanation of Different Builds

In the `dist/` directory of the NPM package you will find the published module builds:

| Build           | Description                          |
|-----------------|--------------------------------------|
| esm/index.mjs   | ES2020+ code with ES modules support |
| cjs/index.cjs   | ES2020+ code with CommonJS support |
| types/\*.d.ts   | TypeScript declaration files |

[rollup]: https://rollupjs.org/guide/en/
[webpack]: https://webpack.js.org/
[typescript]: http://www.typescriptlang.org/

All official packages now use the same `dist/esm` and `dist/cjs` layout.

## Webpack

Webpack runs ESM JavaScript in a strict mode. The issue is that webpack4 reads only `main` property of `package.json` and ignores everything else in `resolve.mainFields`. All casl related packages, including ucast, distribute CommonJS file in `main` property. And this results to the next issue:

> ERROR in ./node_modules/@casl/ability/dist/esm/index.mjs
> Can't import the named export 'xxx' from non EcmaScript module (only default export is available)

The best way to fix it is to upgrade to webpack 5 which reads `exports` property of package.json when import packages and properly and works with ESM imports. But if you stuck with webpack 4, read [this comment](https://github.com/stalniy/casl/issues/427#issuecomment-757539486) for possible workarounds.

## CSP environments

Some environments, such as Google Chrome Apps, enforce Content Security Policy (CSP), which prohibits the use of `new Function()` for evaluating expressions.

CASL doesn't use any of the prohibited functions, so feel free to use it in any environments.

## Dev build

**Important**: the built files in GitHub's `/dist` folder are not checked-in during releases. To use CASL from the latest source code on GitHub, you will have to build it yourself! Navigate your project root and run this:

```sh
git clone git@github.com:stalniy/casl.git
cd casl
pnpm i -r
cd packages/casl-ability
npm run build
```
