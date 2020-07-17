# [CASL Ability](https://stalniy.github.io/casl/) [![@casl/ability NPM version](https://badge.fury.io/js/%40casl%2Fability.svg)](https://badge.fury.io/js/%40casl%2Fability)  [![](https://img.shields.io/npm/dm/%40casl%2Fability.svg)](https://www.npmjs.com/package/%40casl%2Fability) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package is the core of CASL. It includes logic responsible for [checking and defining][intro] permissions.

## Installation

```sh
npm install @casl/ability
```

## Documentation

This README file contains only basic information about the package. If you need an in depth introduction, please visit [CASL's documentation](https://casl.js.org/).

## Getting Started

**Note**: the best way to get started is to read [Guide][intro] in the official documentation. In this README file, you will find just basic information.

CASL operates on the abilities level, that is what a user can actually do in the application. An ability itself depends on the 4 parameters (last 3 are optional):

1. User Action\
   Describes what user can actually do in the app. User action is a word (usually a verb) which depends on the business logic (e.g., `prolong`, `read`). Very often it will be a list of words from CRUD - `create`, `read`, `update` and `delete`.
2. Subject\
   The subject or subject type which you want to check user action on. Usually this is a business (or domain) entity name (e.g., `Subscription`, `BlogPost`, `User`).
3. Conditions\
   An object or function which restricts user action only to matched subjects. This is useful when you need to give a permission on resources created by a user (e.g., to allow user to update and delete own `BlogPost`)
4. Fields\
   Can be used to restrict user action only to matched subject's fields (e.g., to allow moderator to update `hidden` field of `BlogPost` but not update `description` or `title`)

Using CASL you can describe abilities using regular and inverted rules. Let's see how

**Note**: all the examples below are written in ES6 using ES modules but CASL also has a sophisticated support for TypeScript, read [CASL TypeScript support][typescript-support] for details.

### 1. Define Abilities

Lets define `Ability` for a blog website where visitors:
* can read blog posts
* can manage (i.e., do anything) own posts
* cannot delete a post if it was created more than a day ago

```js
import { AbilityBuilder, Ability } from '@casl/ability'
import { User } from '../models'; // application specific interfaces

/**
 * @param user contains details about logged in user: its id, name, email, etc
 */
function defineAbilitiesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  // can read blog posts
  can('read', 'BlogPost');
  // can manage (i.e., do anything) own posts
  can('manage', 'BlogPost', { author: user.id });
  // cannot delete a post if it was created more than a day ago
  cannot('delete', 'BlogPost', {
    createdAt: { $lt: Date.now() - 24 * 60 * 60 * 1000 }
  });

  return new Ability(rules);
});
```

Do you see how easily business requirements were translated into CASL's rules?

**Note**: you can use class instead of string as a subject type (e.g., `can('read', BlogPost)`)

And yes, `Ability` class allow you to use some MongoDB operators to define conditions. Don't worry if you don't know MongoDB, it's not required and explained in details in [Defining Abilities][define-abilities]

### 2. Check Abilities

Later on you can check abilities by using `can` and `cannot` methods of `Ability` instance.

```js
import { BlogPost, ForbiddenError } from '../models';

const user = getLoggedInUser(); // app specific function
const ability = defineAbilitiesFor(user)

// true if ability allows to read at least one Post
ability.can('read', 'BlogPost');

// true if there is no ability to read this particular blog post
const post = new BlogPost({ title: 'What is CASL?' });
ability.cannot('read', post);

// you can even throw an error if there is a missed ability
ForbiddenError.from(ability).throwUnlessCan('read', post);
```

**Note**: you can use class instead of string as a subject type (e.g., `ability.can('read', BlogPost)`)

Of course, you are not restricted to use only class instances in order to check permissions on objects. See [Introduction][intro] for the detailed explanation.

### 3. Database integration

CASL has a complementary package [@casl/mongoose] which provides easy integration with MongoDB and [mongoose].

```js
import { AbilityBuilder } from '@casl/ability';
import { accessibleRecordsPlugin } from '@casl/mongoose';
import mongoose from 'mongoose';

mongoose.plugin(accessibleRecordsPlugin);

const user = getUserLoggedInUser(); // app specific function

const ability = defineAbilitiesFor(user);
const BlogPost = mongoose.model('BlogPost', mongoose.Schema({
  title: String,
  author: mongoose.Types.ObjectId,
  content: String,
  createdAt: Date,
  hidden: { type: Boolean, default: false }
}))

// returns mongoose Query, so you can chain it with other conditions
const posts = await Post.accessibleBy(ability).where({ hidden: false });

// you can also call it on existing query to enforce permissions
const hiddenPosts = await Post.find({ hidden: true }).accessibleBy(ability);

// you can even pass the action as a 2nd parameter. By default action is "read"
const updatablePosts = await Post.accessibleBy(ability, 'update');
```

See [Database integration][database-integration] for details.

### 4. Advanced usage

**CASL is incrementally adoptable**, that means you can start your project with simple claim (or action) based authorization and evolve it later, when your app functionality evolves.

**CASL is composable**, that means you can implement alternative conditions matching (e.g., based on [joi], [ajv] or pure functions) and field matching (e.g., to support alternative syntax in fields like `addresses.*.street` or `addresses[0].street`) logic.

See [Advanced usage][advanced-usage] for details.

[joi]: https://www.npmjs.com/package/@hapi/joi
[ajv]: https://www.npmjs.com/package/ajv

### 5. Performance and computational complexity

CASL checks are quite fast, thanks to underlying rule index structure. The estimated complexity of different operations can be found below:

| Operation                        | Complexity | Notes         |
|----------------------------------|------------|---------------|
| `Ability` creation time          | O(n)       | n - amount of rules |
| Check by action and subject type (e.g., `ability.can('read', 'Todo')`) | O(1) | |
| Check by action and subject object (e.g., `ability.can('read', todo)`) | O(m + k) + O(p) | m - amount of rules for the same pair of action and subject; k - amount of operators in conditions; O(p) - complexity of used operators (e.g., `$in` implementation is more complex than `$lt`) |

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[define-abilities]: https://stalniy.github.io/casl/en/guide/define-rules
[intro]: https://stalniy.github.io/casl/en/guide/intro
[database-integration]: https://stalniy.github.io/casl/en/package/casl-mongoose
[advanced-usage]: https://stalniy.github.io/casl/en/advanced/customize-ability
[typescript-support]: https://stalniy.github.io/casl/en/advanced/typescript
