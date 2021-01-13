---
title: Roles with persisted permissions
categories: [cookbook]
order: 25
meta:
  keywords: ~
  description: ~
---

> This recipe targets backend developers. We use [TypeScript] and [RDBMS](https://en.wikipedia.org/wiki/Relational_database) in this guide, so the basic knowledge of both is required.

[TypeScript]: https://www.typescriptlang.org

## The issue

The application can be used by multiple users with different roles. Roles' permissions should be configurable through API (e.g., REST API or User Interface). So, we don't need to change or redeploy the app in order to change permissions.

> This is also known as [RBAC (Role based access control)](https://searchsecurity.techtarget.com/definition/role-based-access-control-RBAC).

## The solution

In order to achieve this, we need to store permissions in the database.

First of all, we need to gather all possible actions and subjects, in order to validate them before saving permission to the database.

When all combinations of actions and subjects are known, we can create a table for `roles`. It should have at least 2 columns: `id` and `name`. Then we need to choose one of 2 options to connect roles with permissions:

1. Add `permissions` column of JSON (or TEXT) data type into `roles` and store all rules in that single column.\
   **The main advantage** is that it's very simple to manage and retrieve.
   **The main disadvantage** is that most ORMs doesn't support partial updates of JSON (and especially TEXT) column, instead they update the whole value as a primitive value. This may lead to unexpected results if several users update permissions of the same role at the same time (the last one will reset changes of others).
2. Create a separate table for `permissions` which has `action`, `subject`, `conditions` and `roleId` fields.\
   **The main advantage** is that you can do partial updates using regular SQL.
   **The main disadvantage** more complicated queries (you need to join `roles` and `permissions`) and bigger eventual database size.

We will use the 1st option in this guide because permissions are not changed often, so the risk of conflict is acceptable for us. Moreover this `permissions` field will contain an array that is acceptable by `Ability` instance (i.e., `RawRuleOf<AppAbility>[]`).

> If it's not acceptable for your situation, use raw SQL syntax of your RDBMS to partially update JSON column or use 2nd option.

We also need a table for `users`. Every user may have only 1 role, in other words every row in `users` table should have `roleId` field.

Having users, roles and permissions, we can create `Ability` instance for every user request. The logic for the REST API is the following:

1. User sends request to access some resources.
2. If it's not authenticated, sends back an error that he needs to login.
3. If it's authenticated, the app fetches it together with permissions from the database.
4. The app creates an `Ability` instance based on user's permissions
5. Using `Ability` instance, the app checks whether user can do a particular action on requested resource.
6. If not, it's sends error back that user has no permission to do what he attempted to do.
7. If user has permissions, then proceed with the actual action.

Enough theory, let's see some examples!

> In the next Demo, we are not going to implement REST API as the main intention of this recipe is to solve [The issue](#the-issue).

## Demo

To make things simple, we will use SQLite database. This also allows to quickly setup the demo on local machine and even run it in a browser.

As a domain, we will use blog application. This is the most known domain, so we won't spent time explaining its details and instead will concentrate on the actual issue.

In our blog, we have 2 roles: `member` (any registered user) and `admin`. So, `admin` can do everything and `member`:

* can read all articles
* can manage own articles

We will use [knex] SQL builder to work with the database.

> We are not going to walk through knex's API and usage, so if you are not familiar with it, take some time to look through its documentation. Anyway, don't worry, it's quite expressive.

So, let's define the table structure for our database. It includes 3 tables: `users`, `roles` and `articles`. Also we will seed our database with default records:

* 2 roles: admin and member
* 2 users: 1 admin and 1 member

You can find the migration and seeds below:

<details>
<summary>Initial migration</summary>

```js @{data-filename="migrations/20200401110234_init.js"}
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('password', 50).notNullable();
      table.integer('roleId').unsigned().notNullable();

      table.foreign('roleId').references('id').inTable('roles');
    })
    .createTable('articles', (table) => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('description').notNullable();
      table.integer('authorId').unsigned().notNullable();

      table.foreign('authorId').references('id').inTable('users');
    })
    .createTable('roles', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.json('permissions').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable('users')
      .dropTable('articles')
      .dropTable('roles');
};
```
</details>

and initial seed:

```js @{data-filename="seeds/init.js"}
exports.seed = async (knex) => {
  await Promise.all([
    knex('users').del(),
    knex('roles').del()
  ]);

  await knex('roles').insert([
    {
      id: 1,
      name: 'admin',
      permissions: JSON.stringify([
        { action: 'manage', subject: 'all' }
      ])
    },
    {
      id: 2,
      name: 'member',
      permissions: JSON.stringify([
        { action: 'read', subject: 'Article' },
        { action: 'manage', subject: 'Article', conditions: { authorId: '${user.id}' } },
      ])
    }
  ]);
  await knex('users').insert([
    { id: 1, email: 'admin@casl.io', password: '123456', roleId: 1 },
    { id: 2, email: 'member@casl.io', password: '123456', roleId: 2 },
  ]);
};
```

> We used `${user.id}` in `conditions` property of permissions. This is just a placeholder which we will replace it later with the id of a particular user.

Now, let's define all possible actions and subjects:

```ts @{data-filename="services/appAbility.ts"}
import { Ability, RawRuleOf, ForcedSubject } from '@casl/ability';

export const actions = ['manage', 'create', 'read', 'update', 'delete'] as const;
export const subjects = ['Article', 'all'] as const;

export type Abilities = [
  typeof actions[number],
  typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
];
export type AppAbility = Ability<Abilities>;
export const createAbility = (rules: RawRuleOf<AppAbility>[]) => new Ability<Abilities>(rules);
```

> See [TypeScript support](../../advanced/typescript#useful-type-helpers) to get details about type helpers.

`typeof actions[number]` converts readonly array into union of its values, this allows to reuse actions and subjects defined in value scope inside type scope. We also export `createAbility` function to make it easier to create `Ability` instance with bound generic parameters.

In order to work with our database on higher level, we need to create services.

### Services

We need to create 2 services: one to fetch `users` and another to manage `articles`.

Let's start from a function that will allow us to fetch a single user by some conditions from the database. This function also will prepare user's permissions, so we can directly pass them in `createAbility` function:

```ts @{data-filename="services/users.ts"}
import db from '../db';
import { User } from '../models/User';
import interpolate from '../helpers/interpolate';

export async function findBy(where: Partial<Record<keyof User, any>>) {
  const { permissions, ...user } = await db<User>('users')
    .innerJoin('roles', 'users.roleId', 'roles.id')
    .select('users.id', 'users.email', 'roles.permissions', { role: 'roles.name' })
    .where(where)
    .first();

  user.permissions = interpolate(permissions, { user });

  return user;
}
```

Let's go line by line to understand what happens in the function:

* we import `db`, this is a knex connection instance
* we import `User`, this is just an interface for users that has the next shape:

  ```ts @{data-filename="models/User.ts}
  import { RawRuleOf } from '@casl/ability';
  import { AppAbility } from '../services/appAbility';

  export interface User {
    id: number
    email: string
    role: string
    permissions: RawRuleOf<AppAbility>[]
  }
  ```

  As you can see, its permissions property has the type that `Ability` instance accepts in the first parameter. This was done intentionally to simplify ability creation.
* we import `interpolate` function, this function takes a JSON template and replaces all placeholder (e.g., `${user.id}`) with the provided variables inside context. This function uses `reviver` argument of `JSON.parse` method to iterate deeply over the object but it's not important for this guide. You can use any template library you like (e.g., [mustache](https://mustache.github.io/), [underscore template](http://underscorejs.org/#template)).
* in `findBy` function, we join users and roles to get user's permissions and role and preprocess permissions' template with the `interpolate` function (so that, it replaces `${user.id}` placeholders with the actual `user.id` value).

The service for articles is more complicated, it will check users' ability to do a particular action on the provided article instance. For the sake of simplicity, we'll show only `create` function (all the rest are similar):

```ts @{data-filename="services/articles.ts"}
import { ForbiddenError, subject } from '@casl/ability';
import { AppAbility } from './appAbility';
import db from '../db';
import { Article } from '../models/Article';

const articles = () => db<Article>('articles');

export async function create(ability: AppAbility, partialArticle: Omit<Article, 'id'>) {
  ForbiddenError.from(ability).throwUnlessCan('create', subject('Article', partialArticle));
  const [id] = await articles().insert(partialArticle);

  return { id, ...partialArticle } as Article;
}

// other functions
```

In this service, we use `ForbiddenError` class which allows to throw an error if user doesn't have an ability to do something. We also wrap `partialArticle` with `subject` call. This allows `Ability` instance to detect subject type of a plain object.

> See [Subject type detection](../../guide/subject-type-detection#subject-helper) for details.

`Article` is an interface that enforces the shape of our articles:

```ts @{data-filename="models/Article.ts"}
export interface Article {
  id: number
  title: string
  description: string
  authorId: number
}
```

Now, when service layer is finished, we can put it together!

### Putting together

We need to start from connecting things together, to do so we need to fetch users and create `Ability` instances for each one:

```ts @{data-filename="main.ts"}
import { findBy } from './services/users';
import { createAbility } from './services/appAbility';

export default async function main() {
  const [admin, author] = await Promise.all([
    findBy({ email: 'admin@casl.io' }),
    findBy({ email: 'member@casl.io' }),
  ]);

  const adminAbility = createAbility(admin!.permissions);
  const authorAbility = createAbility(author!.permissions);

  // the rest of the code
}
```

We also need to create 2 articles, one that is written by admin and another by author:

```ts @{data-filename="main.ts"}
// imports here

export default async function main() {
  // fetch users & create ability instances

  const adminArticle = {
    title: 'CASl and TypeScript',
    description: 'Is very powerful',
    authorId: admin!.id
  };

  const authorArticle = {
    title: 'CASl and TypeScript',
    description: 'Is very powerful',
    authorId: author!.id
  };

  // the rest of the code
}
```

And finally let's check our permissions:

* `admin` user should be able to create article in spite of who wrote it
* `member` user should be able to only create articles that were written by him

```ts @{data-filename="main.ts"}
// other imports here
import * as articles from './services/articles';

export default async function main() {
  await articles.create(adminAbility, adminArticle);
  console.log('[admin]: created article written by himself')

  try {
    await articles.create(authorAbility, adminArticle);
  } catch (error) {
    console.log('[member]: cannot create an article written by admin');
  }

  await articles.create(adminAbility, authorArticle);
  console.log('[admin]: created article written by author');

  await articles.create(authorAbility, authorArticle);
  console.log('[author]: created article written by himself');

  console.log('\nAll articles ');
  const rawArticles = await articles.find();

  rawArticles.forEach((article) => {
    const prefix = article.authorId === admin!.id ? '[admin]' : '[author]';
    console.log(`${prefix}: ${article.title}`);
  });
}
```

Let's call `main` function and see the results:

```sh
$ npm start

[admin]: created article written by himself
[author]: cannot create an article written by admin
[admin]: created article written by author
[author]: created article written by himself

All articles
[admin]: CASl and TypeScript
[author]: CASl and TypeScript
[author]: CASl and TypeScript
```

Everything works as we it should! Now let's allow members to create any article. To do so, we need to update permissions of `member` role and we will do this using [knex]:

```ts @{data-filename="updateMemberRole.ts"}
import db from './db';

db('roles')
  .update({
    permissions: JSON.stringify([
      { action: ['read', 'create'], subject: 'Article' },
      { action: ['update', 'delete'], subject: 'Article', conditions: { authorId: '${user.id}'} },
    ])
  })
  .where('name', 'member')
  .then(() => {
    console.log('Permissions of "member" role has been updated');
    return db.destroy();
  })
  .catch(console.error);
```

After updating member's permissions and running `main` function again, we got this results:

```sh
$ npm start

[admin]: created own article
[member]: created article written by admin <---
[admin]: created article written by author
[member]: created article written by himself

All articles
[admin]: CASl and TypeScript
[member]: CASl and TypeScript
[member]: CASl and TypeScript
[admin]: CASl and TypeScript
[admin]: CASl and TypeScript
[member]: CASl and TypeScript
[member]: CASl and TypeScript
```

As you can see, member is now allowed to create articles created by admins!

### Conclusion

That's it! You now have a fully manageable CASL powered permissions logic in your app. We hope this tutorial was helpful and made your development experience with CASL.js even more enjoyable :)

You can find the source code of this solution on [Github](https://github.com/stalniy/casl-persisted-permissions-example).

## When to avoid

1. If you have a predefined set of permissions for every role which very unlikely to change.
2. If you start a new project and not sure whether you need to dynamically configure permissions.

## Alternative patterns

As an alternative you can implement [predefined permissions with CASL](../roles-with-static-permissions). It brings the same benefits but with less overhead.

If you need to implement claim based permissions, check [Claim based Authorization](../claim-authorization) recipe.

[knex]: http://knexjs.org/
