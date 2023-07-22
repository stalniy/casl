# CASL Mongoose

[![@casl/mongoose NPM version](https://badge.fury.io/js/%40casl%2Fmongoose.svg)](https://badge.fury.io/js/%40casl%2Fmongoose)
[![](https://img.shields.io/npm/dm/%40casl%2Fmongoose.svg)](https://www.npmjs.com/package/%40casl%2Fmongoose)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package integrates [CASL] and [MongoDB]. In other words, it allows to fetch records based on CASL rules from MongoDB and answer questions like: "Which records can be read?" or "Which records can be updated?".

## Installation

```sh
npm install @casl/mongoose @casl/ability
# or
yarn add @casl/mongoose @casl/ability
# or
pnpm add @casl/mongoose @casl/ability
```

## Usage

`@casl/mongoose` can be integrated not only with [mongoose] but also with any [MongoDB] JS driver thanks to new `accessibleBy` helper function.

### `accessibleBy` helper

This neat helper function allows to convert ability rules to MongoDB query and fetch only accessible records from the database. It can be used with mongoose or [MongoDB adapter][mongo-adapter]:


#### MongoDB adapter

```js
const { accessibleBy } = require('@casl/mongoose');
const { MongoClient } = require('mongodb');
const ability = require('./ability');

async function main() {
  const db = await MongoClient.connect('mongodb://localhost:27017/blog');
  let posts;

  try {
    posts = await db.collection('posts').find(accessibleBy(ability, 'update').Post);
  } finally {
    db.close();
  }

  console.log(posts);
}
```

This can also be combined with other conditions with help of `$and` operator:

```js
posts = await db.collection('posts').find({
  $and: [
    accessibleBy(ability, 'update').Post,
    { public: true }
  ]
});
```

**Important!**: never use spread operator (i.e., `...`) to combine conditions provided by `accessibleBy` with something else because you may accidentally overwrite properties that restrict access to particular records:

```js
// returns { authorId: 1 }
const permissionRestrictedConditions = accessibleBy(ability, 'update').Post;

const query = {
  ...permissionRestrictedConditions,
  authorId: 2
};
```

In the case above, we overwrote `authorId` property and basically allowed non-authorized access to posts of author with `id = 2`

If there are no permissions defined for particular action/subjectType, `accessibleBy` will return `{ $expr: false }` and when it's sent to MongoDB, it will return an empty result set.

#### Mongoose

```js
const Post = require('./Post') // mongoose model
const ability = require('./ability') // defines Ability instance

async function main() {
  const accessiblePosts = await Post.find(accessibleBy(ability).Post);
  console.log(accessiblePosts);
}
```

`accessibleBy` returns a `Proxy` instance and then we access particular subject type by reading its property. Property name is then passed to `Ability` methods as `subjectType`. With Typescript we can restrict this properties only to know record types:

#### `accessibleBy` in TypeScript

If we want to get hints in IDE regarding what record types (i.e., entity or model names) can be accessed in return value of `accessibleBy` we can easily do this by using module augmentation:

```ts
import { accessibleBy } from '@casl/mongoose';
import { ability } from './ability'; // defines Ability instance

declare module '@casl/mongoose' {
  interface RecordTypes {
    Post: true
    User: true
  }
}

accessibleBy(ability).User // allows only User and Post properties
```

This can be done either centrally, in the single place or it can be defined in every model/entity definition file. For example, we can augment `@casl/mongoose` in every mongoose model definition file:

```js @{data-filename="Post.ts"}
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  author: String
});

declare module '@casl/mongoose' {
  interface RecordTypes {
    Post: true
  }
}

export const Post = mongoose.model('Post', PostSchema)
```

Historically, `@casl/mongoose` was intended for super easy integration with [mongoose] but now we re-orient it to be more MongoDB specific package because mongoose keeps bringing complexity and issues with ts types.

### Accessible Records plugin

This plugin is deprecated, the recommended way is to use [`accessibleBy` helper function](#accessibleBy-helper)

`accessibleRecordsPlugin` is a plugin which adds `accessibleBy` method to query and static methods of mongoose models. We can add this plugin globally:

```js
const { accessibleRecordsPlugin } = require('@casl/mongoose');
const mongoose = require('mongoose');

mongoose.plugin(accessibleRecordsPlugin);
```

> Make sure to add the plugin before calling `mongoose.model(...)` method. Mongoose won't add global plugins to models that where created before calling `mongoose.plugin()`.

or to a particular model:

```js @{data-filename="Post.js"}
const mongoose = require('mongoose')
const { accessibleRecordsPlugin } = require('@casl/mongoose')

const Post = new mongoose.Schema({
  title: String,
  author: String
})

Post.plugin(accessibleRecordsPlugin)

module.exports = mongoose.model('Post', Post)
```

Afterwards, we can fetch accessible records using `accessibleBy` method on `Post`:

```js
const Post = require('./Post')
const ability = require('./ability') // defines Ability instance

async function main() {
  const accessiblePosts = await Post.accessibleBy(ability);
  console.log(accessiblePosts);
}
```

> See [CASL guide](https://casl.js.org/v5/en/guide/intro) to learn how to define abilities

or on existing query instance:

```js
const Post = require('./Post');
const ability = require('./ability');

async function main() {
  const accessiblePosts = await Post.find({ status: 'draft' })
    .accessibleBy(ability)
    .select('title');
  console.log(accessiblePosts);
}
```

`accessibleBy` returns an instance of `mongoose.Query` and that means you can chain it with any `mongoose.Query`'s method (e.g., `select`, `limit`, `sort`). By default, `accessibleBy` constructs a query based on the list of rules for `read` action but we can change this by providing the 2nd optional argument:

```js
const Post = require('./Post');
const ability = require('./ability');

async function main() {
  const postsThatCanBeUpdated = await Post.accessibleBy(ability, 'update');
  console.log(postsThatCanBeUpdated);
}
```

> `accessibleBy` is built on top of `rulesToQuery` function from `@casl/ability/extra`. Read [Ability to database query](https://casl.js.org/v5/en/advanced/ability-to-database-query) to get insights of how it works.

In case user doesn’t have permission to do a particular action, CASL will throw `ForbiddenError` and will not send request to MongoDB. It also adds `__forbiddenByCasl__: 1` condition for additional safety.

For example, lets find all posts which user can delete (we haven’t defined abilities for delete):

```js
const { defineAbility } = require('@casl/ability');
const mongoose = require('mongoose');
const Post = require('./Post');

mongoose.set('debug', true);

const ability = defineAbility(can => can('read', 'Post', { private: false }));

async function main() {
  try {
    const posts = await Post.accessibleBy(ability, 'delete');
  } catch (error) {
    console.log(error) // ForbiddenError;
  }
}
```

We can also use the resulting conditions in [aggregation pipeline](https://mongoosejs.com/docs/api.html#aggregate_Aggregate):

```js
const Post = require('./Post');
const ability = require('./ability');

async function main() {
  const query = Post.accessibleBy(ability)
    .where({ status: 'draft' })
    .getQuery();
  const result = await Post.aggregate([
    {
      $match: {
        $and: [
          query,
          // other aggregate conditions
        ]
      }
    },
    // other pipelines here
  ]);
  console.log(result);
}
```

or in [mapReduce](https://mongoosejs.com/docs/api.html#model_Model.mapReduce):

```js
const Post = require('./Post');
const ability = require('./ability');

async function main() {
  const query = Post.accessibleBy(ability)
    .where({ status: 'draft' })
    .getQuery();
  const result = await Post.mapReduce({
    query: {
      $and: [
        query,
        // other conditions
      ]
    },
    map: () => emit(this.title, 1);
    reduce: (_, items) => items.length;
  });
  console.log(result);
}
```

### Accessible Fields plugin

`accessibleFieldsPlugin` is a plugin that adds `accessibleFieldsBy` method to instance and static methods of a model and allows to retrieve all accessible fields. This is useful when we need to send only accessible part of a model in response:

```js
const { accessibleFieldsPlugin } = require('@casl/mongoose');
const mongoose = require('mongoose');
const pick = require('lodash/pick');
const ability = require('./ability');
const app = require('./app'); // express app

mongoose.plugin(accessibleFieldsPlugin);

const Post = require('./Post');

app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.accessibleBy(ability).findByPk(req.params.id);
  res.send(pick(post, post.accessibleFieldsBy(ability))
});
```

Method with the same name exists on Model's class. But **it's important** to understand the difference between them. Static method does not take into account conditions! It follows the same [checking logic](https://casl.js.org/v5/en/guide/intro#checking-logic) as `Ability`'s `can` method. Let's see an example to recap:

```js
const { defineAbility } = require('@casl/ability');
const Post = require('./Post');

const ability = defineAbility((can) => {
  can('read', 'Post', ['title'], { private: true });
  can('read', 'Post', ['title', 'description'], { private: false });
});
const post = new Post({ private: true, title: 'Private post' });

Post.accessibleFieldsBy(ability); // ['title', 'description']
post.accessibleFieldsBy(ability); // ['title']
```

As you can see, a static method returns all fields that can be read for all posts. At the same time, an instance method returns fields that can be read from this particular `post` instance. That's why there is no much sense (except you want to reduce traffic between app and database) to pass the result of static method into `mongoose.Query`'s `select` method because eventually you will need to call `accessibleFieldsBy` on every instance.

## TypeScript support in mongoose

The package is written in TypeScript, this makes it easier to work with plugins and `toMongoQuery` helper because IDE provides useful hints. Let's see it in action!

Suppose we have `Post` entity which can be described as:

```ts
import mongoose from 'mongoose';

export interface Post extends mongoose.Document {
  title: string
  content: string
  published: boolean
}

const PostSchema = new mongoose.Schema<Post>({
  title: String,
  content: String,
  published: Boolean
});

export const Post = mongoose.model('Post', PostSchema);
```

To extend `Post` model with `accessibleBy` method it's enough to include the corresponding plugin (either globally or locally in `Post`) and use corresponding `Model` type. So, let's change the example, so it includes `accessibleRecordsPlugin`:

```ts
import { accessibleRecordsPlugin, AccessibleRecordModel } from '@casl/mongoose';

// all previous code, except last line

PostSchema.plugin(accessibleRecordsPlugin);

export const Post = mongoose.model<Post, AccessibleRecordModel<Post>>('Post', PostSchema);

// Now we can safely use `Post.accessibleBy` method.
Post.accessibleBy(/* parameters */)
Post.where(/* parameters */).accessibleBy(/* parameters */);
```

In the similar manner, we can include `accessibleFieldsPlugin`, using `AccessibleFieldsModel` and `AccessibleFieldsDocument` types:

```ts
import {
  accessibleFieldsPlugin,
  AccessibleFieldsModel,
  AccessibleFieldsDocument
} from '@casl/mongoose';
import * as mongoose from 'mongoose';

export interface Post extends AccessibleFieldsDocument {
  // the same Post definition from previous example
}

const PostSchema = new mongoose.Schema<Post>({
  // the same Post schema definition from previous example
})

PostSchema.plugin(accessibleFieldsPlugin);

export const Post = mongoose.model<Post, AccessibleFieldsModel<Post>>('Post', PostSchema);

// Now we can safely use `Post.accessibleFieldsBy` method and `post.accessibleFieldsBy`
Post.accessibleFieldsBy(/* parameters */);
const post = new Post();
post.accessibleFieldsBy(/* parameters */);
```

And if we want to include both plugins, we can use `AccessibleModel` type that provides methods from both plugins:

```ts
import {
  accessibleFieldsPlugin,
  accessibleRecordsPlugin,
  AccessibleModel,
  AccessibleFieldsDocument
} from '@casl/mongoose';
import * as mongoose from 'mongoose';

export interface Post extends AccessibleFieldsDocument {
  // the same Post definition from previous example
}

const PostSchema = new mongoose.Schema<Post>({
  // the same Post schema definition from previous example
});
PostSchema.plugin(accessibleFieldsPlugin);
PostSchema.plugin(accessibleRecordsPlugin);

export const Post = mongoose.model<Post, AccessibleModel<Post>>('Post', PostSchema);
```

This allows us to use the both `accessibleBy` and `accessibleFieldsBy` methods safely.

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v5/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[CASL]: https://github.com/stalniy/casl
[MongoDB]: https://www.mongodb.com/
