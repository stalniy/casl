# CASL React

[![@casl/react NPM version](https://badge.fury.io/js/%40casl%2Freact.svg)](https://badge.fury.io/js/%40casl%2Freact)
[![](https://img.shields.io/npm/dm/%40casl%2Freact.svg)](https://www.npmjs.com/package/%40casl%2Freact)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to integrate `@casl/ability` with [React] application. It provides `Can` component that allow to hide or show UI elements based on user ability to see them.

> `@casl/react` perfectly works with [React Native](https://reactnative.dev/)

## Installation

```sh
npm install @casl/react @casl/ability
# or
yarn add @casl/react @casl/ability
# or
pnpm add @casl/react @casl/ability
```

## Can component

It accepts children and 6 properties:

* `do` - name of the action (e.g., `read`, `update`). Has an alias `I`
* `on` - checked subject. Has `a`, `an`, `this` aliases
* `field` - checked field

  ```jsx
  export default ({ post }) => <Can I="read" this={post} field="title">
    Yes, you can do this! ;)
  </Can>
  ```

* `not` - inverts ability check and show UI if user cannot do some action:

  ```jsx
  export default () => <Can not I="create" a="Post">
    You are not allowed to create a post
  </Can>
  ```

* `passThrough` - renders children in spite of what `ability.can` returns. This is useful for creating custom components based on `Can`. For example, if you need to disable button based on user permissions:

  ```jsx
  export default () => (
    <Can I="create" a="Post" passThrough>
      {allowed => <button disabled={!allowed}>Save</button>}
    </Can>
  )
  ```

* `ability` - an instance of `Ability` which will be used to check permissions
* `children` - elements to hide or render. May be either a render function:

  ```jsx
  export default () => <Can I="create" a="Post" ability={ability}>
    {() => <button onClick={this.createPost}>Create Post</button>}
  </Can>
  ```

  or React elements:

  ```jsx
  export default () => <Can I="create" a="Post" ability={ability}>
    <button onClick={this.createPost}>Create Post</button>
  </Can>
  ```

> it's better to pass children as a render function because it will not create additional React elements if user doesn't have ability to do some action (in the case above `create Post`)

Don't be scared by the amount of properties component takes, we will talk about how to bind some of them.

### Bind Can to a particular Ability instance

It'd be inconvenient to pass `ability` in every `Can` component. That's why there are 2 function which allow to bind `Can` to use a particular instance of `Ability`:

* `createCanBoundTo`\
  This function was created to support version of React < 16.4.0, those versions doesn't have [Context API][react-ctx-api]. Can be used like this:

  ```js @{data-filename="Can.js"}
  import { createCanBoundTo } from '@casl/react';
  import ability from './ability';

  export const Can = createCanBoundTo(ability);
  ```
* `createContextualCan`\
  This function is created to support [React's Context API][react-ctx-api] and can be used like this:

  ```js @{data-filename="Can.js"}
  import { createContext } from 'react';
  import { createContextualCan } from '@casl/react';

  export const AbilityContext = createContext();
  export const Can = createContextualCan(AbilityContext.Consumer);
  ```

The 2 methods are almost the same, the 2nd one is slightly better because it will allow you to provide different `Ability` instances to different parts of your app and inject ability using [`contextType` static property](https://reactjs.org/docs/context.html#classcontexttype). Choose your way based on the version of React you use.

> In this guide, we will use `createContextualCan` as it covers more cases in modern React development.

To finalize things, we need to provide an instance of `Ability` via `AbilityContext.Provider`:

```jsx @{data-filename="App.jsx"}
import { AbilityContext } from './Can'
import ability from './ability'

export default function App({ props }) {
  return (
    <AbilityContext.Provider value={ability}>
      <TodoApp />
    </AbilityContext.Provider>
  )
}
```

> See [CASL guide](https://casl.js.org/v5/en/guide/intro) to learn how to define `Ability` instance.

and use our `Can` component:

```jsx
import React, { Component } from 'react'
import { Can } from './Can'

export class TodoApp extends Component {
  createTodo = () => {
    // implement logic to show new todo form
  };

  render() {
    return (
      <Can I="create" a="Todo">
        <button onClick={this.createTodo}>Create Todo</button>
      </Can>
    )
  }
}
```

### Imperative access to Ability instance

Sometimes the logic in a component may be a bit complicated, so you can't use `<Can>` component. In such cases, you can use [React's `contextType` component property](https://reactjs.org/docs/context.html#classcontexttype):

```jsx
import React, { Component } from 'react'
import { AbilityContext } from './Can'

export class TodoApp extends Component {
  createTodo = () => {
    // logic to show new todo form
  };

  render() {
    return (
      <div>
        {this.context.can('create', 'Todo') &&
          <button onClick={this.createTodo}>Create Todo</button>}
      </div>
    );
  }
}

TodoApp.contextType = AbilityContext;
```

or `useContext` hook:

```jsx
import React, { useContext } from 'react';
import { AbilityContext } from './Can'

export default () => {
  const createTodo = () => { /* logic to show new todo form */ };
  const ability = useContext(AbilityContext);

  return (
    <div>
      {ability.can('create', 'Todo') &&
        <button onClick={createTodo}>Create Todo</button>}
    </div>
  );
}
```

In that case, you need to create a new `Ability` instance when you want to update user permissions (don't use `update` method, it won't trigger re-rendering in this case) or you need to force re-render the whole app.

To make things easier, `@casl/react` provides `useAbility` hook that accepts `React.Context` as the only argument (the same as `useContext`), but triggers re-render in the component where you use this hook when you update `Ability` rules. The example above can be rewritten to:

```jsx
import { useAbility } from '@casl/react';
import { AbilityContext } from './Can'

export default () => {
  const createTodo = () => { /* logic to show new todo form */ };
  const ability = useAbility(AbilityContext);

  return (
    <div>
      {ability.can('create', 'Todo') &&
        <button onClick={createTodo}>Create Todo</button>}
    </div>
  );
}
```

### Usage note on React < 16.4 with TypeScript

If you use TypeScript and React < 16.4 make sure to add `@casl/react/contextAPIPatch.d.ts` file in your `tscofig.json`, otherwise your app won't compile:

```json
{
  // other configuration options
  "include": [
    "src/**/*",
    "@casl/react/contextAPIPatch.d.ts" // <-- add this line
  ]
}
```

### Property names and aliases

As you can see from the code above, component name and its property names and values create an English sentence, actually a question. For example, the code below reads as `Can I create a Post`:

```jsx
export default () => <Can I="create" a="Post">
  <button onClick={...}>Create Post</button>
</Can>
```

There are several other property aliases which allow to construct a readable question:

* use `a` (or `an`) alias when you check by Type

  ```jsx
  export default () => <Can I="read" a="Post">...</Can>
  ```

* use `this` alias instead of `a` when you check action on a particular instance. So, the question can be read as "Can I read this *particular* post?"

  ```jsx
  // `this.props.post` is an instance of `Post` class (i.e., model instance)
  export default () => <Can I="read" this={this.props.post}>...</Can>
  ```

* use `do` and `on` if you are bored and don't want to make your code more readable ;)

  ```jsx
  // `this.props.post` is an instance of `Post` class (i.e., model instance)
  export default () => <Can do="read" on={this.props.post}>...</Can>

  // or per field check
  export default () => <Can do="read" on={this.props.post} field="title">...</Can>
  ```

## TypeScript support

The package is written in TypeScript, so don't worry that you need to keep all the properties and aliases in mind. If you use TypeScript, your IDE will suggest you the correct usage and TypeScript will warn you if you make a mistake.

## Update Ability instance

Majority of applications that need permission checking support have something like `AuthService` or `LoginService` or `Session` service (name it as you wish) which is responsible for user login/logout functionality. Whenever user login (and logout), we need to update `Ability` instance with new rules. Usually you will do this in your `LoginComponent`.

Let's imagine that server returns user with a role on login:

```ts @{data-filename="Login.jsx"}
import { AbilityBuilder, Ability } from '@casl/ability';
import React, { useState, useContext } from 'react';
import { AbilityContext } from './Can';

function updateAbility(ability, user) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else {
    can('read', 'all');
  }

  ability.update(rules);
}

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const ability = useContext(AbilityContext);
  const login = () => {
    const params = {
      method: 'POST',
      body: JSON.stringify({ username, password })
    };
    return fetch('path/to/api/login', params)
      .then(response => response.json())
      .then(({ user }) => updateAbility(ability, user));
  };

  return (
    <form>
      {/* input fields */}
      <button onClick={login}>Login</button>
    </form>
  );
};
```

> See [Define rules](https://casl.js.org/v5/en/guide/define-rules) to get more information of how to define `Ability`

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v5/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[React]: https://reactjs.org/
[react-ctx-api]: https://reactjs.org/docs/context.html
