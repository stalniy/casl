---
layout: default
title:  "Define Abilities"
date:   2017-07-20 20:12:48 +0300
categories: abilities
---

The `Ability` class is where all user permissions are defined. You can create `Ability` using `AbilityBuilder` or `Ability` constructor.

`AbilityBuilder` allows to define rules in DSL-like style with help of `can` and `cannot` functions:
```js
import { AbilityBuilder } from 'casl'

function defineAbilitiesFor(user) {
  return AbilityBuilder.define((can, cannot) => {
    if (user.isAdmin()) {
      can('manage', 'all')
    } else {
      can('read', 'all')
    }
  })
}
```

If you don't like nesting, you can alternatively use `extract` method:

```js
import { AbilityBuilder, Ability } from 'casl'

function defineAbilitiesFor(user) {
  const { rules, can, cannot } = AbilityBuilder.extract()

  if (user.isAdmin()) {
    can('manage', 'all')
  } else {
    can('read', 'all')
  }

  return new Ability(rules)
}
```

The current user object is passed into the `defineAbilitiesFor` function, so the permissions can be modified based on any user attributes. CASL makes no assumption about how roles are handled in your application. See [Roles and Abilities][roles-example] for an example.

`AbilityBuilder.define` has a different signature which allows you to pass some ability options like `subjectName`. For example

```js
function subjectName(subject) {
  // logic to extract subject name from subject instances
  // It's important to handle case when `subject` is undefined or string!
  // Otherwise you will not be able to check abilities on class names (e.g., `ability.can('read', 'Post')`)

  return !subject || typeof subject === 'string' ? subject : subject.$type
}

const ability = AbilityBuilder.define({ subjectName }, can => {
  can('read', 'all')
})
```

See [Intance checks][instance-checks] for details.

`Ability` constructor is very handy in case if you store permissions in database or request from API. The first parameter of the constructor is an array of abilities, objects which has the next shape:

```ts
// TypeScript definition
interface Rule {
  actions: string | string[],
  subject: string | string[],
  conditions?: Object,
  inverted?: boolean
}
```

Rule should have `inverted` set to `true` in case if it forbids to perform specified action. For example, the next list of rules allows to manage `all` models and disallows to `delete` posts:

```js
import { Ability } from 'casl'

const ability = new Ability([
  { subject: 'all', actions: 'manage' },
  { subject: 'Post', actions: 'delete', inverted: true }
])
```

## `can` DSL function

The `can` method is used to define permissions and requires two arguments. The first one is the action or actions you're setting the permission for, the second one is the name of model you're setting it on.

```js
can('update', 'Post')
```

You can pass `manage` to represent CRUD action and `all` to represent any object.

```js
can('manage', 'Post')  // user can perform create, read, update, delete action on the post
can('read', 'all')     // user can read any object
can('manage', 'all')   // user can perform any action on any object
```

You can pass an array for either of these parameters to match any one. For example, here the user will have the ability to `update` or `delete` both posts and comments.

```js
can(['update', 'delete'], ['Post', 'Comment'])
```

Common actions are `read`, `create`, `update` and `delete` but it can be anything. Also you can define own aliases to one or few actions.

## Define own aliases

To define a new alias you can use `addAlias` method which accepts 2 arguments: alias name and one or few action names. For example, here we define `modify` alias to `update` and `delete`

```js
import { Ability, AbilityBuilder } from 'casl'

Ability.addAlias('modify', ['update', 'delete'])
AbilityBuilder.define(can => {
 can('modify', 'Post')
})
```

Also it's possible to define aliases for other aliases. Lets add `access` alias which is an alias for `manage`:

```js
Ability.addAlias('access', 'manage')

const ability = AbilityBuilder.define(can => {
  can('access', 'Post')
})

ability.can('manage', 'Post') // true
ability.can('access', 'Post') // true
ability.can('read', 'Post') // true
```

## Rule Conditions

An object of conditions can be passed to further restrict which records this permission applies to. Here the user will only have permission to read active projects which they own.

```js
can('read', 'Project', { active: true, ownerId: user.id })
```

It is important to only use database columns for these conditions so it can be used for [Fetching Records][fetching-records].

You can use dot notation to define conditions on nested objects. Here the post can only be deleted if it does not have comments

```js
can('delete', 'Post', { 'comments.0': { $exists: false } })
```

As you may know already, it's possible to use few MongoDB query operators to define more complex conditions (supports only `$eq`, `$ne`, `$in`, `$all`, `$gt`, `$lt`, `$gte`, `$lte`, `$exists`).

## Combining Abilities

It is possible to define multiple abilities for the same resource.

```js
can('read', 'Post', { published: true })
can('read', 'Post', { preview: true })
```

Adding can rules do not override prior rules, but instead they are logically or'ed. For the above, `ability.can('read', post)` will always return `true` if `published` or `preview` attribute of `post` equals `true`.

The `cannot` DSL function takes the same arguments as `can` and defines which actions the user is unable to perform. This is normally done after a more generic `can` call.

```js
AbilityBuilder.define((can, cannot) => {
  can('manage', 'Post')
  cannot('delete', 'Post')
})
```

It is important that the `cannot delete` line comes after the `can manage` line. If they were reversed, `cannot delete` would be overridden by `can manage`. The rule of thumb is to define general rules first and more specific after general ones.

## Update abilities

It's possible to update abilities of created `Ability` instance. For example, in Single Page Application you need to reset all abilities once user is logged out.

```js
ability.update([]) // removes all rules

ability.update([{ subject: 'all', actions: 'read' }]) // switches ability in readonly mode
```

Also it's possible to subscribe to rules update using `on` method:

```js
ability.on('update', ({ rules, ability }) => {
  // `rules` is an array passed to `update` method
  // `ability` is an Ability instance where event was registered
})

ability.update([])
```

Method `on` returns a function, by calling this function you can unsubscribe from event:

```js
const unsubscribe = ability.on('update', updateOutsideState)

unsubscribe() // removes subscription
```

[roles-example]: {% post_url 2017-07-21-roles %}
[instance-checks]: {% post_url 2017-07-21-check-abilities %}#instance-checks
[fetching-records]: {% post_url 2017-07-22-database-integration %}
