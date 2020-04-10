---
title: Claim based Authorization
categories: [cookbook]
order: 16
meta:
  keywords: ~
  description: ~
---

## The issue

You need to implement simple authorization (i.e., permission management) logic based on claims (or actions). In other words, you have action (or a claim) but don't have the concept of "subject" on which this action can be applied (or it's not important in your app). This concept is very similar to [claim based identity](https://en.wikipedia.org/wiki/Claims-based_identity).

The easiest way to achieve this is to create an array of all possible actions (or claims) and check if a claim exists on the user object:

```ts
const ACTIONS = ['review', 'publish', 'read'];

function publishArticle(article, user) {
  if (!user.permissions.includes('publish')) {
    throw new Error('You cannot publish articles');
  }

  // logic to publish article
}
```

What are **the disadvantages** of handmade solution:

1. You need to test.\
   It's very important to know that your permissions logic is reliable otherwise it doesn't make sense.
2. You need to support it (i.e., fix bugs).\
   If you find a bug, you need to fix it and add tests. But what would you do if the bug is found by the attacker?
3. You need to evolve it.\
   The world constantly changes, the same way your business requirements changes. If you need to add more complex permissions logic (e.g., permission per subject or per attribute), you will need to implement and test it yourself.

All that consumes time and resources, as a result postpones the delivery of your product.

## The solution

Fortunately, CASL supports claim based authorization. The example above can be represented in CASL:

```ts
import { defineAbility, PureAbility } from '@casl/ability';

type AppAbility = PureAbility<Actions>;
type Actions = 'review' | 'publish' | 'read';

const ability = defineAbility<AppAbility>((can) => {
  can('review');
  can('publish');
  can('read');
});

function publishArticle(article: object, ability: AppAbility) {
  if (ability.cannot('publish')) {
    throw new Error('You cannot publish articles');
  }

  // logic to publish article
}
```

**The advantages** of this:

1. You can start with simple permissions logic and evolve it together with your business requirements.
2. Thanks to tree-shaking in [rollup] and [webpack] CASL takes only 1.5KB for claim based authorization.
3. No need to support own solution. Lots of people use and create issues for OpenSource libraries like CASL, so you get support, bug fix and new features for free.

[rollup]: https://rollupjs.org/guide/en/
[webpack]: https://webpack.js.org/

## When To Avoid

Sometimes applications use merged action and subject as a claim: `create_article`, `read_article`, `read_user`. In such cases, it'd better separate actions and subjects. This will allow you to add conditions and fields to your abilities later without refactoring the whole application.
