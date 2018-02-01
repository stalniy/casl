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

[define-abilities]: {% post_url 2017-07-20-define-abilities %}
