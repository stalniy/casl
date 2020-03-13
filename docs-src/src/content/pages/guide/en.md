---
title: Intoduction
meta:
  keywords: ~
  description: ~
---

## What is CASL?

CASL (pronounced /ˈkæsəl/, like **castle**) is an isomorphic authorization JavaScript library which restricts what resources a given client is allowed to access. It's designed to be incrementally adoptable and can easily scale between a simple claim based and fully featured subject and attribute based authorization. It makes it easy to manage and share permissions across UI components, API services, and database queries.

## Getting Started

The easiest way to try out CASL.js is using the [Hello World example][hello-casl]. Feel free to open it in another tab and follow along as we go through some basic examples. Alternatively you can create Nodejs project and install `@casl/ability` as a dependency.

> The [Installation page][install] provides more options of installing CASL. 

[hello-casl]: #
[install]: #

## Basics

CASL operates on the abilities level, that is what a user can actually do in the application. An ability itself depends on the 4 parameters (last 3 are optional):

1. **User Action**\
   Describes what user can actually do in the app. User action is a word (usually a verb) which depdends on the business logic (e.g., `prolong`, `read`). Very often it will be a list of words from CRUD - `create`, `read`, `update` and `delete`.
2. **Subject**\
   The subject or subject type which you want to check user action on. Ussually this is a business (or domain) entity (e.g., `Subscription`, `Article`, `User`).
3. **Fields**\
   Can be used to restrict user action only to matched subject's fields (e.g., to allow moderator to update `hidden` field of `Article` but not update `desription` or `title`)
4. **Conditions**\
   An object or function which restricts user action only to matched subjects. This is useful when you need to give a permission on resources created by a user (e.g., to allow user to update and delete own `Article`)

> CASL doesn't have a concept of a role but it doesn't mean it can't be used in role based system. See [Roles with CASL][page-roles] for details.

[page-roles]: #

At the core of CASL is a system that enables us to declaratively define and check user permissions using clear javascript syntax:


```js @{data-filename="defineAbility.js"}
import { defineAbility } from '@casl/ability';

export default defineAbility((can, cannot) => {
  can('manage', 'all');
  cannot('delete', 'User');
});
```

> CASL has sophistacated support for TypeScript but in this guide we will use JavaScript to grasp basic concepts. See [CASL TypeScript][page-casl-ts] for details

[page-casl-ts]: #

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

> CASL is perfectly OK to work without specifying subjects. Just don't pass the 2nd argument to functions and that's it. See [Claim based rules][page-claim-rules] for more details.

[page-claim-rules]: #

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

Do you see how real bussiness requirements are easily translated to code? Now let's check them! 

But how can we check conditions? The simplest way to do this is to use classes for your models

> Classes are natural in backend development but not always makes sense in frontend. CASL supports another way to check conditions on objects, see [Subject name extraction][page-subject-name] for details.

[page-subject-name]: #

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

**Pay attention** that conditions object contains the same keys as the entity we want to check. This is how CASL matches entities by conditions. In our case, it just checks that `authorId` in `Article` instance equals to `authorId` in conditions object. Conditions may have several fields, in that case all fields should match (`AND` logic).

Actually `Ability` class uses [sift.js](https://github.com/crcn/sift.js)@{rel="noopener"} to match objects but only specific subset of operators are supported. This allows to use [MongoDB query language](http://docs.mongodb.org/manual/reference/operator/query/) to check permissions on entities.

> See [CASL conditions in depth][page-condition-advanced] for details
 
<!-- > Despite the fact that `can` and `cannot` functions in `defineAbility` callback are similar to  `Ability` instance `can` and `cannot` methods, they have different purposes and accept different arguments. In case it looks confusing, you may rename `can` and `cannot` functions in `defineAbility` to `allow` and `forbid` correspondingly. See [Confusing API][page-confusing-api] for explanation. -->

[page-confusing-api]: #
[page-condition-advanced]: #

