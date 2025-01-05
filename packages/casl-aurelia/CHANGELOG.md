# Change Log

All notable changes to this project will be documented in this file.

## [1.3.1](https://github.com/stalniy/casl/compare/@casl/aurelia@1.3.0...@casl/aurelia@1.3.1) (2025-01-05)

# [1.3.0](https://github.com/stalniy/casl/compare/@casl/aurelia@1.2.1...@casl/aurelia@1.3.0) (2022-08-28)


### Features

* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)

## [1.2.1](https://github.com/stalniy/casl/compare/@casl/aurelia@1.2.0...@casl/aurelia@1.2.1) (2022-07-25)


### Bug Fixes

* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))

# [1.2.0](https://github.com/stalniy/casl/compare/@casl/aurelia@1.1.1...@casl/aurelia@1.2.0) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))


# [1.2.0](https://github.com/stalniy/casl/compare/@casl/aurelia@1.1.1...@casl/aurelia@1.2.0) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))


### Features

* **angular:** updates angular to v11 ([#421](https://github.com/stalniy/casl/issues/421)) ([ec16bf9](https://github.com/stalniy/casl/commit/ec16bf9e93536c4ec249d2520cf336c1497615a9))
* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6)), closes [#161](https://github.com/stalniy/casl/issues/161) [#161](https://github.com/stalniy/casl/issues/161)

## [1.1.1](https://github.com/stalniy/casl/compare/@casl/aurelia@1.1.0...@casl/aurelia@1.1.1) (2020-12-28)


### Bug Fixes

* **dist:** adds separate `tsconfig.build.json` to every completementary project ([87742ce](https://github.com/stalniy/casl/commit/87742cec518a8a68d5fc29be2bbc9561cbc7da6c)), closes [#419](https://github.com/stalniy/casl/issues/419)

# [1.1.0](https://github.com/stalniy/casl/compare/@casl/aurelia@1.0.4...@casl/aurelia@1.1.0) (2020-12-26)


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

## [1.0.4](https://github.com/stalniy/casl/compare/@casl/aurelia@1.0.3...@casl/aurelia@1.0.4) (2020-06-09)


### Bug Fixes

* **docs:** ensure README and docs for all packages are in sync ([8df3684](https://github.com/stalniy/casl/commit/8df3684b139de0af60c9c37f284a5028ffbf2224)), closes [#338](https://github.com/stalniy/casl/issues/338)

## [1.0.3](https://github.com/stalniy/casl/compare/@casl/aurelia@1.0.2...@casl/aurelia@1.0.3) (2020-04-10)


### Bug Fixes

* **aurelia:** ensure that terser doesn't mangle reserved required props ([a82dfd5](https://github.com/stalniy/casl/commit/a82dfd55b6acd3912f2668776388c1af5f936e32))
* **packages:** makes eventual lib size to be smaller ([93a3bec](https://github.com/stalniy/casl/commit/93a3becdde7672bc1362ce11dac0d8247e583b9d)), closes [#287](https://github.com/stalniy/casl/issues/287)

## [1.0.2](https://github.com/stalniy/casl/compare/@casl/aurelia@1.0.1...@casl/aurelia@1.0.2) (2020-04-09)


### Bug Fixes

* **aurelia:** adds support for casl/ability@4 in package.json ([0d1b6db](https://github.com/stalniy/casl/commit/0d1b6db24c4bbe62d297b987bd0ed9bf8ea8db0d))

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
