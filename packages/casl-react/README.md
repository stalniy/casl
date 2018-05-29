# CASL React [![@casl/react NPM version](https://badge.fury.io/js/%40casl%2Freact.svg)](https://badge.fury.io/js/%40casl%2Freact) [![](https://img.shields.io/npm/dm/%40casl%2Freact.svg)](https://www.npmjs.com/package/%40casl%2Freact) [![CASL Documentation](https://img.shields.io/badge/documentation-available-brightgreen.svg)](https://stalniy.github.io/casl/) [![CASL Join the chat at https://gitter.im/stalniy-casl/casl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This package allows to integrate [@casl/ability](/packages/casl-ability) into [React][react] application. So, you can show or hide UI elements based on user ability to see them.

## Installation

```sh
npm install @casl/react @casl/ability
```

## Getting Started

This package provides `Can` component which can be used to conditionally show UI elements based on user abilities.
This component accepts children and 4 properties (see [Property names and aliases](#3-property-names-and-aliases))
* `I` (`do` is an alias) - name of the action and field
* `a` (`on`, `of`, `this` are aliases) - checked subject
* `not` - checks whether the ability does *not* allow an action
* `ability` - an instance of `Ability` which will be used to check permissions

`children` property may be either a render function (a recommended way):

```jsx
<Can I="create" a="Post" ability={ability}>
  () => <button onClick={this.createPost.bind(this)}>Create Post</button>
</Can>
```

or React elements:

```jsx
<Can I="create" a="Post" ability={ability}>
  <button onClick={this.createPost.bind(this)}>Create Post</button>
</Can>
```

**Note**: it's better to pass children as a render function just because it will not create additional React elements if user doesn't have ability to do some action (in the case above `read Post`)

### 1. Scoping Can to use a particular ability

Yes, it's a bit inconvenient to pass `ability` in every `Can` component.
This was actually done for cases when you have several abilities in your app and/or want to restrict a particular `Can` component to check abilities using another instance.

There are 2 function which allow to scope `Can` to use a particular instance of `Ability`:
* `createCanBoundTo`
* `createContextualCan`

The first function just creates a new component which is bound to a particular ability and accepts only 2 properties: `do` and `on`:

```js
// Can.js
import { createCanBoundTo } from '@casl/react'
import ability from './ability'

export default createCanBoundTo(ability)
```

Then import bound `Can` into any component (now you don't need to pass `ability` property):

```jsx
import Can from './Can'

export function button() {
  return (
    <Can I="create" a="Post">
      () => <button onClick={this.createPost.bind(this)}>Create Post</button>
    </Can>
  )
}
```

`createContextualCan` uses [React Context API][react-ctx-api] (available from React@16.3.0) and provides specified ability to all children components.

```js
// ability-context.js
import { createContext } from 'react'
import { createContextualCan } from '@casl/react'

export const AbilityContext = createContext()
export const Can = createContextualCan(AbilityContext.Consumer)
```

Later you need to provide your ability to `AbilityContext.Provider`

```jsx
import { AbilityContext } from './ability-context'
import ability from './ability'

export default function App({ props }) {
  return (
    <AbilityContext.Provider value={ability}>
      <TodoApp />
    </AbilityContext.Provider>
  )
}
```

And inside `TodoApp` you can use previously created `Can` component:

```jsx
import React, { Component } from 'react'
import { Can } from './ability-context'

export class TodoApp extends Component {
  createTodo() {
    // ....
  }

  render() {
    return (
      <Can I="create" a="Todo">
        () => <button onClick={this.createTodo.bind(this)}>Create Todo</button>
      </Can>
    )
  }
}
```

See [casl-react-example][casl-react-example] for more examples.

### 2. Defining Abilities

There are 2 options how you can define `Ability` instance:
* define an empty ability and update it when user login
* define ability using `AbilityBuilder` and optionally update it when user login

To define empty ability:

```js
// ability.js
import { Ability } from '@casl/ability'

export default new Ability([])
```

To create ability using `AbilityBuilder`

```js
// ability.js
import { AbilityBuilder } from '@casl/ability'

export default AbilityBuilder.define(can => {
  can('read', 'all')
  // ....
})
```

Later in your login component:

```jsx
import React, { Component } from 'react'
import ability from './ability'

export class LoginComponent extends Component {
  login(event) {
    event.preventDefault()
    const { email, password } = this.state

    return fetch('path/to/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      .then(response => response.json())
      .then(session => ability.update(session.rules))
  }

  render() {
    return (
      <form onSubmit={this.login.bind(this)}>
        // ...
      </form>
    )
  }
}
```

Obviously, in this case your server API should provide the list of user abilities in `rules` field of the response.
See [@casl/ability](/packages/casl-ability) package for more information on how to define abilities.

### 3. Property names and aliases

As you can see from the code above, component name and its property names and values creates an English sentence, basically a question.
For example, the code below reads as `Can I create a Post`.

```jsx
<Can I="create" a="Post">
  () => <button onClick={...}>Create Post</button>
</Can>
```

There are several other property aliases which allow to construct a readable question:

* use `a` alias when you check by Type

```jsx
<Can I="read" a="Post">...</Can>
```

* use `of` alias instead of `a` when you check by subject field

```jsx
<Can I="read title" of="Post">...</Can>

// or when checking on instance. `this.props.post` is an instance of `Post` class (i.e., model instance)

<Can I="read title" of={this.props.post}>...</Can>
```

* use `this` alias instead of `of` and `a` when you check action on instance

```jsx
// `this.props.post` is an instance of `Post` class (i.e., model instance)

<Can I="read" this={this.props.post}>...</Can>
```

* use `do` and `on` if you are bored and don't want to make your code more readable :)

```jsx
// `this.props.post` is an instance of `Post` class (i.e., model instance)

<Can do="read" on={this.props.post}>...</Can>

// or per field check
<Can do="read title" on={this.props.post}>...</Can>
```

* use `not` when you want to invert the render method

```jsx
<Can not I="read" a="Post">...</Can>
```


## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing][contributing]

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: /CONTRIBUTING.md
[react]: https://reactjs.org/
[casl-react-example]: https://github.com/stalniy/casl-react-example
[react-ctx-api]: https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b
