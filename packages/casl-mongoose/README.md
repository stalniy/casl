# CASL Mongoose

This package connects CASL and MongoDB. Basically it allows to fetch records based on CASL rules from MongoDB. That means you can easily answer on the question: "Which records can be read?" or "Which records can be updated?". Lets see how

## Getting Started

### 1. Integrate with mongoose

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
const ability = require('./ability')

Post.accessibleBy(ability).exec()
```

Check [@casl/ability](/packages/casl-ability) to understand how to define abilities.

### 2. Integrate with any MongoDB library

In case you don't use mongoose, this package provides `toMongoQuery` function which can convert CASL rules into MongoDB query. Lets see an example of how to fetch accessible records using raw [MongoDB adapter][mongo-adapter]

```js
const { toMongoQuery } = require('@casl/mongoose')
const { MongoClient } = require('mongodb')
const ability = require('./ability') // allows to update posts if author equals "me"

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  if (err) {
    return console.error(err)
  } 

  const rules = ability.rulesFor('update', 'Post')
  const query = toMongoQuery(rules) // e.g., { $or: [{ author: 'me' }] }
  
  if (query === null) {
    // user is not allowed to update any posts
  } else {
    db.collection('posts').find(query) // find all Posts where author equals 'me'
  }
  
  db.close();
})
```

See [Database integration][database-integration] for details

[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[database-integration]: https://stalniy.github.io/casl/abilities/database/integration/2017/07/22/database-integration.html
