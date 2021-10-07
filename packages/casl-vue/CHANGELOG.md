# Change Log

All notable changes to this project will be documented in this file.

## [2.1.2](https://github.com/stalniy/casl/compare/@casl/vue@2.1.1...@casl/vue@2.1.2) (2021-10-07)


### Bug Fixes

* **vue:** makes sure Abilities `can` and `cannot` methods are bound ([86f9157](https://github.com/stalniy/casl/commit/86f91570d3e1709449cfded37c153fb21e56c474)), closes [#530](https://github.com/stalniy/casl/issues/530)

## [2.1.1](https://github.com/stalniy/casl/compare/@casl/vue@2.1.0...@casl/vue@2.1.1) (2021-07-05)


### Bug Fixes

* **vue:** binds ability to $can method ([cbb3c13](https://github.com/stalniy/casl/commit/cbb3c133c3d9583e6fdbc95c068e2e6343befdc9)), closes [#522](https://github.com/stalniy/casl/issues/522)

# [2.1.0](https://github.com/stalniy/casl/compare/@casl/vue@2.0.2...@casl/vue@2.1.0) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))

## [2.0.2](https://github.com/stalniy/casl/compare/@casl/vue@2.0.1...@casl/vue@2.0.2) (2021-01-25)

## [2.0.1](https://github.com/stalniy/casl/compare/@casl/vue@2.0.0...@casl/vue@2.0.1) (2021-01-23)

# [2.0.0](https://github.com/stalniy/casl/compare/@casl/vue@1.2.1...@casl/vue@2.0.0) (2021-01-22)


### Code Refactoring

* **vue:** adds support for vue 3 ([#444](https://github.com/stalniy/casl/issues/444)) ([e742bcf](https://github.com/stalniy/casl/commit/e742bcf0d187f8283ff171ec9760431759b55910)), closes [#396](https://github.com/stalniy/casl/issues/396)


### BREAKING CHANGES

* **vue:** refactor to use Vue 3 what introduces a bunch of breaking changes:

  * `Ability` instance is not a required plugin parameter. Previously, we could decide whether to pass ability as plugin parameter or as root component option. Now, the only way is to pass it in plugin:

    **Before**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import Vue from 'vue';
    import { ability } from './services/AppAbility';

    Vue.use(abilitiesPlugin);
    new Vue({
      ability
    }).$mount('#app')
    ```

    **After**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    createApp()
     .use(abilitiesPlugin, ability)
     .mount('#app');
    ```

  * `abilitiesPlugin` no more define global `$ability` and `$can` properties, instead a recommended way to get `AppAbility` instance is by injecting it through [provide/inject API](https://v3.vuejs.org/guide/component-provide-inject.html). To get previous behavior, pass `useGlobalProperties: true` option:

    **Before**

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import Vue from 'vue';
    import { ability } from './services/AppAbility';

    Vue.use(abilitiesPlugin);
    const root = new Vue({
      ability
    }).$mount('#app')

    console.log(root.$ability)
    ```

    **After**

    Recommended way:

    ```js
    import { abilitiesPlugin, ABILITY_TOKEN } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    const App = {
      name: 'App',
      inject: {
        $ability: { from: ABILITY_TOKEN }
      }
    };

    const root = createApp(App)
      .use(abilitiesPlugin, ability, {
        useGlobalProperties: true
      })
      .mount('#app');

    console.log(root.$ability)
    ```

    Backward compatible way:

    ```js
    import { abilitiesPlugin } from '@casl/vue';
    import { createApp } from 'vue';
    import { ability } from './services/AppAbility';

    const root = createApp()
      .use(abilitiesPlugin, ability, {
        useGlobalProperties: true
      })
      .mount('#app');

    console.log(root.$ability)
    ```

  * `AllCanProps<TAbility>` type was renamed to `CanProps<TAbility>`

  * `@casl/vue` no more augment vue types, so if you decide to use global properties, you will need to augment types by yourself

     **Before**

     @casl/vue augments type of `$ability` to `AnyAbility` and `$can` to `typeof $ability['can']`

     **After**

     create a separate file `src/ability-shim.d.ts` with the next content:

     ```ts
     import { AppAbility } from './AppAbility'

     declare module 'vue' {
       interface ComponentCustomProperties {
         $ability: AppAbility;
         $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean;
       }
     }
     ```

## [1.2.1](https://github.com/stalniy/casl/compare/@casl/vue@1.2.0...@casl/vue@1.2.1) (2020-12-28)


### Bug Fixes

* **dist:** adds separate `tsconfig.build.json` to every completementary project ([87742ce](https://github.com/stalniy/casl/commit/87742cec518a8a68d5fc29be2bbc9561cbc7da6c)), closes [#419](https://github.com/stalniy/casl/issues/419)

# [1.2.0](https://github.com/stalniy/casl/compare/@casl/vue@1.1.1...@casl/vue@1.2.0) (2020-12-26)


### Bug Fixes

* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)
* **package:** removes `engine` section that points to npm@6 ([eecd12a](https://github.com/stalniy/casl/commit/eecd12ac49f56d6a0f57d1a57fb37487335b5f03)), closes [#417](https://github.com/stalniy/casl/issues/417)


### Features

* **builder:** improves typings for AbilityBuilder [skip release] ([ebd4d17](https://github.com/stalniy/casl/commit/ebd4d17a355a2646467033118a3d6efee4321d27)), closes [#379](https://github.com/stalniy/casl/issues/379)
* **esm:** adds ESM support for latest Node.js through `exports` prop in package.json ([cac2506](https://github.com/stalniy/casl/commit/cac2506a80c18f194210c2d89108d1d094751fa4)), closes [#331](https://github.com/stalniy/casl/issues/331)


### BREAKING CHANGES

* **builder:** changes main generic parameter to be a class instead of instance and makes `defineAbility` to accept options as the 2nd argument.

  **Before**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility({ resolveAction }, (can) => can('read', 'Item'));
  const builder = new AbilityBuilder<Ability>(Ability);
  ```

  **After**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility((can) => can('read', 'Item'), { resolveAction });
  const builder = new AbilityBuilder(Ability); // first argument is now mandatory!
  ```

  The 1st parameter to `AbilityBuilder` is now madatory. This allows to infer generic parameters from it and makes AbilityType that is built to be explicit.

## [1.1.1](https://github.com/stalniy/casl/compare/@casl/vue@1.1.0...@casl/vue@1.1.1) (2020-06-09)


### Bug Fixes

* **docs:** ensure README and docs for all packages are in sync ([8df3684](https://github.com/stalniy/casl/commit/8df3684b139de0af60c9c37f284a5028ffbf2224)), closes [#338](https://github.com/stalniy/casl/issues/338)

# [1.1.0](https://github.com/stalniy/casl/compare/@casl/vue@1.0.3...@casl/vue@1.1.0) (2020-05-12)


### Features

* **types:** extract vue augmentation modules into pseudo submodule ([a75296c](https://github.com/stalniy/casl/commit/a75296c3f73af432f500eb8e153cf0e7cde67796)), closes [#312](https://github.com/stalniy/casl/issues/312)

## [1.0.3](https://github.com/stalniy/casl/compare/@casl/vue@1.0.2...@casl/vue@1.0.3) (2020-04-22)


### Bug Fixes

* **types:** use `AnyAbility` in ComponentOptions and in Vue augmentation modules ([7f9be6f](https://github.com/stalniy/casl/commit/7f9be6f13248c1df6df1b41a6d7e2edb62928bca))

## [1.0.2](https://github.com/stalniy/casl/compare/@casl/vue@1.0.1...@casl/vue@1.0.2) (2020-04-10)


### Bug Fixes

* **vue:** ensure that terser doesn't mangle reserved required props ([7fa234c](https://github.com/stalniy/casl/commit/7fa234c06cc133bdffe485bfcb972dc595167899))

## [1.0.1](https://github.com/stalniy/casl/compare/@casl/vue@1.0.0...@casl/vue@1.0.1) (2020-04-09)


### Bug Fixes

* **vue:** removes `of` alias from `<can>` component ([bd658e2](https://github.com/stalniy/casl/commit/bd658e21a34cbea8b6b70739f533453ebf95d20a))

# [1.0.0](https://github.com/stalniy/casl/compare/@casl/vue@0.5.1...@casl/vue@1.0.0) (2020-04-09)


### Bug Fixes

* **vue:** adds `an` alias, so types are compatible between React and Vue ([8276942](https://github.com/stalniy/casl/commit/8276942da1660ac3eb1cd928cc80db891ed7e275)), closes [#248](https://github.com/stalniy/casl/issues/248)


### Features

* **ability:** updates typings for vue ([8ac4ca1](https://github.com/stalniy/casl/commit/8ac4ca14a59ed87bc0f84a853466418e6a74cd74)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **vue:** adds better generics typying for Vue ([5cc7b60](https://github.com/stalniy/casl/commit/5cc7b60d8a2a53db217f8ad1a4673a28f67aefce)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **vue:** migrates vue to typescript ([7bacadd](https://github.com/stalniy/casl/commit/7bacadd8878afe14898929ebeb7c3efd9af88d3c)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **vue:** throws exception if `Ability` is not provided ([aacd952](https://github.com/stalniy/casl/commit/aacd9520cfd3a35ea2dc3f44e8043734494f3c2a)), closes [#248](https://github.com/stalniy/casl/issues/248)


### BREAKING CHANGES

* **typescript:** weak hand written declaration files are removed as `@casl/vue` has been completely rewritten to TypeScript. TypeScript now checks that you correctly use property aliases
* **Can:** `of` alias is removed and field was extracted to a separate prop

  **Before**

  ```html
  <can I="read title" of="Post">...</can>
  ```

  **After**

  ```html
  <can I="read" a="Post" field="title">...</can>
  ```

# [@casl/vue-v0.5.1](https://github.com/stalniy/casl/compare/@casl/vue@0.5.0...@casl/vue@0.5.1) (2019-02-10)


### Bug Fixes

* **packages:** increases peerDependency of [@casl](https://github.com/casl)/ability ([9f6a7b8](https://github.com/stalniy/casl/commit/9f6a7b8)), closes [#119](https://github.com/stalniy/casl/issues/119)

# [@casl/vue-v0.5.0](https://github.com/stalniy/casl/compare/@casl/vue@0.4.3...@casl/vue@0.5.0) (2018-11-25)


### Bug Fixes

* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


### Features

* **react:can:** updates typescript declarations ([213dcde](https://github.com/stalniy/casl/commit/213dcde))
* **vue:** adds `passThrough` prop to `Can` ([28ca883](https://github.com/stalniy/casl/commit/28ca883)), closes [#105](https://github.com/stalniy/casl/issues/105)

<a name="@casl/vue-v0.4.3"></a>
# [@casl/vue-v0.4.3](https://github.com/stalniy/casl/compare/@casl/vue@0.4.2...@casl/vue@0.4.3) (2018-07-14)


### Bug Fixes

* **vue:** fixes ts declaration for `abilitiesPlugin`  ([7d8e9ca](https://github.com/stalniy/casl/commit/7d8e9ca)), closes [#92](https://github.com/stalniy/casl/issues/92)

<a name="@casl/vue-v0.4.2"></a>
# [@casl/vue-v0.4.2](https://github.com/stalniy/casl/compare/@casl/vue@0.4.1...@casl/vue@0.4.2) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="@casl/vue-v0.4.1"></a>
# [@casl/vue-v0.4.1](https://github.com/stalniy/casl/compare/@casl/vue@0.4.0...@casl/vue@0.4.1) (2018-06-04)


### Bug Fixes

* **vue:** extends `ComponentOptions` with `ability` member ([#73](https://github.com/stalniy/casl/issues/73)) ([94d4c24](https://github.com/stalniy/casl/commit/94d4c24))

<a name="@casl/vue-v0.4.0"></a>
# [@casl/vue-v0.4.0](https://github.com/stalniy/casl/compare/@casl/vue@0.3.0...@casl/vue@0.4.0) (2018-06-01)


### Features

* **vue:** pass ability down components tree ([28e3d8d](https://github.com/stalniy/casl/commit/28e3d8d)), closes [#72](https://github.com/stalniy/casl/issues/72)


<a name="@casl/vue-v0.3.0"></a>
# [@casl/vue-v0.3.0](https://github.com/stalniy/casl/compare/@casl/vue@0.2.1...@casl/vue@0.3.0) (2018-05-30)


### Features

* **vue:** adds can component ([42ee540](https://github.com/stalniy/casl/commit/42ee540)), closes [#63](https://github.com/stalniy/casl/issues/63)


<a name="@casl/vue-v0.2.1"></a>
# [@casl/vue-v0.2.1](https://github.com/stalniy/casl/compare/@casl/vue@0.2.0...@casl/vue@0.2.1) (2018-05-29)


### Bug Fixes

* **vue:** fixes issue with wrong type definition for `abilitiesPlugin` ([a7e2251](https://github.com/stalniy/casl/commit/a7e2251))


<a name="0.2.0"></a>
# 0.2.0 (2018-04-16)


### Features

* **vue:** adds typescript definitions ([a7eac4b](https://github.com/stalniy/casl/commit/a7eac4b)), closes [#38](https://github.com/stalniy/casl/issues/38)


<a name="0.1.0"></a>
# 0.1.0 (2018-03-23)


### Features

* **integration:** adds new folder for vue integration, closes [#22](https://github.com/stalniy/casl/issues/22)
* **vue:** adds empty ability instance in case if such is not provided ([a971f05](https://github.com/stalniy/casl/commit/a971f05))
* **ability:** adds reactivity to ability rules
