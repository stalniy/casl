# [CASL Mongoose](https://stalniy.github.io/casl/) [![@casl/mongoose NPM version](https://badge.fury.io/js/%40casl%2Fmongoose.svg)](https://badge.fury.io/js/%40casl%2Fmongoose) [![](https://img.shields.io/npm/dm/%40casl%2Fmongoose.svg)](https://www.npmjs.com/package/%40casl%2Fmongoose) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package connects [CASL][casl] and [MongoDB](https://www.mongodb.com/). In other words, it allows to fetch records based on CASL rules from MongoDB. That means you can easily answer on the question: "Which records can be read?" or "Which records can be updated?". Lets see how

## Installation

```sh
npm install @casl/mongoose @casl/ability
```

## Getting Started

### 1. Integrating with mongoose

There are 2 plugins which allow to seamlessly integrate CASL into mongoose:

#### Accessible Records plugin

`accessibleRecordsPlugin` is a [mongoose][mongoose] plugin which adds `accessibleBy` method to query and static methods. For example, you can add this plugin globally to all models

```js
const { accessibleRecordsPlugin } = require('@casl/mongoose')
const mongoose = require('mongoose')

mongoose.plugin(accessibleRecordsPlugin)
```

**Warning**: make sure that you add that plugin before calling `mongoose.model(...)` method. Models which were defined before adding plugin will not include `accessibleBy` method.

Alternatively, you can selectively add plugin to any model:

```js
// post.model.js
const mongoose = require('mongoose')
const { accessibleRecordsPlugin } = require('@casl/mongoose')

const Post = new mongoose.Schema({
  title: String,
  author: String
})

Post.plugin(accessibleRecordsPlugin)

module.exports = mongoose.model('Post', Post)
```

Afterwards you can fetch accessible records by doing this:

```js
const Post = require('./post.model')
const ability = require('./ability') // defines Ability instance

Post.accessibleBy(ability).exec()
```

Check [@casl/ability][casl-ability] package to understand how to define abilities.

#### Permitted Fields plugin

`permittedFieldsPlugin` is a [mongoose][mongoose] plugin which adds `permittedFieldsBy` method to instance and static methods.
That method allow to retrieve accessible fields by ability:

```js
const { permittedFieldsPlugin } = require('@casl/mongoose')
const mongoose = require('mongoose')
const PostSchema = require('./schema')
const ability = require('../ability') // defines Ability instance

PostSchema.plugin(permittedFieldsPlugin)
const Post = mongoose.model('Post', PostSchema)

const readableFields = Post.permittedFieldsBy(ability) // by default, returns fields for `read` action
```

Later, you can use that array of fields to return user only fields which he can read or pick ones from body which he can update!

```js
const pick = require('lodash.pick')

app // express instance for example
  .patch('/posts/:id', (req, res) => {
    const updatableFields = Post.permittedFieldsBy(ability, 'update')
    const body = pick(req.body, updatableFields)

    // now `body` is an object of fields which user is allowed to update
  })
```

The same method exists on Model instance and takes into consideration rule conditions & object properties as well.
For example, if you have the next rules:

```js
const ability = AbilityBuilder.define(can => {
  can('read', 'Post', ['title'], { private: true })
  can('read', 'Post', ['title', 'description'], { private: false })
})
const post = new Post({ private: true, title: 'Private post' })

Post.permittedFieldsBy(ability) // ['title', 'description']
post.permittedFieldsBy(ability) // ['title']
```

Without knowing context (i.e., `Post` instance attributes) `permittedFieldsBy` can't return the correct permitted fields. That's why it's recommended to use instance method instead of class method!

### 2. Integrating with any MongoDB library

In case you don't use mongoose, this package provides `toMongoQuery` function which can convert CASL rules into MongoDB query. Lets see an example of how to fetch accessible records using raw [MongoDB adapter][mongo-adapter]

```js
const { toMongoQuery } = require('@casl/mongoose')
const { MongoClient } = require('mongodb')
const ability = require('./ability') // allows to update posts if author equals "me"

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  if (err) {
    return console.error(err)
  }

  const query = toMongoQuery(ability, 'Post', 'update') // e.g., { $or: [{ author: 'me' }] }

  if (query === null) {
    // user is not allowed to update any posts
  } else {
    db.collection('posts').find(query) // find all Posts where author equals 'me'
  }

  db.close();
})
```

See [Database integration][database-integration] for details

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]
/d
## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: /CONTRIBUTING.md
[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[database-integration]: https://stalniy.github.io/casl/abilities/database/integration/2017/07/22/database-integration.html
[casl-ability]: https://github.com/stalniy/casl
[casl]: https://github.com/stalniy/casl
