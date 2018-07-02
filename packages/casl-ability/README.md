# [CASL Ability](https://stalniy.github.io/casl/) [![@casl/ability NPM version](https://badge.fury.io/js/%40casl%2Fability.svg)](https://badge.fury.io/js/%40casl%2Fability)  [![](https://img.shields.io/npm/dm/%40casl%2Fability.svg)](https://www.npmjs.com/package/%40casl%2Fability) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package is the core of CASL. It includes logic responsible for [checking][check-abilities] and [defining][define-abilities] permissions.

## Installation

```sh
npm install @casl/ability
```

## Getting Started

CASL concentrates all attention at what a user can actually do and allows to create abilities in DSL style. Lets see how

### 1. Defining Abilities

`AbilityBuilder` allows to define abilities using DSL:

```js
import { AbilityBuidler } from '@casl/abiltiy'

class Website {}

const ability = AbilityBuilder.define((can, cannot) => {
  can('protect', 'Website')
  cannot('delete', 'Website')
})

console.log(ability.can('delete', new Website())) // false
```

If you would like to define abilities in own function, it'd better to use its `extract` method:

```js
import { AbilityBuidler, Ability } from '@casl/abiltiy'

function defineAbilityFor(user) {
  const { rules, can, cannot } = AbilityBuilder.extract()

  if (user.isAdmin) {
    can('manage', 'all')
  } else {
    can('read', 'all')
    can('manage', 'Post', { author: 'me' })
    cannot('delete', 'Post')
  }

  return new Ability(rules)
}
```

Also you can combine similar rules together:

```js
const { can, rules } = AbilityBuilder.extract()

can(['read', 'update'], 'User', { id: 'me' })
can(['read', 'update'], ['Post', 'Comment'], { authorId: 'me' })

console.log(rules)
```

Sometimes you may need to define permissions per field. For example, you can let moderator update only post status field

```js
const { can, rules } = AbilityBuilder.extract()

can('read', 'all')

if (user.is('moderator')) {
  can('update', 'Post', 'status')
} else if (user.is('editor')) {
  can('update', 'Post', ['title', 'description'], { authorId: user.id })
}

const ability = new Ability(rules)
```

See [Defining Abilities][define-abilities] for details.

### 2. Checking rules

Later on you can check abilities by using `can` and `cannot`.

```js
// true if user can read at least one Post
ability.can('read', 'Post')

// true if user cannot update a post
const post = new Post({ title: 'What is CASL?', authorId: 'not_me' })
ability.cannot('update', post)
```

Regular rules are logically OR-ed, so if you have permissions like:

```js
const { can } = AbilityBuilder.extract()

can('read', 'Post', { author: user.id })
can('read', 'Post', { public: true })

// Note: `user` is a variable which contains information about user for whom these permissions are defined
```

Then a user is able to read posts which are created by him or they are public:

```js
class Post {
  ....
}

ability.can('read', new Post({ public: true })) // true
ability.can('read', new Post({ author: user.id })) // true
```

**Note**: pay attention that all conditions, specified in `can` & `cannot` DSL functions of `AbilityBuilder`, are compared to properties of object passed as 2nd argument to `ability.can`.

See [Check Abilities][check-abilities] for details.

### 3. Serializing rules

As rules are plain objects, they can be easily serialized and cached in session or JWT token or even [saved to any database][store-rules] and added dynamically later in admin panel.

```js
const jwt = require('jsonwebtoken')
const payload = {
  rules: ability.rules
}

jwt.sign(payload, secret, (error, token) => {
  if (error) {
    return next(error)
  }

  // later you can send this token to client
  // and restore Ability on the client using `jwt.verify`
  console.log(token)
})
```

See [Caching Abilities][cache-rules] for details.

### 4. Extra

This package also provides `@casl/ability/extra` submodule which contains helper functions that can construct a database query based on permissions or extract some information from them.

#### rulesToQuery

```js
import { rulesToQuery } from '@casl/ability/extra'

function ruleToMongoQuery(rule) {
  return rule.inverted ? { $nor: [rule.conditions] } : rule.conditions
}

function toMongoQuery(ability, subject, action = 'read') {
  return rulesToQuery(ability, action, subject, ruleToMongoQuery)
}

// now you can construct query based on Ability
const query = toMongoQuery(ability, 'Post')
```

[@casl/mongoose](/packages/casl-mongoose) uses `rulesToQuery` function to construct queries to MongoDB database.

See [Storing Abilities][storing-abilities] for details.

#### permittedFieldsOf

This function allows to find all permitted fields for a specific subject and action.
You can use this method together with [lodash.pick](https://lodash.com/docs/4.17.5#pick) to extract only allowed fields from request body

```js
import { permittedFieldsOf } from '@casl/ability/extra'

const { can, rules } = AbilityBuilder.extract()

can('update', 'Post', ['title', 'description'])

const ability = new Ability(rules)

// later in request middleware
const fields = permittedFieldsOf(ability, 'update', 'Post')
const attributesToUpdate = _.pick(req.body, fields)
```

#### rulesToFields

This function allows to extract an object of field-value pairs from rule conditions.
That object later can be passed in a constructor of a class, to provide initial values:

```js
import { rulesToFields } from '@casl/ability/extra'

const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { user: 5 })
  can('read', 'Post', { public: true })
})

// { user: 5, public: true }
const initialValues = rulesToFields(ability, 'read', 'Post')

// `Post` may be a mongoose or sequelize record
// or any other class which accepts fields as the 1st argument
const newPost = new Post(initialValues)

console.log(newPost.user) // 5
console.log(newPost.public) // true
```

This method completely ignores inverted rules (so, **do check abilities on created instance!**)
and collects only those fields which values are non plain objects (i.e., skips mongo query conditions).
For example:

```js
const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { createdAt: { $gte: new Date() } })
  can('read', 'Post', { userId: ObjectId(...) })
  can('read', 'Post', { public: true })
})

rulesToFields(ability, 'read', 'Post') // { userId: ObjectId(...), public: true }
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[check-abilities]: https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html
[define-abilities]: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
[contributing]: /CONTRIBUTING.md
[storing-abilities]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html
[store-rules]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html#storing-abilities
[cache-rules]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html#caching-abilities
