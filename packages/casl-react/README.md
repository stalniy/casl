# CASL React

[![@casl/react NPM version](https://badge.fury.io/js/%40casl%2Freact.svg)](https://badge.fury.io/js/%40casl%2Freact)
[![](https://img.shields.io/npm/dm/%40casl%2Freact.svg)](https://www.npmjs.com/package/%40casl%2Freact)
[![Support](https://img.shields.io/badge/Support-github%20discussions-green?style=flat&link=https://github.com/stalniy/casl/discussions)](https://github.com/stalniy/casl/discussions)

This package integrates `@casl/ability` with [React]. It provides:

* `AbilityProvider` to expose the current `Ability` instance through React context
* declarative `<Can>` component for conditional rendering
* `useAbility` hook for imperative checks that stay in sync with ability updates

> `@casl/react` perfectly works with [React Native](https://reactnative.dev/)

## Installation

```sh
npm install @casl/react @casl/ability
# or
yarn add @casl/react @casl/ability
# or
pnpm add @casl/react @casl/ability
```

## Quick Start

```tsx
import { createMongoAbility } from '@casl/ability';
import { AbilityProvider, Can, useAbility } from '@casl/react';

const ability = createMongoAbility([
  { action: 'read', subject: 'Post' },
  { action: 'create', subject: 'Post' },
]);

export function App() {
  return (
    <AbilityProvider value={ability}>
      <Can I="read" a="Post">
        <div>List of posts</div>
      </Can>
      <CreatePostButton />
    </AbilityProvider>
  );
}

function CreatePostButton() {
  const ability = useAbility();
  return ability.can('create', 'Post') && (
    <button>Create Post</button>
  );
}
```

Use `<Can>` for straightforward conditional rendering in JSX and `useAbility()` when the permission check is part of more complex component logic.

## Can component

`<Can>` reads the current `Ability` instance from `AbilityProvider`, re-renders when rules change, and memoizes the relevant rule lookup until the ability, rules, or relevant props change.

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
      {({ isAllowed, reason }) => (
        <button disabled={!isAllowed} title={reason}>Save</button>
      )}
    </Can>
  )
  ```

* `children` - elements to hide or render. May be either a render function that receives `{ isAllowed, ability, reason }`:

  ```jsx
  export default () => <Can I="create" a="Post">
    {({ isAllowed, reason }) => (
      <button disabled={!isAllowed} title={reason}>Create Post</button>
    )}
  </Can>
  ```

  or React elements:

  ```jsx
  export default () => <Can I="create" a="Post">
    <button onClick={this.createPost}>Create Post</button>
  </Can>
  ```

> it's better to pass children as a render function because it will not create additional React elements if user doesn't have ability to do some action (in the case above `create Post`)

For simple visibility guards, `<Can>` keeps JSX readable. For more complex conditions, composing several checks, or passing authorization state deeper into your component tree, prefer `useAbility`.

### Provide Ability instance

Wrap the part of your app that needs authorization checks with `AbilityProvider`:

```jsx @{data-filename="App.jsx"}
import { AbilityProvider } from '@casl/react';
import ability from './ability';

export default function App() {
  return (
    <AbilityProvider ability={ability}>
      <TodoApp />
    </AbilityProvider>
  )
}
```

> See [CASL guide](https://casl.js.org/v6/en/guide/intro) to learn how to define `Ability` instance.

and use our `Can` component:

```jsx
import React, { Component } from 'react'
import { Can } from '@casl/react'

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

Sometimes the logic in a component is more complex than a simple visibility guard. In such cases, use `useAbility`. It reads the current ability from `AbilityProvider` and re-renders the component when ability rules change:

```jsx
import { useAbility } from '@casl/react';

export default () => {
  const createTodo = () => { /* logic to show new todo form */ };
  const ability = useAbility();

  return (
    <div>
      {ability.can('create', 'Todo') &&
        <button onClick={createTodo}>Create Todo</button>}
    </div>
  );
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

```ts @{data-filename="Login.tsx"}
import { AbilityBuilder, Ability } from '@casl/ability';
import React, { useState } from 'react';
import { useAbility } from '@casl/react';

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
  const ability = useAbility();
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

> See [Define rules](https://casl.js.org/v6/en/guide/define-rules) to get more information of how to define `Ability`

## `useAbility` usage within hooks

Using the return value `ability` of `const ability = useAbility()` within hook dependencies won't trigger a rerender when the rules are updated. You have to specify `ability.rules`:

```jsx
const posts = React.useMemo(() => getPosts(ability), [ability.rules]);
// ✅ calling ability.update will update the list of posts
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v6/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[React]: https://reactjs.org/
