# Change Log

All notable changes to this project will be documented in this file.

## [9.0.3](https://github.com/stalniy/casl/compare/@casl/angular@9.0.2...@casl/angular@9.0.3) (2025-01-08)

## [9.0.2](https://github.com/stalniy/casl/compare/@casl/angular@9.0.1...@casl/angular@9.0.2) (2025-01-05)

# 9.0.0 (https://github.com/stalniy/casl/compare/@casl/angular@8.2.8...@casl/angular@9.0.0) (2025-01-05)

### Features

* adds `AbilityServiceSignal` and converted pipes to standalone pipes (ead48e7 (https://github.com/stalniy/casl/commit/ead48e7d2912a80914347323f3abb9099565b194))

### BREAKING CHANGES

* `AbilityModule` has been removed, pipes are now standalone and must be imported separately. Both `AbilityService` and `AbilityServiceSignal` are provided in root now


## [8.2.8](https://github.com/stalniy/casl/compare/@casl/angular@8.2.7...@casl/angular@8.2.8) (2024-08-23)

## [8.2.7](https://github.com/stalniy/casl/compare/@casl/angular@8.2.6...@casl/angular@8.2.7) (2024-07-16)


### Bug Fixes

* **deps:** update dependency typescript to ~5.5.0 ([ef11301](https://github.com/stalniy/casl/commit/ef113010e37cf8311b70c549e1fd648ca19de579))

## [8.2.6](https://github.com/stalniy/casl/compare/@casl/angular@8.2.5...@casl/angular@8.2.6) (2024-07-14)


### Bug Fixes

* debug auto release, again ([#943](https://github.com/stalniy/casl/issues/943)) ([ba1c9a0](https://github.com/stalniy/casl/commit/ba1c9a01d7b66fb691cfa88125542cd752aadfd0))

## [8.2.5](https://github.com/stalniy/casl/compare/@casl/angular@8.2.4...@casl/angular@8.2.5) (2024-07-14)


### Bug Fixes

* debug auto releasing ([#942](https://github.com/stalniy/casl/issues/942)) ([6c7ca22](https://github.com/stalniy/casl/commit/6c7ca22a89a6436b618bbe7caf674a206d047acd))

## [8.2.4](https://github.com/stalniy/casl/compare/@casl/angular@8.2.3...@casl/angular@8.2.4) (2024-07-14)


### Bug Fixes

* debug release ([#939](https://github.com/stalniy/casl/issues/939)) ([80eeb6b](https://github.com/stalniy/casl/commit/80eeb6b0fb541f3266951603aaa550d776f9cf28))
* **deps:** update dependency typescript to ~5.3.0 ([0ec328c](https://github.com/stalniy/casl/commit/0ec328cc1c291eafa932e135234af681650e9f6f))
* **deps:** update dependency typescript to ~5.4.0 ([1092376](https://github.com/stalniy/casl/commit/10923766d5b2992744f304936e9e8ab9e17ecdf9))

## [8.2.3](https://github.com/stalniy/casl/compare/@casl/angular@8.2.2...@casl/angular@8.2.3) (2023-11-21)


### Bug Fixes

* changes comment to trigger release ([#855](https://github.com/stalniy/casl/issues/855)) ([f13103b](https://github.com/stalniy/casl/commit/f13103b45729264a435b6c00a7352971a15ece73))
* ensure pre-post scripts are enabled for pnpm ([#853](https://github.com/stalniy/casl/issues/853)) ([fa23801](https://github.com/stalniy/casl/commit/fa23801e81773b6c8f3393aa6340ce8a324b12dd))

## [8.2.2](https://github.com/stalniy/casl/compare/@casl/angular@8.2.1...@casl/angular@8.2.2) (2023-11-21)

## [8.2.1](https://github.com/stalniy/casl/compare/@casl/angular@8.2.0...@casl/angular@8.2.1) (2023-07-20)

# [8.2.0](https://github.com/stalniy/casl/compare/@casl/angular@8.1.0...@casl/angular@8.2.0) (2022-12-17)


### Features

* update angular to v15 ([#704](https://github.com/stalniy/casl/issues/704)) ([4f4b713](https://github.com/stalniy/casl/commit/4f4b7135942aba0b8908a0aeadc9d101678faafb))

# [8.1.0](https://github.com/stalniy/casl/compare/@casl/angular@8.0.0...@casl/angular@8.1.0) (2022-08-28)


### Features

* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)

# [8.0.0](https://github.com/stalniy/casl/compare/@casl/angular@7.1.0...@casl/angular@8.0.0) (2022-08-20)


### chore

* **deps:** update angular monorepo to v14 (major)  ([#663](https://github.com/stalniy/casl/issues/663)) ([e556f14](https://github.com/stalniy/casl/commit/e556f144229a0e6fea1eaba7556a9e3db910aabb))


### BREAKING CHANGES

* **deps:** drop support for angular@13, moving to Ivy only!

# [7.1.0](https://github.com/stalniy/casl/compare/@casl/angular@7.0.1...@casl/angular@7.1.0) (2022-08-20)


### Features

* **angular:** implements services that provides Ability as an Observable ([5a139b2](https://github.com/stalniy/casl/commit/5a139b2f1bb694308c7afb46ad7be6e7cb719f19))

## [7.0.1](https://github.com/stalniy/casl/compare/@casl/angular@7.0.0...@casl/angular@7.0.1) (2022-07-25)

# [7.0.0](https://git-stalniy/stalniy/casl/compare/@casl/angular@6.0.0...@casl/angular@7.0.0) (2022-06-16)


### Bug Fixes

* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://git-stalniy/stalniy/casl/issues/560)) ([0ef534c](https://git-stalniy/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))


### Features

* Angular 13 support ([#632](https://git-stalniy/stalniy/casl/issues/632)) ([6b86fd9](https://git-stalniy/stalniy/casl/commit/6b86fd9e7a3bdd6bd40fea032372a826cd72c0fe))


### BREAKING CHANGES

* drops support for angular < 13

# [6.0.0](https://github.com/stalniy/casl/compare/@casl/angular@5.1.2...@casl/angular@6.0.0) (2021-05-31)


### Code Refactoring

* **angular:** removes deprecated CanPipe and stick to Ivy compiler ([82b61f5](https://github.com/stalniy/casl/commit/82b61f5e46dc3c031aef42ae499eca25f2698fdb))


### BREAKING CHANGES

* **angular:** there are few important changes:

  * deprecated `CanPipe` was removed, use `AblePipe` instead
  * library is compiled by Ivy and no longer support ViewEngine

## [5.1.2](https://github.com/stalniy/casl/compare/@casl/angular@5.1.1...@casl/angular@5.1.2) (2021-05-31)


### chore

* **deps:** updates angular to v12 ([#516](https://github.com/stalniy/casl/issues/516)) ([ff4212c](https://github.com/stalniy/casl/commit/ff4212c7f32f1fbc8a73e6b3a6615af65991e39a)), closes [#514](https://github.com/stalniy/casl/issues/514) [#512](https://github.com/stalniy/casl/issues/512)


### BREAKING CHANGES

* **deps:** there are 2 important changes:

  * deprecated CanPipe was removed, use AblePipe instead
  * library is compiled by Ivy and no longer support ViewEngine

## [5.1.1](https://github.com/stalniy/casl/compare/@casl/angular@5.1.0...@casl/angular@5.1.1) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))

# [5.1.0](https://github.com/stalniy/casl/compare/@casl/angular@5.0.2...@casl/angular@5.1.0) (2021-01-14)


### Features

* **angular:** updates angular to v11 ([#421](https://github.com/stalniy/casl/issues/421)) ([ec16bf9](https://github.com/stalniy/casl/commit/ec16bf9e93536c4ec249d2520cf336c1497615a9))

## [5.0.2](https://github.com/stalniy/casl/compare/@casl/angular@5.0.1...@casl/angular@5.0.2) (2021-01-10)


### Bug Fixes

* **angular:** changes ES6M distribution to use `.js` ext instead of `.mjs` ([06bd5be](https://github.com/stalniy/casl/commit/06bd5be0904b3194733c9f6fc3a3dd34cc069aba)), closes [#427](https://github.com/stalniy/casl/issues/427)

## [5.0.1](https://github.com/stalniy/casl/compare/@casl/angular@5.0.0...@casl/angular@5.0.1) (2020-12-28)


### Bug Fixes

* **dist:** adds separate `tsconfig.build.json` to every completementary project ([87742ce](https://github.com/stalniy/casl/commit/87742cec518a8a68d5fc29be2bbc9561cbc7da6c)), closes [#419](https://github.com/stalniy/casl/issues/419)

# [5.0.0](https://github.com/stalniy/casl/compare/@casl/angular@4.1.6...@casl/angular@5.0.0) (2020-12-26)


### Bug Fixes

* **package:** removes `engine` section that points to npm@6 ([eecd12a](https://github.com/stalniy/casl/commit/eecd12ac49f56d6a0f57d1a57fb37487335b5f03)), closes [#417](https://github.com/stalniy/casl/issues/417)


### Code Refactoring

* **angular:** removes support for Angular < 9.x and casl < 3.x ([3530cdf](https://github.com/stalniy/casl/commit/3530cdf5b73d19b9a6da9be675f292f67e44db32))


### Features

* **builder:** improves typings for AbilityBuilder [skip release] ([ebd4d17](https://github.com/stalniy/casl/commit/ebd4d17a355a2646467033118a3d6efee4321d27)), closes [#379](https://github.com/stalniy/casl/issues/379)
* **esm:** adds ESM support for latest Node.js through `exports` prop in package.json ([cac2506](https://github.com/stalniy/casl/commit/cac2506a80c18f194210c2d89108d1d094751fa4)), closes [#331](https://github.com/stalniy/casl/issues/331)


### BREAKING CHANGES

* **angular:** removes support for Angular < 9.x and casl < 3.x
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

## [4.1.6](https://github.com/stalniy/casl/compare/@casl/angular@4.1.5...@casl/angular@4.1.6) (2020-10-21)


### Bug Fixes

* **README:** adds semi-colon ([cad1daa](https://github.com/stalniy/casl/commit/cad1daaabf8a7ad45d5736394d3ba3dc42207614))

## [4.1.5](https://github.com/stalniy/casl/compare/@casl/angular@4.1.4...@casl/angular@4.1.5) (2020-09-03)


### Bug Fixes

* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)

## [4.1.4](https://github.com/stalniy/casl/compare/@casl/angular@4.1.3...@casl/angular@4.1.4) (2020-06-09)


### Bug Fixes

* **docs:** ensure README and docs for all packages are in sync ([8df3684](https://github.com/stalniy/casl/commit/8df3684b139de0af60c9c37f284a5028ffbf2224)), closes [#338](https://github.com/stalniy/casl/issues/338)

## [4.1.3](https://github.com/stalniy/casl/compare/@casl/angular@4.1.2...@casl/angular@4.1.3) (2020-06-08)


### Bug Fixes

* **package:** makes sure the latest casl works with Angular 8.x ([91ee505](https://github.com/stalniy/casl/commit/91ee505f25b77c7ddf13a066d9d0c22f6d8d2f99)), closes [#337](https://github.com/stalniy/casl/issues/337)

## [4.1.2](https://github.com/stalniy/casl/compare/@casl/angular@4.1.1...@casl/angular@4.1.2) (2020-06-02)


### Bug Fixes

* **angular:** widen peer dependency for @angular/core ([aa2c3c4](https://github.com/stalniy/casl/commit/aa2c3c4e5a1e3cf14cebc83125571d3ab15c1451))

## [4.1.1](https://github.com/stalniy/casl/compare/@casl/angular@4.1.0...@casl/angular@4.1.1) (2020-05-19)


### Bug Fixes

* **angular:** updates README for the latest release ([1103dec](https://github.com/stalniy/casl/commit/1103dec36b331a67944a5a9b9554daaeabc2b5bf)), closes [#276](https://github.com/stalniy/casl/issues/276)

# [4.1.0](https://github.com/stalniy/casl/compare/@casl/angular@4.0.4...@casl/angular@4.1.0) (2020-05-19)


### Features

* **pipe:** adds pure `ablePure` pipe in `@casl/angular` ([23c851c](https://github.com/stalniy/casl/commit/23c851cb0fc4a9cb523a651308f8ad65e137b379)), closes [#276](https://github.com/stalniy/casl/issues/276)

## [4.0.4](https://github.com/stalniy/casl/compare/@casl/angular@4.0.3...@casl/angular@4.0.4) (2020-04-14)


### Bug Fixes

* **angular:** removes ngcc `publishOnly` hook ([6e5c570](https://github.com/stalniy/casl/commit/6e5c570b92150e23e4e5c463ed4b497a4860db03))

## [4.0.3](https://github.com/stalniy/casl/compare/@casl/angular@4.0.2...@casl/angular@4.0.3) (2020-04-14)


### Bug Fixes

* **package:** allows to disable minification through `LIB_MINIFY` env var ([de70838](https://github.com/stalniy/casl/commit/de70838a7a6e52ee4af52635f6dd91f3b767bdca))

## [4.0.2](https://github.com/stalniy/casl/compare/@casl/angular@4.0.1...@casl/angular@4.0.2) (2020-04-10)


### Bug Fixes

* **angular:** ensure that terser doesn't mangle reserved required props ([5371166](https://github.com/stalniy/casl/commit/53711660cfd306bd713a9c59abc0b95d5d1d13c1))

## [4.0.1](https://github.com/stalniy/casl/compare/@casl/angular@4.0.0...@casl/angular@4.0.1) (2020-04-09)


### Bug Fixes

* **angular:** adds support for casl/ability@4 in package.json ([9d65071](https://github.com/stalniy/casl/commit/9d65071fb2cd14bfef34e2cff8f7e79c9d595bdb))

# [4.0.0](https://github.com/stalniy/casl/compare/@casl/angular@3.0.6...@casl/angular@4.0.0) (2020-04-09)


### Features

* **ability:** improves typing for `GetSubjectName` and adds default values for generics ([c089293](https://github.com/stalniy/casl/commit/c08929301a1b06880c054cbb2f21cda3725028a4)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **angular:** adds generics to `CanPipe` ([68bd287](https://github.com/stalniy/casl/commit/68bd287e7af165b82bbf8076ea88e83b51754a31)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **angular:** adds support for action only checks ([0462edb](https://github.com/stalniy/casl/commit/0462edb854ba4094e735287744404ea2d378defb)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **angular:** allows to use custom `Ability` instances and improves tree shaking support ([2e7a149](https://github.com/stalniy/casl/commit/2e7a1498c27d0c542e9f6507ba9b5195ae3a1da8)), closes [#249](https://github.com/stalniy/casl/issues/249)


### BREAKING CHANGES

* **angular:** the module doesn't provide `Ability` instance anymore thus it doesn't need `forRoot` static method anymore

  Before

  ```js
  import { NgModule } from '@angular/core';
  import { AbilityModule } from '@casl/angular';

  @NgModule({
    imports: [
      // other modules
      AbilityModule.forRoot()
    ],
    // other properties
  })
  export class AppModule {}
  ```

  After

  ```js
  import { NgModule } from '@angular/core';
  import { AbilityModule } from '@casl/angular';
  import { Ability, PureAbility } from '@casl/ability';

  @NgModule({
    imports: [
      // other modules
      AbilityModule
    ],
    providers: [
      { provide: Ability, useValue: new Ability() },
      { provide: PureAbility, useExisting: Ability }
    ]
    // other properties
  })
  export class AppModule {}
  ```

  See docs of `@casl/angular` for details

* **pipe:** `CanPipe` is deprecated in favor of `AblePipe`

  Before

  ```html
  <div *ngIf="'Post' | can: 'read'">hidden content</div>
  ```

  After

  ```html
  <div *ngIf="'read' | able: 'Post'">hidden content</div>
  ```

## [3.0.6](https://github.com/stalniy/casl/compare/@casl/angular@3.0.5...@casl/angular@3.0.6) (2020-03-06)


### Bug Fixes

* **angular:** reverts back anngular to not use Ivy as it was not recommend by angular team ([b883118](https://github.com/stalniy/casl/commit/b8831184f4bbfc3924e95f1fd4f2861d88b43fdf)), closes [#270](https://github.com/stalniy/casl/issues/270)

## [3.0.5](https://github.com/stalniy/casl/compare/@casl/angular@3.0.4...@casl/angular@3.0.5) (2020-02-21)


### Bug Fixes

* **angular:** moves postinstall hook to postbootstrap hook which links modules ([769e099](https://github.com/stalniy/casl/commit/769e099902eca821e17d4f6a3e5a44fd29191915)), closes [#266](https://github.com/stalniy/casl/issues/266)

## [3.0.4](https://github.com/stalniy/casl/compare/@casl/angular@3.0.3...@casl/angular@3.0.4) (2020-02-21)


### Bug Fixes

* **angular:** adds postinstall script into npm package ([c753d44](https://github.com/stalniy/casl/commit/c753d446532a994766860631939f8000b69f06ae)), closes [#266](https://github.com/stalniy/casl/issues/266)

## [3.0.3](https://github.com/stalniy/casl/compare/@casl/angular@3.0.2...@casl/angular@3.0.3) (2020-02-21)


### Bug Fixes

* **angular:** reverts back prerelease hook ([1fc60c2](https://github.com/stalniy/casl/commit/1fc60c248d7e837fae39eb760cb308a73959b59d)), closes [#266](https://github.com/stalniy/casl/issues/266)

## [3.0.2](https://github.com/stalniy/casl/compare/@casl/angular@3.0.1...@casl/angular@3.0.2) (2020-02-20)


### Bug Fixes

* **angular:** adds missing file exists utility ([732e253](https://github.com/stalniy/casl/commit/732e253f65801631a3128fc92e2514bdb6f79987)), closes [#266](https://github.com/stalniy/casl/issues/266)

## [3.0.1](https://github.com/stalniy/casl/compare/@casl/angular@3.0.0...@casl/angular@3.0.1) (2020-02-20)


### Bug Fixes

* **angular:** ensures postinstall script uses node to check whether file exists ([eba8ef4](https://github.com/stalniy/casl/commit/eba8ef460dec655783204819fbb0e0721c34db13))

# [3.0.0](https://github.com/stalniy/casl/compare/@casl/angular@2.2.0...@casl/angular@3.0.0) (2020-02-17)


### Bug Fixes

* **angular:** ensure postinstall hook is executed only during local dev ([a47bac8](https://github.com/stalniy/casl/commit/a47bac8f60c544b90be476ae73a17e0ddfdc479c))


### BREAKING CHANGES

* **angular:** upgrades angular to v9

# [2.2.0](https://github.com/stalniy/casl/compare/@casl/angular@2.1.1...@casl/angular@2.2.0) (2020-02-17)

**Deprecated because of invalid package.json peerDependencies and postinstall hook**

### Features

* **angular:** upgrades angular to v9 ([#260](https://github.com/stalniy/casl/issues/260)) ([3452636](https://github.com/stalniy/casl/commit/34526360ddd3c03605127223823c3beadc6fff84)), closes [#265](https://github.com/stalniy/casl/issues/265)

# [@casl/angular-v2.1.1](https://github.com/stalniy/casl/compare/@casl/angular@2.1.0...@casl/angular@2.1.1) (2019-12-09)


### Performance Improvements

* **angular:** makes casl-angular much smaller by utilizing tslib.es6 ([093cefa](https://github.com/stalniy/casl/commit/093cefa2e26aa4b2cd9e733b0e77aaff1664dbcf))

# [@casl/angular-v2.1.0](https://github.com/stalniy/casl/compare/@casl/angular@2.0.0...@casl/angular@2.1.0) (2019-07-01)


### Features

* **angular:** upgrades Angular and typescript ([08591f4](https://github.com/stalniy/casl/commit/08591f4)), closes [#158](https://github.com/stalniy/casl/issues/158) [#195](https://github.com/stalniy/casl/issues/195)

# [@casl/angular-v2.0.0](https://github.com/stalniy/casl/compare/@casl/angular@1.0.0...@casl/angular@2.0.0) (2019-02-10)


### Bug Fixes

* **packages:** increases peerDependency of [@casl](https://github.com/casl)/ability ([9f6a7b8](https://github.com/stalniy/casl/commit/9f6a7b8)), closes [#119](https://github.com/stalniy/casl/issues/119)


### Features

* **ability:** adds support for `manage` action ([d9ab56c](https://github.com/stalniy/casl/commit/d9ab56c)), closes [#119](https://github.com/stalniy/casl/issues/119)


### BREAKING CHANGES

* **ability:** `manage` is not anymore an alias for CRUD but represents any action.

Let's consider the next example:

```js
const ability = AbilityBuilder.define((can) => {
  can('manage', 'Post')
  can('read', 'User')
})
```

In @casl/ability@2.x the definition above produces the next results:

```js
ability.can('read', 'Post') // true
ability.can('publish', 'Post') // false, because `manage` is an alias for CRUD
```

In @casl/ability@3.x the results:

```js
ability.can('read', 'Post') // true
ability.can('publish', 'Post') // true, because `manage` represents any action
```

To migrate the code, just replace `manage` with `crud` and everything will work as previously.

# [@casl/angular-v1.0.0](https://github.com/stalniy/casl/compare/@casl/angular@0.4.1...@casl/angular@1.0.0) (2018-12-02)


### Bug Fixes

* **angular:** adds possibility to use angular module in lazy loaded routes ([0c7c3c1](https://github.com/stalniy/casl/commit/0c7c3c1))


### BREAKING CHANGES

* **angular:** Fixes #131

# [@casl/angular-v0.4.1](https://github.com/stalniy/casl/compare/@casl/angular@0.4.0...@casl/angular@0.4.1) (2018-11-11)


### Bug Fixes

* **angular:** makes `field` to be optional argument ([a3eec63](https://github.com/stalniy/casl/commit/a3eec63)), closes [#126](https://github.com/stalniy/casl/issues/126)

# [@casl/angular-v0.4.0](https://github.com/stalniy/casl/compare/@casl/angular@0.3.1...@casl/angular@0.4.0) (2018-11-11)


### Bug Fixes

* **angular:** converts source to typescript ([565936d](https://github.com/stalniy/casl/commit/565936d)), closes [#126](https://github.com/stalniy/casl/issues/126)
* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)
* **semantic-release:** test ([cab3f4b](https://github.com/stalniy/casl/commit/cab3f4b)), closes [#94](https://github.com/stalniy/casl/issues/94)


### Features

* **react:can:** updates typescript declarations ([213dcde](https://github.com/stalniy/casl/commit/213dcde))

<a name="@casl/angular-v0.3.1"></a>
# [@casl/angular-v0.3.1](https://github.com/stalniy/casl/compare/@casl/angular@0.3.0...@casl/angular@0.3.1) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="0.3.0"></a>
# 0.3.0 (2018-05-14)


### Features

* **angular:** supports per field abilities ([8268bb4](https://github.com/stalniy/casl/commit/8268bb4))



<a name="0.2.0"></a>
# 0.2.0 (2018-04-26)


### Features

* **angular:** adds typings ([98644ba](https://github.com/stalniy/casl/commit/98644ba)), closes [#38](https://github.com/stalniy/casl/issues/38)


<a name="0.1.0"></a>
# 0.1.0 (2018-03-23)


### Features

* **angular:** adds angular integration and tests, closes [#24](https://github.com/stalniy/casl/issues/24)
