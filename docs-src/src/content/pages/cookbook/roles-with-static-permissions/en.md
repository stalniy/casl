---
title: Roles with predefined permissions
categories: [cookbook]
order: 20
meta:
  keywords: ~
  description: ~
---

> This recipe targets backend developers. We use [TypeScript] and [RDBMS](https://en.wikipedia.org/wiki/Relational_database) in this guide, so the basic knowledge of both is required.

[TypeScript]: https://www.typescriptlang.org

## The issue

The application can be used by multiple users with different roles. Each role has predefined set of permissions.

> This is also known as [RBAC (Role based access control)](https://searchsecurity.techtarget.com/definition/role-based-access-control-RBAC).

## The solution

First of all, we need to define tables for `users` and `roles`. `users` table stores `id`, `email`, `password` and `roleId`. `roles` table stores only `id` and `name`.

> Tables' structure may be different in your application. We are going to use the simplest but sufficient structure to solve [The issue](#the-issue)

As our roles has a predefined set of permissions which are not required to be changeable in runtime, we are going to define role permissions in the code. For each role we will have a separate function. Then depending on the role name, we will call that function to define permissions and create `Ability` instance. Using `Ability` instance we can guarantee that a user can do only what his role allows him to do.

> In the next Demo, we are not going to implement REST API as the main intention of this recipe is to solve [The issue](#the-issue).

## Demo

To make things simple, we will use SQLite database. This also allows to quickly setup the demo on local machine and even run it in a browser.

The demo domain is very simple, this is an app that allows to invite users. This app has 2 roles:

* `member` user can
  * invite any user
  * update information about himself
* `admin` user can
  * manage everything

In order to start, we need to create a migration script for `users` and `roles` tables and seed our database with default records. To do this, we will use [knex] SQL builder.

> We are not going to walk through knex's API and usage, so if you are not familiar with it, take some time to look through its documentation. Anyway, don't worry, it's quite expressive.

<details>
<summary>Initial migration</summary>

```js @{data-filename="migrations/20200401110244_init.js"}
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('password', 50).notNullable();
      table.integer('roleId').unsigned().notNullable();

      table.foreign('roleId').references('id').inTable('roles');
    })
    .createTable('roles', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable('users')
      .dropTable('roles');
};
```
</details>

<details>
<summary>Initial seeds</summary>

```js @{data-filename="seeds/init.js"}
exports.seed = async (knex) => {
  await Promise.all([
    knex('users').del(),
    knex('roles').del()
  ]);
  await knex('roles').insert([
    { id: 1, name: 'admin' },
    { id: 2, name: 'member' }
  ]);
  await knex('users').insert([
    { id: 1, email: 'admin@casl.io', password: '123456', roleId: 1 },
    { id: 2, email: 'member@casl.io', password: '123456', roleId: 2 },
  ]);
};
```
</details>

Now, let's define all possible actions and subjects.

### Abilities

This app has only `User` subject, users can only `update` himself and invite other users, so:

```ts @{data-filename="appAbility.ts"}
import { Ability, ForcedSubject, AbilityClass } from '@casl/ability';

const actions = ['manage', 'invite'] as const;
const subjects = ['User', 'all'] as const;
type AppAbilities = [
  typeof actions[number],
  typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
];
export type AppAbility = Ability<AppAbilities>;
export const AppAbility = Ability as AbilityClass<AppAbility>;
```

> See [TypeScript support](../../advanced/typescript#useful-type-helpers) to get details about type helpers.

`typeof actions[number]` converts readonly array into union of its values, this allows to reuse actions and subjects defined in value scope inside type scope.

Having all possible subjects and actions, we can define roles' permissions in the same file:

```ts @{data-filename="appAbility.ts"}
import { Ability, ForcedSubject, AbilityBuilder, AbilityClass } from '@casl/ability';
import { User } from '../models/User';

// abilities definition from previous example

type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
type Roles = 'member' | 'admin';

const rolePermissions: Record<Roles, DefinePermissions> = {
  member(user, { can }) {
    can('invite', 'User');
    can('update', 'User', { id: user.id });
  },
  admin(user, { can }) {
    can('manage', 'all');
  }
};
```

> Do you see how readable this definition object is? The function signature says "member user can" and the body describes what the member user can do. Looks very similar to how we described our requirements at the beginning of [Demo](#demo) section, don't it?

We imported `User` data class in order to make our functions a bit more strongly typed, its shape is the following:

```ts @{data-filename="models/User.ts"}
export interface User {
  id: number
  email: string
  password: string
  role: string
}
```

> We created `rolePermissions` object that holds our permission definitions functions instead of using regular functions. This allows us to retrieve role specific function by accessing properties of this object, this is very convenient and efficient.

Finally, let's create a function that defines `Ability` instance for our user, let's do this in the same file:

```ts @{data-filename="services/appAbility.ts"}
import { Ability, ForcedSubject, AbilityBuilder } from '@casl/ability';
import { User } from '../models/User';

// abilities definition from the example above
// roles definition from the example above

export function defineAbilityFor(user: User): AppAbility {
  const builder = new AbilityBuilder(Ability);

  if (typeof rolePermissions[user.role] === 'function') {
    rolePermissions[user.role](user, builder);
  } else {
    throw new Error(`Trying to use unknown role "${user.role}"`);
  }

  return builder.build();
}
```

> We need to ensure that permissions' definition function for a particular role exists because TypeScript can't help us to ensure that roles in the database reflects our types. So, we fail fast.

### Putting together

First of all, we need a function that returns a user by its email and another one that updates a user by its id:

```ts @{data-filename="services/users.ts"}
import db from './db';
import { User } from './models/User';

export async function findUserByEmail(email: string) {
  const user = await db<User>('users')
    .select('users.id', 'users.email', { role: 'roles.name' })
    .innerJoin('roles', 'roles.id', 'users.roleId')
    .where('email', email)
    .first();

  return user;
}

export type UserChanges = Partial<Exclude<User, 'role' | 'id'>>;
export async function updateUserById(id: number, changes: UserChanges) {
  await db<User>(users)
    .update(changes)
    .where('id', id);
}
```

Now we can implement `updateUserDetails` function:

```ts @{data-filename="updateUserDetails.ts"}
import { ForbiddenError, subject } from '@casl/ability';
import { defineAbilityFor } from './services/appAbility';
import { findUserByEmail, updateUserById, UserChanges } from './services/users';

export async function updateUserDetails(
  /** email of a user who initiates the request (i.e., logged in user) */
  initiatorEmail: string,
  /** an email of user to be updated */
  userToBeUpdatedEmail: string,
  /** an object of changes to be applied */
  changes: UserChanges
) {
  const user = await findUserByEmail(initiatorEmail);
  const ability = defineAbilityFor(user);
  const userToBeUpdated = userToBeUpdatedEmail === initiatorEmail
    ? user
    : await findUserByEmail(userToBeUpdatedEmail)

  ForbiddenError.from(ability).throwUnlessCan('update', subject('User', userToBeUpdated));
  await updateUserById(userToBeUpdated.id, changes);
}
```

> We intentionally made this function to accept both initiator and user whose details needs to be updated in order to show that permissions' logic works correctly. In real world apps, this function should accept only initiator and update his details!

Let's go line by line in order to understand the code:

1. We created `updateUserDetails` that accepts 3 arguments: 1st represents user's email who initiates the request (i.e., logged in user), 2nd is an email of a user whose details will be updated and 3rd is an object of changes.
2. Inside the function, we find initiator user in order to create `Ability` instance for it.
3. We also find user whose details needs to be updated, so we have his id.
4. Using `ForbiddenError` class, we ensure that user can update own details. If not, a `ForbiddenError` will be thrown. Also pay attention that we call `subject` function. It assigns a particular subject type to a plain JavaScript object (see [subject helper](../../guide/subject-type-detection#subject-helper) for details).
5. We call `updateUserById` function to update user details by id in the database.

To test this function, let's create a simple script:

```ts
import { ForbiddenError } from '@casl/ability';
import { updateUserDetails } from './updateUserDetails';

updateUserDetails('member@casl.io', 'member@casl.io', { password: '654321' })
  .then(() => console.log('[member]: own details were successfully updated'))
  .catch((error) => {
    if (error instanceof ForbiddenError) {
      console.log('[member]: cannot update own details');
    } else {
      console.error(error);
    }
  });

updateUserDetails('member@casl.io', 'admin@casl.io', { password: '654321' })
  .then(() => console.log('[member]: admin details were successfully updated'))
  .catch((error) => {
    if (error instanceof ForbiddenError) {
      console.log('[member]: admin details are NOT ALLOWED to be updated');
    } else {
      console.error(error);
    }
  });
```

If you run this code, you will get:

```
[member]: own details were successfully updated
[member]: admin details are NOT ALLOWED to be updated
```

At this point, you have enough details to implement `inviteUser` function by yourself ;) So, we will just go through its logic:

1. `inviteUser` accepts 2 arguments: initiator's email and email of the user to be invited.
2. Retrieve initiator user by its email.
3. Check that initiator is allowed to invite a user.
4. Check if the user to be invited has not been registered in the system before.
5. If not, send an email to this user with invitation message.

### Conclusion

That's it! You now have a powerful role based access control powered by CASL! We hope this tutorial was helpful and made your understanding of CASL.js even better :)

## Alternative patterns

This pattern is very powerful and scales very good. Even if at some point in the future, you will need to allow users to change permissions dynamically (e.g., via REST API or User Interface), you can easily do this, read [Roles with persisted permissions](../roles-with-persisted-permissions) recipe for details.

If you need to implement claim based permissions, check [Claim based Authorization](../claim-authorization) recipe.

[knex]: http://knexjs.org/
