# Change Log

All notable changes to this project will be documented in this file.

# [5.0.0](https://github.com/stalniy/casl/compare/@casl/mongoose@4.0.2...@casl/mongoose@5.0.0) (2021-05-10)


### Code Refactoring

* **mongoose:** migrates `@casl/mongoose` to official mongoose types ([0379e7b](https://github.com/stalniy/casl/commit/0379e7b875a8d4f6d8c1cc194a0facdd9a43dc64)), closes [#436](https://github.com/stalniy/casl/issues/436)


### BREAKING CHANGES

* **mongoose:** migrates `@casl/mongoose` to official mongoose types. This is a breaking change for TypeScript users. What you need to do is to

  ```sh
  npm uninstall @types/mongoose
  ```

  and extend model interfaces by `mongoose.Document`

  **Before**

  ```ts
  interface Post {
    title: string;
    content: string;
  }

  const schema = new mongoose.Schema<Post>({
    // model definition
  });
  ```

  **After**

  ```ts
  import mongoose from "mongoose";

  interface Post extends mongoose.Document {
    title: string;
    content: string;
  }

  const schema = new mongoose.Schema<Post>({
    // model definition
  });
  ```

  For example, check updated README.md

## [4.0.2](https://github.com/stalniy/casl/compare/@casl/mongoose@4.0.1...@casl/mongoose@4.0.2) (2021-04-12)


### Bug Fixes

* **mongoose:** uses `mongoose` as commonjs module ([c98506b](https://github.com/stalniy/casl/commit/c98506b77ebd6b3068040f512012e12891749b87))

## [4.0.1](https://github.com/stalniy/casl/compare/@casl/mongoose@4.0.0...@casl/mongoose@4.0.1) (2021-02-12)


### Bug Fixes

* **changelog:** removes unrelated entries from changelog ([5437622](https://github.com/stalniy/casl/commit/543762224e329cda02f786c585998217581c2f3b))

# [4.0.0](https://github.com/stalniy/casl/compare/@casl/mongoose@3.2.2...@casl/mongoose@4.0.0) (2021-02-12)

### Features

* **mongoose:** throws `ForbiddenError` instead of returning a hard-coded value when user has not permissions to do some action ([917dd01](https://github.com/stalniy/casl/commit/917dd017bd95627f2550fc8f34b4ccf03fea94c5)), closes [#404](https://github.com/stalniy/casl/issues/404)


### BREAKING CHANGES

* **mongoose:** `accessibleBy` eventually throws `ForbiddenError` instead of returning a hard-coded value

  **Before**:

  ```ts
  // ability doesn't allow to read Post
  const ability = defineAbility(can => can('manage', 'Comment'));

  try {
    const items = await Post.accessibleBy(ability, 'read');
    console.log(items); // []
  } catch (error) {
    console.error(error); // no error thrown
  }
  ```

  **After**:

  ```ts
  // ability doesn't allow to read Post
  const ability = defineAbility(can => can('manage', 'Comment'));

  try {
    const items = await Post.accessibleBy(ability, 'read');
    console.log(items); // not reached, because query fails with error
  } catch (error) {
    console.error(error); // ForbiddenError thrown
  }
  ```

## [3.2.2](https://github.com/stalniy/casl/compare/@casl/mongoose@3.2.1...@casl/mongoose@3.2.2) (2021-01-05)


### Bug Fixes

* **mongoose:** simplifies types for `toMongoQuery` helper ([1615f4b](https://github.com/stalniy/casl/commit/1615f4b9ba870cddc190bdf4a504822760a21add))

## [3.2.1](https://github.com/stalniy/casl/compare/@casl/mongoose@3.2.0...@casl/mongoose@3.2.1) (2020-12-28)


### Bug Fixes

* **dist:** adds separate `tsconfig.build.json` to every completementary project ([87742ce](https://github.com/stalniy/casl/commit/87742cec518a8a68d5fc29be2bbc9561cbc7da6c)), closes [#419](https://github.com/stalniy/casl/issues/419)

# [3.2.0](https://github.com/stalniy/casl/compare/@casl/mongoose@3.1.0...@casl/mongoose@3.2.0) (2020-12-26)


### Bug Fixes

* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)
* **package:** removes `engine` section that points to npm@6 ([eecd12a](https://github.com/stalniy/casl/commit/eecd12ac49f56d6a0f57d1a57fb37487335b5f03)), closes [#417](https://github.com/stalniy/casl/issues/417)


### Features

* **esm:** adds ESM support for latest Node.js through `exports` prop in package.json ([cac2506](https://github.com/stalniy/casl/commit/cac2506a80c18f194210c2d89108d1d094751fa4)), closes [#331](https://github.com/stalniy/casl/issues/331)

# [3.1.0](https://github.com/stalniy/casl/compare/@casl/mongoose@3.0.3...@casl/mongoose@3.1.0) (2020-08-20)


### Features

* **mongoose:** adds `getFields` option to `accessibleFieldsPlugin` ([a93037c](https://github.com/stalniy/casl/commit/a93037cc423649b6ea45347166adc8ea7eeffe9e))

## [3.0.3](https://github.com/stalniy/casl/compare/@casl/mongoose@3.0.2...@casl/mongoose@3.0.3) (2020-06-09)


### Bug Fixes

* **docs:** ensure README and docs for all packages are in sync ([8df3684](https://github.com/stalniy/casl/commit/8df3684b139de0af60c9c37f284a5028ffbf2224)), closes [#338](https://github.com/stalniy/casl/issues/338)

## [3.0.2](https://github.com/stalniy/casl/compare/@casl/mongoose@3.0.1...@casl/mongoose@3.0.2) (2020-04-10)


### Bug Fixes

* **mongoose:** ensure that terser doesn't mangle reserved required props ([83f1d32](https://github.com/stalniy/casl/commit/83f1d32d47cb99335c26fb2ba4aa4e6920cb761c))

## [3.0.1](https://github.com/stalniy/casl/compare/@casl/mongoose@3.0.0...@casl/mongoose@3.0.1) (2020-04-09)


### Bug Fixes

* **mongoose:** adds support for casl/ability@4 in package.json ([ffb887c](https://github.com/stalniy/casl/commit/ffb887c57b7839e0239d59bbcb859b4469782fbd))

# [3.0.0](https://github.com/stalniy/casl/compare/@casl/mongoose@2.3.3...@casl/mongoose@3.0.0) (2020-04-09)


### Bug Fixes

* **mongoose:** ensures mongoose works with MongoQuery conditions ([f92b7df](https://github.com/stalniy/casl/commit/f92b7df532ecca24ee05d02cf9388b21f8d242fa)), closes [#249](https://github.com/stalniy/casl/issues/249)
* **mongoose:** fixes mongoose typings ([d320eba](https://github.com/stalniy/casl/commit/d320eba70c14c7fc6700aba3e38fee062fdd9c3a)), closes [#248](https://github.com/stalniy/casl/issues/248)


### Features

* **mongoose:** adds generics to mongoose types ([6cdf82e](https://github.com/stalniy/casl/commit/6cdf82ee2f547fdb6c5dcd9cb51cef1c4b4c542d)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **mongoose:** simplifies generics for mongoose ([7ff65f7](https://github.com/stalniy/casl/commit/7ff65f75cf715ca9428dda2fe6e0c91715646979)), closes [#107](https://github.com/stalniy/casl/issues/107)


### BREAKING CHANGES

* **mongoose:** removes deprecated `permittedFieldsPlugin` use `accessibleFieldsPlugin` instead
* **typescript:** weak hand written declaration files are removed as `@casl/mongoose` has been completely rewritten to TypeScript.

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
