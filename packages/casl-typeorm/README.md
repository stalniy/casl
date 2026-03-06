# CASL TypeORM

[![@casl/typeorm NPM version](https://badge.fury.io/js/%40casl%2Ftypeorm.svg)](https://badge.fury.io/js/%40casl%2Ftypeorm)
[![](https://img.shields.io/npm/dm/%40casl%2Ftypeorm.svg)](https://www.npmjs.com/package/%40casl%2Ftypeorm)
[![Support](https://img.shields.io/badge/Support-github%20discussions-green?style=flat&link=https://github.com/stalniy/casl/discussions)](https://github.com/stalniy/casl/discussions)

This package allows to define [CASL] permissions on [TypeORM] entities using a conditions syntax inspired by TypeORM's `FindOptionsWhere`. And that brings a lot of power in terms of permission management in SQL world:

1. We can use a familiar query language to define permissions, no need to learn MongoDB query language anymore.
2. Additionally, we can ask our SQL database questions like: "Which records can be read?" or "Which records can be updated?".

## Installation

```sh
npm install @casl/typeorm @casl/ability
# or
yarn add @casl/typeorm @casl/ability
# or
pnpm add @casl/typeorm @casl/ability
```

## Usage

This package provides a custom `createTypeormAbility` factory function that is configured to check permissions using a conditions language mapped to TypeORM operators:

```ts
import { PureAbility, AbilityBuilder, subject } from '@casl/ability';
import { createTypeormAbility, TypeormQuery, Subjects } from '@casl/typeorm';

interface User {
  id: number;
  firstName: string;
  age: number;
}

interface Post {
  id: number;
  title: string;
  authorId: number;
  status: string;
}

type AppAbility = PureAbility<[string, Subjects<{
  User: User,
  Post: Post
}>], TypeormQuery>;
const { can, cannot, build } = new AbilityBuilder<AppAbility>(createTypeormAbility);

can('read', 'Post', { authorId: 1 });
cannot('read', 'Post', { status: 'draft' });

const ability = build();
ability.can('read', 'Post');
ability.can('read', subject('Post', { title: '...', authorId: 1, status: 'published' } as Post));
```

> See [CASL guide](https://casl.js.org/v6/en/guide/intro) to learn how to define abilities. Everything is the same except of conditions language.

### Supported operators

Conditions are plain JSON objects where field values can use these operators:

| Operator | Description | Example |
|---|---|---|
| *(default)* | Equality | `{ id: 1 }` |
| `equals` | Explicit equality | `{ id: { equals: 1 } }` |
| `not` | Not equal / negated sub-query | `{ status: { not: 'draft' } }` |
| `in` | Value in array | `{ id: { in: [1, 2, 3] } }` |
| `notIn` | Value not in array | `{ id: { notIn: [1, 2] } }` |
| `lt` | Less than | `{ age: { lt: 18 } }` |
| `lte` | Less than or equal | `{ age: { lte: 65 } }` |
| `gt` | Greater than | `{ age: { gt: 18 } }` |
| `gte` | Greater than or equal | `{ age: { gte: 21 } }` |
| `like` | SQL LIKE pattern | `{ name: { like: '%john%' } }` |
| `ilike` | Case-insensitive LIKE | `{ name: { ilike: '%john%' } }` |
| `between` | Between two values | `{ age: { between: [18, 65] } }` |
| `isNull` | Is null check | `{ deletedAt: { isNull: true } }` |
| `arrayContains` | Array contains all | `{ tags: { arrayContains: ['a'] } }` |
| `arrayContainedBy` | Array contained by | `{ tags: { arrayContainedBy: ['a', 'b'] } }` |
| `arrayOverlap` | Arrays share elements | `{ tags: { arrayOverlap: ['a', 'b'] } }` |

Compound operators `AND`, `OR`, and `NOT` are also available at the top level:

```ts
can('read', 'Post', {
  OR: [
    { authorId: 1 },
    { status: 'published' }
  ]
});
```

### Note on subject helper

Because TypeORM query results are plain objects without type information, we need to use `subject` helper to provide that type manually, so CASL can understand what rules to apply to passed in object.

> To get more details about object type detection, please read [CASL Subject type detection](https://casl.js.org/v6/en/guide/subject-type-detection)

### Note on conditions runtime interpreter

`@casl/typeorm` uses [ucast](https://github.com/stalniy/ucast) to interpret conditions in JavaScript runtime. However, there are few caveats:
- `like` and `ilike` are interpreted using regex conversion (`%` → `.*`, `_` → `.`) which covers common patterns but not SQL-specific escaping
- equality of JSON columns is not implemented
- equality of array/list columns is not implemented (use `arrayContains`, `arrayContainedBy`, or `arrayOverlap` instead)

Interpreter throws a `ParsingQueryError` in cases it receives invalid parameters for query operators or if some operation is not supported.

## Finding Accessible Records

One nice feature of [TypeORM] and [CASL] integration is that we can get all records from the database our user has access to. To do this, just use `accessibleBy` helper function:

```ts
import { accessibleBy } from '@casl/typeorm';

// ability is created in the example above
const accessiblePosts = await postRepository.find({
  where: accessibleBy(ability).Post
});
```

That function accepts `Ability` instance and `action` (defaults to `read`), returns an object with keys that corresponds to entity names and values being `FindOptionsWhere` compatible objects aggregated from permission rules.

**Important**: in case user doesn't have ability to access any posts, `accessibleBy` throws `ForbiddenError`, so be ready to catch it!

To combine this with business logic conditions, use an array (TypeORM's OR syntax) or spread into the same object (AND):

```ts
const accessiblePosts = await postRepository.find({
  where: {
    ...accessibleBy(ability).Post,
    /* additional business conditions */
  }
});
```

For more complex combinations, you can use TypeORM's `And()` or build QueryBuilder queries:

```ts
import { And } from 'typeorm';

// Using QueryBuilder
const posts = await postRepository
  .createQueryBuilder('post')
  .where(accessibleBy(ability).Post)
  .andWhere('post.createdAt > :date', { date: someDate })
  .getMany();
```

### How accessibleBy converts rules

- **Non-inverted rules** (`can`) are combined with OR logic (TypeORM's `where: [...]` array)
- **Inverted rules** (`cannot`) have each field wrapped with TypeORM's `Not()` operator and merged into every OR branch
- Operator values (e.g. `{ gt: 18 }`) are converted to the corresponding TypeORM `FindOperator` (e.g. `MoreThan(18)`)

## TypeScript support

The package is written in TypeScript what provides comprehensive IDE hints and compile time validation.

Additionally, there are several helpers that make it easy to work with TypeORM and CASL:

### TypeormQuery

A type alias for the conditions format used by `@casl/typeorm`:

```ts
import { TypeormQuery } from '@casl/typeorm';
```

### Model

Gives a name to an entity type. That name is stored using `ForcedSubject<TName>` helper from `@casl/ability`. To use a separate column or another strategy to name entities, don't use this helper because it only works in combination with `subject` helper.

### Subjects

Creates a union of all possible subjects out of passed in object:

```ts
import { Subjects } from '@casl/typeorm';

type AppSubjects = Subjects<{
  User: User,
  Post: Post
}>; // 'User' | Model<User, 'User'> | 'Post' | Model<Post, 'Post'>
```

To support rule definition for `all`, just add it explicitly:

```ts
type AppSubjects = 'all' | Subjects<{
  User: User,
  Post: Post
}>;

type AppAbility = PureAbility<[string, AppSubjects], TypeormQuery>;
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v6/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[TypeORM]: https://typeorm.io/
[CASL]: https://github.com/stalniy/casl
