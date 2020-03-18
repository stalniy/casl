---
title: Installation
categories: [guide]
order: 0
meta:
  keywords: ~
  description: ~
---

## Requirements

CASL is isomorphic, so can be used in browsers and in Nodejs environments. It requires ES5 compatible environment, that means the lowest supported version of Internet Explorer is IE9 and the lowest Nodejs version is 4.x.

`@casl/vue` and `@casl/aurelia` use [ES6 WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), so it requires either polyfill or newer versions of browsers (`WeakMap` is supported staring from IE 11).

## Semantic Versioning

CASL follows [Semantic Versioning](https://semver.org/) in all its official projects. Changes can be found in [release notes](https://github.com/stalniy/casl/releases) or in `CHANGELOG.md` file inside each package.

## Official packages and its versions

| Project           | Status                               | Description | Supported envinronemnts |
|-------------------|--------------------------------------|-------------|-------------------------|
| [@casl/ability]   | [![@casl/ability-status]][@casl/ability-package]   | CASL's core package | nodejs 4+ and ES5 compatible browsers (IE 9+) |
| [@casl/mongoose]  | [![@casl/mongoose-status]][@casl/mongoose-package] | integration with  [Mongoose][mongoose] | nodejs 4+ |
| [@casl/angular]   | [![@casl/angular-status]][@casl/angular-package]   | integration with  [Angular][angular] | ES5 compatible browsers (IE 9+) |
| [@casl/react]     | [![@casl/react-status]][@casl/react-package]       | integration with  [React][react] | ES5 compatible browsers (IE 9+) |
| [@casl/vue]       | [![@casl/vue-status]][@casl/vue-package]           | integration with  [Vue][vue] | IE 11+ (uses `WeakMap`) |
| [@casl/aurelia]   | [![@casl/aurelia-status]][@casl/aurelia-package]   | integration with  [Aurelia][aurelia] | IE 11+ (uses `WeakMap`) |

[@casl/ability]: ../intro
[@casl/mongoose]: ../../package/casl-mongoose
[@casl/angular]: ../../package/casl-angular
[@casl/react]: ../../package/casl-react
[@casl/vue]: ../../package/casl-vue
[@casl/aurelia]: ../../package/casl-aurelia

[@casl/ability-status]: https://img.shields.io/npm/v/@casl/ability.svg
[@casl/mongoose-status]: https://img.shields.io/npm/v/@casl/mongoose.svg
[@casl/angular-status]: https://img.shields.io/npm/v/@casl/angular.svg
[@casl/react-status]: https://img.shields.io/npm/v/@casl/react.svg
[@casl/vue-status]: https://img.shields.io/npm/v/@casl/vue.svg
[@casl/aurelia-status]: https://img.shields.io/npm/v/@casl/aurelia.svg

[@casl/ability-package]: https://www.npmjs.com/package/@casl/ability
[@casl/mongoose-package]: https://www.npmjs.com/package/@casl/mongoose
[@casl/angular-package]: https://www.npmjs.com/package/@casl/angular
[@casl/react-package]: https://www.npmjs.com/package/@casl/react
[@casl/vue-package]: https://www.npmjs.com/package/@casl/vue
[@casl/aurelia-package]: https://www.npmjs.com/package/@casl/aurelia

[mongoose]: http://mongoosejs.com/
[vue]: https://vuejs.org
[angular]: https://angular.io/
[react]: https://reactjs.org/
[aurelia]: http://aurelia.io

## NPM, YARN, PNPM

Installation through package is the recommended way to install CASL. To install the latest stable version run:

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
<script src="https://cdn.jsdelivr.net/npm/@casl/ability"></script>
```

For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/@casl/ability@3.4.0"></script>
```

## Download and use &lt;script&gt; tag

Simply [download CASL from CDN](https://cdn.jsdelivr.net/npm/@casl/ability) and include with a script tag. `casl` will be registered as a global variable.

> Hopefully, you know what you are doing

## Explanation of Different Builds

In the `dist/` [directory of the NPM package](https://cdn.jsdelivr.net/npm/@casl/ability/dist/) you will find many different builds of CASL.js. Here’s an overview of the difference between them:

| Build           | Description                          |
|-----------------|--------------------------------------|
| es6/index.js    | minified ES6 code with ES modules support. Intended for bundlers (e.g., [rollup], [webpack]) to create bundle for modern browsers |
| es5m/index.js   | minified ES5 code with ES modules support. Should be used by bundlers (e.g., [rollup], [webpack]) to tree shake the module and skip babel's transpile process |
| umd/index.js    | minified ES5 code with UMD. Intended for Nodejs environments, AMD apps and simple prototypes in browser |
| types           | contains [typescript] type declaration files |

[rollup]: https://rollupjs.org/guide/en/
[webpack]: https://webpack.js.org/
[typescript]: http://www.typescriptlang.org/

All official packages has the same directory layout (except of `@casl/mongoose` which does not have es5m version).

## CSP environments

Some environments, such as Google Chrome Apps, enforce Content Security Policy (CSP), which prohibits the use of `new Function()` for evaluating expressions. [sift] is a package which is CASL uses internally depends on this feature to evaluate `$where` operator.

CASL doesn't imports this operator, so if you use bundlers such as [webpack] or [rollup], they will shake out this operator and it will not appear in the eventual bundle.

If you use bundler which does not support tree shaking, you have 2 options:

1. Set `CSP_ENABLED=1` environment variable, this will replace `process.env.CSP_ENABLED` with `1`. Eventually uglifier will remove this code as unreachable
2. Depending of the module system you use, replace `from 'sift'` or `require('sift')` with `from 'sift/sift.csp.min'` or `require('sift/sift.csp.min')` in the eventual bundle (e.g., using shell `sed`)

## Dev build

**Important**: the built files in GitHub's `/dist` folder are not checked-in during releases. To use CASL from the latest source code on GitHub, you will have to build it yourself! Navigate your project root and run this:

```sh
git clone git@github.com:stalniy/casl.git
cd casl
npm ci
npm run bootstrap
cd packages/casl-ability
npm run build
```

Then copy `dist/` folder where you need.