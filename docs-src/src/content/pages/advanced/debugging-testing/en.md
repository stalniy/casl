---
title: Debugging and testing
categories: [advanced]
order: 70
meta:
  keywords: ~
  description: ~
---

Sometimes it may be a bit complicated to understand why some action in the app is forbidden for a particular user. In this guide, you will learn common pitfalls and ways to investigate the underlying reasons. Let's start.

## Debugging

`Ability`'s `can` and `cannot` methods return boolean result and doesn't explain the reason or which rule forbids the action. To get the rule which allows or forbids an action on a subject, you can use `relevantRuleFor` method. It accepts the same arguments as `can`:

```js
import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article');
});

const rule = ability.relevantRuleFor('read', 'Article'); // instance of internal `Rule` class
```

You can use `rule.conditions` or `rule.fields` fields to understand which rule causes the unexpected result. `relevantRuleFor` returns `null` if rule cannot be found, this is the case when you check permissions on non-existing action or subject:

```js
const rule = ability.relevantRuleFor('update', 'Article'); // null
```

This method is especially helpful when you use combination of direct rules with conditions and inverted rules:

```js @{data-filename="defineAbility.js"}
import { defineAbility, subject } from '@casl/ability';

export const article = subject.bind(null, 'Article');
export const user = { id: 1 };
export const ability = defineAbility((can, cannot) => {
  can('read', 'Article', { authorId: user.id });
  cannot('read', 'Article', { private: true })
});
```

> For simplicity, I will use `subject` helper instead of a class to create subjects with bound type. You can read more about other ways to do it in [Subject type detection](../../guide/subject-type-detection)

Now let's check:

```js
import { user, ability, article } from './defineAbility';

const rule = ability.relevantRuleFor('read', article({ authorId: user.id }));
console.log(rule.conditions); // { authorId: 1 }

const forbiddenRule = ability.relevantRuleFor('read', article({ private: true }));
console.log(forbiddenRule.conditions); // { private: true }

const anotherRule = ability.relevantRuleFor('read', article({ authorId: 2 }));
console.log(anotherRule); // null, no matching rule
```

Another way to understand why the action is forbidden is to use [Forbidden reasons](../../guide/intro#forbidden-reasons) feature. It allows to assign a user friendly explanation to rule

> Forbidden reasons doesn't support direct rules. See [#264](https://github.com/stalniy/casl/issues/264) to track the status of this feature

```js @{data-filename="defineAbilityWithReasons.js"}
import { defineAbility, subject } from '@casl/ability';

export const article = subject.bind(null, 'Article');
export const ability = defineAbility((can) => {
  can('read', 'Article');
  cannot('read', 'Article', { private: true }).because('Private content is protected by law');
});

const rule = ability.relevantRuleFor('read', 'Article'); // instance of internal `Rule` class
```

We can use the same `relevantRuleFor` method but check `rule.reason` field instead:

```js
import { ability, article } from './defineAbilityWithReasons';

const rule = ability.relevantRuleFor('read', article({ private: true }));
console.log(rule.reason); // Private content is protected by law
```

## Testing

`Ability` instance is pure in terms of functional programming. It means that for the same rules, its `can` method returns always the same result. That's why, there is no big profit in testing CASL permissions, instead you should test rule distribution logic. **This sounds correct, but only at the first sight**. Let's consider an example:

```js @{data-filename="defineAbility.js"}
import { Ability, AbilityBuilder, subject } from '@casl/ability';

export const article = subject.bind(null, 'Article');

/**
 * This function is responsible for rule distribution logic.
 * And we need to test it, not ability checks!
 */
export function defineRulesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can('manage', 'all');
  } else {
    can('read', 'Article');
    cannot('read', 'Article', { private: true });
  }

  return rules;
}

export const defineAbilityFor = user => new Ability(defineRulesFor(user));
```

Now we want to ensure that admin users can do anything and other can only read non-private articles. Using [mocha] + [chai] or [jest] we can do it (we will use mocha and chai):

```js
import { defineRulesFor } from './defineAbility';

describe('Permissions', () => {
  let user;

  describe('when user is an admin', () => {
    beforeEach(() => {
      user = { isAdmin: true };
    });

    it('can do anything', () => {
      expect(defineRulesFor(user)).to.deep.equal([
        { action: 'manage', subject: 'all' }
      ]);
    });
  });

  describe('when user is a regular user', () => {
    beforeEach(() => {
      user = { isRegular: true };
    });

    it('can read non private article', () => {
      expect(defineRulesFor(user)).to.deep.contain([
        { action: 'read', subject: 'Article' },
        { action: 'read', subject: 'Article', conditions: { private: true }, inverted: true }
      ]);
    });
  });
});
```

Do you see the issue? **We've just tested implementation details and this is bad!** Why?

Rules logic is very expressive and you can achieve the same results using a different combination of rules. For example "user can read non private articles" can be expressed in another way:

```js
import { AbilityBuilder } from '@casl/ability';

export function defineRulesFor(user) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can('manage', 'all');
  } else {
    can('read', 'Article', { private: false });
  }

  return rules;
}
```

And now we have only 1 direct rule that allows to read non-private articles! So, we have the same permissions, the same set of supported cases but our tests are **red** and that's bad. So, if we test rules' distribution logic, very likely we will need to fix old tests when we decide to change rules for some reason.

Permissions logic is quite important, so the correct way to test it is to test particular cases. This saves your time from fixing tests that relies too much on implementation details and will make sure that the next version of CASL won't break your permission system (if it does please [create an issue](https://github.com/stalniy/casl/issues/new)). Eventually tests should look like this:

```js
import { defineAbilityFor, article } from './defineAbility';

describe('Permissions', () => {
  let user;
  let ability;

  describe('when user is an admin', () => {
    beforeEach(() => {
      user = { isAdmin: true };
      ability = defineAbilityFor(user);
    });

    it('can do anything', () => {
      expect(ability.can('manage', 'all')).to.be.true;
    });
  });

  describe('when user is a regular user', () => {
    beforeEach(() => {
      user = { isRegular: true };
      ability = defineAbilityFor(user);
    });

    it('can read non private article', () => {
      expect(ability.can('read', 'Article')).to.be.true;
      expect(ability.can('read', article({ title: 'test' }))).to.be.true;
      expect(ability.can('read', article({ title: 'test', private: false }))).to.be.true;
      expect(ability.can('read', article({ private: true }))).to.be.false;
    });
  });
});
```

[mocha]: https://mochajs.org/
[chai]: http://chaijs.com/
[jest]: https://jestjs.io/
