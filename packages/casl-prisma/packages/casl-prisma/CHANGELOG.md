# Changelog

## [1.7.0](https://github.com/stalniy/casl/compare/prisma-v1.6.0...prisma-v1.7.0) (2025-12-17)


### Features

* adds prisma7 support ([#1087](https://github.com/stalniy/casl/issues/1087)) ([8e818c2](https://github.com/stalniy/casl/commit/8e818c297592eea78f038dbabd9d03fef36fd57e))
* adds support for custom generate prisma client ([832a50e](https://github.com/stalniy/casl/commit/832a50e532afcf32c19f3696958d25d300bd08bd))
* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)
* exposes `WhereInput` type and removes restriction on Model inside PrismaQuery ([f7a26d4](https://github.com/stalniy/casl/commit/f7a26d424c96c4e0bd99c44952f60ef37f8fd882))
* extends createPrisma types to accept AppAbility as generic type ([4ac2531](https://github.com/stalniy/casl/commit/4ac25319ad08c5a1731706a0b7be6eae2a46005f))
* **prisma:** Add 'isSet' filter to prisma filters ([#967](https://github.com/stalniy/casl/issues/967)) ([256a2fe](https://github.com/stalniy/casl/commit/256a2fe170b3dcad9869cc2b17d895fdb1b8e6dc))
* **prisma:** adds prisma integration ([#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6))


### Bug Fixes

* add 'all' to AbilityTuple ([#615](https://github.com/stalniy/casl/issues/615)) ([70025ac](https://github.com/stalniy/casl/commit/70025ac13a8acdf4093d5379961198daf26e9007))
* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))
* another attempt to fix .mjs local imports ([890c334](https://github.com/stalniy/casl/commit/890c3341acf52e8b1c55eb6450841d02133226e1))
* es6m build now contains .mjs extension for local imports/exports ([d233c9f](https://github.com/stalniy/casl/commit/d233c9fecdb762b2b454d8e9375805633d9e35fe))
* export Model and Subjects as type ([#688](https://github.com/stalniy/casl/issues/688)) ([b0e76e3](https://github.com/stalniy/casl/commit/b0e76e3e667ea639ca94101ce0930bbd784fd60f))
* improved AbilityTuple ([#616](https://github.com/stalniy/casl/issues/616)) ([270446f](https://github.com/stalniy/casl/commit/270446fe7b68bb00a6546d04d6bee88a816a00ff))
* makes sure `WhereInput<T>` resolves to corresponding Prisma model ([9288dcb](https://github.com/stalniy/casl/commit/9288dcb9a6eb91671b23c38454e189cd561af235)), closes [#613](https://github.com/stalniy/casl/issues/613)
* makes sure PrismaAbility support per subject actions type ([5db9a37](https://github.com/stalniy/casl/commit/5db9a3758f444ac40b957f5bb20821d43a830b8e)), closes [#675](https://github.com/stalniy/casl/issues/675)
* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))
* **prisma:** allpows to specify not all models inside Subjects helper ([fb9cf8d](https://github.com/stalniy/casl/commit/fb9cf8d3b41f2030e36d2e774731da3540cca55e))
* **prisma:** fix 'isNot' and 'none' condition ([#538](https://github.com/stalniy/casl/issues/538)) ([d3bde31](https://github.com/stalniy/casl/commit/d3bde31b77986b4a99638bd72550d72ce2160200))
* **prisma:** sets minimum @casl/ability version to 5.3.0 ([55615e4](https://github.com/stalniy/casl/commit/55615e44fa22bfe2b4f2791f6eb218db1df5cfcc))
* update accessibleBy function of casl/prisma to autocomplete action names ([#965](https://github.com/stalniy/casl/issues/965)) ([37c6b54](https://github.com/stalniy/casl/commit/37c6b543172f618404617de05486f141dcba0ddb))
* update prisma to version 4 ([#638](https://github.com/stalniy/casl/issues/638)) ([d5abdf1](https://github.com/stalniy/casl/commit/d5abdf1c82b58c8515d2be48d2cf798add5b1e13))


### Performance Improvements

* adds small optimizations in inverted parsing instructions and `toComparable` helper ([32596d1](https://github.com/stalniy/casl/commit/32596d119f26dab09347a0b781a63773c66a3ebc))
