# Change Log

All notable changes to this project will be documented in this file.

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
