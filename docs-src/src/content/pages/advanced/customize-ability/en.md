---
title: Customize Ability
categories: [advanced]
order: 65
meta:
  keywords: ~
  description: ~
---

CASL was built with extensibility in mind and this allows you to extend conditions with custom operators, provide custom field matchers and even use your own implementation to match conditions (e.g., using functions or [json-schema])! Let's see how

[json-schema]: https://json-schema.org/

## Extend conditions with custom operators

Thanks to [ucast](https://github.com/stalniy/ucast), it's possible to [define conditions in CASL](../../guide/conditions-in-depth) using MongoDB query language. Usually this is enough but sometimes you may want to restrict possible operators, add non-standard operator or one of those that is not included in CASL by default (e.g., [$nor]).

Let's see an example of how to add `$nor` operator. To do this, we will use `buildMongoQueryMatcher` helper function from `@casl/ability` package. It allows to add or override existing operators:

[$nor]: https://docs.mongodb.com/manual/reference/operator/query/nor/

```ts
import {
  Ability,
  AbilityBuilder,
  Abilities,
  buildMongoQueryMatcher,
} from '@casl/ability';
import { $nor, nor } from '@ucast/mongo2js';

const conditionsMatcher = buildMongoQueryMatcher({ $nor }, { nor });

export default function defineAbilityFor(user: any) {
  const { can, build } = new AbilityBuilder(Ability);

  can('read', 'Article', {
    $nor: [{ private: true }, { authorId: user.id }]
  });

  return build({ conditionsMatcher });
}
```

> We use `user: any` for the purpose of ease, you should avoid this in real apps

`buildMongoQueryMatcher` extends existing set of operators, so if you want to restrict available operators, you should not use it. For example, let's allow to use only `$eq` and `$in` operators:

```ts
import {
  Ability,
  AbilityBuilder,
  Abilities,
  MongoQueryFieldOperators,
  ConditionsMatcher,
  AbilityClass
} from '@casl/ability';
import { $in, within, $eq, eq, createFactory, BuildMongoQuery } from '@ucast/mongo2js';

type RestrictedMongoQuery<T> = BuildMongoQuery<T, Pick<MongoQueryFieldOperators, '$eq' | '$in'>>;
const conditionsMatcher: ConditionsMatcher<RestrictedMongoQuery> = createFactory({ $in, $eq }, { in: within, eq });
type AppAbility = Ability<Abilities, RestrictedMongoQuery>;
const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineAbilityFor(user: any) {
  const { can, build } = new AbilityBuilder(AppAbility);

  can('read', 'Article', { authorId: user.id } });
  can('read', 'Article', { status: { $in: ['draft', 'published'] } });

  return build({ conditionsMatcher });
}
```

> Read [@ucast/mongo2js docs](https://github.com/stalniy/ucast/tree/master/packages/mongo2js#custom-operator) page to learn how to create custom operators.

By restricting operators, you not only disallow other developers to use more complex conditions but also make your frontend bundle size smaller (thanks to bundlers with tree-shaking support).

## Custom conditions matcher implementation

If you want to implement custom conditions matcher, you should use `PureAbility` class instead of `Ability`. `PureAbility` is a parent class for `Ability`, the only difference between them is that `Ability` has restriction on `Conditions` generic parameter and has default values for `conditionsMatcher` and `fieldMatcher` options.

> The prefix "Pure" has nothing to do with functional programming. It just means this class has no predefined configuration.

Conditions matcher is a factory function that accepts `rule.conditions` and returns a function that accepts an object and returns boolean. All these restrictions on conditions matcher is enforced by `ConditionsMatcher` generic type which you can import from `@casl/ability`.

Let's implement the matcher that allows to use a function as conditions matcher:

```ts
import {
  PureAbility,
  AbilityBuilder,
  AbilityTuple,
  MatchConditions,
  AbilityClass
} from '@casl/ability';

type AppAbility = PureAbility<AbilityTuple, MatchConditions>;
const AppAbility = PureAbility as AbilityClass<AppAbility>;
const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;

export default function defineAbilityFor(user: any) {
  const { can, build } = new AbilityBuilder(AppAbility);

  can('read', 'Article', ({ authorId }) => authorId === user.id);
  can('read', 'Article', ({ status }) => ['draft', 'published'].includes(status));

  return build({ conditionsMatcher: lambdaMatcher });
}
```

> Conditions matchers can be only synchronous!

We don't recommend to use functions for matching logic if you need to serialize rules or convert them to a database query. The default matcher should cover majority of cases.

## Custom field matcher

Field matcher is responsible for matching fields passed as 3rd argument to `can` method of `Ability` instance. It is a factory function that returns a function which accepts field and returns boolean. This logic is enforced by `FieldMatcher` type from `@casl/ability`.

> We cannot imagine a reasonable case to override field matching logic, [default implementation](../../guide/restricting-fields) should be more than enough.

You can use this to reduce your bundle size or enforce simpler logic. For example, let's implement simple field matcher that doesn't support field patterns:

```ts
import { Ability, AbilityBuilder, FieldMatcher } from '@casl/ability';

export const fieldMatcher: FieldMatcher = fields => field => fields.includes(field);

export default function defineAbilityFor(user: any) {
  const { can, build } = new AbilityBuilder(Ability);

  can('read', 'Article', ['title', 'content']);

  return build({ fieldMatcher });
}
```
