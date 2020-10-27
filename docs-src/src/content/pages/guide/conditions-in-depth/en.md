---
title: Conditions in Depth
categories: [guide]
order: 30
meta:
  keywords: ~
  description: ~
---

Thanks to [ucast](https://github.com/stalniy/ucast), we can define permissions using [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/).

Don't worry, if you are not familiar with MongoDB query language. We will go through some of its operators in this guide. But before we start, let's see how useful it may be by creating simple article scheduling logic, that allows to read articles only if their `createdAt` is in the past:

```js
import { defineAbility } from '@casl/ability';

const today = new Date().setHours(0, 0, 0, 0);

export default defineAbility((can) => {
  can('read', 'Article', { createdAt: { $lte: today } })
});
```

Or let's allow to read articles that are in `review` or `published`:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('read', 'Article', { status: { $in: ['review', 'published'] } })
});
```

Do you see the power it brings?

## MongoDB and its query language

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern applications and for the cloud era. In simple words, this is a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database that stores records in `JSON` (actually in [BSON](https://docs.mongodb.com/manual/reference/glossary/#term-bson)) format.

As they decided to store records in `JSON`, they needed a new query language that would allow to get filtered records from their database. This is how they created own query language.

JavaScript is a superset of `JSON`, that's why we decided to use MongoDB query language to restrict permissions for subjects based on their properties.

**You don't need to know anything about MongoDB** in order to use CASL, you need to know only subset of its query language operators.

Query is what you pass in conditions to `can` and `cannot` functions (3rd or 4th argument if you pass fields). So, it's an object which defines restrictions on a JavaScript object and if that restrictions are matched then a matched object is returned.

Let's see at examples of queries:

```js
const queries = [
  { private: true }, // (1)
  { private: false, hidden: false }, // (2)
  { private: { $exists: true } },
  { status: { $in: ['review', 'inProgress'] } },
  { price: { $gte: 10, $lte: 50 } }, // (3)
  { tags: { $all: ['permission', 'casl'] } },
  { email: { $regex: /@gmail.com$/i } },
  { 'cities.address': { $elemMatch: { postalCode: { $regex: /^AB/ } } } } // (4)
]
```

We can combine any amount of fields inside single query, all their restrictions are tested according to `AND` logic. If we do not specify operator, the query uses `$eq` operator (equality operator). So, a query like `(2)` matches objects if their `private` and `hidden` property values equal to `false` (i.e., `!object.private && !object.hidden`).

We can specify multiple operators for the same field, in this case each operator must return `true` to match a field value. So, `(3)` matches objects only if `price` property value is between 10 and 50 inclusively (i.e., `object.price >= 10 && object.price <= 50`).

To access nested property value, you can use dot notation as in `(4)`.

## Supported operators

CASL uses only subset of MongoDB operators which cover majority of cases.

> If you need to use more operators or define custom ones, read [Customize ability](../../advanced/customize-ability)

The list of operators:

1. [$eq] and [$ne]\
   object value should equal specified value. `$ne` means `not $eq`
2. [$lt] and [$lte]\
   object value should be less than specified value. Can be used for `Date`s, numbers and strings. `$lte` is a combination of `$lt` and `$eq`, so it's an inclusive check.
3. [$gt] and [$gte]\
   object value should be greater than specified value. Can be used for `Date`s, numbers and strings. `$gte` is a combination of `$gt` and `$eq`, so it's an inclusive check.
4. [$in] and [$nin]\
   Checks that object's property is of the specified array values. Can be used for single value and for arrays as well. If object's property is an array it checks for intersection. `$nin` means `not $in`
5. [$all]\
   Checks that object's property should contain all elements from the specified array. Can be used for arrays only.
6. [$size]\
   Checks that array length equals to specified value. Can be used for arrays only
7. [$regex]\
   Allows to test object's property value using [regular expression](https://en.wikipedia.org/wiki/Regular_expression). Can be used for strings only
8. [$exists]\
   Checks that property exists in the object.
9. [$elemMatch]\
   Checks nested elements shape. Use `$elemMatch` operator to specify multiple criteria on the elements of an array such that at least one array element satisfies all the specified criteria. If you specify only a single condition in the `$elemMatch` expression, `$elemMatch` is not necessary. See [Specify Multiple Conditions for Array Elements](https://docs.mongodb.com/manual/tutorial/query-arrays/#specify-multiple-criteria-for-array-elements) for details.

[$eq]: https://docs.mongodb.com/manual/reference/operator/query/eq
[$ne]: https://docs.mongodb.com/manual/reference/operator/query/ne
[$lt]: https://docs.mongodb.com/manual/reference/operator/query/lt
[$lte]: https://docs.mongodb.com/manual/reference/operator/query/lte
[$gt]: https://docs.mongodb.com/manual/reference/operator/query/gt
[$gte]: https://docs.mongodb.com/manual/reference/operator/query/gte
[$in]: https://docs.mongodb.com/manual/reference/operator/query/in
[$nin]: https://docs.mongodb.com/manual/reference/operator/query/nin
[$all]: https://docs.mongodb.com/manual/reference/operator/query/all
[$size]: https://docs.mongodb.com/manual/reference/operator/query/size
[$regex]: https://docs.mongodb.com/manual/reference/operator/query/regex
[$elemMatch]: https://docs.mongodb.com/manual/reference/operator/query/elemMatch
[$exists]: https://docs.mongodb.com/manual/reference/operator/query/exists

## Why logical query operators are not included

CASL doesn't use `$and`, `$or`, `$nor` and `$not` operators. This is because the same behavior can be achieved by combining `can` and `cannot` rules. Combination of `can` rules for the same pair of action and subject allows to mimic `$or` operator and combination of `cannot` rules allows to mimic `$not` and `$and` operators. Moreover as we discussed in this guide, all properties inside conditions object are checked by `AND` logic, this is another way to mimic `$and` operator.

`$nor` cannot be reproduced in any way, so if you are sure that you need it, I'd recommend to rethink your permission logic together with the client or product owner. But if you are 100% sure, please read how to [Customize ability](../../advanced/customize-ability).

## Checking logic in CASL

When you define rules with conditions, the last are converted to functions that checks whether object matches specified MongoDB query. Let's see an example:

```js @{data-filename="defineAbility.js"}
import { defaultAbility } from '@casl/ability';

export default defaultAbility((can) => {
  can('read', 'Article', {
    createdAt: { $lte: new Date() },
    status: { $in: ['review', 'published'] }
  })
});
```

The example above says that article can be read if it's in review or published and its creation date is in the past or today. Before starting let's define simple class that represents `Article` entity.

```js @{data-filename="entities.js"}
export class Article {
  constructor(status, createdAt) {
    this.status = status;
    this.createdAt = createdAt;
  }
}
```

> It's not mandatory to use classes, CASL perfectly works with plain javascript objects, see [Subject type detection](../subject-type-detection) for details.

Now we can test which articles user can read:

```js
import ability from './defineAbility';
import { Article } from './entities';

const today = new Date().setHours(0, 0, 0, 0);
const tomorrow = /* logic to calculate date for tomorrow */ ;

ability.can('read', new Article('review', today)) // (1), true
ability.can('read', new Article('published', today)) // (2), true
ability.can('read', new Article('draft', today)) // (3), false
ability.can('read', new Article('review', tomorrow)) // (4), false
```

`(1)` and `(2)` returns `true` because article's status is one of the specified and `today` less then the specified value in conditions.
`(3)` fails because article's status is not listed inside `$in` operator and `(4)` fails because article's `createdAt` is in future.

The same logic is applicable to other operators in conditions.

## Common conditions

This section describes the way to construct conditions for common cases.

### Match one of few items in a scalar property

Suppose we have an `Article` object which has a property `status`. We want to restrict the user to access only articles that are in few specific statuses.

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article', { status: { $in: ['published', 'inReview'] } });
});

class Article {
  constructor(title, status) {
    this.title = title;
    this.status = status;
  }
}

const article = new Article('CASL', 'published');
console.log(ability.can('read', article)); // true
```

### Match specified item in an array property

Suppose we have an `Article` object which has a property `categories`. We want to restrict the user to access only articles in one specified category.

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article', { categories: 'javascript' });
});

class Article {
  constructor(title, categories) {
    this.title = title;
    this.categories = categories;
  }
}

const article = new Article('CASL', ['javascript', 'acl']);
console.log(ability.can('read', article)); // true
```

### Match one of few items in an array property

Suppose we have an `Article` object which has a property `categories`. We want to restrict the user to access only articles in few specified categories.

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article', { categories: { $in: ['javascript', 'frontend'] } });
});

class Article {
  constructor(title, categories) {
    this.title = title;
    this.categories = categories;
  }
}

const article = new Article('CASL', ['javascript', 'acl']);
console.log(ability.can('read', article)); // true
```

### Match nested property value

Suppose we have an `Address` object which has property `country` which is an object of 2 fields: `isoCode` and `name`. We want to restrict user to access only those addresses that are located in the specified country.

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Address', { 'country.isoCode': 'UA' });
});

class Address {
  constructor(isoCode, name) {
    this.country = {
      isoCode: isoCode,
      name: name,
    }
  }
}

const address = new Address('UA', 'Ukraine');
console.log(ability.can('read', address)); // true
```

### Match several properties of a nested array property

Suppose we have a wishlist of products in some e-shop and we want to share wishlist item to somebody else and give him `update` permission.

```js
import { defineAbility } from '@casl/ability';

const user = { id: 1 };
const ability = defineAbility((can) => {
  can('update', 'WishlistItem', {
    sharedWith: {
      $elemMatch: { permission: 'update', userId: user.id }
    }
  });
});

class WishlistItem {
  constructor(title, sharedWith) {
    this.title = title;
    this.sharedWith = sharedWith;
  }
}

const wishlistItem = new WishlistItem('CASL in Action', [
  { permission: 'read', userId: 2 },
  { permission: 'update', userId: 1 },
]);
ability.can('update', wishlistItem); // true
```
