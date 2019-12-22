# Change Log

All notable changes to this project will be documented in this file.

# [@casl/ability-v3.4.0](https://github.com/stalniy/casl/compare/@casl/ability@3.3.0...@casl/ability@3.4.0) (2019-12-22)


### Features

* **ability:** adds possibility to specify custom error messages ([#245](https://github.com/stalniy/casl/issues/245)) ([4b48562](https://github.com/stalniy/casl/commit/4b485620fabb290f0451bc2e828637eaec043c32)), closes [#241](https://github.com/stalniy/casl/issues/241)

# [@casl/ability-v3.3.0](https://github.com/stalniy/casl/compare/@casl/ability@3.2.0...@casl/ability@3.3.0) (2019-12-09)


### Bug Fixes

* **deps:** update dependency sift to v9 ([cf3aa9a](https://github.com/stalniy/casl/commit/cf3aa9a145947e091187bb970f8a3d3819537ce3))


### Features

* **ability:** uses CSP build of sift.js ([f238813](https://github.com/stalniy/casl/commit/f23881322b585b9487153295d355341968b349c5)), closes [#234](https://github.com/stalniy/casl/issues/234)

# [@casl/ability-v3.2.0](https://github.com/stalniy/casl/compare/@casl/ability@3.1.2...@casl/ability@3.2.0) (2019-07-28)


### Features

* **ability:** adds support for field patterns in rules ([#213](https://github.com/stalniy/casl/issues/213)) ([55ad2db](https://github.com/stalniy/casl/commit/55ad2db)), closes [#194](https://github.com/stalniy/casl/issues/194)

# [@casl/ability-v3.2.0](https://github.com/stalniy/casl/compare/@casl/ability@3.1.2...@casl/ability@3.2.0) (2019-07-28)


### Features

* **ability:** adds support for field patterns in rules ([#213](https://github.com/stalniy/casl/issues/213)) ([55ad2db](https://github.com/stalniy/casl/commit/55ad2db)), closes [#194](https://github.com/stalniy/casl/issues/194)

# [@casl/ability-v3.1.2](https://github.com/stalniy/casl/compare/@casl/ability@3.1.1...@casl/ability@3.1.2) (2019-07-08)


### Performance Improvements

* **ability:** checks for fields only if fields were specified in rules ([da013d4](https://github.com/stalniy/casl/commit/da013d4))

# [@casl/ability-v3.1.1](https://github.com/stalniy/casl/compare/@casl/ability@3.1.0...@casl/ability@3.1.1) (2019-07-04)


### Bug Fixes

* **extra:** fixes edge cases when building query to database ([#206](https://github.com/stalniy/casl/issues/206)) ([437d4e7](https://github.com/stalniy/casl/commit/437d4e7))

# [@casl/ability-v3.1.0](https://github.com/stalniy/casl/compare/@casl/ability@3.0.2...@casl/ability@3.1.0) (2019-07-01)


### Bug Fixes

* **extra:** add rulesToFields TS definition ([#205](https://github.com/stalniy/casl/issues/205)) ([b772ad6](https://github.com/stalniy/casl/commit/b772ad6))


### Features

* **ability:** adds validation of 3rd parameter to Ability.can ([9df032c](https://github.com/stalniy/casl/commit/9df032c)), closes [#192](https://github.com/stalniy/casl/issues/192)

# [@casl/ability-v3.0.2](https://github.com/stalniy/casl/compare/@casl/ability@3.0.1...@casl/ability@3.0.2) (2019-03-25)


### Bug Fixes

* **ability:** returns `null` from `rulesToQuery` if ability has only inverted rules ([744061c](https://github.com/stalniy/casl/commit/744061c)), closes [#170](https://github.com/stalniy/casl/issues/170)

# [@casl/ability-v3.0.1](https://github.com/stalniy/casl/compare/@casl/ability@3.0.0...@casl/ability@3.0.1) (2019-02-16)


### Bug Fixes

* **ability:** copies event listeners before calling them ([3148da1](https://github.com/stalniy/casl/commit/3148da1)), closes [#159](https://github.com/stalniy/casl/issues/159)

# [@casl/ability-v3.0.0](https://github.com/stalniy/casl/compare/@casl/ability@2.5.1...@casl/ability@3.0.0) (2019-02-04)


### Bug Fixes

* **ability:** prevent creation of `manage` alias ([4ca1268](https://github.com/stalniy/casl/commit/4ca1268)), closes [#119](https://github.com/stalniy/casl/issues/119)
* **ability:** updates ts definitions for `Ability` ([2c989b2](https://github.com/stalniy/casl/commit/2c989b2)), closes [#119](https://github.com/stalniy/casl/issues/119)


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

* **ability:** prioritise rules with `all` subject in the same way as other rules

Let's consider the next example:

```js
const ability = AbilityBuilder.define((can) => {
  can('read', 'User', { id: 1 })
  cannot('read', 'all')
})
```

According to rule ordering `read all` rule must override `read User` rule but in @casl/ability@2.x there was a bug and this is not true:

```js
ability.can('read', 'User') // true
```

In @casl/ability@3.x this works as expected

```js
ability.can('read', 'User') // false
```

# [@casl/ability-v2.5.1](https://github.com/stalniy/casl/compare/@casl/ability@2.5.0...@casl/ability@2.5.1) (2018-11-11)


### Bug Fixes

* **ability:** adds `on` method into typescript defs ([86e35cc](https://github.com/stalniy/casl/commit/86e35cc))

# [@casl/ability-v2.5.0](https://github.com/stalniy/casl/compare/@casl/ability@2.4.2...@casl/ability@2.5.0) (2018-10-14)


### Bug Fixes

* **deps:** update dependency sift to v7 ([0c02695](https://github.com/stalniy/casl/commit/0c02695))
* **README:** changes links to [@casl](https://github.com/casl)/ability to point to npm package instead to git root [skip ci] ([a74086b](https://github.com/stalniy/casl/commit/a74086b)), closes [#102](https://github.com/stalniy/casl/issues/102)


<a name="@casl/ability-v2.4.2"></a>
# [@casl/ability-v2.4.2](https://github.com/stalniy/casl/compare/@casl/ability@2.4.1...@casl/ability@2.4.2) (2018-07-02)


### Bug Fixes

* **ability:** adds additional check to `rulesToFields` ([a6f4875](https://github.com/stalniy/casl/commit/a6f4875))

<a name="@casl/ability-v2.4.1"></a>
# [@casl/ability-v2.4.1](https://github.com/stalniy/casl/compare/@casl/ability@2.4.0...@casl/ability@2.4.1) (2018-07-02)


### Bug Fixes

* **package:** changes location of ES5M modules ([2b1ad4e](https://github.com/stalniy/casl/commit/2b1ad4e)), closes [#89](https://github.com/stalniy/casl/issues/89)

<a name="@casl/ability-v2.4.0"></a>
# [@casl/ability-v2.4.0](https://github.com/stalniy/casl/compare/@casl/ability@2.3.0...@casl/ability@2.4.0) (2018-07-02)


### Bug Fixes

* **deps:** update dependency sift to v6 ([791f78c](https://github.com/stalniy/casl/commit/791f78c))


### Features

* **ability:** adds `rulesToFields` method ([4bf9ddc](https://github.com/stalniy/casl/commit/4bf9ddc)), closes [#86](https://github.com/stalniy/casl/issues/86)

<a name="2.3.0"></a>
# [2.3.0](https://github.com/stalniy/casl/compare/@casl/ability@2.1.0...@casl/ability@2.3.0) (2018-05-09)


### Features

* **ability:** allows AbilityBuilder to accept the subject's Type ([#61](https://github.com/stalniy/casl/issues/61)) ([0de1bf0](https://github.com/stalniy/casl/commit/0de1bf0)), closes [#58](https://github.com/stalniy/casl/issues/58)




<a name="2.2.0"></a>
# [2.2.0](https://github.com/stalniy/casl/compare/@casl/ability@2.1.0...@casl/ability@2.2.0) (2018-05-04)


### Features

* **ability:** adds forbidden reasons ([1c01c42](https://github.com/stalniy/casl/commit/1c01c42)), closes [#45](https://github.com/stalniy/casl/issues/45)




<a name="2.1.0"></a>
# [2.1.0](https://github.com/stalniy/casl/compare/@casl/ability@2.0.3...@casl/ability@2.1.0) (2018-04-26)


### Features

* **ability:** adds alias `action` to `actions` Rule field ([88d82a8](https://github.com/stalniy/casl/commit/88d82a8))
* **ability:** adds pack/unpack rules methods ([c60ab5d](https://github.com/stalniy/casl/commit/c60ab5d)), closes [#44](https://github.com/stalniy/casl/issues/44)




<a name="2.0.3"></a>
## [2.0.3](https://github.com/stalniy/casl/compare/@casl/ability@2.0.2...@casl/ability@2.0.3) (2018-04-16)


### Bug Fixes

* **ability:** ignores inverted rule with conditions when checking subject type ([36916dc](https://github.com/stalniy/casl/commit/36916dc)), closes [#53](https://github.com/stalniy/casl/issues/53)




<a name="2.0.2"></a>
# [2.0.2](https://github.com/stalniy/casl/compare/@casl/ability@2.0.0...@casl/ability@2.0.2) (2018-04-03)

### Features

* **ability:** allows to pass subjects as comma separated items ([7612425](https://github.com/stalniy/casl/commit/7612425))
* **builder:** allows to pass async function in `AbilityBuilder.define` ([def07c7](https://github.com/stalniy/casl/commit/def07c7))

### Performance

* **ability:** improves performance of `permittedFieldsOf` helper function ([7612425](https://github.com/stalniy/casl/commit/7612425))

### Bug Fixes

* **builder:** returns RuleBuilder from AbilityBuilder#cannot ([def07c7](https://github.com/stalniy/casl/commit/def07c7))


<a name="2.0.0"></a>
# [2.0.0](https://github.com/stalniy/casl/compare/v1.1.0...@casl/ability@2.0.0) (2018-03-23)

### Features

* **ability:** implement per field rules support ([471358f](https://github.com/stalniy/casl/commit/471358f)), closes [#18](https://github.com/stalniy/casl/issues/18)
* **extra:** adds `permittedAttributesOf` ([3474fcc](https://github.com/stalniy/casl/commit/3474fcc)), closes [#18](https://github.com/stalniy/casl/issues/18)

### Breaking Changes

* **package:** casl was split into several packages available under `@casl` npm scope
* **ability:** subject specific rules now takes precedence over `all` rules
* **rulesToQuery:** moves `rulesToQuery` into submodule `@casl/ability/extra`
* **mongoose:** moves mongo related functions into separate `@casl/mongoose` package

### Migration Guide

1. CASL was split into several packages which are available under `@casl` scope.

`Ability` related functionality now is in `@casl/ability` package. `casl` package is deperecated now.

**Before**:

```js
import { AbilityBuilder } from 'casl'
```

**Now**:

```js
import { AbilityBuilder } from '@casl/ability'
```

2. Previously it was not possible to override `all` rule with subject specific inverted one. It was a bug and it's fixed.

**Before**:

```js
const ability = AbilityBuilder.define((can, cannot) => {
can('read', 'all')
cannot('read', 'Post')
})

ability.can('read', 'Post') // true
```

**Now**:

with the same setup

```js
ability.can('read', 'Post') // false
```

3. `rulesToQuery` was moved into submodule. And its signature was changed

**Before**:

```js
import { rulesToQuery } from 'casl'

rulesToQuery(ability.rulesFor('read', 'Post'), rule => ...)
```

**Now**:

```js
import { rulesToQuery } from '@casl/ability/extra'

rulesToQuery(ability, 'read', 'Post', rule => ...)
```

This allows to ensure that people use this function correctly (i.e, by passing only 1 pair or action-subject rules)

4. MongoDB integration was moved into [@casl/mongoose](/packages/casl-mongoose).

**Before**:

```js
import { toMongoQuery, mongoosePlugin } from 'casl'
```

**Now**:

```js
import { toMongoQuery, accessibleRecordsPlugin } from '@casl/mongoose'
```

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
