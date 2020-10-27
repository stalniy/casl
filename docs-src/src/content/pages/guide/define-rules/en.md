---
title: Define Rules
categories: [guide]
order: 20
meta:
  keywords: ~
  description: ~
---

There are 3 ways you can define abilities:
* using `defineAbility` function
* using `AbilityBuilder` class
* using `JSON` objects

In order to understand which way to use, let's learn more about each one.

## defineAbility function

This function is a [DSL] that allows to create `Ability` instance using `can` and `cannot` methods. It allows to define and use `Ability` instance without writing too much code.

[DSL]: https://en.wikipedia.org/wiki/Domain-specific_language

### defineAbility example

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'Post');
  cannot('delete', 'Post', { published: true });
});
```

You can pass multiple actions, subjects and fields in the single `can` (or `cannot`) function. So, instead of

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'Post');
  can('update', 'Post');
  can('read', 'Comment');
  can('update', 'Comment');
});
```

you can do:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can(['read', 'update'], ['Post', 'Comment']);
});
```

> To learn more about `can` and `cannot` functions' parameters, read [AbilityBuilder API](../../api#abilitybuilder)

### When to use defineAbility

* unit tests
* examples and learning resources
* prototypes or really simple applications

So, to keep examples simple and clear, we will use `defineAbility` in majority of code snippets in this documentation.

### Why defineAbility is not recommended

There is nothing extremely wrong with this function but there are several drawbacks when you use it in your app:

1. In most cases, rules depends on user request, so using callback style to define permissions, adds additional nesting and increases cognitive complexity.
2. It can create only `Ability` instance which works with [MongoDB conditions](../conditions-in-depth), so you won't be able to use another language to match conditions.

> See [Customize Ability](../../advanced/customize-ability) to know more about different ability classes and possibilities to customize it.

## AbilityBuilder class

This class implements `can` and `cannot` functions, that makes possible to write rules using [DSL] syntax. **This is the recommended way to define rules using DSL syntax**

### AbilityBuilder example

[defineAbility example](#defineability-example) written using `AbilityBuilder` class looks a bit more wordy:

```js
import { AbilityBuilder, Ability } from '@casl/ability'

const { can, cannot, build } = new AbilityBuilder(Ability);

can('read', 'Post');
cannot('delete', 'Post', { published: true });

export default build();
```

But it allows to define rules without additional nesting, this is especially important when you build rules based on conditional logic:

```js
import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can('manage', 'all'); // read-write access to everything
  } else {
    can('read', 'all') // read-only access to everything
  }

  cannot('delete', 'Post', { published: true });

  return build();
}
```

> To learn more about `can` and `cannot` functions' parameters, read [AbilityBuilder API](../../api#abilitybuilder)

For more advanced cases, it's possible to use `rules` property of `AbilityBuilder` and create `Ability` instance manually:

```js
import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor(user) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  // defined permissions

  return new Ability(rules);
}
```

### When to use AbilityBuilder

* in apps which have static permissions (i.e., permissions are not changed by admin user but defined inside system)
* anywhere where you use custom subclasses of `PureAbility`

> See [Customize Ability](../../advanced/customize-ability) to learn more about `PureAbility` class.

## JSON objects

It's not required to use `AbilityBuilder` to define rules in the app, especially if your rules are dynamic (i.e., stored in database or managed by admin users). In such cases, the preferred way is to use `JSON` objects. You can directly pass array of `JSON` rules into `Ability` constructor. Such rules are called raw rules

> you can read more about TypeScript types and their shapes in [TypeScript Support](../../advanced/typescript)

### JSON objects example

The same example using `JSON`:

```js
import { Ability } from '@casl/ability';

export default new Ability([
  {
    action: 'read',
    subject: 'Post'
  },
  {
    inverted: true,
    action: 'delete',
    subject: 'Post',
    conditions: { published: true }
  }
])
```

Pay attention to the `inverted` field, it indicates that a rule is an inverted one (i.e., forbids something).

### The shape of raw rule

The simplified version (without generics) of raw rule shape in [TypeScript](http://www.typescriptlang.org/) looks like this:

```ts
interface RawRule {
  action: string | string[]
  subject?: string | string[]
  /** an array of fields to which user has (or not) access */
  fields?: string[]
  /** an object of conditions which restricts the rule scope */
  conditions?: any
  /** indicates whether rule allows or forbids something */
  inverted?: boolean
  /** message which explains why rule is forbidden */
  reason?: string
}
```

Don't worry if you are not familiar with TypeScript, you still have time to learn it ;) Kidding, or not?

In the example above, `?` after field name means optional field, so everything is optional except `action`. `string[]` means an array of strings and `string | string[]` means either regular `string` or an array of strings. Now you know almost everything about TypeScript, do not thank :)

### When to use JSON objects

* in apps, that have dynamic permissions (i.e., permissions are changed by admin user)
* in apps, that receive permissions via network layer (e.g., single page applications or microservices)
* to make the app's bundle size smaller (if you don't use `AbilityBuilder` or `defineAbility`, they can be shook out by bundlers such as [rollup] or [webpack])

[rollup]: https://rollupjs.org/guide/en/
[webpack]: https://webpack.js.org/

Now, as we know all possible ways to define rules, let's dive deeper into `can` and `cannot` methods.

## Rules

You can define as much rules as you need, CASL builds an index under the hood to keep checking logic fast. So, don't worry about performance.

You can define the same pair of action and subject with different conditions multiple times. For example:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('read', 'Article', { published: true });
  can('read', 'Article', { published: false, status: 'review' });
});
```

In such case, the pair of action/subject rules are combined by logical `OR`. More formally this can be translated as "users can read Article if it's published OR users can read Article if it's not published AND in review status".

But be careful, because `OR` logic returns `true` if one of its expressions are `true`, so the next code will always return `true`, even for articles that were not published:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
  can('read', 'Article');
  can('read', 'Article', { published: true }); // (2)
});
```

More formally this code can be read as "can read any article OR can read published articles". As you see, the first statement always valid, so the `(2)` `can` with conditions has no effect.

It's also possible to restrict scope of direct rule with the inverted one for the same pair of action and subject. In such case, inverted rules are combined with direct ones by logical `AND`.

Let's change the example above to disallow reading unpublished articles:

```js
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'Article'); // direct rule
  cannot('read', 'Article', { published: false }); // inverted rule
});
```

This is read as "can read any article AND cannot read unpublished articles".

### Inverted rules order

It is important that in the example above `cannot read article unpublished` line comes after the `can read article` line. If they were reversed, `cannot read article unpublished` would be overridden by `can read article`.

> The rule of thumb is to define general rules first and more specific after general ones.

It was done so in order to be able to override inverted rules by regular ones.

### Best practice

Direct logic is easier to reason about for human mind, so use direct rules as much as possible! Moreover, this allows to keep permissions clean, more readable and reduces the risk of giving wrong permissions to the wrong users.

> You can remember this rule as: **Give permissions, don't take them away**

So, are there a valid usecases for inverted rules? **Yes**! They work very well when are not combined with regular rules and defined explicitly to express why particular action on particular subject was forbidden, for example:

```js
import { AbilityBuilder, Ability } from '@casl/ability';

async function defineAbility(user) {
  const hasPaidSubscription = await user.hasPaidSubscription();
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (hasPaidSubscription) {
    can('create', 'BlogPost');
  } else {
    cannot('create', 'BlogPost').because('You have not paid for monthly subscription');
  }

  return build()
}
```
