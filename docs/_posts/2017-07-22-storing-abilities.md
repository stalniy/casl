---
layout: default
title:  "Storing abilities"
date:   2017-07-22 13:00:48 +0300
categories: [abilities, storage]
---

`Ability` instance is basically just an array of objects, thus it can be serialized and stored in any database. There are several reasons why you would like to store abilities:
* cache abilities to improve performance of application
* allow to modify abilities via admin interface

## Caching abilities

### Abilities in LRU cache

[LRU cache][lru-cache] is a type of cache which discards least recently used entries, hence allows to store abilities for the most active users, that users who generate the highest load on the system:

```js
const LruCache = require('lru-cache')
const { AbilityBuilder } = require('casl')

function defineAbilitiesFor(user) {
  return AbilityBuilder.define(can => {
    can('read', 'all')
    // the rest of time consuming logic here
  })
}

// store abilities of 1000 the most active users in LRU cache
const ABILITIES_CACHE = new LruCache(1000)

app.use((req, res, next) => {
  if (ABILITIES_CACHE.has(req.user.id)) {
    req.ability = ABILITIES_CACHE.get(req.user.id)
  } else {
    req.ability = defineAbilitiesFor(req.user)
    ABILITIES_CACHE.set(req.user.id, req.ability)
  }

  next()
})
```

### Abilities in session

If application uses stored sessions and LRU cache doesn't satisfy business requirements, you can store abilities in session (e.g., Redis, Memcached)

```js
const { Ability } = require('casl')

app.use(express.session({ store: new RedisStore() }))
app.use((req, res, next) => {
  if (req.session.abilityRules) {
    req.ability = new Ability(req.session.abilityRules)
  } else {
    req.ability = defineAbilitiesFor(req.user)
    req.session.abilityRules = req.ability.rules
  }

  next()
})
```

### Abilities in JWT token

You can also store abilities in JWT token:

```js
const jwt = require('jsonwebtoken')
const { Ability } = require('casl')

// passport initialization

app.post('/session', (req, res) => {
  const token = jwt.sign({
    id: req.user.id,
    rules: req.ability.rules
  }, 'secret', { expiresIn: '1d' })

  res.send({ token })
})
```

And later decode token and instantiate ability:

```js
const token = decodedToken(req.headers.authorization)
const ability = new Ability(token.rules)
```

In order to reduce token size you can use different JSON packing algorithms (e.g., [msgpack.org](http://msgpack.org/))

## Storing abilities

In order to be able to update abilities via user interface, you need to store them in database but what should you do if abilities depend on user attributes? There are 2 options:
* store abilities per user
* store ability templates

### Store abilities per user

In this case you need to create a separate collection or table in your database and define one to one (or one to many) association between abilities and users. Alternatively it's possible to store abilities as subdocument in `users` collection in case if you use NoSQL database. So, each time you request a user from database you also receive his abilities.

### Store ability templates

Alternatively you can store ability templates. Ability template is just a JSON template which contains placeholders for variables. Lets define a template which allows authors to `manage` their posts and `update` own information in profile:

```json
[
  {
    "actions": ["create", "read", "update", "delete"],
    "subject": "Post",
    "conditions": {
      "author": "${user.id}"
    }
  },
  {
    "actions": ["read", "update"],
    "subject": "User",
    "conditions": {
      "id": "${user.id}"
    }
  }
]
```

The most optimal way is to store abilities as a json string because eventually you will need to process template as a string. You are free to use any template engine (e.g., [mustache](https://mustache.github.io/), [underscore template](http://underscorejs.org/#template), etc) to do this job.

In the example above I used ES6 style variable interpolation and will parse this template using [reviver argument of JSON.parse][json-reviver] and `lodash.get` package:

```js
const { Ability } = require('casl')
const getByPath = require('lodash.get')

function parseJSON(template, variables) {
  return JSON.parse(template, (key, rawValue) => {
    if (rawValue[0] !== '$') {
      return rawValue
    }

    const name = rawValue.slice(2, -1)
    const value = getByPath(variables, name)

    if (typeof value === 'undefined') {
      throw new ReferenceError(`Variable ${name} is not defined`)
    }

    return value
  })
}

function defineAbilitiesFor(user) {
  const template = findAbilityTemplateFor(user)

  return new Ability(parseJSON(template, { user }))
}
```

[json-reviver]: https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
[lru-cache]: https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_.28LRU.29
