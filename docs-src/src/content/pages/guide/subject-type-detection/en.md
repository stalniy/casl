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

We allowed everyone to read articles, not let's test it:

```js
import ability from './defineAbility';

const article = {};
ability.can('read', article);
```

What do you think the last line returns? It returns `false`, but why? Because `article` variable is not of `Article` type and we allowed to read only `Article`s. Now you should have a question:

## How does CASL detect subject type?

If you pass an object as the 2nd argument in `ability.can`, CASL gets `object.constructor.modelName` as subject type and if this is not available, it fallbacks to `object.constructor.name`.

In the example above, `article` variable contains plain object, its constructor doesn't have `modelName`, so CASL gets its `constructor.name` as subject type. So, in that case subject type is `Object`. There are no rules for `Object` subject type, that's why we got `false` when tried to check whether it's possible to read that object. So, how can we fix that example? The easiest way is to use special class for our `Article` model:

```js
import ability from './defineAbility';

class Article {}

const article = new Article();
ability.can('read', article); // true
```

> Function and class names are mangled if you use [terser] or [uglifyjs] to minify your app. That's why CASL checks `constructor.modelName` which you can define on a class to define subject type.

[terser]: https://terser.org/
[uglifyjs]: http://lisperator.net/uglifyjs/

The example above won't work in production if you use minimization. To fix it you need to set static property on `Article` class:

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

CASL provides 2 options to deal with this in case of DTO objects:

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

It defines readonly non-configurable and non-enumerable property on the provided DTO, so it can be used in the subject's type detection algorithm.

> CASL will throw an exception if you try to use `subject` helper with different subject type for an object processed by the helper previously

So, now you have 2 options:

1. Use `subject` helper everywhere you use `ability.can` as shown in the example above.
2. Set subject type to all [DTO]s after retrieving them from server

So, let's see what we mean for the 2nd option:

```js
import { subject } from '@casl/ability';

export async function getArticles() {
  const response = await fetch('/api/articles');
  const body = await response.json();

  return body.articles.map(article => subject('Article', article));
}
```

Now we can safely check permissions on articles using `ability.can` without worrying about subject's type as it was defined previously.

## Custom subject type detection

Sometimes you will need to define your own type detection algorithm (e.g., [GraphQL] provides metadata field `__typename` which returns the type of the object)

[GraphQL]: https://graphql.org/

For such cases, CASL provides `subjectName` option to override built-in algorithm:

```js
import { AbilityBuilder, Ability } from '@casl/ability';
import subjectTypeFromGraphql from './subjectTypeFromGraphql';

const { can, rules } = new AbilityBuilder();

can('read', 'Article');

const ability = new Ability(rules, {
  subjectName: subjectTypeFromGraphql
});

const article = { __typename: 'Article' };
ability.can('read', article); // true
```

And actual implementation:

```js @{data-filename="subjectTypeFromGraphql.js"}
export default subject => subject ? subject.__typename : 'all';
```

> Custom detection algorithm must handle cases when `subject` is `undefined` and it must return a string!

The same can be achieved using `defineAbility` function:

```js
import { defineAbility } from '@casl/ability';
import subjectTypeFromGraphql from './subjectTypeFromGraphql';

const options = { subjectName: subjectTypeFromGraphql };
const ability = defineAbility(options, (can) => {
  can('read', 'Article');
});

const article = { __typename: 'Article' };
ability.can('read', article); // true
```