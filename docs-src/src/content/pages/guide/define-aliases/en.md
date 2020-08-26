---
title: Define Action Aliases
categories: [guide]
order: 55
meta:
  keywords: ~
  description: ~
---

Aliases gives a possibility to combine several actions into one. This also simplifies checks when we need to ensure that user can do both actions together (e.g., `delete` and `update`).

To define an alias, we need to use `createAliasResolver` function. It accepts a single argument - aliases to actions map. For example, here we define modify alias as a combination of update and delete actions:

```js
import { defineAbility, createAliasResolver } from '@casl/ability'

const resolveAction = createAliasResolver({
  modify: ['update', 'delete']
});
const ability = defineAbility((can) => {
  can('modify', 'Post');
}, { resolveAction });

ability.can('modify', 'Post'); // true
ability.can('update', 'Post'); // true
ability.can('delete', 'Post'); // true
```

When you check abilities by alias, it means that user has all required actions (or doesn't have at least one), so:

```js
ability.can('modify', 'Post') === ability.can('update', 'Post') && ability.can('delete', 'Post');
```

**Be aware** that aliases work only in one direction! It means that `modify` is an alias for `update` and `delete` but `update` and `delete` do not automatically form `modify` alias. To understand what this means, let's consider the same example but with different rules:

```ts
import { defineAbility, createAliasResolver } from '@casl/ability'

const resolveAction = createAliasResolver({
  modify: ['update', 'delete']
});
const ability = defineAbility((can) => {
  can(['update', 'delete'], 'Post');
}, { resolveAction });

ability.can('modify', 'Post'); // false <---
ability.can('update', 'Post'); // true
ability.can('delete', 'Post'); // true
```

We got `false` for `modify` action, even though we can `delete` and `update` a Post! Aliases are resolved once on `Ability` instantiation level or when you call `ability.update`. It was done this way in order to make `ability.can` faster.

You can also define aliases on aliases, they are resolved recursively:

```js
import { defineAbility, createAliasResolver } from '@casl/ability'

const resolveAction = createAliasResolver({
  modify: ['update', 'delete'],
  access: ['read', 'modify']
});
const ability = defineAbility((can) => {
  can('access', 'Post');
}, { resolveAction });

ability.can('access', 'Post'); // true
ability.can('modify', 'Post'); // true
ability.can('update', 'Post'); // true
ability.can('delete', 'Post'); // true
```

## Invalid usage

In any environment that is not production (determined by `process.env.NODE_ENV`), `createAliasResolver` analyses passed in object and forbids to:

1. Create an alias for `manage` action.\
   `manage` is reserved and represents any action, so there is no need to alias it (e.g., `createAliasResolver({ access: 'manage' })`).
2. Create an alias to itself (e.g., `createAliasResolver({ access: 'access' })`).

It doesn't detect cycles through several levels of indirection, so you need to ensure this by yourself.
