---
title: Subject type detection
categories: [guide]
order: 50
meta:
  keywords: ~
  description: ~
---

Let's consider an example:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('read', 'Article');
});
```

We allowed everyone to read articles, now let's test it:

```js
import ability from './defineAbility';

const article = {};
ability.can('read', article);
```

What do you think the last line returns? It returns `false`, but why? Because `article` variable is not of `Article` type. Now you should have a question:

## How does CASL detect subject type?

The first thing to clarify is "what is subject type?". A subject type is basically a type of an object, in OOP class represents instance metadata and represents object metadata information.

> Starting from v5, CASL perceives string, function and class as a subject type. Any other type is perceived as a subject, for which CASL needs to detect subject type.

When we pass an object as the 2nd argument in `ability.can`, CASL gets `object.constructor.modelName` as subject type, and fallbacks to `object.constructor.name` if `modelName` is not specified.

In the example above, `article` variable contains a plain object, its constructor doesn't have `modelName`, so CASL gets its `constructor.name` as a subject type. Eventually, we get `Object`. There are no rules for `Object` subject type, that's why we got `false` when tried to check whether it's possible to read that object. So, how can we fix that example? The easiest way is to use a special class for our `Article` model:

```js
import ability from './defineAbility';

class Article {}

const article = new Article();
ability.can('read', article); // true
```

[terser]: https://terser.org/
[uglifyjs]: http://lisperator.net/uglifyjs/

**The example above won't work** in production if we use minimization. To fix it, we need to set a static property on `Article` class:

```js
import ability from './defineAbility';

class Article {
  static get modelName() {
    return 'Article'
  }
}

const article = new Article();
ability.can('read', article); // true
```

This is fine for backend where classes are naturally used to describe and encapsulate Domain Logic but not for frontend. Usually frontend deals with [DTO] objects (i.e., plain js objects).

[DTO]: https://en.wikipedia.org/wiki/Data_transfer_object

CASL provides 2 options to handle DTO objects:

1. Use `subject` helper.
2. Use custom subject type detection algorithm.

## subject helper

CASL provides built-in `subject` helper which sets subject type to provided object. So, the example above we can rewrite to:

```js
import { subject } from '@casl/ability';
import ability from './defineAbility';

const article = {};
ability.can('read', subject('Article', article)); // true
```

It defines readonly non-configurable and non-enumerable `__caslSubjectType__` property on the provided DTO, so it can be used in the subject's type detection algorithm.

> CASL will throw an exception if you try to use `subject` helper with different subject type for an object processed by the helper previously

So, now you have 2 options:

1. Use `subject` helper everywhere you use `ability.can` as shown in the example above.
2. Set subject type for all [DTO]s after retrieving them from server

So, let's see what we mean for the 2nd option:

```js
import { subject } from '@casl/ability';

export async function getArticles() {
  const response = await fetch('/api/articles');
  const body = await response.json();

  return body.articles.map(article => subject('Article', article));
}
```

> The 2nd approach is a bit hacky because it mixes responsibilities. Now, your services coupled with CASL. This is fine for short term or small-medium apps but should be avoided for large apps

Now we can safely check permissions on articles using `ability.can` without worrying about subject's type as it was defined previously.

To make a code a bit more readable, you can alias `subject` to `a` or `an` depending on the context, so the example above may look like this:

```js
import { subject as an } from '@casl/ability';

export async function getArticles() {
  const response = await fetch('/api/articles');
  const body = await response.json();

  return body.articles.map(object => an('Article', object)); // read as "an Article object"
}
```

## Custom subject type detection

Sometimes you will need to define your own type detection algorithm (e.g., [GraphQL] provides metadata field `__typename` which returns the type of the object)

[GraphQL]: https://graphql.org/

For such cases, we can override built-in algorithm by providing `detectSubjectType` option:

```js
import { AbilityBuilder, Ability } from '@casl/ability';

const { can, build } = new AbilityBuilder(Ability);

can('read', 'Article');

const ability = build({
  detectSubjectType: object => object.__typename
});

const article = { __typename: 'Article' };
ability.can('read', article); // true
```

Custom detection function must return a subject type (either string, class or function).

The same can be achieved using `defineAbility` function:

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article');
}, {
  detectSubjectType: object => object.__typename
});

const article = { __typename: 'Article' };
ability.can('read', article); // true
```

It's important to note that `detectSubjectType` is responsible for mapping objects to their corresponding types. When we pass a class, a function or a string in `ability.can`, they are automatically perceived as a subject type and `detectSubjectType` is not called for them.

### Use classes as subject types

As we said before, it's common to use classes to model Domain Logic on backend. So, some of you may want to use classes as subject types in permission definition. To do this, we need a custom `detectSubjectType` function:

```js
import { defineAbility } from '@casl/ability';

class Article {}

const ability = defineAbility((can) => {
  can('read', Article);
}, {
  detectSubjectType: object => object.constructor
});

ability.can('read', new Article()); // true
ability.can('read', Article); // true
```

Or with `AbilityBuilder`:

```js
import { AbilityBuilder, Ability } from '@casl/ability';

class Article {}

const { can, build } = new AbilityBuilder(Ability);

can('read', Article);

const ability = build({
  detectSubjectType: object => object.constructor
});

ability.can('read', new Article()); // true
ability.can('read', Article); // true
```

If you want to use classes in TypeScript, you need to cast `object.constructor` (read [this TypeScript issue](https://github.com/microsoft/TypeScript/issues/3841) for details):

```ts
import { AbilityBuilder, Ability, ExtractSubjectType, AbilityClass } from '@casl/ability';

class Article {}

type Actions = 'read' | 'update';
type Subjects = Article | typeof Article;
type AppAbility = Ability<[Actions, Subjects]>;
const AppAbility = Ability as AbilityClass<AppAbility>;

const { can, build } = new AbilityBuilder(AppAbility);

can('read', Article);

const ability = build({
  // if you don't use permission specific types, you can cast return value to `SubjectType` type
  detectSubjectType: object => object.constructor as ExtractSubjectType<Subjects>
});

ability.can('read', new Article()); // true
ability.can('read', Article); // true
```
