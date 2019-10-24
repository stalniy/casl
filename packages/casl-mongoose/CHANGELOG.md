# Change Log

All notable changes to this project will be documented in this file.

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
