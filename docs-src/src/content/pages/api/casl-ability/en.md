---
title: "@casl/ability API"
categories: [api]
order: 10
meta:
  keywords: ~
  description: ~
---

`@casl/ability` contains 2 modules:

* core module which provides `Ability` and other core classes

  ```ts
  import * as core from '@casl/ability';
  ```

* extra module which provides additional helper functions

  ```ts
  import * as extra from '@casl/ability/extra';
  ```

This page describes API documentation for core package only. Check [@casl/ability/extra API](../casl-ability-extra) to get information about helper functions.

> All examples on this page uses [TypeScript](https://www.typescriptlang.org/)

## PureAbility

`PureAbility` is a base class that implements the functionality of checking permissions. The prefix "Pure" has nothing to do with functional programming. It just means this class has no predefined configuration.

It is a generic class that accepts 2 parameters:

1. `Abilities` is either a string (or a union of literal string types) that represents possible actions or a tuple of 2 elements (or a union of tuples) that represents all possible actions on all possible subjects. By default, equals `Abilities` which is a tuple of `[string, Subject]`
2. `Conditions` is a shape of conditions. There is no restriction on this parameter, so it can be anything.

For example:

```ts
import { PureAbility, Abilities } from '@casl/ability';

type ClaimAbility = PureAbility<string>;
type AppAbility = PureAbility<[string, string]>;
```

**See also**: [TypeScript Support](../../advanced/typescript)

### constructor

* **Parameters** (`A` is shortened from `Abilities`):
  * `rules: RawRuleFrom<A, Conditions>[] = []`
  * `options: AbilityOptions<A, Conditions> = {}`
* **Usage**:

  ```ts
  const ability = new PureAbility([
    { action: 'read', subject: 'Article' },
    { action: 'update', subject: 'Article' },
  ]);
  ```
* **See also**: [Define rules](../../guide/define-rules)

### update

Updates rules of `PureAbility` instance. This method completely replaces all previously define rules with new ones.

* **Parameters**:
  * `rules: RawRuleFrom<A, Conditions>[]`
* **Returns**: `this`
* **Emits**:
  * `update` - before updating instance
  * `updated` - after instance has been updated
* **Usage**\
  Use it when you need to update permissions. In the common scenario, you need to do this on login, logout and when user permissions are changed.

  ```ts
  import { PureAbility } from '@casl/ability';

  const ability = new PureAbility([{ action: 'manage', subject: 'all' }]);
  ability.update([]); // took back all permissions
  ```
* **See also**: [CASL guide](../../guide/intro)

### can of PureAbility

Checks that the provided action and subject satisfy permissions. Depending on `Abilities` generic parameter this function accepts either single `action` argument (when `Abilities` is a string or a union of strings) or 3 arguments (when `Abilities` is a tuple).

* **Parameters**
  * `action: string` - an action to check
  * `subject: Subject` - a subject to check
  * `field?: string` - a field to check
* **Returns**: `boolean`
* **Usage**:

  ```ts
  import { PureAbility } from '@casl/ability';

  const claimAbility = new PureAbility<'read' | 'update'>();
  // the 1st generic is a string, so the method accepts only single parameter
  claimAbility.can('read');

  const ability = new PureAbility<['read' | 'update', 'Article']>();
  // the 1st argument is a tuple, so the method accepts 2-3 parameters
  ability.can('read', 'Article');
  ```
* **See also**: [CASL guide](../../guide/intro)

### cannot of PureAbility

This method works the same way as [can](#can-of-pure-ability) but returns inverted result.

### relevantRuleFor

This method returns a rule that matches provided action, subject and field. If rule cannot be found it returns `null`. May be useful for debugging.

* **Parameters**: accepts the same parameters as [can](#can-of-pure-ability)
* **Returns**: `Rule<Abilities, Conditions> | null`
* **See also**: [Debugging and testing](../../advanced/debugging-testing)

### rulesFor

This method returns all registered rules for provided action, subject and field. Useful for debugging and for extensions.

* **Parameters**: accepts the same parameters as [can](#can-of-pure-ability)
* **Returns**: `Rule<Abilities, Conditions>[]`

### possibleRulesFor

Similar to [rulesFor](#rules-for) but it accepts only up to 2 parameters (depending on the type of 1st generic parameter). Returns all possible rules ignoring field level restrictions. Useful for debugging and for extensions.

* **Parameters**:
  * `action: string`
  * `subject: Subject`
* **Returns**: `Rule<Abilities, Conditions>[]`

### on

Allows to register event handler on specific event.

* **Parameters**:
  * `event: string`
  * `handler: (event: Event) => void`
* **Returns**: a function that removes event handler
* **Usage**\
  Useful for frontend frameworks integration. Usually you have a single ability instance in the app and a lot of places which need to recheck permissions when the instance's rules are changed.

### rules property of PureAbility

Returns an array of all registered rules.

## Ability

`Ability` extends [`PureAbility`](#pure-ability). It sets default values for 2 options: `conditionsMatcher` into [`mongoQueryMatcher`](#mongo-query-matcher) and `fieldMatcher` into [`fieldPatternMatcher`](#field-pattern-matcher). It also enforces `MongoQuery` restriction on the `Conditions` class generic parameter. By default is `Ability<Abilities, MongoQuery>`.

## AbilityBuilder

This class allows to define `Ability` or `PureAbility` instance in declarative way. This class accepts a single generic parameter `TAbility extends AnyAbility` type to construct.

### constructor

* **Parameters**:
  * `AbilityType: AbilityClass<TAbility> = PureAbility`
* **Usage**:

  ```ts
  import { AbilityBuilder, Ability } from '@casl/ability';

  const { can, build } = new AbilityBuilder<Ability>(Ability);
  ```
* **See also**: [Define rules](../../guide/define-rules)

### can of AbilityBuilder

Registers a `RawRule` instance in `rules` property. Depending on the passed in `Ability` generic parameter, this function accepts either single `action` argument (when `Abilities` generic of `Ability` is a string or a union of strings) or 3 arguments (when `Abilities` is a tuple). In general it accepts 1-4 parameters.

* **Parameters**: this method has 2 overloads
  * `action: string | string[]`
  * `subject: string | Function`
  * `fields: string[]`
  * `conditions: Conditions`
  * **and**
  * `action: string | string[]`
  * `subject: string | Function`
  * `conditions: Conditions`
* **Returns** `RuleBuilder`, a class that allows to further change constructed `RawRule` (e.g., add forbidden reason).
* **Usage**:

  ```ts
  import { AbilityBuilder, PureAbility, Ability } from '@casl/ability';

  // action only Ability type
  type ClaimAbility = PureAbility<'read' | 'update'>;
  const { can, build } = new AbilityBuilder<ClaimAbility>();

  can('read');
  can('update');

  // or action and subject Ability type
  const { can, build } = new AbilityBuilder<Ability>(Ability);

  can('read', 'Article', { private: true });
  can('read', 'User', ['firstName', 'lastName']);

  const ability = build();
  ```
* **See also**: [Define rules](../../guide/define-rules)

### cannot of AbilityBuilder

Registers an inverted `RawRule` inside `AbilityBuilder`. Accepts the same parameters and has the same behavior as [can method](#can-of-ability-builder).

### build

Builds an instance of provided `Ability` class.

* **Parameters**:
  * `options?: AbilityOptionsOf<TAbility>`
* **Returns** a new `TAbility` instance

### rules property of AbilityBuilder

Contains an array of `RawRule`s registered by [`can`](#can-of-ability-builder) and [`cannot`](#cannot-of-ability-builder) methods.

## defineAbility

This function allows to define [`Ability`](#ability) instance in a compact form. Cannot be used to create `PureAbility` instances. It's very useful for writing tests and documentation. Has 4 overloaded signatures.

* **Signature** (`T` is `TAbility`):
  * `(dsl: DSL<T>) => T`
  * `(opts: AbilityOptionsOf<T>, dsl: DSL<T>) => T`
  * `(dsl: AsyncDSL<T>) => Promise<T>`
  * `(opts: AbilityOptionsOf<T>, dsl: AsyncDSL<T>) => Promise<T>`
* **See also**: [Define rules](../../guide/define-rules)

## ForbiddenError

This class is useful if you want to stop execution of the next code in case if user doesn't have permission to do something. Has private `constructor`, so cannot be instantiated with `new` (in TypeScript). It's a generic class that accepts `TAbility` as a single parameter. For example:

```ts
import { ForbiddenError, defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'User')
});

ForbiddenError.from(ability).throwUnlessCan('read', 'Article');
// fetch article from database
```

### static from

Creates a `ForbiddenError` instance from provided `Ability` instance.

* **Parameters**:
  * `ability: TAbility`
* **Returns** `ForbiddenError` instance

### static setDefaultMessage

Allows to change default error message for all `ForbiddenError`s. By default, the error is `Cannot execute "${error.action}" on "${error.subjectType}"`

* **Parameters**:
  * `messageOrFn: string | GetErrorMessage` - message or function that returns string
* **Returns** void
* **Usage**:

  ```ts
  import { ForbiddenError } from '@casl/ability';

  ForbiddenError.setDefaultMessage('Not authorized');
  // or more verbose
  ForbiddenError.setDefaultMessage(error => `You are not allowed to ${error.action} on ${error.subjectType}`);
  ```

### setMessage

Changes message of a particular `ForbiddenError` instance.

* **Parameters**:
  * `message: string`
* **Returns** `this`
* **Usage**:

  ```ts
  import { ForbiddenError } from '@casl/ability';
  import ability from './appAbility';

  ForbiddenError.from(ability)
    .setMessage('You cannot update posts')
    .throwUnlessCan('update', 'Post');
  ```

### throwUnlessCan

Accepts the same parameters as [PureAbility's can method](#can-of-pure-ability). Throws a `ForbiddenError` if user cannot do the provided action on provided subject.

## getDefaultErrorMessage

A function that returns default error message for `ForbiddenError`. Is useful to revert back default message after setting it using [`ForbiddenError.setDefaultMessage`](#static-set-default-message).

## fieldPatternMatcher

This factory function that accepts an array of fields and creates a matcher that matches fields by patterns using wildcards (i.e., `*`). It's used as a default field matcher option in `Ability` class.

* **Factory Parameters**:
  * `fields: string[]`
* **Factory Returns** `MatchField`
* **Matcher Parameters**:
  * `field: string`
* **Matcher Returns** `boolean`
* **Usage**

  ```ts
  import { fieldPatternMatcher } from '@casl/ability';

  const matchField = fieldPatternMatcher(['name', 'email', 'address.**']);
  console.log(matchField('name')); // true
  console.log(matchField('address.street')); // true
  ```

* **See also**: [Ability API](#ability), [Restricting field access](../../guide/restricting-fields), [Customize Ability](../../advanced/customize-ability)

## mongoQueryMatcher

This factory function creates a matcher that matches subjects based on [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/). It's used as a default field matcher option in `Ability` class.

* **Factory Parameters**:
  * `conditions: MongoQuery`
* **Factory Returns** `ConditionsMatcher<MongoQuery>`
* **Matcher Parameters**:
  * `object: Record<PropertyKey, any>`
* **Matcher Returns** `boolean`
* **Usage**\
  Can be passed as `conditionsMatcher` option to `Ability` and `PureAbility` classes

  ```ts
  import { mongoQueryMatcher } from '@casl/ability';

  const matchConditions = mongoQueryMatcher({ authorId: 1, private: true });
  console.log(matchConditions({ authorId: 2 })); // false
  console.log(matchConditions({ authorId: 1, private: true })); // true
  ```

* **See also**: [Ability API](#ability), [Conditions in depth](../../guide/conditions-in-depth), [Customize Ability](../../advanced/customize-ability)

## buildMongoQueryMatcher

This is a factory of factory. It allows to extend `mongoQueryMatcher` with custom mongo operators.

* **Factory Parameters**:
  * `operations: Record<keyof CustomOperators, any>`
* **Factory Returns** extended `mongoQueryMatcher`
* **Usage**\
  The result of this function can be passed as `conditionsMatcher` option to `Ability` and `PureAbility` classes.
* **See also**: [mongoQueryMatcher API](#mongo-query-matcher), [Customize Ability](../../advanced/customize-ability)

## createAliasResolver

Creates a function that resolves alias to real actions. Can be passed as `resolveAction` option to `Ability` and `PureAbility` classes.

* **Parameters**:
  * `aliasMap: AliasMap`
* **Returns** `(action: string | string[]) => string | string[]`
* **See also**: [Define Action Aliases](../../guide/define-aliases)

## detectSubjectType

The default subject type detection logic. Can be passed as `detectSubjectType` option to `Ability` and `PureAbility` classes. Can be used to extend the default logic. The checking logic is the following:

* if `subject` is `undefined`, returns `all`
* if `subject` is a `ForcedSubject`, returns its forced type
* if `subject` is a string, returns `subject`
* if `subject` is a function, returns `subject.modelName || subject.name`
* if `subject` is an object, returns `constructor.modelName || constructor.name`

* **Parameters**:
  * `subject: Subject`
* **Returns** a string (i.e., subject type)
* **See also**: [Subject type detection](../../guide/subject-type-detection)

## subject

Sets subject type for a plain object. You shouldn't use this if you use classes or define custom `detectSubjectType` algorithm. Accepts 2 generic parameters `TSubjectType` and `TObject`.

* **Parameters**:
  * `subjectType: TSubjectType`
  * `object: TObject`
* **Returns** `TObject & ForcesSubject<TSubjectType>`
* **See also**: [Subject type detection](../../guide/subject-type-detection)
