# Change Log

All notable changes to this project will be documented in this file.

# [4.0.0](https://github.com/stalniy/casl/compare/@casl/angular@3.0.6...@casl/angular@4.0.0) (2020-04-09)


### Bug Fixes

* **angular:** makes sure reflect polyfill is added before angular imports ([2acbb35](https://github.com/stalniy/casl/commit/2acbb35cc179275e23f3d83dd27ef8d5a3ef1099)), closes [#248](https://github.com/stalniy/casl/issues/248)


### chore

* **angular:** special commit for breaking changes ([077bcab](https://github.com/stalniy/casl/commit/077bcab8e080102b727ca697a06a8731120634fc))


### Features

* **ability:** improves typing for GetSubjectName and adds default values for generics ([c089293](https://github.com/stalniy/casl/commit/c08929301a1b06880c054cbb2f21cda3725028a4)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **angular:** adds generics to CanPipe ([68bd287](https://github.com/stalniy/casl/commit/68bd287e7af165b82bbf8076ea88e83b51754a31)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **angular:** adds support for action only checks ([0462edb](https://github.com/stalniy/casl/commit/0462edb854ba4094e735287744404ea2d378defb)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **angular:** allows to use custom `Ability` instances and improves tree shaking support ([2e7a149](https://github.com/stalniy/casl/commit/2e7a1498c27d0c542e9f6507ba9b5195ae3a1da8)), closes [#249](https://github.com/stalniy/casl/issues/249)
* **vue:** adds better generics typying for Vue ([5cc7b60](https://github.com/stalniy/casl/commit/5cc7b60d8a2a53db217f8ad1a4673a28f67aefce)), closes [#107](https://github.com/stalniy/casl/issues/107)


### BREAKING CHANGES

* **angular:** the module doesn't provide `Ability` instance anymore

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
