# CASL Prisma

[![@casl/prisma NPM version](https://badge.fury.io/js/%40casl%2Fprisma.svg)](https://badge.fury.io/js/%40casl%2Fprisma)
[![](https://img.shields.io/npm/dm/%40casl%2Fprisma.svg)](https://www.npmjs.com/package/%40casl%2Fprisma)
[![CASL Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stalniy-casl/casl)

This package allows to define [CASL] permissions on [Prisma] models using Prisma `WhereInput`. And that brings a lot of power in terms of permission management in SQL world:

1. We can use Prisma Query to define permissions, no need to learn MongoDB query language anymore.
2. Additionally, we can ask our SQL database questions like: "Which records can be read?" or "Which records can be updated?".

## Installation

```sh
npm install @casl/prisma @casl/ability
# or
yarn add @casl/prisma @casl/ability
# or
pnpm add @casl/prisma @casl/ability
```

## Usage

First of all, you need to add custom casl generator to your Prisma schema. The main purpose of this generator is to expose Prisma types to CASL and allow to provide [custom path for prisma generated types](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#using-a-custom-output-path):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

generator caslAdapter {
  provider = "node @casl/prisma/generator.js" // <--- important to add this
  clientLib = "@my-custom/prisma-client" // optional and by default equals to @prisma/client
}

model User {
  id     Int     @id
  name   String
}
```

Now we are ready to code! This package is a bit different from all others because it provides a custom `PrismaAbility` class that is configured to check permissions using Prisma [WhereInput](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#where):

```ts
import { User, Post, Prisma } from '@prisma/client';
import { AbilityClass, AbilityBuilder, subject } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';

type AppAbility = PrismaAbility<[string, Subjects<{
  User: User,
  Post: Post
}>]>;
const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
const { can, cannot, build } = new AbilityBuilder(AppAbility);

can('read', 'Post', { authorId: 1 });
cannot('read', 'Post', { title: { startsWith: '[WIP]:' } });

const ability = build();
ability.can('read', 'Post');
ability.can('read', subject('Post', { title: '...', authorId: 1 })));
```

> See [CASL guide](https://casl.js.org/v5/en/guide/intro) to learn how to define abilities. Everything is the same except of conditions language.

### Note on subject helper

Because Prisma returns DTO objects without exposing any type information on it, we need to use `subject` helper to provide that type manually, so CASL can understand what rules to apply to passed in object.

Unfortunately, there is no easy way to automate this, except of adding additional column to all models. For more details, check [this issue](https://github.com/prisma/prisma/issues/5315).

> To get more details about object type detection, please read [CASL Subject type detection](https://casl.js.org/v5/en/guide/subject-type-detection)

### Note on Prisma Query runtime interpreter

`@casl/prisma` uses [ucast](https://github.com/stalniy/ucast) to interpret Prisma [WhereInput](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#where) in JavaScript runtime. However, there are few caveats:
- equality of JSON columns is not implemented
- equality of array/list columns is not implemented (however operators like `has`, `hasSome` and `hasEvery` should be more than enough)
- when defining conditions on relation, always specify one of operators (`every`, `none`, `some`, `is` or `isNot`)

Interpreter throws a `ParsingQueryError` in cases it receives invalid parameters for query operators or if some operation is not supported.

## Finding Accessible Records

One nice feature of [Prisma] and [CASL] integration is that we can get all records from the database our user has access to. To do this, just use `accessibleBy` helper function:

```ts
// ability is a PrismaAbility instance created in the example above

const accessiblePosts = await prisma.post.findMany({
  where: accessibleBy(ability).Post
});
```

That function accepts `PrismaAbility` instance and `action` (defaults to `read`),  returns an object with keys that corresponds to Prisma model names and values being aggregated from permission rules `WhereInput` objects.

**Important**: in case user doesn't have ability to access any posts, `accessibleBy` throws `ForbiddenError`, so be ready to catch it!

To combine this with business logic conditions, just use `AND`:

```ts
const accessiblePosts = await prisma.post.findMany({
  where: {
    AND: [
      accessibleBy(ability).Post,
      { /* business related conditions */ }
    ]
  }
})
```

## TypeScript support

The package is written in TypeScript what provides comprehensive IDE hints and compile time validation.

> Makes sure to call `prisma generate`.  `@casl/prisma` uses Prisma generated types, so if client is not generated nothing will work.

Additionally, there are several helpers that makes it easy to work with Prisma and CASL:

### PrismaQuery

It's a generic type that provides `Prisma.ModelWhereInput` in generic way. We need to pass inside a named model:

```ts
import { User } from '@prisma/client';
import { Model } from '@casl/prisma';

// almost the same as Prisma.UserWhereInput except that it's a higher order type
type UserWhereInput = PrismaQuery<Model<User, 'User'>>;
```

### Model

Just gives a name to a model. That name is stored using `ForcedSubject<TName>` helper from `@casl/ability`. To use a separate column or another strategy to name models, don't use this helper because it only works in combination with `subject` helper.

### Subjects

Creates a union of all possible subjects out of passed in object:

```ts
import { User } from '@prisma/client';
import { Subjects } from '@casl/prisma';

type AppSubjects = Subjects<{
  User: User
}>; // 'User' | Model<User, 'User'>
```

## Want to help?

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on guidelines for [contributing].

If you'd like to help us sustain our community and project, consider [to become a financial contributor on Open Collective](https://opencollective.com/casljs/contribute)

> See [Support CASL](https://casl.js.org/v5/en/support-casljs) for details

## License

[MIT License](http://www.opensource.org/licenses/MIT)

[contributing]: https://github.com/stalniy/casl/blob/master/CONTRIBUTING.md
[Prisma]: https://prisma.io/
[CASL]: https://github.com/stalniy/casl
