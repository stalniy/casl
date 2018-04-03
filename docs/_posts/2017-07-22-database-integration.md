---
layout: default
title:  "Database Integration"
date:   2017-07-22 19:00:48 +0300
categories: [abilities, database, integration]
---

Sometimes you need to restrict which records are returned from the database based on what the user is able to do in the app. To do this, you can use the complementary package [@casl/mongoose](/packages/casl-mongoose) which provides integration with MongoDB through query builder function and [mongoose](http://mongoosejs.com/) plugin.

## Mongoose plugin

In order to restrict fetched records, you need to add `accessibleRecordsPlugin` plugin into mongoose globally (recommended way) or add it for each model separately.

```js
const mongoose = require('mongoose')
const { accessibleRecordsPlugin } = require('@casl/mongoose')

mongoose.plugin(accessibleRecordsPlugin)
```

If you include plugin globally (i.e., for all models), please make sure that you added it before calling `mongoose.model(...)` method. Models which were defined before adding plugin will not have CASL defined methods.

Alternatively you can include this plugin for each model manually:

```js
const mongoose = require('mongoose')
const { accessibleRecordsPlugin } = require('@casl/mongoose')

const Post = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  createdAt: Date
})

Post.plugin(accessibleRecordsPlugin)

module.exports = mongoose.model('Post', Post)
```

After that your models will have additional query and static method called `accessibleBy`. This method returns all documents from [MongoDB](https://www.mongodb.com/) which satisfy conditions of defined rules. In fact, it returns mongoose `Query` instance which returns documents after you call `exec` or `then` method.

For example, lets find all accessible posts which has been created yesterday:

```js
const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { published: true })
  can(['read', 'update'], 'Post', { author: 'me' })
})

// Mongo Query: { $or: [{ published: true }, { author: 'me' }], createdAt: { $gte: yesterday() }  }
Post.accessibleBy(ability).where({ createdAt: { $gte: yesterday() } })
```

By default `accessibleBy` constructs query based on list of rules for `read` action but you can change this by specifying the second optional argument:

```js
// { $or: [{ author: 'me' }] }
Post.accessibleBy(ability, 'update')
```

In case when user doesn't have permission to do a particular action, CASL will not even send request to MongoDB and instead will force `Query` to return empty result set. For example, lets find all posts which user can delete (we haven't defined abilities for `delete`):

```js
// does not request database because user can't delete posts
Post.accessibleBy(ability, 'delete').find()
  .then(posts => {
    console.log(posts) // []
  })

Post.accessibleBy(ability, 'delete').findOne({ _id: 'known post id' })
  .then(post => {
    console.log(posts) // undefined
  })
```

Now lets consider a case where abilities with and without conditions are mixed:

```js
const ability = AbilityBuilder.define(can => {
  can('read', 'all')
  can('manage', 'Post', { author: 'me' })
})

Post.accessibleBy(ability)
```

In this case we have 2 overlapped rules: `read all` and `read Post where author = me` (`manage` is an alias to CRUD actions), thus all posts will be fetched from database.

Another case if when you can regular and inverted abilities for the same action and subject. In such situation `accessibleBy` behaves pesimistically and always returns empty set:

```js
const ability = AbilityBuilder.define((can, cannot) => {
  can('read', 'all')
  cannot('read', 'Post')
})

// empty set
Post.accessibleBy(ability)
```

## Other MongoDB libraries

Don't worry if you use another MongoDB library, `@casl/mongoose` also exports `toMongoQuery` function which builds MongoDB query from abilities. It accepts only 1 argument which is an array of ability rules.

```js
const { toMongoQuery } = require('@casl/mongoose')

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  const query = toMongoQuery(ability, 'Post', 'read')
  
  if (query === null) {
    // user is not allowed to read Posts
  } else {
    // query = { $or: [{ published: true }, { author: 'me' }] }
    db.collection('posts').find(query)
  }
  
  db.close();
})
```

**Important**: `toMongoQuery` returns `null` in case if ability's `rules` array is empty or there is an inverted rule without conditions. In that case, user doesn't have permission to get access to requested information.

## Other databases

CASL provides a helper function which can be used to add support for other libraries and databases:

* `rulesToQuery`, can be imported from `@casl/ability/extra` submodule

It accepts 4 arguments: 

* `Ability` instance to get rules from
* action
* subject name
* conversion function which accepts rule as the only argument

The function aggregates all abilities into single object with 2 properties `$or` and `$and`. Regular rules are added into `$or` array and inverted are added into `$and` array.

**Important**: this function returns `null` if user is not allowed to perform specified action on specified subject.

So, the only thing which needs to be done is a function which converts rules into library or database specific language. Lets try to implement basic support for [sequalize](http://docs.sequelizejs.com/manual/tutorial/querying.html):

```js
const { rulesToQuery } = require('@casl/ability/extra')

function ruleToQuery(rule) {
  if (JSON.stringify(rule.conditions).includes('$all:')) {
    throw new Error('Sequalize does not support "$all" operator')
  }

  return rule.inverted ? { $not: rule.conditions } : rule.conditions
}

module.exports = function toSequalizeQuery(ability, subject, action = 'read') {
  return rulesToQuery(rules, ruleToQuery)
}
```

Later you can define custom scope in your model:

```js
const Post = db.define('Post', {
  // column definition
}, {
  scopes: {
    accessibleBy(ability, action = 'read') {
      // TODO: handle case when `toSequalizeQuery` returns `null`
      return { where: toSequalizeQuery(ability, 'Post') }
    }
  }
});
```

And fetch accessible records from database:

```js
Post.scope({ method: ['accessibleBy', ability] }).findAll()
```


[defining-abilities]: {{ site.baseurl }}{% post_url 2017-07-20-define-abilities %}
