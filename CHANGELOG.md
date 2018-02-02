# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.1.0"></a>
# [1.1.0](https://github.com/stalniy/casl/compare/v1.0.6...v1.1.0) (2018-02-02)


### Bug Fixes

* **ability:** adds check when action is aliased to itself ([facbe10](https://github.com/stalniy/casl/commit/facbe10))


### Features

* **ability:** adds `on` method and trigger `update` event in `update` method ([a3af0ed](https://github.com/stalniy/casl/commit/a3af0ed))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/stalniy/casl/compare/v1.0.5...v1.0.6) (2017-12-19)


### Bug Fixes

* **ts:** fixes return type of mongo related functions ([67e02bc](https://github.com/stalniy/casl/commit/67e02bc))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/stalniy/casl/compare/v1.0.4...v1.0.5) (2017-12-19)


### Bug Fixes

* **ts:** adds conditions to typescript definitions ([a345da7](https://github.com/stalniy/casl/commit/a345da7))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/stalniy/casl/compare/v1.0.3...v1.0.4) (2017-12-18)

### Bug Fixes

* **ability:** properly checks inverted rules when subject type is passed as string ([e6f69e8](https://github.com/stalniy/casl/commit/e6f69e8))


<a name="1.0.2"></a>
## [1.0.2](https://github.com/stalniy/casl/compare/v1.0.1...v1.0.2) (2017-08-02)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/stalniy/casl/compare/v1.0.0...v1.0.1) (2017-08-02)


### Bug Fixes

* **ability:** passes original subject into `rulesFor` instead of parsed one ([0496053](https://github.com/stalniy/casl/commit/0496053))


### Features

* **typescript:** adds d.ts file ([9e73719](https://github.com/stalniy/casl/commit/9e73719)), closes [#7](https://github.com/stalniy/casl/issues/7)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/stalniy/casl/compare/v0.3.4...v1.0.0) (2017-07-28)


### Documentation

* adds all required documentation and examples of integration for v1



<a name="0.3.4"></a>
## [0.3.4](https://github.com/stalniy/casl/compare/v0.3.0...v0.3.4) (2017-07-24)


### Bug Fixes

* **mongoose:** adds proper modelName detection for mongoose query ([0508400](https://github.com/stalniy/casl/commit/0508400))
* **query:** fixes detection of forbidden query ([7712eb2](https://github.com/stalniy/casl/commit/7712eb2))
* **query:** makes query to be empty if there is at least one rule without conditions ([d82c3fc](https://github.com/stalniy/casl/commit/d82c3fc))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/stalniy/casl/compare/v0.2.4...v0.3.0) (2017-07-24)


### Features

* **ability:** adds support for $regex condition ([fc438a1](https://github.com/stalniy/casl/commit/fc438a1))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/stalniy/casl/compare/v0.2.1...v0.2.4) (2017-07-24)


### Bug Fixes

* **error:** fixes ForbiddenError instanceof checks in umd build ([e0a910c](https://github.com/stalniy/casl/commit/e0a910c))


<a name="0.2.1"></a>
## [0.2.1](https://github.com/stalniy/casl/compare/v0.2.0...v0.2.1) (2017-07-20)



<a name="0.2.0"></a>
# 0.2.0 (2017-07-18)


### Features

* **casl:** first release ([8694688](https://github.com/stalniy/casl/commit/8694688))
