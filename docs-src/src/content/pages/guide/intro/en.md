---
title: Introduction
categories: [guide]
order: 10
meta:
  keywords: ~
  description: ~
---

## What is CASL?

CASL (pronounced /ˈkæsəl/, like **castle**) is an isomorphic authorization JavaScript library which restricts what resources a given client is allowed to access. It's designed to be incrementally adoptable and can easily scale between a simple claim based and fully featured subject and attribute based authorization. It makes it easy to manage and share permissions across UI components, API services, and database queries.

## Getting Started

The easiest way to try out CASL.js is using the [Hello World example][example-hello-casl]. Feel free to open it in another tab and follow along as we go through some basic examples. Alternatively you can create Nodejs project and install `@casl/ability` as a dependency.

> The [Installation page][guide-install] provides more options of installing CASL.

[example-hello-casl]: #
[guide-install]: ../install

## Basics

CASL operates on the abilities level, that is what a user can actually do in the application. An ability itself depends on the 4 parameters (last 3 are optional):

1. **User Action**\
   Describes what user can actually do in the app. User action is a word (usually a verb) which depends on the business logic (e.g., `prolong`, `read`). Very often it will be a list of words from CRUD - `create`, `read`, `update` and `delete`.
2. **Subject**\
   The subject or subject type which you want to check user action on. Usually this is a business (or domain) entity (e.g., `Subscription`, `Article`, `User`).
3. **Fields**\
   Can be used to restrict user action only to matched subject's fields (e.g., to allow moderator to update `hidden` field of `Article` but not update `description` or `title`)
4. **Conditions**\
   An object or function which restricts user action only to matched subjects. This is useful when you need to give a permission on resources created by a user (e.g., to allow user to update and delete own `Article`)

> CASL doesn't have a concept of a role but it doesn't mean it can't be used in role based system. See [Roles with static rules CASL](../../cookbook/roles/with-static-rules) for details.

At the core of CASL is a system that enables us to declaratively define and check user permissions using clear javascript syntax:

> CASL has sophisticated support for TypeScript but in this guide we will use JavaScript for the purpose of ease. See [CASL TypeScript](../../advanced/typescript) for details

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'User');
});
```

> `defineAbility` function is useful for simple declarations thus good for guides and tests but for most applications direct usage of `AbilityBuilder` instance should fit better. See [Define Rules](../define-rules) for in depth details.

In the example above, we have just defined `Ability` instance which allows to do anything in the app but not delete users. As you probably guessed, `can` and `cannot` accept the same arguments but has different meanings, `can` allows to do an action on the specified subject and `cannot` forbids. Both may accept up to 4 arguments (in exactly the same order as listed in [concepts section](#basics)). In this case, `manage` and `delete` are user actions, `all` and `User` are subjects

> `manage` and `all` are special keywords in CASL. `manage` represents any action and `all` represents any subject

Now let's try to check permissions

```js @{data-filename="app.js"}
import ability from './defineAbility.js';

ability.can('read', 'Post') // true
ability.can('read', 'User') // true
ability.can('update', 'User') // true
ability.can('delete', 'User') // false
ability.cannot('delete', 'User') // true
```

> CASL is perfectly OK to work without specifying subjects. Just don't pass the 2nd argument to functions and that's it. See [Claim based authorization](../../cookbook/claim-authorization) for more details.

In the example above, `Ability` instance allows us to check permissions in pretty readable way. You may think: "there is nothing extraordinary, we got results according to how permissions were defined". And you are right! CASL really shines when you need to restrict resources based on their attributes

## Conditions

The most common requirement to mid size apps is an ability to restrict action on own resources. CASL allows us to do this by passing an object of conditions as the 3rd argument to `can` and `cannot` methods on the definition step.

So, let's consider requirements for permissions for a blog website similar to medium but simpler. In such blog user

* can `read` any `Article`
* can `update` own `Article`'s
* can `leave` a `Comment` for any Article
* can `update` own `Comment`

Let's translate this to CASL:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
  return defineAbility((can) => {
    can('read', 'Article');

    if (user.isLoggedIn) {
      can('update', 'Article', { authorId: user.id });
      can('leave', 'Comment');
      can('update', 'Comment', { authorId: user.id });
    }
  });
}
```

Do you see how real business requirements are easily translated to code? Now let's check them!

But how can we check conditions? The simplest way to do this is to use classes for your models

> Classes are natural in backend development but not always makes sense in frontend. CASL supports another way to check conditions on objects, see [Subject name detection](../subject-name) for details.

So, let's define a simple classes for `Article` and `Comment` entities:

```js @{data-filename="entities.js"}
class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Article extends Entity {}
export class Comment extends Entity {}
```

Now we can check permissions:

```js @{data-filename="app.js"}
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const user = { id: 1, isLoggedIn: true };
const ownArticle = new Article({ authorId: user.id });
const anotherArticle = new Article({ authorId: 2 });
const ability = defineAbilityFor(user);

ability.can('read', 'Article') // true
ability.can('update', 'Article') // true
ability.can('update', ownArticle) // true
ability.can('update', anotherArticle) // false
```

> Despite the fact that `can` and `cannot` functions in `defineAbility` callback are similar to  `Ability` instance `can` and `cannot` methods, they have different purposes and accept different arguments. In case it looks confusing, you may rename `can` and `cannot` functions in `defineAbility` to `allow` and `forbid` correspondingly. See [About `can` API][advanced-about-can-api] for explanation.

[advanced-about-can-api]: ../../advanced/about-can-api

**Pay attention** that conditions object contains the same keys as the entity we want to check. This is how CASL matches entities by conditions. In our case, it just checks that `authorId` in `Article` instance equals to `authorId` in conditions object. Conditions may have several fields, in that case all fields should match (`AND` logic).

Thanks to [sift.js](https://github.com/crcn/sift.js) `Ability` instances can match objects using [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/).

> If you are not familiar with MongoDB query language, see [CASL conditions in depth](../conditions-in-depth) for details

You can define the same pair of action and subject with different conditions multiple times. For example, let's allow our blog users to share drafts and publish articles:

```js
import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
  return defineAbility((can) => {
    can('read', 'Article', { published: true });
    can('read', 'Article', { published: false, sharedWith: user.id });
  });
}
```

In such case, the pair of action/subject rules are combined by logical `OR`. More formally this can be translated as "users can read Article if it's published OR users can read Article if it's not published AND shared with them".

If it's not enough you can also define permissions for subject fields!

## Fields

Sometimes you may need to restrict which fields a user can access. For example, let's allow only moderators to publish `Article`:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
  return defineAbility((can) => {
    can('read', 'Article');
    can('update', 'Article', ['title', 'description'], { authorId: user.id })

    if (user.isModerator) {
      can('update', 'Article', ['published'])
    }
  });
}
```

Here we defined that any user can update `title` and `description` fields of their own `Article`s and only moderators can update `published` field.

> If fields are not specified, a user is allowed to access any field.

To check permissions use the same `can` and `cannot` methods of `Ability` instance:

```js
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const moderator = { id: 2, isModerator: true };
const ownArticle = new Article({ authorId: moderator.id });
const foreignArticle = new Article({ authorId: 10 });
const ability = defineAbilityFor(moderator);

ability.can('read', 'Article') // true
ability.can('update', 'Article', 'published') // true
ability.can('update', ownArticle, 'published') // true
ability.can('update', foreignArticle, 'title') // false
```

> For more complex cases, you can use nested fields and wildcards, see [Restricting field access](../restricting-fields) for details

## Checking logic

Let's consider a simple example where user can published articles:

```js
import { defineAbility } from '@casl/ability';
import { Article } from './entities';

const ability = defineAbility((can) => {
  can('read', 'Article', { published: true })
});
const article = new Article({ published: true });

ability.can('read', article); // (1)
ability.can('read', 'Article'); // (2)
ability.can('do', 'SomethingUndeclared'); // (3)
```

Line `(1)` returns `true` as we expected but what would you expect line `(2)` to return? The answer may be unexpected for some of you but it returns `true` as well. Why?

This happens because these checks ask different questions:
* the 1st asks "can I read this article?"
* the 2nd asks "can I read at least one article?". Our user can read published articles, so it can read at least one published article, that's why we got `true`.

It make sense when you don't have an instance to check on but know its type (for example, during creation), so this allows your app to fail fast.

> If you do checks on subject type, you need to check permissions one more time, right before sending request to API or database.

Also it's important to note that for any non-declared subject or action CASL returns `false` (if you do not use `manage` and `all` keywords), that's why the `(3)` line returns `false`.

## Inverted rules

This guide talk a lot about direct permissions but nothing about inverted one. This is for the reason. The direct logic is much simpler to understand, and we recommend to use it whenever possible.

To define an inverted rule, you need to use the 2nd argument in callback of `defineAbility`. Let's give user a permission to do anything but not delete:

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'all');
});

ability.can('read', 'Post'); // true
ability.can('delete', 'Post'); // false
```

As you should know direct rules are checked by logical `OR` on the other hand inverted ones are checked by logical `AND`. So, in the example above user:

* can do anything on all entities
* and cannot delete any entity

When action and subject of direct and inverted rules are intersects, its order matters: `cannot` declarations should follow after `can`, otherwise they will be overridden by `can`.

### Forbidden reasons

The good point about inverted rules is that they help to explicitly forbid particular actions. Moreover they allow to add explanation. Let's see how

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'all');
  cannot('read', 'all', { private: true }).because('You are not allowed to read private information');
});
```

So then, we can check permissions using `ForbiddenError`:

```js
import { ForbiddenError } from '@casl/ability';
import ability from './defineAbility';

try {
  ForbiddenError.from(ability).throwUnlessCan('read', { private: true })
} catch (error) {
  if (error instanceof ForbiddenError) {
    console.log(error.message)
  }
}
```

> To learn more about `ForbiddenError`, see [ForbiddenError API](../../api#forbidden-error)

## Update rules

Sometimes, especially in frontend application development, you will need to update `Ability` instance's rules (e.g., on login or logout). To do this, you need to call `update` method:

```js
import ability from './defineAbility';

ability.update([]); // forbids everything
ability.update([ // switch to readonly mode
  { action: 'read', subject: 'all' }
]);
```

To track when rules are update, you can subscribe to `update` or `updated` events of `Ability` instance:

```js
const unsubscribe = ability.on('update', ({ rules, ability }) => {
  // `rules` is an array passed to `update` method
  // `ability` is an Ability instance that triggered event
})

unsubscribe() // removes subscription
```

## Ready for More?

We’ve briefly introduced all the features of CASL.js core - the rest of this guide will cover them and other advanced features with much finer details, so make sure to read through it all!