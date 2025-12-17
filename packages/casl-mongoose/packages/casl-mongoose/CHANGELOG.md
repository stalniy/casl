# Changelog

## 1.0.0 (2025-12-17)


### ⚠ BREAKING CHANGES

* increased mongoose version to 6.0.13 in order to use 4 generic types in `Model` type
* updates mongoose and related ts types to v6
* **mongoose:** For example, check updated README.md
* **vue:** ```

### Features

* adds accessibleBy and accessibleFieldsBy to casl-mongoose ([#880](https://github.com/stalniy/casl/issues/880)) ([42745d6](https://github.com/stalniy/casl/commit/42745d65fc6a4c1752ded2599ab37246292b1c84))
* adds accessibleBy helper and deprecates `toMongoQuery` and `accessibleRecordsPlugin` ([#795](https://github.com/stalniy/casl/issues/795)) ([bd58bb2](https://github.com/stalniy/casl/commit/bd58bb2a450389370614cf9381d3bcd7ac34cf6b))
* allow to use mongoose typings without extending Document ([#639](https://github.com/stalniy/casl/issues/639)) ([f5273e3](https://github.com/stalniy/casl/commit/f5273e3475c1593dbda45176aa3c9ff593e8940f))
* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)
* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6))
* update mongoose to v6 and use mongoose-v6 QueryWithHelpers interface ([#561](https://github.com/stalniy/casl/issues/561)) ([a5f1036](https://github.com/stalniy/casl/commit/a5f1036dfdb065b21798215fb4feabdd3dd6434d))


### Bug Fixes

* adds jsdoc comments ([#768](https://github.com/stalniy/casl/issues/768)) ([6ca6105](https://github.com/stalniy/casl/commit/6ca6105240e2a072f053f5d38b2c5c920f9d31b9))
* adds jsdoc comments to test release trigger ([#766](https://github.com/stalniy/casl/issues/766)) ([fcdf8c8](https://github.com/stalniy/casl/commit/fcdf8c87798c438427c3df65fa5e537cf92dd195))
* adds unlessCan method to ForbiddenError and reused it mongoose package to construct ForbiddenError ([be7ae6a](https://github.com/stalniy/casl/commit/be7ae6aa7694394e31ddf2d2fcf560fef4b792e2))
* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))
* **changelog:** removes unrelated entries from changelog ([5437622](https://github.com/stalniy/casl/commit/543762224e329cda02f786c585998217581c2f3b))
* changes empty result query to be $expr with object, otherwise mongoose throws error ([9eae155](https://github.com/stalniy/casl/commit/9eae155cb730d6f23bc18808fee2eb4cbf5075b5))
* **deps:** fixes @casl/ability peer dep for @casl/mongoose  ([#925](https://github.com/stalniy/casl/issues/925)) ([c7f3d09](https://github.com/stalniy/casl/commit/c7f3d093add225305c75fb0fdb5d84bd935c5206))
* ensure acessible plugins can work with Ability instance that uses classes as SubjectTypes ([7e9b634](https://github.com/stalniy/casl/commit/7e9b6342ec57ac1131ee34f9d6d825856914e1c0)), closes [#656](https://github.com/stalniy/casl/issues/656)
* ensure it's possible to chain `accessibleBy` after another `accessibleBy` and combine with other `Query` methods ([5632c53](https://github.com/stalniy/casl/commit/5632c53de5dc62c10b19864686c82e87d17b6147))
* fixes type in mongoose error message ([1d28496](https://github.com/stalniy/casl/commit/1d284968fcdf541bc559e12abb059e9c67f358b9))
* gets rid of dist imported types which cannot be resolved at runtime ([#895](https://github.com/stalniy/casl/issues/895)) ([29f2d90](https://github.com/stalniy/casl/commit/29f2d9035ee96be1dedc1f8dc23d91e5ee6dd5e4))
* **mongoose:** uses `mongoose` as commonjs module ([c98506b](https://github.com/stalniy/casl/commit/c98506b77ebd6b3068040f512012e12891749b87))
* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))
* removes redundant comment ([#928](https://github.com/stalniy/casl/issues/928)) ([e56583b](https://github.com/stalniy/casl/commit/e56583bc1c2b2c4e92ab0134b62c6d963925c603))
* removes release testing comments ([#767](https://github.com/stalniy/casl/issues/767)) ([67ccbc9](https://github.com/stalniy/casl/commit/67ccbc989f20e3f98adaa97bb0c8126fbe28ee75))


### Code Refactoring

* **mongoose:** migrates `@casl/mongoose` to official mongoose types ([0379e7b](https://github.com/stalniy/casl/commit/0379e7b875a8d4f6d8c1cc194a0facdd9a43dc64)), closes [#436](https://github.com/stalniy/casl/issues/436)
* **vue:** adds support for vue 3 ([#444](https://github.com/stalniy/casl/issues/444)) ([e742bcf](https://github.com/stalniy/casl/commit/e742bcf0d187f8283ff171ec9760431759b55910)), closes [#396](https://github.com/stalniy/casl/issues/396)
