# Changelog

## [3.0.0](https://github.com/stalniy/casl/compare/vue-v2.2.2...vue-v3.0.0) (2025-12-17)


### ⚠ BREAKING CHANGES

* **vue:** ```

### Features

* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)
* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6))


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))
* fixes type for ABILITY_TOKEN in casl-vue ([#879](https://github.com/stalniy/casl/issues/879)) ([886aeb3](https://github.com/stalniy/casl/commit/886aeb3d699466d83185c950abba936e1e7d1d24))
* handles vue props aliases using "undefined" instead of "in" ([#712](https://github.com/stalniy/casl/issues/712)) ([3d85baa](https://github.com/stalniy/casl/commit/3d85baa5d594734cafe79929634f344a123bf905))
* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))
* **vue:** binds ability to $can method ([cbb3c13](https://github.com/stalniy/casl/commit/cbb3c133c3d9583e6fdbc95c068e2e6343befdc9)), closes [#522](https://github.com/stalniy/casl/issues/522)
* **vue:** makes sure Abilities `can` and `cannot` methods are bound ([86f9157](https://github.com/stalniy/casl/commit/86f91570d3e1709449cfded37c153fb21e56c474)), closes [#530](https://github.com/stalniy/casl/issues/530)


### Code Refactoring

* **vue:** adds support for vue 3 ([#444](https://github.com/stalniy/casl/issues/444)) ([e742bcf](https://github.com/stalniy/casl/commit/e742bcf0d187f8283ff171ec9760431759b55910)), closes [#396](https://github.com/stalniy/casl/issues/396)
