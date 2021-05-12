# Change Log

All notable changes to this project will be documented in this file.

# [2.3.0](https://github.com/stalniy/casl/compare/@casl/react@2.2.2...@casl/react@2.3.0) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))


### Features

* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6)), closes [#161](https://github.com/stalniy/casl/issues/161) [#161](https://github.com/stalniy/casl/issues/161)

## [2.2.2](https://github.com/stalniy/casl/compare/@casl/react@2.2.1...@casl/react@2.2.2) (2021-01-14)


### Features

* **react:** updates react to v17

## [2.2.1](https://github.com/stalniy/casl/compare/@casl/react@2.2.0...@casl/react@2.2.1) (2020-12-28)


### Bug Fixes

* **dist:** adds separate `tsconfig.build.json` to every completementary project ([87742ce](https://github.com/stalniy/casl/commit/87742cec518a8a68d5fc29be2bbc9561cbc7da6c)), closes [#419](https://github.com/stalniy/casl/issues/419)

# [2.2.0](https://github.com/stalniy/casl/compare/@casl/react@2.1.1...@casl/react@2.2.0) (2020-12-26)


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

## [2.1.1](https://github.com/stalniy/casl/compare/@casl/react@2.1.0...@casl/react@2.1.1) (2020-06-09)


### Bug Fixes

* **docs:** ensure README and docs for all packages are in sync ([8df3684](https://github.com/stalniy/casl/commit/8df3684b139de0af60c9c37f284a5028ffbf2224)), closes [#338](https://github.com/stalniy/casl/issues/338)

# [2.1.0](https://github.com/stalniy/casl/compare/@casl/react@2.0.2...@casl/react@2.1.0) (2020-04-18)


### Features

* **react:** adds `useAbility` hook ([#292](https://github.com/stalniy/casl/issues/292)) ([cd81a22](https://github.com/stalniy/casl/commit/cd81a224b4d44b036ecf5e53601e34d7a51e7be3)), closes [#291](https://github.com/stalniy/casl/issues/291)

## [2.0.2](https://github.com/stalniy/casl/compare/@casl/react@2.0.1...@casl/react@2.0.2) (2020-04-10)


### Bug Fixes

* **react:** ensure that terser doesn't mangle reserved required props ([08eb4f4](https://github.com/stalniy/casl/commit/08eb4f4f730f1b453b3a026d5e0e0ca4ff24be10))

## [2.0.1](https://github.com/stalniy/casl/compare/@casl/react@2.0.0...@casl/react@2.0.1) (2020-04-09)


### Bug Fixes

* **react:** adds support for casl/ability@4 in package.json ([4367b43](https://github.com/stalniy/casl/commit/4367b430fcfd2076292607581df4aa0d247e011b))

# [2.0.0](https://github.com/stalniy/casl/compare/@casl/react@1.0.4...@casl/react@2.0.0) (2020-04-09)


### Bug Fixes

* **react:** makes sure `Can` infers types for props from provided `Ability` ([5813b25](https://github.com/stalniy/casl/commit/5813b25d286af6ff76bec6c266fe21af817fe45b)), closes [#248](https://github.com/stalniy/casl/issues/248)


### Features

* **react:** adds generics for Ability and related components [skip ci] ([3102b6e](https://github.com/stalniy/casl/commit/3102b6e639213553570cf97661b7b7f4c3640687)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **react:** adds support for action only components ([a2db577](https://github.com/stalniy/casl/commit/a2db577910763ecc0b5eca3196bdc22fc8ff3dba)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **vue:** adds better generics typying for Vue ([5cc7b60](https://github.com/stalniy/casl/commit/5cc7b60d8a2a53db217f8ad1a4673a28f67aefce)), closes [#107](https://github.com/stalniy/casl/issues/107)


### BREAKING CHANGES

* **react:** support for react v15 was loosen. If you use react v15 you will need to add `@casl/react/contextApiPatch.d.ts` file into your typings
* **typescript:** weak hand written declaration files are removed as `@casl/react` has been completely rewritten to TypeScript. TypeScript now checks that you correctly use property aliases
* **Can:** `of` alias is removed and field was extracted to a separate prop

  **Before**

  ```jsx
  export default <Can I="read title" of="Post">...</Can>
  ```

  **After**

  ```jsx
  export default <Can I="read" a="Post" field="title">...</Can>
  ```


# [@casl/react-v1.0.4](https://github.com/stalniy/casl/compare/@casl/react@1.0.3...@casl/react@1.0.4) (2019-07-28)


### Performance Improvements

* **react:** adds check if children array has length of 1 then render it without React.Fragment ([655d08f](https://github.com/stalniy/casl/commit/655d08f)), closes [#211](https://github.com/stalniy/casl/issues/211)

# [@casl/react-v1.0.3](https://github.com/stalniy/casl/compare/@casl/react@1.0.2...@casl/react@1.0.3) (2019-03-25)


### Bug Fixes

* **react:** handles `an` prop as subject name ([608c99b](https://github.com/stalniy/casl/commit/608c99b)), closes [#169](https://github.com/stalniy/casl/issues/169)

# [@casl/react-v1.0.2](https://github.com/stalniy/casl/compare/@casl/react@1.0.1...@casl/react@1.0.2) (2019-02-16)


### Performance Improvements

* **react:** checks whether ability changed before unsubsribing ([d865fa8](https://github.com/stalniy/casl/commit/d865fa8)), closes [#159](https://github.com/stalniy/casl/issues/159)

# [@casl/react-v1.0.1](https://github.com/stalniy/casl/compare/@casl/react@1.0.0...@casl/react@1.0.1) (2019-02-10)


### Bug Fixes

* **packages:** increases peerDependency of [@casl](https://github.com/casl)/ability ([9f6a7b8](https://github.com/stalniy/casl/commit/9f6a7b8)), closes [#119](https://github.com/stalniy/casl/issues/119)

# [@casl/react-v1.0.0](https://github.com/stalniy/casl/compare/@casl/react@0.8.1...@casl/react@1.0.0) (2019-02-03)

### Breaking Changes

* **react:** removes internal state in <Can> component ([#122](https://github.com/stalniy/casl/issues/122)) ([df9dd51](https://github.com/stalniy/casl/commit/df9dd51)), closes [#122](https://github.com/stalniy/casl/issues/122)

# [@casl/react-v0.8.1](https://github.com/stalniy/casl/compare/@casl/react@0.8.0...@casl/react@0.8.1) (2018-11-08)


### Bug Fixes

* **react:** moves this.connectToAbility to the setState callback ([#129](https://github.com/stalniy/casl/issues/129)) ([9d0c839](https://github.com/stalniy/casl/commit/9d0c839)), closes [#128](https://github.com/stalniy/casl/issues/128)

# [@casl/react-v0.8.0](https://github.com/stalniy/casl/compare/@casl/react@0.7.2...@casl/react@0.8.0) (2018-09-03)


### Bug Fixes

* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


### Features

* **react:can:** adds `an` alias to `on` prop ([748ea64](https://github.com/stalniy/casl/commit/748ea64))
* **react:can:** adds `passThrough` option ([045318c](https://github.com/stalniy/casl/commit/045318c)), closes [#105](https://github.com/stalniy/casl/issues/105)
* **react:can:** adds support for multiple <Can> children ([c022b32](https://github.com/stalniy/casl/commit/c022b32))
* **react:can:** updates typescript declarations ([70953ed](https://github.com/stalniy/casl/commit/70953ed))
* **react:can:** updates typescript declarations ([213dcde](https://github.com/stalniy/casl/commit/213dcde))


### Performance Improvements

* **react:can:** moves prop type checks undef `if`, so they can be removed for production builds ([4bebf0b](https://github.com/stalniy/casl/commit/4bebf0b))

# [@casl/react-v0.7.2](https://github.com/stalniy/casl/compare/@casl/react@0.7.1...@casl/react@0.7.2) (2018-07-29)


### Bug Fixes

* **react:** makes `not` prop to be optional ([8f841bf](https://github.com/stalniy/casl/commit/8f841bf)), closes [#95](https://github.com/stalniy/casl/issues/95)

<a name="@casl/react-v0.7.1"></a>
# [@casl/react-v0.7.1](https://github.com/stalniy/casl/compare/@casl/react@0.7.0...@casl/react@0.7.1) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="@casl/react-v0.7.0"></a>
# [@casl/react-v0.7.0](https://github.com/stalniy/casl/compare/@casl/react@0.6.0...@casl/react@0.7.0) (2018-06-15)


### Bug Fixes

* **react:** adds ts defs for `not` attribute ([17f76a9](https://github.com/stalniy/casl/commit/17f76a9))
* **react:** contextual can don't respect 'not' prop ([#74](https://github.com/stalniy/casl/issues/74)) ([d727230](https://github.com/stalniy/casl/commit/d727230))


### Features

* **vue:** adds can component ([42ee540](https://github.com/stalniy/casl/commit/42ee540)), closes [#63](https://github.com/stalniy/casl/issues/63)


<a name="@casl/react-v0.6.0"></a>
# [@casl/react-v0.6.0](https://github.com/stalniy/casl/compare/@casl/react@0.5.0...@casl/react@0.6.0) (2018-05-28)


### Bug Fixes

* **react:** adds `I`, `a`, `of`, `this` aliases in types ([a412868](https://github.com/stalniy/casl/commit/a412868)), closes [#65](https://github.com/stalniy/casl/issues/65)


### Features

* **react:** adds `not` attribute ([94ef6d4](https://github.com/stalniy/casl/commit/94ef6d4)), by @emilbruckner in [#66](https://github.com/stalniy/casl/issues/66)


<a name="0.5.0"></a>
# 0.5.0 (2018-05-14)

### Features

* **react:** support for more readable component ([1a8c1ec](https://github.com/stalniy/casl/commit/1a8c1ec))



<a name="0.4.0"></a>
# 0.4.0 (2018-04-23)


### Bug Fixes

* **react:** rechecks abilities in `Can` on props update ([e08db1e](https://github.com/stalniy/casl/commit/e08db1e)), closes [#55](https://github.com/stalniy/casl/issues/55)


<a name="0.3.0"></a>
# 0.3.0 (2018-04-20)


### Bug Fixes

* **react:** fixes support for React 15.x ([8e17738](https://github.com/stalniy/casl/commit/8e17738))
* **react:** fixes typings for react 15.x & 16.x ([f147a8a](https://github.com/stalniy/casl/commit/f147a8a)), closes [#38](https://github.com/stalniy/casl/issues/38)



<a name="0.2.0"></a>
# 0.2.0 (2018-04-20)


### Features

* **react:** adds typescript definition for package [@casl](https://github.com/casl)/react ([37718fe](https://github.com/stalniy/casl/commit/37718fe)), closes [#54](https://github.com/stalniy/casl/issues/54)


<a name="0.1.0"></a>
# 0.1.0 (2018-03-23)

### Features

* **component:** adds `Can` component, relates to [#23](https://github.com/stalniy/casl/issues/23)
* **integration:** adds `createContextualCan` function which allows to work with new React Context API, relates to [#23](https://github.com/stalniy/casl/issues/23)
* **integration:** adds `createCanBoundTo` function which allows to bind ability to component, relates to [#23](https://github.com/stalniy/casl/issues/23)
