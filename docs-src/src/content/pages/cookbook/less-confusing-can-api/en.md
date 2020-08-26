---
title: Less confusing can API
categories: [cookbook]
order: 15
meta:
  keywords: ~
  description: ~
---

## The issue

CASL uses `can` and `cannot` function names to both define and check permissions. For some of you, it may look confusing and you would like to be more explicit and not rely on the execution context.

Example:

```ts
import { defineAbility } from '@casl/ability';

// define abilities
const ability = defineAbility((can, cannot) => {
  can('read', 'Post');
  cannot('read', 'Post', { private: true });
});

// check abilities
ability.can('read', 'Post');
```

**The main disadvantage** is that you need to remember the context and differences between function signatures of [`can` that defines ability](../../guide/intro) and `can` that checks it.

## The solution

What we can do is to use different variables' names, so the example above looks this:

```ts
import { defineAbility } from '@casl/ability';

// define abilities
const ability = defineAbility((allow, forbid) => {
  allow('read', 'Post');
  forbid('read', 'Post', { private: true });
});

// check abilities
ability.can('read', 'Post');
```

The same example using pure `AbilityBuilder` can be written in similar way using [object-destructuring]:

```ts
import { AbilityBuilder, Ability } from '@casl/ability';

// define abilities
const { can: allow, cannot: forbid, build } = new AbilityBuilder(Ability);

allow('read', 'Post');
forbid('read', 'Post', { private: true });

const ability = build();

// check abilities
ability.can('read', 'Post');
```

**The main advantage** is that everybody clearly sees that `allow` and `can` are different methods and potentially may have different signatures (because they different!).

> See [Define rules](../../guide/define-rules) for other ways to define ability.

## When to avoid

This approach really makes it easy to work with CASL for junior developers and those who prefers explicit code over conventions or context. If contextual code doesn't bother you, you can avoid this.

[object-destructuring]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
