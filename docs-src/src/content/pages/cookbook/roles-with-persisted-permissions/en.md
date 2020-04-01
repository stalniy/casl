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

The application should allow to configure permissions through API (e.g., REST API or User Interface) for different groups of users (i.e., roles). So, we don't need to change the code in order to change permissions.

## The solution

In order to achieve this, we need to store permissions in the database.

There are several ways you can store rules depending on your business requirements. We will consider the most common way to deal with permissions, using roles and permissions.

First of all, you need to gather all possible actions and subjects, so you can validate them before saving permission to the database. In more advanced cases, you will also need to allow users to configure conditions for permissions (e.g., to give a permission to manage own articles).

When all combinations of actions and subjects are known, we can create a table for `roles`. It should have at least 2 columns: `id` and `name`. Then we need to connect roles and permissions. To do this, we have 2 options:

1. Add `permissions` column of JSON (or TEXT) data type into `roles` and store all rules in that single column.\
   **The main advantage** is that it's very simple to manage and retrieve.
   **The main disadvantage** is that most ORMs doesn't support partial updates of JSON (and especially TEXT) column, instead they update the whole value as a primitive value. This may lead to unexpected results if several users update permissions at the same time (the last one will overwrite changes of others). Usually permissions are not changed often so, this risk is acceptable. Otherwise, use SQL syntax of your RDBMS to partially update JSON column.
2. Create a separate table for `permissions` which has `action`, `subject`, `conditions` and `roleId` fields.\
   **The main advantage** is that you can do partial updates using regular SQL.
   **The main disadvantage** more complicated queries (you need to join `roles` and `permissions`) and bigger eventual database size.

We will use the 1st option in this guide.

## Demo

To make things simple, we will use SQLite database. This also allows to quickly setup the demo on local machine and even run it in a browser.

As a domain, we will use blog application. This is the most known domain, so we won't spent time explaining domain details and instead will concentrate on the actual issue.

In our blog, we have 2 roles: `member` (any registered user) and `admin`. So, `admin` can do everything and `member`:

* can read all articles
* can manage own articles

We will use [knex] SQL builder to work with the database.

> We will not go through knex's API and usage, so if you are not familiar with it, take some time to look through its API and examples. Anyway, don't worry, it's quite expressive.

So, let's define the table structure for our database. It includes 3 tables: `users`, `roles` and `articles`. Every user may have only 1 role. Every article has 1 author. Also we will seed our database with default records:

* 2 roles: admin and member
* 2 users: 1 admin and 1 member

You can find the migration and seed knex scripts below

<details>
<summary>Initial migration</summary>

```js @{data-filename="migrations/20200401110234_init.js"}
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
       table.increments('id');
       table.string('email', 255).notNullable();
       table.string('password', 50).notNullable();
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
  ])

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
  ])
  await knex('users').insert([
    { id: 1, email: 'admin@casl.io', password: '123456', roleId: 1 },
    { id: 2, email: 'author@casl.io', password: '123456', roleId: 2 },
  ]);
};
```

> We used `${user.id}` in `conditions` property of permissions. This is just a placeholder which we will replace later with the id of a particular user.

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

Now we can move to services creation

### Services

We need to create 2 additional services: one to fetch `users` and another to manage `articles`.

Let's start from a service that will allow us to fetch a single user by some conditions from the database. This function also will prepare user's permissions, so we can directly pass them in `createAbility` function:

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

Let's go line by line to understand what happens in this function:

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

Now, when everything is ready we can put it together!

### Putting together

> In this guide, we will not implement REST API as the main intension is to solve [The issue](#the-issue), that is to allow to modify permissions without changing the application's code.

We need to start from connecting things together, to do so we need to fetch users and create `Ability` instances for each one:

```ts @{data-filename="main.ts"}
import { findBy } from './services/users';
import { createAbility } from './services/appAbility';

export default async function main() {
  const [admin, author] = await Promise.all([
    findBy({ email: 'admin@casl.io' }),
    findBy({ email: 'author@casl.io' }),
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

[knex]: http://knexjs.org/

## When to avoid

1. If your permission system should not be dynamically configured by users.
2. If you start a new project and not sure whether you need to dynamically configure permissions.

## Alternative patterns

As an alternative you can use [hard-coded permissions with CASL](../roles-with-static-permissions). It will bring the same benefits but with less overhead.
