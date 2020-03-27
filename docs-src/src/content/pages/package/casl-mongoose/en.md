---
title: CASL Mongoose
categories: [package]
order: 110
meta:
  keywords: ~
  description: ~
---

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

## Integration with mongoose

[mongoose] is a popular JavaScript ODM for [MongoDB]. `@casl/mongoose` provides 2 plugins that allow to integrate `@casl/ability` and mongoose in few minutes:

### Accessible Records plugin

`accessibleRecordsPlugin` is a plugin which adds `accessibleBy` method to query and static methods of your models. You can add this plugin globally:

```js
const { accessibleRecordsPlugin } = require('@casl/mongoose');
const mongoose = require('mongoose');

mongoose.plugin(accessibleRecordsPlugin);
```

> Make sure you add the plugin before calling `mongoose.model(...)` method. Mongoose won't add global plugins to models that where created before calling `mongoose.plugin()`.

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

Afterwards you can fetch accessible records by calling `accessibleBy` method on `Post`:

```js
const Post = require('./Post')
const ability = require('./ability') // defines Ability instance

async function main() {
  const accessiblePosts = await Post.accessibleBy(ability);
  console.log(accessiblePosts);
}
```

> See [CASL guide](../../guide/intro) to learn how to define abilities

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

`accessibleBy` returns an instance of `mongoose.Query` and that means you can chain it with any `mongoose.Query`'s method (e.g., `select`, `limit`, `sort`). By default, `accessibleBy` constructs query based on the list of rules for `read` action but you can change this by providing the 2nd optional argument:

```js
const Post = require('./Post');
const ability = require('./ability');

async function main() {
  const postsThatCanBeUpdated = await Post.accessibleBy(ability, 'update');
  console.log(postsThatCanBeUpdated);
}
```

> `accessibleBy` is built on top of `rulesToQuery` function from `@casl/ability/extra`. Read [Ability to database query](../../advanced/ability-to-database-query) to get insights of how it works.

In case when user doesn’t have permission to do a particular action, CASL will not even send request to MongoDB and instead will force Query to return empty result set. CASL patches native mongodb collection's methods in such case to return predefine value (empty array for `find`, `null` for `findOne` and `0` for `count`). It also adds `__forbiddenByCasl__: 1` condition which will enforce mongodb to return empty set in case if you use one of methods that are not patched, so users who is not allowed to get particular records won't get them!

For example, lets find all posts which user can delete (we haven’t defined abilities for delete):

```js
const { defineAbility } = require('@casl/ability');
const mongoose = require('mongoose');
const Post = require('./Post');

mongoose.set('debug', true);

const ability = defineAbility(can => can('read', 'Post', { private: false }));

async function main() {
  const posts = await Post.accessibleBy(ability, 'delete');
  console.log(posts) // [];
}
```

You can also use the resulting conditions in [aggregation pipeline](https://mongoosejs.com/docs/api.html#aggregate_Aggregate):

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

`accessibleFieldsPlugin` is a plugin that adds `accessibleFieldsBy` method to instance and static methods of a model and allows to retrieve all accessible fields. This is useful when you need send only accessible part of a model in response:

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

Method with the same name exists on Model's class. But **it's important** to understand the difference between them. Static method does not take into account conditions! It follows the same [checking logic](../../guide/intro#checking-logic) as `Ability`'s `can` method. Let's see an example to recap:

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

## Integration with any MongoDB library

In case you don't use mongoose, this package provides `toMongoQuery` function which can convert CASL rules into [MongoDB] query. Lets see an example of how to fetch accessible records using raw [MongoDB adapter][mongo-adapter]

```js
const { toMongoQuery } = require('@casl/mongoose');
const { MongoClient } = require('mongodb');
const ability = require('./ability');

async function main() {
  const db = await MongoClient.connect('mongodb://localhost:27017/blog');
  const query = toMongoQuery(ability, 'Post', 'update');
  let posts;

  try {
    if (query === null) {
      // returns null if ability does not allow to update posts
      posts = [];
    } else {
      posts = await db.collection('posts').find(query);
    }
  } finally {
    db.close();
  }

  console.log(posts);
}
```

## TypeScript support

The package is written in TypeScript, this makes it easier to work with plugins and `toMongoQuery` helper because IDE will hint you about you can pass inside arguments and TypeScript will warn you about wrong usage.

[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[CASL]: https://github.com/stalniy/casl
[MongoDB]: https://www.mongodb.com/
