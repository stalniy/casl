---
layout: default
title:  "Define Abilities"
date:   2017-07-20 20:12:48 +0300
categories: abilities
tags: [CASL define abilities, define permissions per field, permissions per entity, updating permissions, CASL subjectName option, determine subject name for entity]
---

The `Ability` class is where all user permissions are defined. You can create `Ability` using `AbilityBuilder` or `Ability` constructor.

`AbilityBuilder` allows to define rules in DSL-like style with help of `can` and `cannot` functions:

```js
import { AbilityBuilder } from '@casl/ability'

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

If you don't like nesting, you can use `extract` method:

```js
import { AbilityBuilder, Ability } from '@casl/ability'

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

**Pay attention** that `can` and `cannot` DSL functions used for defining permissions **are different from** `Ability#can` and `Ability#cannot` which are used for checking permissions!
In case it looks confusing, you may rename `can` and `cannot` DSL functions to `allow` and `forbid` correspondingly. So, the example for `AbilityBuilder.define` will look like:

```js
import { AbilityBuilder } from '@casl/ability'

function defineAbilitiesFor(user) {
  return AbilityBuilder.define((allow, forbid) => {
    if (user.isAdmin()) {
      allow('manage', 'all')
    } else {
      allow('read', 'all')
    }
  })
}
```

And if you prefer to use `AbilityBuilder.extract` method:

```js
import { AbilityBuilder, Ability } from '@casl/ability'

function defineAbilitiesFor(user) {
  const { rules, can: allow, cannot: forbid } = AbilityBuilder.extract()

  if (user.isAdmin()) {
    allow('manage', 'all')
  } else {
    allow('read', 'all')
  }

  return new Ability(rules)
}
```

<a name="ability-subject-name"></a>
`AbilityBuilder.define` has another signature which allows you to pass some ability options like `subjectName`. For example

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

<a name="ability-constructor"></a>
`Ability` constructor is very handy in case if you store permissions in database or retrieve from API. The first parameter of the constructor is an array of abilities, objects which has the next shape:

```ts
// TypeScript definition
interface Rule {
  actions: string | string[],
  subject: string | string[],
  conditions?: Object,
  fields?: string[],
  inverted?: boolean, // default is `false`
  reason?: string // mainly to specify why user can't do something. See forbidden reasons for details
}
```

Rule should have `inverted` set to `true` in case if it forbids to perform specified action. For example, the next list of rules allows to manage `all` models and disallows to `delete` posts:

```js
import { Ability } from '@casl/ability'

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

You can pass `manage` to represent any action and `all` to represent any object. You can use `crud` alias to represent `create`, `read`, `update` and `delete` actions.

```js
can('manage', 'Post')  // user can perform any action on the post
can('read', 'all')     // user can read any object
can('manage', 'all')   // user can perform any action on any object
can('crud', 'all') // user can create, read, update and delete any object
```

You can pass an array for either of these parameters to match any one. For example, here the user will have the ability to `update` or `delete` both posts and comments.

```js
can(['update', 'delete'], ['Post', 'Comment'])
```

Common actions are `read`, `create`, `update` and `delete` but it can be anything.

Starting from `@casl/ability@2.3.0`, it's also possible to define rules using Types (i.e., classes or constructor functions)

```js
class Post {
  ...
}

const ability = AbilityBuilder.define(can => {
  can('read', Post)
  can('update', Post)
})
```

`AbilityBuilder` uses default (or provided) `subjectName` option to determine subject name and resulting rules contain `subject` field which is a string, in the case above `Post`.

```js
console.log(ability.rules)
/*
[
  { actions: 'read', subject: 'Post' },
  { actions: 'update', subject: 'Post' }
]
*/
```

**Note**: `cannot` DSL function accepts the same arguments as `can` but defines `inverted` rules (i.e., forbids to perform an action)

## Define own aliases

To define a new alias you can use `addAlias` method which accepts 2 arguments: alias name and one or few action or alias names. For example, here we define `modify` alias as a combination of `update` and `delete` actions:

```js
import { Ability, AbilityBuilder } from '@casl/ability'

// user can `modify` only if he has both `update` and `delete` permission
Ability.addAlias('modify', ['update', 'delete'])

const ability = AbilityBuilder.define(can => {
 can('modify', 'Post')
})
```

**Be aware** that aliases works only one way! It means that `modify` is an alias for 2 actions `update` and `delete` but `update` and `delete` are not aliases for `modify`.
So, if we check permissions defined in the example above:

```js
ability.can('modify', 'Post') // true
ability.can('delete', 'Post') // true
ability.can('update', 'Post') // true
```

Everything returns `true` but if we rewrite that example to this:

```js
Ability.addAlias('modify', ['update', 'delete'])

const ability = AbilityBuilder.define(can => {
 can('delete', 'Post')
 can('update', 'Post')
})
```

and then check abilities:

```js
ability.can('modify', 'Post') // false !!!
ability.can('delete', 'Post') // true
ability.can('update', 'Post') // true
```

`ability` returns `false` for `modify` even though it allows to `delete` and `update` a `Post`. Aliases are resolved once on `Ability` instantiation level or when you call `ability.update`.
It was done this way in order to gain performance improvements. In the current implementation `Ability` doesn't need to expand aliases during each call to `ability.can`.
So, aliases are mainly useful as shortcuts for multiple actions or other aliases.

Also it's possible to define aliases for other aliases. Lets add `access` alias which is an alias for `crud`:

```js
Ability.addAlias('access', 'crud')

const ability = AbilityBuilder.define((can) => {
  can('access', 'Post')
})

ability.can('crud', 'Post')    // true
ability.can('access', 'Post') // true
ability.can('read', 'Post')  // true
```

You cannot define `manage` alias as it's a reserved keyword that represents any action. Also it's not possible to add an alias for `manage` action:

```js
Ability.addAlias('manage', 'crud') // throws error

Ability.addAlias('doAnything', 'manage') // throws error
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

As you may know already, it's possible to use few MongoDB query operators to define more complex conditions (`$eq`, `$ne`, `$in`, `$all`, `$gt`, `$lt`, `$gte`, `$lte`, `$exists`, `$regex`, `$elemMatch`).

CASL uses [sift.js](https://github.com/crcn/sift.js/tree/7.0.1) under the hood, so you can use other operators and `sift` functionality but this may change in the future.

## Rules per field

It's possible to define abilities per subject fields. For example, you may want to allow `moderator` to update only `isPublished` field of the article:

```js
can('update', 'Post', 'isPublished')
```

or allow user to update only `title` and `description`

```js
can('update', 'Post', ['title', 'description'])
```

If fields are not specified then user is allowed to access all fields.
You can combine fields together with conditions:

```js
can('update', 'Post', ['title', 'description'], { authorId: user.id })
```

It allows to retrieve only fields which user can update (e.g., when PATCH/PUT request sent to API) or show only editable fields on UI (e.g., on post edit page).

See [Checking Abilities with fields][checking-ability-fields] for details.

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

## Forbidden reasons

Sometimes you may want to define rules with possibility to specify more clear error message when `ability.can` fails.
To do that, you need explicitly forbid actions and provide corresponding messages. You can use `because` method of `RuleBuilder` or provide `reason` key in `RawRule` object:

```js
// `user` is a reference to user object

const ability = await AbilityBuilder.define(async (can, cannot) => {
  can('read', 'Post')

  if (!(await user.hasActiveSubscription())) {
    cannot('update', 'Post').because('subscription expired')
  } else if (await user.isUpdatesPerDayExceeded()) {
    cannot('update', 'Post').because('updates per day exceeded')
  } else {
    can('update', 'Post', { userId: user.id })
  }
})
```

Alternatively, you can provide `reason` key when using object notation:

```js
const ability = new Ability([
  { action: 'read', subject: 'Post' },
  { action: 'update', subject: 'Post', inverted: true, reason: 'subscription expired' }
])
```

Now, `ability` knows why user can't update `Post` and can provide more friendly error message.

Read [checking abilities][checking-ability] to see how this can be used together with `throwUnlessCan` method.

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

[roles-example]: {{ site.baseurl }}{% post_url 2017-07-21-roles %}
[instance-checks]: {{ site.baseurl }}{% post_url 2017-07-21-check-abilities %}#instance-checks
[fetching-records]: {{ site.baseurl }}{% post_url 2017-07-22-database-integration %}
[checking-ability-fields]: {{ site.baseurl }}{% post_url 2017-07-21-check-abilities %}#checking-fields
[checking-ability]: {{ site.baseurl }}{% post_url 2017-07-21-check-abilities %}
