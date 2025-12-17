# Changelog

## [7.0.0](https://github.com/stalniy/casl/compare/ability@v6.7.4...ability@v7.0.0) (2025-12-17)


### ⚠ BREAKING CHANGES

* **deps:** now supports react ^17 and casl/ability ^4
* drops support for angular < 13

### Features

* **ability:** adds posibility to define custom any action and any subject type instead of using `manage` and `all` ([#533](https://github.com/stalniy/casl/issues/533)) ([9226583](https://github.com/stalniy/casl/commit/9226583c85ba2af70c3ae8de59e7441f004c72a3))
* added origin field to Rule class ([#752](https://github.com/stalniy/casl/issues/752)) ([073d355](https://github.com/stalniy/casl/commit/073d355cb108f333ded6cbc03ad0305ac4595295))
* adds `actionsFor(subjectType)` method that returns all actions associated with particular subject type ([f2d7e17](https://github.com/stalniy/casl/commit/f2d7e175e9d987bcb8f89936c519df3a5c0b63ac)), closes [#497](https://github.com/stalniy/casl/issues/497)
* adds possibility to auto detect subject type based on passed rules ([#882](https://github.com/stalniy/casl/issues/882)) ([4737fe2](https://github.com/stalniy/casl/commit/4737fe2270a5ce582dfcdba63c986865e3eb82c3))
* adds possibility to build Ability instance from factory function ([53d199f](https://github.com/stalniy/casl/commit/53d199f6dcdf812b4af7d364d2cf1ba4eebdf022))
* adds return type  to 'rulesToQuery' based on return type from 'convert' param ([#876](https://github.com/stalniy/casl/issues/876)) ([379e130](https://github.com/stalniy/casl/commit/379e130d78eab470f672eb62b8378e243e798ab0))
* Angular 13 support ([#632](https://github.com/stalniy/casl/issues/632)) ([6b86fd9](https://github.com/stalniy/casl/commit/6b86fd9e7a3bdd6bd40fea032372a826cd72c0fe))
* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)
* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6))
* refactors extra subpackage in casl/ability and adds AccessibleFields helper class ([#883](https://github.com/stalniy/casl/issues/883)) ([9d2ad70](https://github.com/stalniy/casl/commit/9d2ad70e6f61dc6f12c8aeb2d53f9cfd5ba23b69))
* updates createMongoAbility function signature to accept AppAbility as generic type ([f4a466c](https://github.com/stalniy/casl/commit/f4a466c7c085fd4da3783371aed9545a32570e9a))


### Bug Fixes

* **ability:** ensure ability call all event handlers during emit ([fdf2095](https://github.com/stalniy/casl/commit/fdf20959e90c4c4af7b0453bab2856785ecb8685))
* **ability:** hides `Public` private type under interface ([2524431](https://github.com/stalniy/casl/commit/25244317cfa7a0d52ad7e03586fe8062037758b7))
* **ability:** makes sure that other event handlers are not lost when last handler is unregistered ([ff3e75f](https://github.com/stalniy/casl/commit/ff3e75fe5ea8d439f87842d6289d7d331aa8290e))
* **ability:** negates inverted rules in ruleToAST ([#602](https://github.com/stalniy/casl/issues/602)) ([c1bdc60](https://github.com/stalniy/casl/commit/c1bdc601d3517a2385a3a7d70f2d9631c5b1f243))
* **ability:** removes generic parameters from `AnyAbility` type ([5566ac8](https://github.com/stalniy/casl/commit/5566ac863aa4cb477d96da1fb83d414fade1e48f))
* adds jsdoc comments ([#768](https://github.com/stalniy/casl/issues/768)) ([6ca6105](https://github.com/stalniy/casl/commit/6ca6105240e2a072f053f5d38b2c5c920f9d31b9))
* adds jsdoc comments to test release trigger ([#766](https://github.com/stalniy/casl/issues/766)) ([fcdf8c8](https://github.com/stalniy/casl/commit/fcdf8c87798c438427c3df65fa5e537cf92dd195))
* adds unlessCan method to ForbiddenError and reused it mongoose package to construct ForbiddenError ([be7ae6a](https://github.com/stalniy/casl/commit/be7ae6aa7694394e31ddf2d2fcf560fef4b792e2))
* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))
* **builder:** makes AbilityBuilder bound methods define as arrow functions ([e724741](https://github.com/stalniy/casl/commit/e724741e9e2ae54511f19ef3d34231932e3c744e)), closes [#736](https://github.com/stalniy/casl/issues/736)
* ensures `packRule` helper doesn't stuck inside infinite loop when invalid parameters are passed ([a19bd09](https://github.com/stalniy/casl/commit/a19bd09030d7bb33912b681d05d3040cd4275a49)), closes [#705](https://github.com/stalniy/casl/issues/705)
* exports private continer property to get rid of ts error ([6ffdb14](https://github.com/stalniy/casl/commit/6ffdb14466d6709ca391c9d5cd20e38b224de95e)), closes [#608](https://github.com/stalniy/casl/issues/608)
* fixes `CreateAbility` type typos and wrong types in parameters ([aaec82d](https://github.com/stalniy/casl/commit/aaec82d7836542359a84284207208bc66153b02f))
* fixes MongoQuery type for typescript ^4.8.x ([4af7c39](https://github.com/stalniy/casl/commit/4af7c394bb755c0a9ffb3b96ac994588a358a77c)), closes [#673](https://github.com/stalniy/casl/issues/673)
* fixes path to extra submodule in package.json ([#893](https://github.com/stalniy/casl/issues/893)) ([90e1e66](https://github.com/stalniy/casl/commit/90e1e66ef5f5a4d958616e7615ae2971c32379d8))
* ignores potentially insecure fields in rulesToFields ([#1093](https://github.com/stalniy/casl/issues/1093)) ([39da920](https://github.com/stalniy/casl/commit/39da920ec1dfadf3655e28bd0389e960ac6871f4))
* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))
* **release:** force release because of disable pre/post hook execution of pnpm ([39c20f6](https://github.com/stalniy/casl/commit/39c20f60d9bbaaa31dff8d5ed11286fae72db558))
* removes release testing comments ([#767](https://github.com/stalniy/casl/issues/767)) ([67ccbc9](https://github.com/stalniy/casl/commit/67ccbc989f20e3f98adaa97bb0c8126fbe28ee75))
* replaces object.hasOwnProperty with static calls to Object.hasOwn (+ polyfill) ([22fa7f8](https://github.com/stalniy/casl/commit/22fa7f874438f2c3bcfec7fae357e64c5d8b3610)), closes [#604](https://github.com/stalniy/casl/issues/604)
* **types:** relaxes types for `resolveAction` `AbilityOptions` property ([2af2927](https://github.com/stalniy/casl/commit/2af2927adc967ed0f4fa1ed1daa2eefe61d8d9ca))


### Miscellaneous Chores

* **deps:** update react and removes old react and casl/ability support (major) ([#998](https://github.com/stalniy/casl/issues/998)) ([44d3f40](https://github.com/stalniy/casl/commit/44d3f40cb034fbd5abfd7f7014bb28baf75ef06a))
