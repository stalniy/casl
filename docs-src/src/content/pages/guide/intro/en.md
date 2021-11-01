---
title: Introduction
categories: [guide]
order: 10
meta:
  keywords: ~
  description: ~
---

[![@casl/ability NPM version](https://badge.fury.io/js/%40casl%2Fability.svg)](https://badge.fury.io/js/%40casl%2Fability)
[![](https://img.shields.io/npm/dm/%40casl%2Fability.svg)](https://www.npmjs.com/package/%40casl%2Fability)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

## What is CASL?

CASL (pronounced /ˈkæsəl/, like **castle**) is an isomorphic authorization JavaScript library which restricts what resources a given client is allowed to access. It's designed to be incrementally adoptable and can easily scale between a simple claim based and fully featured subject and attribute based authorization. It makes it easy to manage and share permissions across UI components, API services, and database queries.

> CASL implements [Attribute Based Access Control](https://en.wikipedia.org/wiki/Attribute-based_access_control)

## Getting Started

The easiest way to try out CASL.js is using the [Hello World example][example-hello-casl]. Feel free to open it in another tab and follow along as we go through some basic examples. Alternatively you can create Nodejs project and install `@casl/ability` as a dependency.

> The [Installation page][guide-install] provides more options of installing CASL.

[example-hello-casl]: https://codesandbox.io/s/github/stalniy/casl-examples/tree/master/packages/hello-world
[guide-install]: ../install

## Basics

CASL operates on the abilities level, that is what a user can actually do in the application. An ability itself depends on the 4 parameters (last 3 are optional):

1. **User Action**\
   Describes what user can actually do in the app. User action is a word (usually a verb) which depends on the business logic (e.g., `prolong`, `read`). Very often it will be a list of words from CRUD - `create`, `read`, `update` and `delete`.
2. **Subject**\
   The subject or subject type which you want to check user action on. Usually this is a business (or domain) entity (e.g., `Subscription`, `Article`, `User`). The relation between subject and subject type is the same as relation between an object instance and its class.
3. **Fields**\
   Can be used to restrict user action only to matched subject's fields (e.g., to allow moderator to update `status` field of an `Article` and disallow to update `description` or `title`)
4. **Conditions**\
   Criteria which restricts user action only to matched subjects. This is useful when you need to give a permission on specific subjects (e.g., to allow user to manage own `Article`)

At the core of CASL is a system that enables us to declaratively define and check user permissions using clear javascript syntax:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'User');
});
```

> CASL has sophisticated support for TypeScript but in this guide we will use JavaScript for the purpose of ease. See [CASL TypeScript](../../advanced/typescript) for details

In the example above, we have just defined an `Ability` instance which permits doing anything in the app except for deleting users. As you probably guessed, `can` and `cannot` accept the same arguments but have different meanings: `can` permits an action on the specified subject and `cannot` forbids it. Both may accept up to 4 arguments (in exactly the same order as listed in [concepts section](#basics)). In this case, `manage` and `delete` are user actions and `all` and `User` are subjects.

> `manage` and `all` are special keywords in CASL. `manage` represents any action and `all` represents any subject.

Now let's try to check permissions

```js @{data-filename="app.js"}
import ability from './defineAbility.js';

ability.can('read', 'Post') // true
ability.can('read', 'User') // true
ability.can('update', 'User') // true
ability.can('delete', 'User') // false
ability.cannot('delete', 'User') // true
```

In the example above, the `Ability` instance allows us to check permissions in a pretty readable way. By the way, all these examples demonstrate checking permissions based on a subject type (i.e. an object type or class), but CASL really shines when you need to restrict objects based on their attributes (i.e. properties).

## Conditions

The most common requirement for mid-sized apps is the ability to limit users so that they can perform actions only on their own resources. CASL allows us to do this by passing an object of conditions as the 3rd argument to `can` and `cannot` methods on the definition step.

Before diving into the details, let's first consider requirements for the permissions of a blog website. In such a blog, a user

* can `read` any `Article`
* can `update` own `Article`'s
* can `create` a `Comment` for any Article
* can `update` own `Comment`

Let's translate this to CASL:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  can('read', 'Article');

  if (user.isLoggedIn) {
    can('update', 'Article', { authorId: user.id });
    can('create', 'Comment');
    can('update', 'Comment', { authorId: user.id });
  }
});
```

Do you see how real business requirements are easily translated to code? Now let's check them!

```js
import defineAbilityFor from './defineAbility';

const user = { id: 1 };
const ability = defineAbilityFor(user);
const article = /* intentionally not defined */;

ability.can('read', article);
```

As you see, you can do checks on the subject the same way you do it on the subject's type! But what does the `article` variable hold inside? How does CASL know the subject type of the object referenced by this variable?

Do you remember that a subject and its type belong to each other in the same way as an object instance and its class? CASL remembers this as well and retrieves `article.constructor.name` as its subject type.

> Classes are natural in backend but not always makes sense in frontend development. CASL supports other ways to detect subject type, see [Subject type detection](../subject-type-detection) for details.

Let's get back to our example and define classes for `Article` and `Comment` entities:

```js @{data-filename="entities.js"}
class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

export class Article extends Entity {}
```

And this is how the example with missed `article` variable looks eventually:

```js
import defineAbilityFor from './defineAbility';
import { Article } from './entities';

const user = { id: 1 };
const ability = defineAbilityFor(user);
const article = new Article();

ability.can('read', article); // user can read any article
```

And few more examples just to get familiar with:

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
ability.can('update', anotherArticle) // false, we can't update articles which were not written by us
```

> Despite the fact that `can` and `cannot` functions in `defineAbility` callback are similar to `can` and `cannot` methods of `Ability` class, they have completely different purposes and accept different arguments. See [Make `can` API less confusing](../../cookbook/less-confusing-can-api) if it confuses you.

**Pay attention** that conditions object contains the same keys as the entity we want to check. This is how CASL matches entities by conditions. In our case, it just checks that `authorId` in `Article` instance equals to `authorId` in conditions object. Conditions may have several fields, in that case all fields should match (`AND` logic).

But conditions are not restricted to simple equality checks! Thanks to [ucast](https://github.com/stalniy/ucast) `Ability` instances can match objects using [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/).

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

In such case, the pair of action/subject rules are combined by logical `OR`. More formally, this can be translated as "users can read Article if it's published OR users can read Article if it's not published AND shared with them".

But that's not all, if you need more granular permission checks, you can define them on subject's attributes (i.e., fields)!

## Fields

Sometimes you may need to restrict which fields a user can access. For example, let's allow only moderators to publish `Article`:

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default (user) => defineAbility((can) => {
  can('read', 'Article');
  can('update', 'Article', ['title', 'description'], { authorId: user.id })

  if (user.isModerator) {
    can('update', 'Article', ['published'])
  }
});
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

Let's consider a simple example where user can publish articles:

```js
import { defineAbility } from '@casl/ability';
import { Article } from './entities';

const ability = defineAbility((can) => {
  can('read', 'Article', { published: true })
});
const article = new Article({ published: true });

ability.can('read', article); // (1)
ability.can('do', 'SomethingUndeclared'); // (2)
ability.can('read', 'Article'); // (3)
```

Line `(1)` returns `true` as we expected. Line `(2)` return `false` because for any unknown subject or action CASL returns `false`, by default everything is forbidden (if `manage` and `all` keywords are not used). But what would you expect line `(3)` to return? The answer may be unexpected for some of you, it returns `true` as well. **Why?!**

Let's get back to our experience for a while. Historically, majority of permissions management libs were built on top of roles or flags. So, a user either has permission or not. This can be expressed in pseudo code:

```js
allow('read_article');
allow('update_article');
```

This is interpreted as "user can read ALL articles and user can update ALL articles". So, this is "all or nothing" mindset.

**But CASL is different!** It allows us to ask different questions to our permissions. So, when you check on a

* subject, you ask "can I read THIS article?"
* subject type, you ask "can I read SOME article?" (i.e., at least one article)

It's very useful when you don't have an instance to check but know its type (for example, during creation), so this allows your app to fail fast.

> If you do checks on a subject type, you need to check permissions one more time on the final subject, right before sending request to API or database.

## Inverted rules

This guide talk a lot about allowable permissions but nothing about disallowable ones. This is for the reason. The direct logic is much simpler to understand, and we recommend to use it whenever possible.

To define an inverted rule, you need to use the 2nd argument in the callback of `defineAbility`. Let's give a user a permission to do anything but not delete:

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

When defining direct and inverted rules for the same pair of action and subject the order of rules matters: `cannot` declarations should follow after `can`, otherwise they will be overridden by `can`. For example, let's disallow to read all private objects (those that have property `private = true`):

```js
const user = { id: 1 };
const ability = defineAbility((can, cannot) => {
  cannot('read', 'all', { private: true });
  can('read', 'all', { authorId: user.id });
});

ability.can('read', { private: true }); // false
ability.can('read', { authorId: user.id }); // true
ability.can('read', { authorId: user.id, private: true }); // true!
```

Here we got an unexpected result because direct rule is the last one. To fix the result just revert those rules and **always remember to put inverted rules after the direct one!**

### Forbidden reasons

The good point about inverted rules is that they help to explicitly forbid particular actions. Moreover they allow to add explanation. Let's see how

```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('read', 'all');
  cannot('read', 'all', { private: true })
    .because('You are not allowed to read private information');
});
```

We can get this message back by checking permissions using `ForbiddenError`:

```js
import { ForbiddenError } from '@casl/ability';
import ability from './defineAbility';

try {
  ForbiddenError.from(ability).throwUnlessCan('read', { private: true })
} catch (error) {
  if (error instanceof ForbiddenError) {
    console.log(error.message); // You are not allowed to read private information
  }

  throw error
}
```

> To learn more about `ForbiddenError`, see [ForbiddenError API](../../api#forbidden-error)

## Update rules

Sometimes, especially in frontend application development, we need to update `Ability` instance's rules (e.g., on login or logout). To do this, we can use `update` method:

```js
import ability from './defineAbility';

ability.update([]); // forbids everything
ability.update([ // switch to readonly mode
  { action: 'read', subject: 'all' }
]);
```

Also we can use `AbilityBuilder` to create rules:

```js
import { Ability, AbilityBuilder } from '@casl/ability';

const ability = new Ability();

const { can, rules } = new AbilityBuilder();
can('read', 'all');

ability.update(rules);
```

To track when rules are updated, we can subscribe to `update` (before ability is updated) or `updated` (after ability is updated) events of `Ability` instance:

```js
const unsubscribe = ability.on('update', ({ rules, target }) => {
  // `rules` is an array passed to `update` method
  // `target` is an Ability instance that triggered event
})

unsubscribe() // removes subscription
```

## What else?

CASL does not have a concept of "a role" and this makes it very powerful! As CASL allows to describe user abilities in your application, you can use it to:

1. Implement [feature toggles](https://en.wikipedia.org/wiki/Feature_toggle)\
   Hide unfinished feature or show it to beta testers only.
2. Conduct [A/B testing](https://en.wikipedia.org/wiki/A/B_testing)\
   Based on age, region, country or whatever hide features for some users and show for others
3. Simple Business Logic\
   Disallow users to watch video if their subscription has been expired

> See [Roles with predefined permissions](../../cookbook/roles-with-static-permissions) for details.

## Ready for More?

We’ve briefly introduced all the features of CASL.js core - the rest of this guide will cover them and other advanced features with much finer details, so make sure to read through it all!
