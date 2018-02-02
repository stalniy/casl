# CASL

[![CASL NPM version](https://badge.fury.io/js/casl.svg)](http://badge.fury.io/js/casl)
[![CASL Build Status](https://travis-ci.org/stalniy/casl.svg?branch=master)](https://travis-ci.org/stalniy/casl)
[![CASL  codecov](https://codecov.io/gh/stalniy/casl/branch/master/graph/badge.svg)](https://codecov.io/gh/stalniy/casl)
[![CASL Code Climate](https://codeclimate.com/github/stalniy/casl/badges/gpa.svg)](https://codeclimate.com/github/stalniy/casl)
[![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/)
[![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


CASL (pronounced /ˈkæsəl/, like **castle**) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access. All permissions are defined in a single location (the `Ability` class) and not duplicated across controllers, views, and database queries.

Heavily inspired by [cancan](https://github.com/CanCanCommunity/cancancan).

## Installation

```sh
npm install casl --save
```

## Features
* supports MongoDB like conditions (`$eq`, `$ne`, `$in`, `$all`, `$gt`, `$lt`, `$gte`, `$lte`, `$exists`, `$regex`, field dot notation)
* can construct MongoDB query based on defined abilities
* supports direct and inverted rules
* provides [mongoose](https://github.com/Automattic/mongoose) plugin
* can be easily integrated with any data storage
* provides ES6 build, so you are able to shake out unused functionality

## Getting started

CASL allows you to use any data layer (e.g., [mongoose][mongoose], [raw mongodb adapter][mongo-adapter], [sequelize][sequelize]), any HTTP framework (e.g., [koa][koa], [express][expressjs], [feathersjs][feathersjs]) and even any frontend framework (e.g., [Vuejs][vuejs], [Angular][angular], [React][react], [Ionic][ionic]) because of its isomorphic nature.
Also, it doesn't force you to choose a database (however currently is the best integrated with MongoDB).

Check sidebar in [documentation][documentation] for integration examples.

CASL concentrates all attention at what a user can actually do and allows to create abilities in DSL style. Lets see how

### 1. Define Abilities

Lets define `Ability` for a blog website where visitors:
* can read everything.
* can manage (i.e., create, update, delete, read) posts which were created by them
* cannot delete post if it has at least 1 comment

```js
import { AbilityBuilder } from 'casl'

const ability = AbilityBuilder.define((can, cannot) => {
  can('read', 'all')
  can('manage', 'Post', { author: loggedInUser.id })
  cannot('delete', 'Post', { 'comments.0': { $exists: true } })
})
```

Yes, you can use some operators from MongoDB query language to define conditions for your abilities. See [Defining Abilities][define-abilities] for details.

### 2. Check Abilities

Later on you can check abilities using `can` and `cannot`.
```js
// true if ability allows to read at least one Post
ability.can('read', 'Post')

// true if ability does not allow to read a post
const post = new Post({ title: 'What is CASL?' })
ability.cannot('read', post)
```
Also there is a conveninse method `throwUnlessCan` which throws `ForbiddenError` exception in case if action is not allowed on target object:
```js
import { ForbiddenError } from 'casl'

try {
  ability.throwUnlessCan('delete', post)
} catch (error) {
  console.log(error instanceof Error) // true
  console.log(error instanceof ForbiddenError) // true
}
```

See [Check Abilities][check-abilities] for details.

### 3. MongoDB integration

CASL provides easy integration with MongoDB database.

```js
const { toMongoQuery, AbilityBuilder } = require('casl')
const { MongoClient } = require('mongodb')

const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { author: 'me' })
})

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  const query = toMongoQuery(ability.rulesFor('read', 'Post')) // { $or: [{ author: 'me' }] }
  db.collection('posts').find(query) // find all Posts where author equals 'me'
  db.close();
})
```

And if you use [mongoose](https://github.com/Automattic/mongoose), you are lucky because CASL provides mongoose middleware which hides all boilerplate under convenient `accessibleBy` method.

```js
const { mongoosePlugin, AbilityBuilder } = require('casl')
const mongoose = require('mongoose')

mongoose.plugin(mongoosePlugin)

const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { author: 'me' })
})

const Post = mongoose.model('Post', mongoose.Schema({
  title: String,
  author: String,
  content: String,
  createdAt: Date
}))

// by default it asks for `read` rules
// returns mongoose Query, so you can chain it with other conditions
Post.accessibleBy(ability).where({ createdAt: { $gt: Date.now() - 24 * 3600 } })

// also you can call it on existing query to enforce visibility.
// In this case it returns empty array because rules does not allow to read Posts of `someoneelse` author
Post.find({ author: 'someoneelse' }).accessibleBy(ability).exec()
```

See [Database integration][database-integration] for details.

### 4. UI integration

CASL is written in pure ES6 and has no dependencies on Node.js or other environments. That means you can use it on UI side. It may be useful if you need to show/hide some UI functionality based on what user can do in application.

```js
import { Ability } from 'casl'

export class Session {
  constructor() {
    this.ability = new Ability()
  }

  find() {
    return fetch('https://domain.com/session')
      .then(session => this.ability.update(session.rules))
  }

  destroy() {
    return fetch('https://domain.com/session', { method: 'DELETE' })
      .then(() => this.ability.update([]))
  }
}
```

Read [CASL in Aurelia app][casl-aurelia-example] or [Vue ACL with CASL][casl-vue-example] for details.

## Documentation

A lot of useful information about CASL can be found in [documentation][documentation] (check sidebar on the right hand ;)!

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[define-abilities]: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
[check-abilities]: https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html
[database-integration]: https://stalniy.github.io/casl/abilities/database/integration/2017/07/22/database-integration.html
[casl-aurelia-example]: https://medium.com/@sergiy.stotskiy/casl-based-authorization-in-aurelia-app-3e44c0fe1703
[casl-vue-example]: https://medium.com/@sergiy.stotskiy/vue-acl-with-casl-781a374b987a
[documentation]: https://stalniy.github.io/casl/
[mongoose]: http://mongoosejs.com/
[mongo-adapter]: https://mongodb.github.io/node-mongodb-native/
[sequelize]: http://docs.sequelizejs.com/
[koa]: http://koajs.com/
[feathersjs]: https://feathersjs.com/
[expressjs]: https://expressjs.com/
[vuejs]: https://vuejs.org
[angular]: https://angular.io/
[react]: https://reactjs.org/
[ionic]: https://ionicframework.com
