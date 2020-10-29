---
title: Restricting fields access
categories: [guide]
order: 40
meta:
  keywords: ~
  description: ~
---

Sometimes you may need to restrict which fields a user can access. For example, let's allow only moderators to publish `Article`:

```js @{data-filename="defineAbility.js"}
import { AbilityBuilder, Ability } from '@casl/ability';

export default function defineAbilityFor(user) {
  const { can, rules } = new AbilityBuilder(Ability);

  can('read', 'Article');
  can('update', 'Article', ['title', 'description'], { authorId: user.id });

  if (user.isModerator) {
    can('update', 'Article', ['published']);
  }

  return new Ability(rules);
}
```

Now we can check permissions on fields:

```js
import defineAbilityFor from './defineAbility';

const user = { id: 1 };
const moderator = { id: 2, isModerator: true };

defineAbilityFor(user).can('update', 'Article', 'published'); // false
defineAbilityFor(moderator).can('update', 'Article', 'published'); // true
```

**Be attentive when you define rules for fields with conditions**, the result of the check will be different depending on whether you pass a subject or subject type! To illustrate the difference let's define a simple class:

```js @{data-filename="entities.js"}
export class Article {
  constructor(title, description, authorId) {
    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.published = false;
  }
}
```

And let's check permissions:

```js @{data-filename="app.js"}
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const user = { id: 1 };
const ownArticle = new Article('CASL in Action', '', user.id);
const anotherArticle = new Article('CASL in Vue apps', '', 2);
const ability = defineAbilityFor(user);

ability.can('update', ownArticle, 'title'); // true
ability.can('update', anotherArticle, 'title'); // false
ability.can('update', 'Article', 'title'); // true!
```

So, the last check returned `true` and at the first sight it seems wrong! But it's not. Similarly to [checking logic](../intro#checking-logic) without fields, we ask different questions:

* when we check on particular `Article` instance, we are asking **can user update this article's title**
* and when we check on subject type, we are asking **can user update title of at least one article?**

Another way to check permissions is to extract all permitted fields from `Ability` instance using `permittedFieldsOf` helper from `@casl/ability/extra` sub-module. The same checking logic applies here:

```js
import { permittedFieldsOf } from '@casl/ability/extra';

// the same code from app.js, the example above

const ARTICLE_FIELDS = ['title', 'description', 'authorId', 'published'];
const options = { fieldsFrom: rule => rule.fields || ARTICLE_FIELDS };

let fields = permittedFieldsOf(ability, 'update', ownArticle, options); // ['title', 'description']
fields = permittedFieldsOf(ability, 'update', anotherArticle, options); // []
fields = permittedFieldsOf(ability, 'update', 'Article', options); // ['title', 'description'] !

if (fields.includes('published')) {
  // do something if can update published field
}
```

CASL knows nothing about shapes of our entities, so the only way to tell him is to provide a `fieldsFrom` function. This function should return a list of fields from rule. Rule has no fields if it's allowed (or disallowed) to manage all of them. In this case, we return all fields, otherwise return what is inside our rule.

This method is very useful in combination with [lodash.pick] to extract permitted fields from user request

> If you need `pick` with support for wildcards, check [this implementation][pick.wildcars]

[lodash.pick]: https://lodash.com/docs/4.17.15#pick
[pick.wildcards]: https://gist.github.com/stalniy/855f3de3115c8a89824370cb4d8bb5a7

```js
import pick from 'lodash/pick';
import { permittedFieldsOf } from '@casl/ability/extra';

// the same code from app.js

const reqBody = {
  title: 'CASL',
  description: 'powerful',
  published: true, // only moderators are allowed to change this field!
};
const fields = permittedFieldsOf(ability, 'update', ownArticle, options);
const rawArticle = pick(reqBody, fields); // { title: 'CASL', description: 'powerful' }
```

Thanks to this, users, who try to send attributes, won't be able to overcome permissions' restrictions.

> To know more about `@casl/ability/extra` check its [API documentation](../../api#extra-submodule)

## Nested fields

CASL allows you to define permissions on nested fields, to do this just use dot notation, for example:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('read', 'User', ['address.city', 'address.street']);
});
```

## Field patterns

It's also possible to define permissions for fields using patterns. You can use `*` to match any symbol except dot (i.e., `.`) and `**` to match any symbol. For example, you want to allow access to all fields of a nested field (in spite of the nesting level):

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'User', ['address.**']);
});

ability.can('read', 'User', 'address'); // true
ability.can('read', 'User', 'address.street'); // true
ability.can('read', 'User', 'address.city.name'); // true
```

Or you can give access to only first level of nested fields:

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'User', ['address.*']);
});

ability.can('read', 'User', 'address'); // true
ability.can('read', 'User', 'address.street'); // true
ability.can('read', 'User', 'address.city.name'); // false
```

Or you can give access to top level fields using pattern. Suppose `User` instance has multiple fields for street like `street1`, `street2`, etc:

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'User', ['street*']);
});

ability.can('read', 'User', 'street'); // true
ability.can('read', 'User', 'street1'); // true
ability.can('read', 'User', 'street2'); // true
```

### Field patterns table

| Pattern         | Example      | Result    |
| --------------- | -------------| --------- |
| address.*       |
|                 | `ability.can('read', 'User', 'address')`           | `true`  |
|                 | `ability.can('read', 'User', 'address.city')`      | `true`  |
|                 | `ability.can('read', 'User', 'address.city.name')` | `false` |
| address.**      |
|                 | `ability.can('read', 'User', 'address')`           | `true` |
|                 | `ability.can('read', 'User', 'address.city')`      | `true` |
|                 | `ability.can('read', 'User', 'address.city.name')` | `true` |
|                 | `ability.can('read', 'User', 'address.city.location.lat')` | `true` |
| address.*.name  |
|                 | `ability.can('read', 'User', 'address.*.name')`    | `true` |
|                 | `ability.can('read', 'User', 'address.city.name')` | `true` |
|                 | `ability.can('read', 'User', 'address.city.location.name')` | `false` |
| address.**.name |
|                 | `ability.can('read', 'User', 'address.*.name')`    | `true` |
|                 | `ability.can('read', 'User', 'address.city.name')` | `true` |
|                 | `ability.can('read', 'User', 'address.city.location.name')` | `true` |
| *.name          |
|                 | `ability.can('read', 'User', '*.name')`            | `true` |
|                 | `ability.can('read', 'User', 'city.name')`         | `true` |
|                 | `ability.can('read', 'User', 'address.city.name')` | `false` |
|                 | `ability.can('read', 'User', 'address.city.location.name')` | `false` |
| **.name         |
|                 | `ability.can('read', 'User', '*.name')`            | `true` |
|                 | `ability.can('read', 'User', 'city.name')`         | `true` |
|                 | `ability.can('read', 'User', 'address.city.name')` | `true` |
|                 | `ability.can('read', 'User', 'address.city.location.name')` | `true` |
|                 | `ability.can('read', 'User', 'address.city.code')` | `false` |
