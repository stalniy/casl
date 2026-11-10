---
title: Ability to database query
categories: [advanced]
order: 75
meta:
  keywords: rulesToAST, ability to database query, "@ucast/sql", SQL, PostgreSQL, drizzle-orm, filter records by permissions
  description: Convert CASL abilities to SQL queries with rulesToAST and @ucast/sql. Filter database records by permissions using PostgreSQL or Drizzle ORM.
---

Quite often applications need to fetch accessible records from the database based on what the user is able to do in the app. For SQL databases, CASL rules can be converted to SQL WHERE condtions by using [`rulesToAST`](../../api/casl-ability-extra#rules-to-ast) from `@casl/ability/extra` and [@ucast/sql](https://github.com/stalniy/ucast/tree/main/packages/sql).

`@ucast/sql` generates a raw SQL string, separating actual SQL query and bound parameters, and out of the box support several major Nodejs ORMs, including [TypeORM, MikroORM, Drizzle ORM, Sequelize, and Objection.js](https://github.com/stalniy/ucast/tree/main/packages/sql#integrations).

> For MongoDB see [@casl/mongoose](../../package/casl-mongoose) and for Prisma - [@casl/prisma](../../package/casl-prisma).

Check [@ucast/sql documentation](https://github.com/stalniy/ucast/tree/main/packages/sql) for more detail, in this guide we will see how to integrate it with [drizzle-orm](https://orm.drizzle.team/).

## Integrate CASL with Drizzle ORM

`@ucast/sql` uses drizzle ORM metadata to map properties and relations into correct database columns. At first, we need to install dependencies. `@ucast/sql` supports `>=0.36.2 <1.0.0 and ^1.0.0-rc.1`.

```sh
npm install pg drizzle-orm @ucast/sql
npm install --save-dev typescript @types/pg
```

> On this page, we describe how to integrate CASL with drizzle v0.x. If you are using v1, please check [@ucast/sql documentation](https://github.com/stalniy/ucast/blob/main/packages/sql/README.md#drizzle-orm)

First, define the ability's action and subject types. In this example, users can read published articles and their own drafts, but cannot read archived articles:

```ts @{data-filename="defineAbilityFor.ts"}
import { defineAbility, type ForcedSubject, type MongoAbility } from '@casl/ability';
import type { Article } from './drizzle-orm.ts';

export type Action = 'read' | 'update' | 'delete';
export type AppAbility = MongoAbility<[
  Action,
  'Article' | (Article & ForcedSubject<'Article'>),
]>;

export function defineAbilityFor(user: { id: number }): AppAbility {
  return defineAbility<AppAbility>((can, cannot) => {
    can('read', 'Article', { published: true });
    can('read', 'Article', { authorId: user.id });
    cannot('read', 'Article', { archived: true });
  });
}
```

Use Drizzle's inferred row type for the query result and `NodePgDatabase` for the database connection:

```ts @{data-filename="drizzle-orm.ts"}
import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { rulesToAST } from '@casl/ability/extra';
import { createDrizzleInterpreter } from '@ucast/sql/drizzle-orm/v0.x';
import type { Action, AppAbility } from './defineAbilityFor.ts';

export const articles = pgTable('articles', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: text('title').notNull(),
  authorId: integer('author_id').notNull(),
  published: boolean('published').notNull().default(false),
  archived: boolean('archived').notNull().default(false),
});

export type Article = typeof articles.$inferSelect;

const toDrizzleSQL = createDrizzleInterpreter({
  schema: {
    // map CASL's subject type to drizzle table but not strictly required
    Article: articles
  }
});

export async function findAccessibleArticles(
  db: NodePgDatabase,
  ability: AppAbility,
  action: Action = 'read',
): Promise<Article[]> {
  const ast = rulesToAST(ability, action, 'Article');
  if (ast === null) return []; // has no access

  const query = db.select().from(articles);

  if (ast.operator === 'and' && Array.isArray(ast.value) && ast.value.length === 0) {
    // has non-conditional access
    return query;
  }

  return query.where(toDrizzleSQL(ast, 'Article'));
}
```

The interpreter returns a native Drizzle SQL predicate. It maps `authorId` to `author_id` using the table definition, and Drizzle binds the values when executing the query. Then we can do:

```ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { defineAbilityFor } from './defineAbilityFor.ts';
import { findAccessibleArticles } from './drizzle-orm.ts';

const pool = new Pool();
const db = drizzle(pool);
const ability = defineAbilityFor({ id: 42 });

try {
  const articles = await findAccessibleArticles(db, ability);
  console.log(articles);
} finally {
  await pool.end();
}
```

## Supported conditions

Use conditions supported by both your ability's conditions matcher and the SQL interpreter. For example, equality, comparisons, membership, and logical operators can be translated into SQL. [Custom conditions matchers](https://casl.js.org/v7/en/advanced/customize-ability#custom-conditions-matcher-implementation) can also work with `@ucast/sql` if they expose a UCAST-compatible AST whose operators have SQL interpreters.

> SQL uses three-valued logic for nullable columns. In particular, negating a comparison does not include rows where that column is `NULL`. Define explicit rules for nullable values when needed and check them against your database schema.

For relation conditions, column mappings, custom operators, and other SQL dialects, see the [@ucast/sql documentation](https://github.com/stalniy/ucast/tree/main/packages/sql). Relation queries require suitable metadata and condition operators.
