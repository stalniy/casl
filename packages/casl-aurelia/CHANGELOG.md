# Change Log

All notable changes to this project will be documented in this file.

## [1.0.1](https://github.com/stalniy/casl/compare/@casl/aurelia@1.0.0...@casl/aurelia@1.0.1) (2020-04-09)

### Features

* **aurelia:** adds `able` value converter that allows to do checks only by action ([490434b](https://github.com/stalniy/casl/commit/490434bbd5296110d5874e67bc07cf7e7ed66a0e)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **aurelia:** adds generics to can converter and plugin ([4d634d7](https://github.com/stalniy/casl/commit/4d634d7694e7f29fd7c3b4188845c82d82f013da)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **package:** replaces `Ability` with `PureAbility` in order to improve tree shaking ([c6a01c8](https://github.com/stalniy/casl/commit/c6a01c8b51dc2d46928436f673dbb6a0e56a4764)), closes [#249](https://github.com/stalniy/casl/issues/249)
* **vue:** adds better generics typying for Vue ([5cc7b60](https://github.com/stalniy/casl/commit/5cc7b60d8a2a53db217f8ad1a4673a28f67aefce)), closes [#107](https://github.com/stalniy/casl/issues/107)


### BREAKING CHANGES

* **valueConverter:** `CanValueConverter` is deprecated in favor of `AbleValueConverter`

  **Before**

  ```html
  <div if.bind="'Post' | can: 'read'">hidden content</div>
  ```

  **After**

  ```html
  <div if.bind="'read' | able: 'Post'">hidden content</div>
  ```

* **di**: replaces `Ability` DI token with `PureAbility`

  **Before**

  ```js
  import { Ability } from '@casl/ability'

  export function configure(config) {
    config.container.registerInstance(Ability, new Ability())
  }
  ```

  **After**

  ```js
  import { PureAbility, Ability } from '@casl/ability'

  export function configure(config) {
    const ability = new Ability()
    // the token below is used by value converters
    config.container.registerInstance(PureAbility, ability)
    config.container.registerInstance(Ability, ability)
  }
  ```
* **typescript:** weak hand written declaration files are removed as `@casl/aurelia` has been completely rewritten to TypeScript.

# [@casl/aurelia-v0.5.0](https://github.com/stalniy/casl/compare/@casl/aurelia@0.4.1...@casl/aurelia@0.5.0) (2019-02-10)


### Bug Fixes

* **packages:** increases peerDependency of [@casl](https://github.com/casl)/ability ([9f6a7b8](https://github.com/stalniy/casl/commit/9f6a7b8)), closes [#119](https://github.com/stalniy/casl/issues/119)
* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


<a name="@casl/aurelia-v0.4.1"></a>
# [@casl/aurelia-v0.4.1](https://github.com/stalniy/casl/compare/@casl/aurelia@0.4.0...@casl/aurelia@0.4.1) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="@casl/aurelia-v0.4.0"></a>
# [@casl/aurelia-v0.4.0](https://github.com/stalniy/casl/compare/@casl/aurelia@0.3.0...@casl/aurelia@0.4.0) (2018-07-02)


### Features

* **aurelia:** upgrades to the latest version of aurelia ([8833993](https://github.com/stalniy/casl/commit/8833993))

<a name="0.3.0"></a>
# 0.3.0 (2018-05-14)


### Features

* **aurelia:** support for per field abilities ([1ca5051](https://github.com/stalniy/casl/commit/1ca5051))



<a name="0.2.0"></a>
# 0.2.0 (2018-04-26)


### Bug Fixes

* **aurelia:** fixes tests in aurelia to properly check ability rules for emptiness ([42e2ddb](https://github.com/stalniy/casl/commit/42e2ddb))


### Features

* **aurelia:** adds typings ([525d037](https://github.com/stalniy/casl/commit/525d037)), closes [#38](https://github.com/stalniy/casl/issues/38)


<a name="0.1.0"></a>
# 0.1.0 (2018-03-23)

### Features

* **aurelia:** adds package for Aurelia, closes [#26](https://github.com/stalniy/casl/issues/26)
