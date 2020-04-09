# Change Log

All notable changes to this project will be documented in this file.

# [3.0.0](https://github.com/stalniy/casl/compare/@casl/mongoose@2.3.3...@casl/mongoose@3.0.0) (2020-04-09)


### Bug Fixes

* **mongoose:** ensures mongoose works with MongoQuery conditions ([f92b7df](https://github.com/stalniy/casl/commit/f92b7df532ecca24ee05d02cf9388b21f8d242fa)), closes [#249](https://github.com/stalniy/casl/issues/249)
* **mongoose:** fixes mongoose typings ([d320eba](https://github.com/stalniy/casl/commit/d320eba70c14c7fc6700aba3e38fee062fdd9c3a)), closes [#248](https://github.com/stalniy/casl/issues/248)


### chore

* **aurelia:** replaces .npmignore with package.json files ([812c6b7](https://github.com/stalniy/casl/commit/812c6b7719bafacff3f707b027a30f088e4fc270))


### Features

* **mongoose:** adds generics to mongoose types ([6cdf82e](https://github.com/stalniy/casl/commit/6cdf82ee2f547fdb6c5dcd9cb51cef1c4b4c542d)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **mongoose:** simplifies generics for mongoose ([7ff65f7](https://github.com/stalniy/casl/commit/7ff65f75cf715ca9428dda2fe6e0c91715646979)), closes [#107](https://github.com/stalniy/casl/issues/107)


### BREAKING CHANGES

* **aurelia:** several breaking changes hint

## [2.3.3](https://github.com/stalniy/casl/compare/@casl/mongoose@2.3.2...@casl/mongoose@2.3.3) (2020-03-13)


### Bug Fixes

* **mongoose:** adds missing `index.js` file ([804c0dd](https://github.com/stalniy/casl/commit/804c0dd9aeaa5a0a2753cba0677c8150c362d671))
* **mongoose:** makes sure abilityConditions does not override existing `$and` conditions ([#273](https://github.com/stalniy/casl/issues/273)) ([c13300f](https://github.com/stalniy/casl/commit/c13300f37d218d2c0754133557e3795887c6ef3b)), closes [#272](https://github.com/stalniy/casl/issues/272)

# [@casl/mongoose-v2.3.2](https://github.com/stalniy/casl/compare/@casl/mongoose@2.3.1...@casl/mongoose@2.3.2) (2019-09-14)


### Bug Fixes

* **mongoose:** mock query result on collection level ([1e8c241](https://github.com/stalniy/casl/commit/1e8c241)), closes [#218](https://github.com/stalniy/casl/issues/218)

# [@casl/mongoose-v2.3.1](https://github.com/stalniy/casl/compare/@casl/mongoose@2.3.0...@casl/mongoose@2.3.1) (2019-02-10)


### Bug Fixes

* **packages:** increases peerDependency of [@casl](https://github.com/casl)/ability ([9f6a7b8](https://github.com/stalniy/casl/commit/9f6a7b8)), closes [#119](https://github.com/stalniy/casl/issues/119)

# [@casl/mongoose-v2.3.0](https://github.com/stalniy/casl/compare/@casl/mongoose@2.2.2...@casl/mongoose@2.3.0) (2018-12-28)


### Features

* **mongoose:** wraps resulting query into additional `$and` ([1af1c54](https://github.com/stalniy/casl/commit/1af1c54)), closes [#140](https://github.com/stalniy/casl/issues/140)

# [@casl/mongoose-v2.2.2](https://github.com/stalniy/casl/compare/@casl/mongoose@2.2.1...@casl/mongoose@2.2.2) (2018-11-07)


### Bug Fixes

* **mongoose:** adds optional options as null type ([#127](https://github.com/stalniy/casl/issues/127)) ([ac3c262](https://github.com/stalniy/casl/commit/ac3c262))

# [@casl/mongoose-v2.2.1](https://github.com/stalniy/casl/compare/@casl/mongoose@2.2.0...@casl/mongoose@2.2.1) (2018-10-14)


### Bug Fixes

* **mongoose:** sets the correct `this` for deprecated methods ([488a227](https://github.com/stalniy/casl/commit/488a227)), closes [#116](https://github.com/stalniy/casl/issues/116)

# [@casl/mongoose-v2.2.0](https://github.com/stalniy/casl/compare/@casl/mongoose@2.1.2...@casl/mongoose@2.2.0) (2018-10-10)


### Bug Fixes

* **angular:** adding type definitions for accessibleFields ([#117](https://github.com/stalniy/casl/issues/117)) ([a00c02b](https://github.com/stalniy/casl/commit/a00c02b))
* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


### Features

* **react:can:** updates typescript declarations ([213dcde](https://github.com/stalniy/casl/commit/213dcde))

<a name="@casl/mongoose-v2.1.2"></a>
# [@casl/mongoose-v2.1.2](https://github.com/stalniy/casl/compare/@casl/mongoose@2.1.1...@casl/mongoose@2.1.2) (2018-07-02)


### Bug Fixes

* **mongoose:** `accessibleBy` now doesn't change query type ([da7ed74](https://github.com/stalniy/casl/commit/da7ed74)), closes [#87](https://github.com/stalniy/casl/issues/87)

<a name="2.1.1"></a>
## [2.1.1](https://github.com/stalniy/casl/compare/@casl/mongoose@2.1.0...@casl/mongoose@2.1.1) (2018-05-06)


### Bug Fixes

* **mongoose:** fixes d.ts ([9be9989](https://github.com/stalniy/casl/commit/9be9989)), closes [#57](https://github.com/stalniy/casl/issues/57)




<a name="2.1.0"></a>
# 2.1.0 (2018-04-17)


### Bug Fixes

* **mongoose:** returns empty result set for Query#count ([f89dfb9](https://github.com/stalniy/casl/commit/f89dfb9)), closes [#52](https://github.com/stalniy/casl/issues/52)
* **typescript:** fixes typings ([d5fc51c](https://github.com/stalniy/casl/commit/d5fc51c)), relates to [#18](https://github.com/stalniy/casl/issues/18)


### Features

* **mongoose:** adds `permittedFieldsBy` to [@casl](https://github.com/casl)/mongoose ([17bcf9e](https://github.com/stalniy/casl/commit/17bcf9e)), closes [#49](https://github.com/stalniy/casl/issues/49)


<a name="2.0.2"></a>
## 2.0.2 (2018-04-16)


### Bug Fixes

* **mongoose:** returns empty result set for Query#count ([f89dfb9](https://github.com/stalniy/casl/commit/f89dfb9)), closes [#52](https://github.com/stalniy/casl/issues/52)
* **typescript:** updates d.ts files ([d5fc51c](https://github.com/stalniy/casl/commit/d5fc51c)), closes [#18](https://github.com/stalniy/casl/issues/18)


<a name="2.0.1"></a>
# 2.0.1 (2018-03-23)


### Features

* **package:** adds mongoose plugin
* **package:** adds MongoDB query builder
