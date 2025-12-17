# Changelog

## 1.0.0 (2025-12-17)


### ⚠ BREAKING CHANGES

* **deps:** drop support for angular@13, moving to Ivy only!
* drops support for angular < 13
* **angular:** * library is compiled by Ivy and no longer support ViewEngine
* **deps:** * library is compiled by Ivy and no longer support ViewEngine

### Features

* adds AbilityServiceSignal and converted pipes to standalone pipes ([#1004](https://github.com/stalniy/casl/issues/1004)) ([46122e6](https://github.com/stalniy/casl/commit/46122e6b1abb0141cd4ea83ffd609c400adf0c04))
* Angular 13 support ([#632](https://github.com/stalniy/casl/issues/632)) ([6b86fd9](https://github.com/stalniy/casl/commit/6b86fd9e7a3bdd6bd40fea032372a826cd72c0fe))
* **angular:** implements services that provides Ability as an Observable ([5a139b2](https://github.com/stalniy/casl/commit/5a139b2f1bb694308c7afb46ad7be6e7cb719f19))
* exports types to support TS ES6 modules ([c818b1a](https://github.com/stalniy/casl/commit/c818b1a84cee6dc2ad78be72db4d1afe0f95b3f1)), closes [#668](https://github.com/stalniy/casl/issues/668)
* update angular to v15 ([#704](https://github.com/stalniy/casl/issues/704)) ([4f4b713](https://github.com/stalniy/casl/commit/4f4b7135942aba0b8908a0aeadc9d101678faafb))


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))
* changes comment to trigger release ([#855](https://github.com/stalniy/casl/issues/855)) ([f13103b](https://github.com/stalniy/casl/commit/f13103b45729264a435b6c00a7352971a15ece73))
* debug auto release, again ([#943](https://github.com/stalniy/casl/issues/943)) ([ba1c9a0](https://github.com/stalniy/casl/commit/ba1c9a01d7b66fb691cfa88125542cd752aadfd0))
* debug auto releasing ([#942](https://github.com/stalniy/casl/issues/942)) ([6c7ca22](https://github.com/stalniy/casl/commit/6c7ca22a89a6436b618bbe7caf674a206d047acd))
* debug release ([#939](https://github.com/stalniy/casl/issues/939)) ([80eeb6b](https://github.com/stalniy/casl/commit/80eeb6b0fb541f3266951603aaa550d776f9cf28))
* **deps:** update dependency typescript to ~5.3.0 ([0ec328c](https://github.com/stalniy/casl/commit/0ec328cc1c291eafa932e135234af681650e9f6f))
* **deps:** update dependency typescript to ~5.4.0 ([1092376](https://github.com/stalniy/casl/commit/10923766d5b2992744f304936e9e8ab9e17ecdf9))
* **deps:** update dependency typescript to ~5.5.0 ([ef11301](https://github.com/stalniy/casl/commit/ef113010e37cf8311b70c549e1fd648ca19de579))
* ensure pre-post scripts are enabled for pnpm ([#853](https://github.com/stalniy/casl/issues/853)) ([fa23801](https://github.com/stalniy/casl/commit/fa23801e81773b6c8f3393aa6340ce8a324b12dd))
* **package:** add repository directory into package.json for all @casl/* packages ([#560](https://github.com/stalniy/casl/issues/560)) ([0ef534c](https://github.com/stalniy/casl/commit/0ef534c9df44816cd64d5142f41621034e5b70db))


### Miscellaneous Chores

* **deps:** update angular monorepo to v14 (major)  ([#663](https://github.com/stalniy/casl/issues/663)) ([e556f14](https://github.com/stalniy/casl/commit/e556f144229a0e6fea1eaba7556a9e3db910aabb))
* **deps:** updates angular to v12 ([#516](https://github.com/stalniy/casl/issues/516)) ([ff4212c](https://github.com/stalniy/casl/commit/ff4212c7f32f1fbc8a73e6b3a6615af65991e39a))


### Code Refactoring

* **angular:** removes deprecated CanPipe and stick to Ivy compiler ([82b61f5](https://github.com/stalniy/casl/commit/82b61f5e46dc3c031aef42ae499eca25f2698fdb))
