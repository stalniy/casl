# Change Log

All notable changes to this project will be documented in this file.

## [5.4.3](https://github.com/stalniy/casl/compare/@casl/ability@5.4.2...@casl/ability@5.4.3) (2021-08-17)


### Bug Fixes

* **release:** force release because of disable pre/post hook execution of pnpm ([39c20f6](https://github.com/stalniy/casl/commit/39c20f60d9bbaaa31dff8d5ed11286fae72db558))

## [5.4.2](https://github.com/stalniy/casl/compare/@casl/ability@5.4.1...@casl/ability@5.4.2) (2021-08-17)


### Bug Fixes

* **ability:** makes sure that other event handlers are not lost when last handler is unregistered ([ff3e75f](https://github.com/stalniy/casl/commit/ff3e75fe5ea8d439f87842d6289d7d331aa8290e))

## [5.4.1](https://github.com/stalniy/casl/compare/@casl/ability@5.4.0...@casl/ability@5.4.1) (2021-08-16)


### Bug Fixes

* **ability:** ensure ability call all event handlers during emit ([fdf2095](https://github.com/stalniy/casl/commit/fdf20959e90c4c4af7b0453bab2856785ecb8685))

# [5.4.0](https://github.com/stalniy/casl/compare/@casl/ability@5.3.1...@casl/ability@5.4.0) (2021-08-11)


### Features

* **ability:** adds posibility to define custom any action and any subject type instead of using `manage` and `all` ([#533](https://github.com/stalniy/casl/issues/533)) ([9226583](https://github.com/stalniy/casl/commit/9226583c85ba2af70c3ae8de59e7441f004c72a3)), closes [#527](https://github.com/stalniy/casl/issues/527)

## [5.3.1](https://github.com/stalniy/casl/compare/@casl/ability@5.3.0...@casl/ability@5.3.1) (2021-05-12)


### Bug Fixes

* adjusts package tags to improve discoverability ([73e88b0](https://github.com/stalniy/casl/commit/73e88b0a256625b193b2cd9dc4a219f2e1193cbc))

# [5.3.0](https://github.com/stalniy/casl/compare/@casl/ability@5.2.2...@casl/ability@5.3.0) (2021-05-10)


### Features

* **types:** exposes HKT types in CASL (related to [#505](https://github.com/stalniy/casl/issues/505)) ([9f91ac4](https://github.com/stalniy/casl/commit/9f91ac403f05c8fac5229b1c9e243909379efbc6)))


## [5.2.2](https://github.com/stalniy/casl/compare/@casl/ability@5.2.1...@casl/ability@5.2.2) (2021-01-27)


### Bug Fixes

* **types:** relaxes types for `resolveAction` `AbilityOptions` property ([2af2927](https://github.com/stalniy/casl/commit/2af2927adc967ed0f4fa1ed1daa2eefe61d8d9ca))

## [5.2.1](https://github.com/stalniy/casl/compare/@casl/ability@5.2.0...@casl/ability@5.2.1) (2021-01-23)


### Bug Fixes

* **ability:** removes generic parameters from `AnyAbility` type ([5566ac8](https://github.com/stalniy/casl/commit/5566ac863aa4cb477d96da1fb83d414fade1e48f))

# [5.2.0](https://github.com/stalniy/casl/compare/@casl/ability@5.1.2...@casl/ability@5.2.0) (2021-01-22)


### Bug Fixes

* **ability:** hides `Public` private type under interface ([2524431](https://github.com/stalniy/casl/commit/25244317cfa7a0d52ad7e03586fe8062037758b7)), closes [#446](https://github.com/stalniy/casl/issues/446)


### Features

* **angular:** updates angular to v11 ([#421](https://github.com/stalniy/casl/issues/421)) ([ec16bf9](https://github.com/stalniy/casl/commit/ec16bf9e93536c4ec249d2520cf336c1497615a9))

## [5.1.2](https://github.com/stalniy/casl/compare/@casl/ability@5.1.1...@casl/ability@5.1.2) (2021-01-03)


### Bug Fixes

* **types:** change type of `detectSubjectType` return value to be of `SubjectType` ([d76b18b](https://github.com/stalniy/casl/commit/d76b18b9b142da36c659d184503a11ee2b7427cb)), closes [#430](https://github.com/stalniy/casl/issues/430)

## [5.1.1](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0...@casl/ability@5.1.1) (2020-12-29)


### Bug Fixes

* **types:** adds return type annotation to `detectSubjectType` method ([b514146](https://github.com/stalniy/casl/commit/b514146d61cf19c52717b94a101ef448f359cffe))
* **types:** reverts `ForcedSubject<T>` to be an interface ([f48b0a0](https://github.com/stalniy/casl/commit/f48b0a07cc33c9a643a058c58861b6d72cb3be3d))

# [5.1.0](https://github.com/stalniy/casl/compare/@casl/ability@5.0.0...@casl/ability@5.1.0) (2020-12-26)


### Bug Fixes

* **ability:** ensure default field matcher can match fields with partial patterns inside ([362f49f](https://github.com/stalniy/casl/commit/362f49fce07ceb08725f129ee4c7251d20fee9f2)), closes [#388](https://github.com/stalniy/casl/issues/388)
* **ability:** replaces getters with functions to ensure terser properly minifies them ([386ecb6](https://github.com/stalniy/casl/commit/386ecb6df79aa466f10e3e2eccea4d3771c97ad4))
* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)
* **build:** ensure dist is updated before ([0a879f7](https://github.com/stalniy/casl/commit/0a879f7162b8e5010a78ddff0f858f00b3537aa5))
* **conditions:** moves logic related to compare complex types to @ucast/mongo2js ([9bd6a1b](https://github.com/stalniy/casl/commit/9bd6a1b90f6f949e8b6eb51cc406f6c44f33a705))
* **condtions:** adds interpreter for `$and` parsing instruction ([3166a32](https://github.com/stalniy/casl/commit/3166a32a4803b06ceb7a682007b503b2185a7240))
* **extra:** makes `permittedFieldsOf` to iterate from the end of array ([81e6409](https://github.com/stalniy/casl/commit/81e64096eb780762e117dae05cfa7cafad801aa3))
* **package:** removes `engine` section that points to npm@6 ([eecd12a](https://github.com/stalniy/casl/commit/eecd12ac49f56d6a0f57d1a57fb37487335b5f03)), closes [#417](https://github.com/stalniy/casl/issues/417)
* **README:** removes explanation duplicated from intro guide ([6315aa7](https://github.com/stalniy/casl/commit/6315aa7eea681d76bda947a7d5353da39c48e005))
* **types:** ensure `ForceSubject` generic parameter is preserved in resulting d.ts files ([e97e5fe](https://github.com/stalniy/casl/commit/e97e5fe012e48553ae61a42f8c8240506056afed))
* **types:** makes parameters of `AbilityClass` optional ([e7d0815](https://github.com/stalniy/casl/commit/e7d0815bfc2e18f4158bf5464b844fd55be92680))


### Code Refactoring

* **extra:** makes `fieldsFrom` option to be mandatory for `permittedFieldsOf` ([df29b0d](https://github.com/stalniy/casl/commit/df29b0d7364ab1964d4d7b3b98212615beaa4952))
* **ruleIndex:** `detectSubjectType` option is now responsible only for detecting subject type from objects [skip release] ([ebeaadc](https://github.com/stalniy/casl/commit/ebeaadc0974a3e1697b34b3d85d2510d65b73dbb))
* **ruleIndex:** removes possibility to pass subject to `rulesFor` and `possibleRulesFor` ([b8c324d](https://github.com/stalniy/casl/commit/b8c324d747f0a4fb8554931a85f1af211fe3c268))
* **types:** restricts which utility types are exported by library ([e98618f](https://github.com/stalniy/casl/commit/e98618f34d0a29358644b6c11ce87398ffeb2437))


### Features

* **builder:** improves typings for AbilityBuilder [skip release] ([ebd4d17](https://github.com/stalniy/casl/commit/ebd4d17a355a2646467033118a3d6efee4321d27)), closes [#379](https://github.com/stalniy/casl/issues/379)
* **builder:** improves typings of `AbilityBuilder['can']` and `AbilityBuilder['cannot']` methods ([98ffbfc](https://github.com/stalniy/casl/commit/98ffbfc58fbfa810020e9b79d22d27d67563e5b7)), closes [#333](https://github.com/stalniy/casl/issues/333)
* **esm:** adds ESM support for latest Node.js through `exports` prop in package.json ([cac2506](https://github.com/stalniy/casl/commit/cac2506a80c18f194210c2d89108d1d094751fa4)), closes [#331](https://github.com/stalniy/casl/issues/331)
* **extra:** adds `rulesToAST` that converts rules into [@ucast](https://github.com/ucast) AST ([55fd6ee](https://github.com/stalniy/casl/commit/55fd6eeb9e0b71bb38f1db8cfb87ba7fad391988)), closes [#350](https://github.com/stalniy/casl/issues/350)


### Performance Improvements

* **ability:** creates conditions and field matcher lazily ([4ae7799](https://github.com/stalniy/casl/commit/4ae779902c0a59c6dea6f3535ba2fd80cac691da))
* **ability:** replaces object for storing index with ES6 Map ([d1fa117](https://github.com/stalniy/casl/commit/d1fa117c090e41c2b5f176f467e7561456961c78))
* **events:** converts LinkedItem into POJO and regular functions ([6f2de73](https://github.com/stalniy/casl/commit/6f2de73550d7304bc22487d93ea9e5b9dc6a3b64))
* **events:** handles event removal in space efficient way ([71246e2](https://github.com/stalniy/casl/commit/71246e220b6c1abddd553ff8684cdc8732106d57))
* **events:** moves out side-effect from `LinkedItem` constructor ([3657c7f](https://github.com/stalniy/casl/commit/3657c7f6d1e24ef2f4a73d1fadee12a529b8148b))
* **events:** utilizes LinkedList for storing event handlers ([e2fd265](https://github.com/stalniy/casl/commit/e2fd2656e06af1883ac3f428b97add1ce14727fb))
* **extra:** replaces object with `Set` in `permittedFieldsOf` ([a9260d1](https://github.com/stalniy/casl/commit/a9260d17c71bfe1c497f058c2b080b102cb28ed6))
* **rule:** ensures conditions/field matcher created only when we have object/field to check ([110a69d](https://github.com/stalniy/casl/commit/110a69d049e8abd6711f8d111af0a28e8d079428))
* **ruleIndex:** removes subject type detection from `_buildIndexFor` ([13fe934](https://github.com/stalniy/casl/commit/13fe93437fa3f9f5604a962eecaac02c663b39cb))
* **rules:** improves merging logic of rules of subject and `manage all` ([6f8a13a](https://github.com/stalniy/casl/commit/6f8a13a507a2caafe7d6877c9a6f28cdd56c59bc))


### BREAKING CHANGES

* **types:** types `AliasesMap`, `TaggedInterface`, `AbilityTupleType`, `ToAbilityTypes`, `AnyObject` are no longer exported by the library
* **extra:** makes `fieldsFrom` option to be mandatory for `permittedFieldsOf`. This reduces confusion around why `permittedFieldsOf` returns empty array when user can manage entity fields. So, now this logic is just explicit and clear

  **Before**

  ```js
  import { defineAbility } from '@casl/ability';
  import { permittedFieldsOf } from '@casl/ability/extra';

  const ability = defineAbility((can) => {
    can('read', 'Article');
  });

  const fields = permittedFieldsOf(ability, 'read', 'Article'); // []
  ```

  **After**

  ```js
  import { defineAbility } from '@casl/ability';
  import { permittedFieldsOf } from '@casl/ability/extra';

  const ability = defineAbility((can) => {
    can('read', 'Article');
  });

  const ARTICLE_FIELDS = ['id', 'title', 'description'];
  const fields = permittedFieldsOf(ability, 'read', 'Article', {
    fieldsFrom: rule => rule.fields || ARTICLE_FIELDS
  }); // ['id', 'title', 'description']
  ```
* **ruleIndex:** string and class (or function constructor) are the only possible subject types for now. `detectSubjectType` is now responsible only for detecting subject type from object

  **Before**

  When providing subject type it was important to handle cases when passed in argument is a string or function. As an alternative it was possible to call built-in `detectSubjectType` which could catch this cases:

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([], {
    detectSubjectType(object) {
      if (object && typeof object === 'object') {
        return object.__typename;
      }

      return detectSubjectType(object);
  });
  ```

  **After**

  There is no need to handle subject type values in `detectSubjectType` function anymore. It's now handled internally:

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([], {
    detectSubjectType: object => object.__typename
  });
  ```

  Also it's important to note that it's no longer possible to use classes and strings as subject types interchangeably as it was before. Now, if you want to use classes, you should use them everywhere and define custom `detectSubjecType`:

  **Before**

  ```js
  import { defineAbility } from '@casl/ability';

  class Post {}
  const ability = defineAbility((can) => {
    can('read', Post);
    can('update', 'Post');
  });

  ability.can('read', 'Post') // true
  ability.can('read', Post) // true
  ability.can('update', Post) // true
  ```

  **After**

  ```js
  import { defineAbility } from '@casl/ability';

  class Post {}
  const ability = defineAbility((can) => {
    can('read', Post);
    can('update', 'Post');
  }, {
    detectSubjectType: object => object.constructor
  });

  ability.can('read', 'Post') // false, 'Post' and Post are considered different now
  ability.can('read', Post) // true
  ability.can('update', Post) // false, because `update` is configured for 'Post' string
  ability.can('read', new Post()) // true
  ability.can('update', new Post()) // false, because `update` is configured for 'Post' string and subject type of this object is `Post` class
  ```
* **ruleIndex:** `rulesFor`, `possibleRulesFor`, `rulesToQuery`, `ruleToAST`, `rulesToFields` accepts only subject type now!

  **Before**

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([
    { action: 'read', subject: 'Post' }
  ]);

  class Post {}

  console.log(ability.rulesFor('read', new Post())); // [Rule]
  console.log(ability.rulesFor('read', 'Post')); // [Rule]
  ```

  **After**

  ```js
    import { Ability } from '@casl/ability';

  const ability = new Ability([
    { action: 'read', subject: 'Post' }
  ]);

  class Post {}

  console.log(ability.rulesFor('read', new Post())); // throws exception
  console.log(ability.rulesFor('read', 'Post')); // [Rule]
  ```

  Other functions and methods have the same behavior
* **builder:** changes main generic parameter to be a class instead of instance and makes `defineAbility` to accept options as the 2nd argument.

  **Before**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility({ resolveAction }, (can) => can('read', 'Item'));
  const builder = new AbilityBuilder<Ability>(Ability);
  ```

  **After**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility((can) => can('read', 'Item'), { resolveAction });
  const builder = new AbilityBuilder(Ability); // first argument is now mandatory!
  ```

  The 1st parameter to `AbilityBuilder` is now madatory. This allows to infer generic parameters from it and makes AbilityType that is built to be explicit.
* **builder:** `can` and `cannot` methods of `AbilityBuilder` now restricts what fields and operators can be used inside conditions (i.e., `MongoQuery`). Also these methods now suggests object fields based on passed instance

  **Before**

  ```ts
  import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

  interface Person {
    kind: 'Person'
    firstName: string
    lastName: string
    age: number
    address: {
      street: string
      city: string
    }
  }

  type AppAbility = Ability<['read', Person | Person['kind']]>;
  cons AppAbility = Ability as AbilityClass<AppAbility>;
  cons { can } = new AbilityBuilder(AppAbility);

  can('read', 'Person', {
    'address.street': 'Somewhere in the world',
    fistName: 'John' // unintentional typo
  });
  can('read', 'Person', ['fistName', 'lastName'], { // no intellisense for fields
    age: { $gt: 18 }
  })
  ```

  **After**

  Because provided keys in the example above doesn't exist on `Person` interface, TypeScript throws an error. So, we are safe from typos! But what about dot notation? It's also supported but in more typesafe way:

  ```ts
  import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

  interface Person {
    kind: 'Person'
    firstName: string
    lastName: string
    age: number
    address: {
      street: string
      city: string
    }
  }

  type AppAbility = Ability<['read', Person | Person['kind']]>;
  cons AppAbility = Ability as AbilityClass<AppAbility>;
  cons { can } = new AbilityBuilder(AppAbility);

  interface PersonQuery extends Person {
    'address.street': Person['address']['street']
    'address.city': Person['address']['city']
  }

  can<PersonQuery>('read', 'Person', {
    'address.street': 'Somewhere in the world',
    fistName: 'John' // unintentional typo
  });
  can<PersonQuery>('read', 'Person', ['firstName', 'lastName'], {
    age: { $gt: 18 }
  })
  ```

  Intellisense and type checking for fields is also implemented! To be able to use wildcards in fields just add additional generic parameter:

  ```ts
  can<PersonQuery, 'address.*'>('read', 'Person', ['firstName', 'address.*'], {
    age: { $gt: 18 }
  })
  ```

# [5.1.0-next.15](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.14...@casl/ability@5.1.0-next.15) (2020-12-20)


### Bug Fixes

* **package:** removes `engine` section that points to npm@6 ([eecd12a](https://github.com/stalniy/casl/commit/eecd12ac49f56d6a0f57d1a57fb37487335b5f03)), closes [#417](https://github.com/stalniy/casl/issues/417)
* **types:** makes parameters of `AbilityClass` optional ([e7d0815](https://github.com/stalniy/casl/commit/e7d0815bfc2e18f4158bf5464b844fd55be92680))

# [5.1.0-next.14](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.13...@casl/ability@5.1.0-next.14) (2020-12-19)


### Bug Fixes

* **build:** ensure dist is updated before ([0a879f7](https://github.com/stalniy/casl/commit/0a879f7162b8e5010a78ddff0f858f00b3537aa5))

# [5.1.0-next.13](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.12...@casl/ability@5.1.0-next.13) (2020-12-19)


### Bug Fixes

* **types:** ensure `ForceSubject` generic parameter is preserved in resulting d.ts files ([e97e5fe](https://github.com/stalniy/casl/commit/e97e5fe012e48553ae61a42f8c8240506056afed))


### Reverts

* **extra:** makes `rulesToQuery` return an object with `Object` prototype ([dcb7254](https://github.com/stalniy/casl/commit/dcb725471f125d4f7989f116ebf729dee7f53bef))

# [5.1.0-next.12](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.11...@casl/ability@5.1.0-next.12) (2020-11-18)


### Bug Fixes

* **ability:** replaces getters with functions to ensure terser properly minifies them ([386ecb6](https://github.com/stalniy/casl/commit/386ecb6df79aa466f10e3e2eccea4d3771c97ad4))
* **extra:** makes `permittedFieldsOf` to iterate from the end of array ([81e6409](https://github.com/stalniy/casl/commit/81e64096eb780762e117dae05cfa7cafad801aa3))


### Code Refactoring

* **extra:** makes `fieldsFrom` option to be mandatory for `permittedFieldsOf` [skip release] ([df29b0d](https://github.com/stalniy/casl/commit/df29b0d7364ab1964d4d7b3b98212615beaa4952))
* **types:** restricts which utility types are exported by library ([e98618f](https://github.com/stalniy/casl/commit/e98618f34d0a29358644b6c11ce87398ffeb2437))


### Reverts

* **builder:** reverts back `AbilityBuilder` generic parameter ([aa7b45f](https://github.com/stalniy/casl/commit/aa7b45f69c4fc7b603b8b5be3e9982d370d3398a))


### BREAKING CHANGES

* **types:** types `AliasesMap`, `TaggedInterface`, `AbilityTupleType`, `ToAbilityTypes`, `AnyObject` are no longer exported by the library
* **extra:** makes `fieldsFrom` option to be mandatory for `permittedFieldsO
f`. This reduces confusion around why `permittedFieldsOf` returns empty array when user can manage entity fields. So, now this logic is just explicit and clear

  **Before**

  ```js
  import { defineAbility } from '@casl/ability';
  import { permittedFieldsOf } from '@casl/ability/extra';

  const ability = defineAbility((can) => {
    can('read', 'Article');
  });

  const fields = permittedFieldsOf(ability, 'read', 'Article'); // []
  ```

  **After**

  ```js
  import { defineAbility } from '@casl/ability';
  import { permittedFieldsOf } from '@casl/ability/extra';

  const ability = defineAbility((can) => {
    can('read', 'Article');
  });

  const ARTICLE_FIELDS = ['id', 'title', 'description'];
  const fields = permittedFieldsOf(ability, 'read', 'Article', {
    fieldsFrom: rule => rule.fields || ARTICLE_FIELDS
  }); // ['id', 'title', 'description']
  ```

# [5.1.0-next.11](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.10...@casl/ability@5.1.0-next.11) (2020-10-17)


### Bug Fixes

* **README:** removes explanation duplicated from intro guide ([6315aa7](https://github.com/stalniy/casl/commit/6315aa7eea681d76bda947a7d5353da39c48e005))


### Code Refactoring

* **ruleIndex:** `detectSubjectType` option is now responsible only for detecting subject type from objects [skip release] ([ebeaadc](https://github.com/stalniy/casl/commit/ebeaadc0974a3e1697b34b3d85d2510d65b73dbb))


### BREAKING CHANGES

* **ruleIndex:** string and class (or function constructor) are the only possible subject types for now. `detectSubjectType` is now responsible only for detecting subject type from object

  **Before**

  When providing subject type it was important to handle cases when passed in argument is a string or function. As an alternative it was possible to call built-in `detectSubjectType` which could catch this cases:

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([], {
    detectSubjectType(object) {
      if (object && typeof object === 'object') {
        return object.__typename;
      }

      return detectSubjectType(object);
  });
  ```

  **After**

  There is no need to handle subject type values in `detectSubjectType` function anymore. It's now handled internally:

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([], {
    detectSubjectType: object => object.__typename
  });
  ```

  Also it's important to note that it's no longer possible to use classes and strings as subject types interchangeably together as it was before. Now, if you want to use classes, you should use them everywhere:

  **Before**

  ```js
  import { defineAbility } from '@casl/ability';

  class Post {}
  const ability = defineAbility((can) => {
    can('read', Post);
    can('update', 'Post');
  });

  ability.can('read', 'Post') // true
  ability.can('read', Post) // true
  ability.can('update', Post) // true
  ```

  **After**

  ```js
  import { defineAbility } from '@casl/ability';

  class Post {}
  const ability = defineAbility((can) => {
    can('read', Post);
    can('update', 'Post');
  });

  ability.can('read', 'Post') // false, 'Post' and Post are considered different now
  ability.can('read', Post) // true
  ability.can('update', Post) // false
  ```

# [5.1.0-next.10](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.9...@casl/ability@5.1.0-next.10) (2020-10-17)


### Code Refactoring

* **ruleIndex:** removes possibility to pass subject to `rulesFor` and `possibleRulesFor` [skip release] ([b8c324d](https://github.com/stalniy/casl/commit/b8c324d747f0a4fb8554931a85f1af211fe3c268))


### Performance Improvements

* **ruleIndex:** removes subject type detection from `_buildIndexFor` ([13fe934](https://github.com/stalniy/casl/commit/13fe93437fa3f9f5604a962eecaac02c663b39cb))


### BREAKING CHANGES

* **ruleIndex:** `rulesFor`, `possibleRulesFor`, `rulesToQuery`, `ruleToAST`, `rulesToFields` accepts only subject type now!

  **Before**

  ```js
  import { Ability } from '@casl/ability';

  const ability = new Ability([
    { action: 'read', subject: 'Post' }
  ]);

  class Post {}

  console.log(ability.rulesFor('read', new Post())); // [Rule]
  console.log(ability.rulesFor('read', 'Post')); // [Rule]
  ```

  **After**

  ```js
    import { Ability } from '@casl/ability';

  const ability = new Ability([
    { action: 'read', subject: 'Post' }
  ]);

  class Post {}

  console.log(ability.rulesFor('read', new Post())); // throws exception
  console.log(ability.rulesFor('read', 'Post')); // [Rule]
  ```

  Other functions and methods have the same behavior

# [5.1.0-next.9](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.8...@casl/ability@5.1.0-next.9) (2020-09-28)


### Performance Improvements

* **events:** converts LinkedItem into POJO and regular functions ([6f2de73](https://github.com/stalniy/casl/commit/6f2de73550d7304bc22487d93ea9e5b9dc6a3b64))
* **extra:** replaces object with `Set` in `permittedFieldsOf` ([a9260d1](https://github.com/stalniy/casl/commit/a9260d17c71bfe1c497f058c2b080b102cb28ed6))

# [5.1.0-next.8](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.7...@casl/ability@5.1.0-next.8) (2020-09-26)


### Performance Improvements

* **rule:** ensures conditions/field matcher created only when we have object/field to check ([110a69d](https://github.com/stalniy/casl/commit/110a69d049e8abd6711f8d111af0a28e8d079428))

# [5.1.0-next.7](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.6...@casl/ability@5.1.0-next.7) (2020-09-25)


### Performance Improvements

* **events:** moves out side-effect from `LinkedItem` constructor ([3657c7f](https://github.com/stalniy/casl/commit/3657c7f6d1e24ef2f4a73d1fadee12a529b8148b))

# [5.1.0-next.6](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.5...@casl/ability@5.1.0-next.6) (2020-09-25)


### Performance Improvements

* **events:** handles event removal in space efficient way ([71246e2](https://github.com/stalniy/casl/commit/71246e220b6c1abddd553ff8684cdc8732106d57))

# [5.1.0-next.5](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.4...@casl/ability@5.1.0-next.5) (2020-09-23)


### Bug Fixes

* **ability:** ensure default field matcher can match fields with partial patterns inside ([362f49f](https://github.com/stalniy/casl/commit/362f49fce07ceb08725f129ee4c7251d20fee9f2)), closes [#388](https://github.com/stalniy/casl/issues/388)
* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)
* **condtions:** adds interpreter for `$and` parsing instruction ([3166a32](https://github.com/stalniy/casl/commit/3166a32a4803b06ceb7a682007b503b2185a7240))

# [5.1.0-next.4](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.3...@casl/ability@5.1.0-next.4) (2020-08-28)


### Performance Improvements

* **ability:** replaces object for storing index with ES6 Map ([d1fa117](https://github.com/stalniy/casl/commit/d1fa117c090e41c2b5f176f467e7561456961c78))

# [5.1.0-next.3](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.2...@casl/ability@5.1.0-next.3) (2020-08-28)


### Performance Improvements

* **ability:** creates conditions and field matcher lazily ([4ae7799](https://github.com/stalniy/casl/commit/4ae779902c0a59c6dea6f3535ba2fd80cac691da))

# [5.1.0-next.2](https://github.com/stalniy/casl/compare/@casl/ability@5.1.0-next.1...@casl/ability@5.1.0-next.2) (2020-08-27)


### Features

* **builder:** improves typings for AbilityBuilder [skip release] ([ebd4d17](https://github.com/stalniy/casl/commit/ebd4d17a355a2646467033118a3d6efee4321d27)), closes [#379](https://github.com/stalniy/casl/issues/379)
* **builder:** improves typings of `AbilityBuilder['can']` and `AbilityBuilder['cannot']` methods [skip release] ([98ffbfc](https://github.com/stalniy/casl/commit/98ffbfc58fbfa810020e9b79d22d27d67563e5b7)), closes [#333](https://github.com/stalniy/casl/issues/333)


### Performance Improvements

* **events:** utilizes LinkedList for storing event handlers ([e2fd265](https://github.com/stalniy/casl/commit/e2fd2656e06af1883ac3f428b97add1ce14727fb))
* **rules:** improves merging logic of rules of subject and `manage all` ([6f8a13a](https://github.com/stalniy/casl/commit/6f8a13a507a2caafe7d6877c9a6f28cdd56c59bc))


### BREAKING CHANGES

* **builder:** changes main generic parameter restriction to accept any class and makes `defineAbility` to accept options as the 2nd argument.

  **Before**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility({ resolveAction }, (can) => can('read', 'Item'));
  const builder = new AbilityBuilder<Ability>(Ability);
  ```

  **After**

  ```ts
  import { AbilityBuilder, defineAbility, Ability } from '@casl/ability';

  const resolveAction = (action: string) => {/* custom implementation */ };
  const ability = defineAbility((can) => can('read', 'Item'), { resolveAction });
  const builder = new AbilityBuilder(Ability); // first argument is now mandatory!
  ```

  The 1st parameter to `AbilityBuilder` is now madatory. This allows to infer generic parameters from it and makes AbilityType that is built to be explicit.
* **builder:** `can` and `cannot` methods of `AbilityBuilder` now restricts what fields and operators can be used inside conditions (i.e., `MongoQuery`). Also these methods now suggests object fields based on passed instance

  **Before**

  ```ts
  import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

  interface Person {
    kind: 'Person'
    firstName: string
    lastName: string
    age: number
    address: {
      street: string
      city: string
    }
  }

  type AppAbility = Ability<['read', Person | Person['kind']]>;
  cons AppAbility = Ability as AbilityClass<AppAbility>;
  cons { can } = new AbilityBuilder(AppAbility);

  can('read', 'Person', {
    'address.street': 'Somewhere in the world',
    fistName: 'John' // unintentional typo
  });
  can('read', 'Person', ['fistName', 'lastName'], { // no intellisense for fields
    age: { $gt: 18 }
  })
  ```

  **After**

  Because provided keys in the example above doesn't exist on `Person` interface, TypeScript throws an error. So, we are safe from typos! But what about dot notation? It's also supported but in more typesafe way:

  ```ts
  import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

  interface Person {
    kind: 'Person'
    firstName: string
    lastName: string
    age: number
    address: {
      street: string
      city: string
    }
  }

  type AppAbility = Ability<['read', Person | Person['kind']]>;
  cons AppAbility = Ability as AbilityClass<AppAbility>;
  cons { can } = new AbilityBuilder(AppAbility);

  interface PersonQuery extends Person {
    'address.street': Person['address']['street']
    'address.city': Person['address']['city']
  }

  can<PersonQuery>('read', 'Person', {
    'address.street': 'Somewhere in the world',
    fistName: 'John' // unintentional typo
  });
  can<PersonQuery>('read', 'Person', ['firstName', 'lastName'], {
    age: { $gt: 18 }
  })
  ```

  Intellisense and type checking for fields is also implemented! To be able to use wildcards in fields just add additional generic parameter:

  ```ts
  can<PersonQuery, 'address.*'>('read', 'Person', ['firstName', 'address.*'], {
    age: { $gt: 18 }
  })
  ```

# [5.1.0-next.1](https://github.com/stalniy/casl/compare/@casl/ability@5.0.1-next.1...@casl/ability@5.1.0-next.1) (2020-08-20)


### Features

* **esm:** adds ESM support for latest Node.js through `exports` prop in package.json ([cac2506](https://github.com/stalniy/casl/commit/cac2506a80c18f194210c2d89108d1d094751fa4)), closes [#331](https://github.com/stalniy/casl/issues/331)
* **extra:** adds `rulesToAST` that converts rules into [@ucast](https://github.com/ucast) AST ([55fd6ee](https://github.com/stalniy/casl/commit/55fd6eeb9e0b71bb38f1db8cfb87ba7fad391988)), closes [#350](https://github.com/stalniy/casl/issues/350)

## [5.0.1-next.1](https://github.com/stalniy/casl/compare/@casl/ability@5.0.0...@casl/ability@5.0.1-next.1) (2020-08-11)


### Bug Fixes

* **conditions:** moves logic related to compare complex types to @ucast/mongo2js ([9bd6a1b](https://github.com/stalniy/casl/commit/9bd6a1b90f6f949e8b6eb51cc406f6c44f33a705))

# Deprecated [5.0.0](https://github.com/stalniy/casl/compare/@casl/ability@4.1.5...@casl/ability@5.0.0) (2020-08-10)

**This version was released accidentally, PLEASE DO NOT USE IT!**

### Bug Fixes

* **ability:** removes sift specific types from casl ([9f18b31](https://github.com/stalniy/casl/commit/9f18b31cfaf09d8b6471abcb5dea14873d184eb6))


### Code Refactoring

* **ability:** removes deprecated types and fields ([bf5ef73](https://github.com/stalniy/casl/commit/bf5ef736a0add07c15ce1360ef21f45bff777973)), closes [#355](https://github.com/stalniy/casl/issues/355)
* **package:** replaces siftjs with @ucast/mongo2js ([41e53aa](https://github.com/stalniy/casl/commit/41e53aa12814e5a397ecb0b94fe33f182c55240e)), closes [#350](https://github.com/stalniy/casl/issues/350)


### Features

* **ability:** stores `ast` property in `Rule` if `conditionsMatcher` has `ast` ([53e5e28](https://github.com/stalniy/casl/commit/53e5e288b6a69690e344421749d434b77fa10a4d)), closes [#350](https://github.com/stalniy/casl/issues/350)


### BREAKING CHANGES

* **package:** replaces siftjs with @ucast/mongo2js. This changed `MongoQuery` type and `buildMongoQueryMatcher` function parameters. Influences users who implemented custom sift operators:

  * `MongoQuery` accepted a generic type of AdditionalOperators, now it accepts an object interface and custom operators
  * `MongoQueryOperators` is renamed to `MongoQueryFieldOperators` and now accepts `Value` generic parameter
  * `buildMongoQuery` now accepts 3 optional parameters: [custom parsing instruction](https://www.npmjs.com/package/@ucast/mongo#custom-operator), [custom operator interpreters](https://www.npmjs.com/package/@ucast/js#custom-operator-interpreter) and [options for JavaScript interpreters](https://www.npmjs.com/package/@ucast/js#custom-interpreter)
  * `Ability` does not compare objects anymore, so if you rely on value to equal specific object, then you need to either change your conditions or implement custom `equal` function

  **Before**

  ```ts
  import { MongoQuery, MongoQueryOperators, buildMongoQueryMatcher } from '@casl/ability';
  import { $nor } from 'sift';

  type CustomMongoQuery = MongoQuery<{
    $customOperator: Function
  }>;
  type $eq = MongoQueryOperators['$eq'];

  const matcher = buildMongoQueryMatcher({ $nor })
  ```

  **After**

  ```ts
  import { MongoQuery, MongoQueryFieldOperators, buildMongoQueryMatcher } from '@casl/ability';
  import { $nor, nor } from '@ucast/mongo2js'

  type CustomMongoQuery<T> = MongoQuery<T, {
    toplevel: {
      // can be used only on document level
      $customOperator: Function
    },
    field: {
      // can be used only on field level
      $my: boolean
    }
  }>
  type $eq = MongoQueryFieldOperators['$eq']; // accepts optional `Value` generic parameter

  const matcher = buildMongoQueryMatcher({ $nor }, { nor });
        ```
* **ability:** removes deprecated options and types:

* `AbilityOptions['subjectName']` has been removed, use `detectSubjectType` instead
* `LegacyClaimRawRule` and `LegacySubjectRawRule` are both removed, so you are no longer allowed to use `actions` in rule definition, use `action` property instead
* `Ability` throws an error if you specify a rule with property `field` to be an empty array
* `Ability` no longer warns about using only inverted rules. This may be done by intention, so now it's left up to developer to decide whether it's fine or not

## [4.1.6](https://github.com/stalniy/casl/compare/@casl/ability@4.1.5...@casl/ability@4.1.6) (2020-09-06)

### Bug Fixes

* **ability:** ensure default field matcher can match fields with partial patterns inside ([362f49f](https://github.com/stalniy/casl/commit/362f49fce07ceb08725f129ee4c7251d20fee9f2)), closes [#388](https://github.com/stalniy/casl/issues/388)
* **ability:** removes sift specific types from casl ([9f18b31](https://github.com/stalniy/casl/commit/9f18b31cfaf09d8b6471abcb5dea14873d184eb6))
* **angular:** fixes sourcemap generation for the code built by ngc ([7715263](https://github.com/stalniy/casl/commit/771526379ff8203170a433d71b68644a48ff44eb)), closes [#387](https://github.com/stalniy/casl/issues/387) [#382](https://github.com/stalniy/casl/issues/382)

## [4.1.5](https://github.com/stalniy/casl/compare/@casl/ability@4.1.4...@casl/ability@4.1.5) (2020-06-08)


### Bug Fixes

* **package:** makes sure the latest casl works with Angular 8.x ([91ee505](https://github.com/stalniy/casl/commit/91ee505f25b77c7ddf13a066d9d0c22f6d8d2f99)), closes [#337](https://github.com/stalniy/casl/issues/337)

## [4.1.4](https://github.com/stalniy/casl/compare/@casl/ability@4.1.3...@casl/ability@4.1.4) (2020-06-02)


### Bug Fixes

* **ability:** makes sure error for wrong `Ability` usage is thrown ([db62daf](https://github.com/stalniy/casl/commit/db62dafee3b9d1db08ab49edbcfe0209a34584ae)), closes [#334](https://github.com/stalniy/casl/issues/334)

## [4.1.3](https://github.com/stalniy/casl/compare/@casl/ability@4.1.2...@casl/ability@4.1.3) (2020-05-27)


### Bug Fixes

* **ability:** makes sure Ability notifies about edge cases: empty fields array and field level checks without fieldMatcher ([48a49ed](https://github.com/stalniy/casl/commit/48a49eddec46e3a9b56e06039762e18136e39ca4)), closes [#329](https://github.com/stalniy/casl/issues/329) [#330](https://github.com/stalniy/casl/issues/330) [#328](https://github.com/stalniy/casl/issues/328)

## [4.1.2](https://github.com/stalniy/casl/compare/@casl/ability@4.1.1...@casl/ability@4.1.2) (2020-05-27)


### Bug Fixes

* **ability:** throws error when trying to check permissions on field with unconfigured fieldMatcher option ([e5f2add](https://github.com/stalniy/casl/commit/e5f2add3358964bf8884489109c307eb13bfdfc4)), closes [#330](https://github.com/stalniy/casl/issues/330)

## [4.1.1](https://github.com/stalniy/casl/compare/@casl/ability@4.1.0...@casl/ability@4.1.1) (2020-05-25)


### Bug Fixes

* **README:** adds a note about js examples and link to TypeScript support ([bd9dc59](https://github.com/stalniy/casl/commit/bd9dc590536148611571cb1e0bbe5c06ff6d96fd)), closes [#305](https://github.com/stalniy/casl/issues/305)

# [4.1.0](https://github.com/stalniy/casl/compare/@casl/ability@4.0.8...@casl/ability@4.1.0) (2020-05-19)


### Bug Fixes

* **deps:** update dependency sift to v13 ([fa3eecc](https://github.com/stalniy/casl/commit/fa3eecc7bc01d3bcce4e99fc35bfc27a6cec2bcf))


### Features

* **error:** makes `ForbiddenError.ability` to be a readonly public prop ([3a0342d](https://github.com/stalniy/casl/commit/3a0342dbeae1a5719197acf5351bb11fda1789f1)), closes [#264](https://github.com/stalniy/casl/issues/264)

## [4.0.8](https://github.com/stalniy/casl/compare/@casl/ability@4.0.7...@casl/ability@4.0.8) (2020-04-29)


### Bug Fixes

* **dist:** ensure object spread operator is converted to `Object.assign` in ES6 build ([fefc955](https://github.com/stalniy/casl/commit/fefc95544f739f7f9d0c7ba0f8a295160cd5fc9d))

## [4.0.7](https://github.com/stalniy/casl/compare/@casl/ability@4.0.6...@casl/ability@4.0.7) (2020-04-22)


### Bug Fixes

* **alias:** simplifies types for expandActions ([395dde7](https://github.com/stalniy/casl/commit/395dde714bcce1522b9c706ed0941e21395d6673))

## [4.0.6](https://github.com/stalniy/casl/compare/@casl/ability@4.0.5...@casl/ability@4.0.6) (2020-04-20)


### Bug Fixes

* **can:** changes link in exception to new documentation ([c133d4e](https://github.com/stalniy/casl/commit/c133d4ebc7aaa6d63192cd9adc19a18d55d50713))

## [4.0.5](https://github.com/stalniy/casl/compare/@casl/ability@4.0.4...@casl/ability@4.0.5) (2020-04-17)


### Bug Fixes

* **ability:** relax types for MongoQueryOperators ([2960064](https://github.com/stalniy/casl/commit/296006458c11fdc75a72e7a2e0e074ff0e26eefa))

## [4.0.4](https://github.com/stalniy/casl/compare/@casl/ability@4.0.3...@casl/ability@4.0.4) (2020-04-11)


### Bug Fixes

* **README:** updates README to the latest version. makes sure all links are working ([839441c](https://github.com/stalniy/casl/commit/839441c59174010cf0b821c6995a9f227a261db7))

## [4.0.3](https://github.com/stalniy/casl/compare/@casl/ability@4.0.2...@casl/ability@4.0.3) (2020-04-10)


### Bug Fixes

* **ability:** reverts back `ability.rules` types to RawRule ([6d6b85f](https://github.com/stalniy/casl/commit/6d6b85f65527ca1543b856b68e12239be84ee3d3))

## [4.0.2](https://github.com/stalniy/casl/compare/@casl/ability@4.0.1...@casl/ability@4.0.2) (2020-04-10)


### Bug Fixes

* **ability:** improves inference of `abilities` by using virtual ts properties ([c134642](https://github.com/stalniy/casl/commit/c1346420235e7e76a2e3a1e5c8256ed253d78768))
* **packages:** makes eventual lib size to be smaller ([93a3bec](https://github.com/stalniy/casl/commit/93a3becdde7672bc1362ce11dac0d8247e583b9d)), closes [#287](https://github.com/stalniy/casl/issues/287)

## [4.0.1](https://github.com/stalniy/casl/compare/@casl/ability@4.0.0...@casl/ability@4.0.1) (2020-04-09)


### Bug Fixes

* **ability:** makes sure extra submodule is published ([096e4f7](https://github.com/stalniy/casl/commit/096e4f7a7edee9ce659f0243cc8c399326f542fd)), closes [#284](https://github.com/stalniy/casl/issues/284)

# [4.0.0](https://github.com/stalniy/casl/compare/@casl/ability@3.4.0...@casl/ability@4.0.0) (2020-04-09)


### Bug Fixes

* **ability:** ensures that `ForbiddenError` correctly inherits `Error` in ES5 ([12a74f2](https://github.com/stalniy/casl/commit/12a74f2d82397123d6220e374e134e402c67c94a)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **ability:** extracts types to a separate file ([df1fec1](https://github.com/stalniy/casl/commit/df1fec1ea6b3af6fb5a0f1c5792ac990f4343abf)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **ability:** improves PackedRule type ([a781921](https://github.com/stalniy/casl/commit/a781921ca7330d9858d93cb15457602a857dcb96)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **ability:** makes sure `AbilityBuilder` correctly detects conditions ([1c35393](https://github.com/stalniy/casl/commit/1c353935dcf93ae506815828187867f69650edca)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **deps:** update dependency sift to v12 ([71593ca](https://github.com/stalniy/casl/commit/71593cad97c7611ae9dfe8f1dfeb5483173bff2a))
* **mongoose:** ensures mongoose works with MongoQuery conditions ([f92b7df](https://github.com/stalniy/casl/commit/f92b7df532ecca24ee05d02cf9388b21f8d242fa)), closes [#249](https://github.com/stalniy/casl/issues/249)


### Features

* **ability:** adds `subject` helper which allows to define subject type for DTO ([834c24f](https://github.com/stalniy/casl/commit/834c24fa8014ee193caa260c97a29ed2edbb52df))
* **ability:** adds generic types to Ability and related types [skip ci] ([4e56fda](https://github.com/stalniy/casl/commit/4e56fdaf92baabcdfece758e7a6ca369176e7fee)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **ability:** adds typescript support for checks only by action ([b652df1](https://github.com/stalniy/casl/commit/b652df1256bd66e1aa5d47f27b41fb0c527840d2)), closes [#107](https://github.com/stalniy/casl/issues/107)
* **ability:** allows to do fine grained config ([2b97c57](https://github.com/stalniy/casl/commit/2b97c579b5d0841b75ba28a0bf969247fdb54beb)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **ability:** allows to pass `fieldMatcher` and `conditionsMatcher` ([d23af56](https://github.com/stalniy/casl/commit/d23af562376fd6d2389a7bfcdeb3b5140b682ec8)), closes [#258](https://github.com/stalniy/casl/issues/258)
* **ability:** allows to specify class as subject type ([9c6041a](https://github.com/stalniy/casl/commit/9c6041adbad9bcb2c5655ad9656b4a705ed88a79)), closes [#187](https://github.com/stalniy/casl/issues/187)
* **ability:** improves typing for `GetSubjectName` and adds default values for generics ([c089293](https://github.com/stalniy/casl/commit/c08929301a1b06880c054cbb2f21cda3725028a4)), closes [#256](https://github.com/stalniy/casl/issues/256)
* **ability:** makes aliasing to be tree-shakable and per `Ability` instance ([fc22d49](https://github.com/stalniy/casl/commit/fc22d49ae40c8fdd5606977bbd27d6a4325e9ef6)), closes [#248](https://github.com/stalniy/casl/issues/248)
* **ability:** removes deprecated methods ([7d26f56](https://github.com/stalniy/casl/commit/7d26f569f37254c7a21b0ce0fd96601ed0c6d8f0)), closes [#257](https://github.com/stalniy/casl/issues/257)
* **ability:** returns `all` for empty subjects ([f5d41e0](https://github.com/stalniy/casl/commit/f5d41e04dea9bf1baf1b9e1aac5b3264727296e7)), closes [#107](https://github.com/stalniy/casl/issues/107) [#256](https://github.com/stalniy/casl/issues/256)
* **ability:** split `Ability` into `PureAbility` (base class) and `Ability` (preconfigured PureAbility) ([9536205](https://github.com/stalniy/casl/commit/953620523359f1c90b13a46a5314b9c034e28ec8)), closes [#249](https://github.com/stalniy/casl/issues/249)


### BREAKING CHANGES

* **subjectName:** subject name now returns `all` for subjects which type cannot be determined
* **api:** removes deprecated methods:
  * `ability.throwUnlessCan` in favor of `ForbiddenError.from(ability).throwUnlessCan`
* **alias:** aliasing functionality was refactored to support tree-shaking and have per instance:

  Before:

  ```js
  import { Ability } from '@casl/ability';

  Ability.addAlias('modify', ['create', 'update']);
  const ability = new Ability([]);

  ability.can('modify', 'Post');
  ```

  After:

  ```js
  import { Ability, createAliasResolver } from '@casl/ability';

  const resolveAction = createAliasResolver({
    modify: ['create', 'update']
  });

  const ability = new Ability([], { resolveAction });

  ability.can('modify', 'Post');
  ```

* **alias**: no more default aliases are shipped with `@casl/ability`. So, if you used `crud`, you need to add it yourself.

  Before:

  ```js
  import { AbilityBuilder } from '@casl/ability';

  const ability = AbilityBuilder.define((can) => {
    can("crud", "Post");
  });

  ability.can("crud", "Post"); // true
  ```

  After:

  ```js
  import { defineAbility, createAliasResolver } from '@casl/ability';

  const resolveAction = createAliasResolver({
    crud: ['create', 'read', 'update', 'delete']
  });
  const ability = defineAbility({ resolveAction }, (can) => {
    can("crud", "Post");
  });

  ability.can("crud", "Post"); // true
  ```

* **options**: no more possibility to pass custom `Rule` class (this was undocumented feature). Now you should use `conditionsMatcher` and `fieldMatcher` instead.

  Before:

  ```js
  import { Ability, Rule } from '@casl/ability';
  import sift from 'sift';

  class MyCustomRule extends Rule {
    constructor(...args) {
      super(...args);
      this._matches = sift(/* custom sift options */)
    }
  }

  const ability = new Ability([], { RuleType: MySiftRule })
  ```

  After:

  Depending on the usecase you should use either `mongoConditionsMatcher` (to restrict rules) or `buildMongoQueryMatcher` to extend them. See docs for details:

  ```js
  import {
    Ability,
    AbilityBuilder,
    buildMongoQueryMatcher,
  } from '@casl/ability';
  import { $nor } from 'sift';

  const conditionsMatcher = buildMongoQueryMatcher({ $nor });
  export default function defineAbilityFor(user) {
    const { can, build } = new AbilityBuilder(Ability);

    can('read', 'Article', {
      $nor: [{ private: true }, { authorId: user.id }]
    });

    return build({ conditionsMatcher });
  }
  ```
* **builder**: removes `AbilityBuilder.define` in favor of `defineAbility` and `AbilityBuilder.extract` in favor of `new AbilityBuilder()`

  Before:

  ```js
  import { AbilityBuilder, Ability } from '@casl/ability';

  const ability = AbilityBuilder.define((can, cannot) => {
    can('read', 'Post');
    cannot('delete', 'Post', { private: true });
  });

  // or
  const { can, cannot, rules } = AbilityBuilder.extract();

  can('read', 'Post');
  cannot('delete', 'Post', { private: true });

  const ability = new Ability(rules);
  ```

  After:

  ```js
  import { defineAbility, AbilityBuilder, Ability } from '@casl/ability';

  const ability = defineAbility((can, cannot) => {
    can('read', 'Post');
    cannot('delete', 'Post', { private: true });
  });

  // or
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  can('read', 'Post');
  cannot('delete', 'Post', { private: true });

  const ability = new Ability(rules);
  ```

* **error**: `ForbiddenError` constructor now accepts `Ability` instance as a parameter. See API docs for details
* **Ability**: `emit`, `buildIndexFor`, `mergeRulesFor` are now private methods
* **rule**: deprecated use of `actions` in rules in favor of singular form `action`, however the 1st is still supported:

  Before:

  ```js
  const rules = [
    { actions: 'read', subject: 'Post' }
  ];
  ```

  After:

  ```js
  const rules = [
    { action: 'read', subject: 'Post' }
  ]
  ```
* **options:** `subjectName` option is renamed to `detectSubjectType`, however the 1st name is still supported for backward compatibility.
* **typescript:** weak hand written declaration files are removed as `@casl/ability` has been completely rewritten to TypeScript.


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
