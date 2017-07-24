---
layout: default
title:  "Database Integration"
date:   2017-07-22 19:00:48 +0300
categories: [abilities, database, integration]
---

Sometimes you need to restrict which records are returned from the database based on what the user is able to access. CASL provides built-in integration with MongoDB through query builder function and [mongoose](http://mongoosejs.com/) plugin.

## Mongoose plugin

In order to restrict fetched records, you need to add CASL plugin into mongoose globally (recommended way) or add it for each model separately.

```js
const mongoose = require('mongoose')
const { mongoosePlugin } = require('casl')

mongoose.plugin(mongoosePlugin)
```

If you include plugin globally (i.e., for all models), please make sure that you added it before calling `mongoose.model(...)` method. Models which were defined before adding plugin will not have CASL defined methods.

Alternatively you can include CASL plugin for each model manually:

```js
const mongoose = require('mongoose')
const { mongoosePlugin } = require('casl')

const Post = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  createdAt: Date
})

Post.plugin(mongoosePlugin)

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

Don't worry if you don't use mongoose, CASL also provide `toMongoQuery` function which builds MongoDB query from abilities. It accepts only 1 argument which is an array of ability rules.

```js
const { toMongoQuery } = require('casl')

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  const rules = ability.rulesFor('read', 'Post')
  // query = { $or: [{ published: true }, { author: 'me' }] }
  db.collection('posts').find(toMongoQuery(rules))
  db.close();
})
```

As you can see rules for specified action and subject can be retrieved with help of `rulesFor` method (the second argument is processed by `subjectName` function, see [Defining Abilities][defining-abilities] for details).
**Important**: `toMongoQuery` returns `null` in case if `rules` array is empty or there is an inverted rule without conditions.

## Other databases

CASL provides 2 methods which can be used to add support for other libraries and databases:

* `rulesFor` method of `Ability` instance which was described above
* `rulesToQuery` function

`rulesToQuery` accepts two arguments: rules to process and conversion function which accepts rule as the only argument. The function aggregates all abilities into single object with 2 properties `$or` and `$and`. Regular rules are added into `$or` array and inverted are added into `$and` array.

So, the only thing which needs to be written is a function which converts rules into library or database specific language. Lets try to implement basic support for [sequalize](http://docs.sequelizejs.com/manual/tutorial/querying.html):

```js
const { rulesToQuery } = require('casl')

function ruleToQuery(rule) {
  if (JSON.stringify(rule.conditions).includes('$all:')) {
    throw new Error('Sequalize does not support "$all" operator')
  }

  return rule.inverted ? { $not: rule.conditions } : rule.conditions
}

module.exports = function toSequalizeQuery(rules) {
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
      const rules = ability.rulesFor(action, 'Post')
      return { where: toSequalizeQuery(rules) }
    }
  }
});
```

And fetch accessible records from database:

```js
Post.scope({ method: ['accessibleBy', ability] }).findAll()
```

**Important**: `toMongoQuery` and `rulesToQuery` expects to receive rules for single pair of action and subject. User `ability.rulesFor(action, subject)` to retrieve rules for specific action and subject.
They both returns `null` in case if `rules` array is empty or there is an inverted rule without conditions.


[defining-abilities]: {% post_url 2017-07-20-define-abilities %}
