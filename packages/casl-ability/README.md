# CASL Ability

[![@casl/ability NPM version](https://badge.fury.io/js/%40casl%2Fability.svg)](https://badge.fury.io/js/%40casl%2Fability)
[![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/)
[![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package is the core of CASL. It includes logic responsible for [checking][check-abilities] and [defining][define-abilities] permissions.
Also it includes `@casl/ability/extra` submodule which contains functions that allow to extract infromation from ability (e.g., convert rules to database query)

## Getting Started

CASL concentrates all attention at what a user can actually do and allows to create abilities in DSL style. Lets see how

### 1. Defining Abilities

This package provides `AbilityBuilder` allows to define abilities using DSL.

```js
import { AbilityBuidler } from '@casl/abiltiy'

const ability = AbilityBuilder.define((can, cannot) => {
  can('protect', 'Website')
  cannot('delete', 'Website')
})

class Website {}

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

See [Check Abilities][check-abilities] for details.

### 3. Serialize rules

As rules are plain objects, they can be easily serialized and [cached in session or JWT token][cache-rules] or even [saved to any database][store-rules] and added dynamically later by admmin.

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

See [Storing Abilities][storing-abilities] for details.

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

[check-abilities]: https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html
[define-abilities]: https://stalniy.github.io/casl/abilities/2017/07/20/define-abilities.html
[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[storing-abilities]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html
[store-rules]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html#storing-abilities
[cache-rules]: https://stalniy.github.io/casl/abilities/storage/2017/07/22/storing-abilities.html#caching-abilities
