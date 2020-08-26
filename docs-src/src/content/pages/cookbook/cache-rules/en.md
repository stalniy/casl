---
title: Cache abilities
categories: [cookbook]
order: 20
meta:
  keywords: ~
  description: ~
---

> This recipe targets backend developers. We use [express](https://expressjs.com/) library in this guide, so its knowledge (or knowledge of similar framework) is required.

## The issue

It takes considerable amount of time or requires additional roundtrip to the database to construct an `Ability` instance.

Let's consider an example where user can manage own devices but **devices doesn't have** a reference to the owner. In such cases, we need to fetch all device ids in order to create an `Ability`:

```ts @{data-filename="defineAbility.ts"}
import { AbilityBuilder, Ability, Abilities, AbilityClass } from '@casl/ability';
import { getDevicesOf } from '../services/device';

export type AppAbility = Ability<Abilities>;
const AppAbility = Ability as AbilityClass<AppAbility>;

export async function defineRulesFor(user) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  const devices = await getDevicesOf(user);
  const ids = devices.map(device => device.id);

  can('read', 'Device', { id: { $in: ids } });
  // other rules

  return rules;
}

export async function defineAbilityFor(user) {
  const rules = await defineRulesFor(user);
  return new AppAbility(rules);
}
```

> The underlying database is not important for this guide. The same principles works for any other database system.

## The solution

To speed things up, you can cache creation of the ability instance.

## Demo

There are several ways to do this:

> Make sure that you wrap all async express middlewares in try/catch as express 4.x doesn't support `Promise` rejections. We don't do this in the examples below for the sake of simplicity.

### In memory LRU cache

[LRU cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_.28LRU.29) is a type of cache which discards least recently used entries, hence allows to store abilities for the most active users, that users who generate the highest load on your system.

> There is quite popular [lru-cache](https://www.npmjs.com/package/lru-cache) Node.js package which we will use in this guide but you can use any other implementation the same way.

So, let's create a middleware that defines `Ability` instance of `Request` object:

```ts @{data-filename="provideAbility.ts"}
import LruCache from 'lru-cache';
import { defineAbilityFor } from './defineAbility';

// store abilities of 1000 most active users
export const ABILITIES_CACHE = new LruCache(1000);

export async function provideAbility(req, res, next) {
  if (ABILITIES_CACHE.has(req.user.id)) {
    req.ability = ABILITIES_CACHE.get(req.user.id);
  } else {
    req.ability = await defineAbilityFor(req.user);
    ABILITIES_CACHE.set(req.user.id, req.ability);
  }

  next();
}
```

Now we can use this middleware to provide `Ability` instance for a particular user and check its permissions:

```ts @{data-filename="boot.ts"}
import { provideAbility } from './provideAbility';
import express from 'express';

const app = express();

// app configuration and other middlewares

app.use(provideAbility);

app.listen(3000, () => console.log('app is listening on http://localhost:3000'));
```

> Don't forget to invalidate cache when user adds or removes devices

### In session storage

If the application uses stored sessions and [LRU cache](#in-memory-lru-cache) doesn't satisfy your needs, you can store `Ability` rules in user's session (e.g., Redis, Memcached). Why do we store rules and not `Ability` instance? Because session storage serializes object before storing it. Rules are easily serializable and `Ability` instance is not, but can be created from rules.

Sessions in express usually are implemented with help of [express-session](https://www.npmjs.com/package/express-session) and [connect-redis](https://www.npmjs.com/package/connect-redis). We will do it the same way.

So, the only thing which is left is to implement `provideAbility` middleware that saves rules for a particular user in his session storage. Pay attention that we use `defineRulesFor` and not `defineAbilityFor` function:

```ts @{data-filename="provideAbility.ts"}
import { Ability, Abilities } from '@casl/ability';
import { defineRulesFor } from './defineAbility';

export async function provideAbility(req, res, next) {
  let rules = req.session.abilityRules;

  if (!req.session.abilityRules) {
    rules = await defineRulesFor(req.user);
    req.session.abilityRules = rules
  }

  req.ability = new Ability<Abilities>(rules);
  next();
}
```

And make sure that you correctly configure express-session in your `app.ts` file. It should be something like this:

```ts @{data-filename="app.ts"}
import { provideAbility } from './provideAbility';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import createRedisStore from 'connect-redis';

const app = express();
const RedisStore = createRedisStore(session);

app.use(session({
  store: new RedisStore({ client: redis.createClient() }),
  secret: 'my app session secret',
}));

// app configuration and other middlewares

app.use(provideAbility);
```

### In JWT token payload

If the app uses stateless [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) tokens, you can embed the rules into its payload:

```ts @{data-filename="login.ts"}
import jwt from 'jsonwebtoken';
import { defineRulesFor } from './defineAbility';

export async function login(req, res) {
  const token = jwt.sign({
    id: req.user.id,
    rules: await defineRulesFor(req.user)
  }, 'secret', { expiresIn: '1d' })

  res.send({ token })
}
```

And implement `provideAbility` middleware that creates ability out of jwt token which is provided by client in `Authorization` header:

```ts @{data-filename="provideAbility.ts"}
import { Ability, Abilities } from '@casl/ability';
import jwt from 'jsonwebtoken';
import { defineRulesFor } from './defineAbility';

export async function provideAbility(req, res, next) {
  try {
    const token = req.headers.authorization;
    const { rules } = jwt.verify(token, req.app.get('jwtSecret'));

    req.ability = new Ability<Abilities>(rules);
    next();
  } catch (error) {
    next(error);
  }
}
```

> You can use `packRules` and `unpackRules` to minimize rules payload size in 2 times. Check the [API docs of @casl/ability/extra](../../api/casl-ability-extra#pack-rules) for details

## When to avoid

There are few cases when you should avoid caching:

1. The amount of abilities is small.
2. The requests to the database are cached in service layer.
3. Your permissions are dynamic and it makes hard to keep cache in sync with the datastore state.
4. You can rethink domain model to simplify permissions logic (denormalize some entities or add additional foreign keys).

## Alternative ways

Another way is to rethink domain (or data) model, so that you can build abilities from the information which you load for every request (e.g., completely on `user`'s details). In the case described in [The issue](#the-issue), we could add `userId` field to `Device` model and that would make things work fast without additional caching.
