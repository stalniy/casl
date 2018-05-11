---
layout: default
title:  "Check Abilities"
date:   2017-07-21 08:08:48 +0300
categories: abilities
---

After [abilities are defined][define-abilities], you can use the `can` method of `Ability` instance to check the user's permission for a given action and object.

```js
ability.can('delete', post)
```

The `cannot` method is for convenience and performs the opposite check of `can`

```js
ability.cannot('delete', post)
```

You can also pass a class or model name instead of instance

```js
ability.can('delete', 'Post')
```

**Important**: If an object of conditions exist they will be ignored when checking on a class name, and it will return `true`. For example:

```js
const ability = AbilityBuilder.define(can => {
  can('read', 'Post', { published: true })
})

ability.can('read', 'Post') // true
```

Think of it as asking "can the current user read at least one post?". The user can read a post which has `published` set to `true`, so this returns `true`. If you are doing a class name check, it is important you do another check once an instance becomes available so the object of conditions can be used.

One more handy method is `thowUnlessCan`, it throws `ForbiddenError` if user is not able to perform an action on specified object.

```js
async function findPost(req, res) {
  const post = await Post.find({ _id: req.params.id })

  req.ability.throwUnlessCan('read', post)
  res.send(post)
}
```

Also it works seamlessly with [forbidden reasons][forbidden-reasons]. For example

```js
const ability = AbilityBuidler.define((can, cannot) => {
  can('read', 'all')

  if (!user.isAdmin()) {
    cannot('update', 'Product', 'price').because('Only admins can update product prices')
  }
})

ability.throwUnlessCan('update', 'Post', 'price')
```

The code above will throw error with corresponding message, if user is not an admin.
Also that error object contains information about what `action`, `subject` and `field` were checked, so you can use this to provide template message and evaluate it later:

```js
try {
  ability.throwUnlessCan('update', 'Post', 'price')
} catch (error) {
  console.log(error.message) // "Only admins can update product prices"
  console.log(error.action) // "update"
  console.log(error.subjectName) // "Post"
  console.log(error.subject) // "Post", does not equal `subjectName` when check on instance
}
```

## Instance checks

By default, CASL is looking for `modelName` attribute on constructor of the passed object (and fallbacks to constructor `name` if that is blank). Lets consider example:

```js
class Post {
  constructor({ title, published }) {
    this.title = title
    this.published = published
  }
}

ability.can('read', new Post({ title: 'Hello CASL', published: true }))
```

In this case, ability will check whether rules for `Post` class is defined and check if user can read this particular instance of `Post`.

**Important**: if you use minification for production builds, it will minify class names as well and this example won't work. For such cases, you can define static `modelName` attribute on a class.

In this example, ability will check rules for `Post` and not for `Article`:

```js
class Article {
  static get modelName() {
    return 'Post'
  }

  constructor({ title, published }) {
    this.title = title
    this.published = published
  }
}

ability.can('read', new Article({ title: 'Hello CASL', published: true }))
```

In case if the default behavior is not satisfied for you, it's possible to pass custom `subjectName` option in `Ability` constructor, which should return passed object name. This may be useful if you want to define actions for `RPC` procedures (e.g., in CQRS or GraphQL interfaces).

```js
const ability = new Ability([...], {
  subjectName(subject) {
    // implement your logic here which detects subject's name
  }
})
```

The default logic looks this:

```js
function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;
  return Type.modelName || Type.name;
}
```

## Checking fields

It is also posible to check whether user has permission to perform an action on specified subject field. Lets consider an example when user is allowed to update only `price` on products:

```js
const ability = AbilityBuidler.define(can => {
  can('read', 'all')
  can('update', 'Product', 'price')
})
```

Later you can check whether user is allowed to update `price`:

```js
ability.can('update', 'Product', 'price') //  true
```

This can be used to display only editable form fields:

```jsx
if (ability.can('update', 'Product', 'price')) {
  <input type="number" name="price">
}
```

or extract fields from user input (e.g., request body in Nodejs application). To do so, we need to collect a list of permitted fields. And this is exactly why `permittedFieldsOf` was added into `@casl/ability/extra`. It allows to retrieve permitted fields of specific set of ability rules. For example:

```js
import { permittedFieldsOf } from '@casl/ability'

const allowedFields = permittedFieldsOf(ability, 'update', 'Product')
```

Later you can use [lodash.pick](https://lodash.com/docs/4.17.5#pick) to extract all that fields from user specified input (e.g., request body in Nodejs application). However there is **a little caveat**. As you already know, user may access all fields on a subject if they were not defined. For example, we have `Product` class with 4 fields `id`, `title`, `description`, `price` and we define ability like this:

```js
const ability = AbilityBuidler.define(can => {
  can('read', 'all')
  can('update', 'Product')
})
```

then `permittedFieldsOf` returns an empty array because it knows nothing about `Product`'s shape.
Fortunately, `permittedFieldsOf` accepts `fieldsFrom` callback which is called for every rule in specified set. It allows to return all `Product` fields for rules which doesn't contain such.

Lets extract permitted fields correctly, for `Product` which is a mongoose model:

```js
const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: String,
  description: String,
  price: Number
})
const Product = mongoose.model('Product', schema)

const allProductFields = Object.keys(schema.paths)
const allowedFields = permittedFieldsOf(ability, 'update', 'Product', {
  fieldsFrom: rule => rule.fields || allProductFields
})

console.log(allowedFields) // ['_id', 'title', 'description', 'price']
```

[define-abilities]: {{ site.baseurl }}{% post_url 2017-07-20-define-abilities %}
[forbidden-reasons]: {{ site.baseurl }}{% post_url 2017-07-20-define-abilities %}#forbidden-reasons
