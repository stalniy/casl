---
title: "@casl/ability/extra API"
categories: [api]
order: 15
meta:
  keywords: ~
  description: ~
---

## rulesToQuery

This is a helper iterator function that allows to convert permissions into database query.

* **Parameters**:
  * `ability: TAbility`
  * `action: string`
  * `subjectType: SubjectType`
  * `convert: (rule: RuleOf<TAbility>) => object`
* **Returns** `null` if user is not allowed to run specified `action` on specified `subject`, otherwise returns an object of optional `$and` and `$or` fields. `$and` contains results of transformation from inverted rules and `$or` contains results of direct rules.
* **See also**: [Ability to database query](../../advanced/ability-to-database-query), [@casl/mongoose](../../package/casl-mongoose#accessible-records-plugin)

## rulesToAST

This function converts rules into [ucast](github.com/stalniy/ucast) AST.

* **Parameters**:
  * `ability: TAbility`
  * `action: string`
  * `subjectType: SubjectType`
* **Returns** `null` if user is not allowed to run specified `action` on specified `subject`, otherwise returns optimized AST.

## rulesToFields

This is a helper function that allows to extract field values from `Ability` conditions. This may be useful to get default values for a new object based on permissions.

* **Parameters**:
  * `ability: TAbility`
  * `action: string`
  * `subjectType: SubjectType`
* **Returns** an object with values from conditions.
* **Usage**\
  This function only processes values of conditions that are not objects. Makes sure to call `ability.can` on resulting object:

  ```ts
  import { defineAbility } from '@casl/ability';
  import { rulesToFields } from '@casl/ability/extra';

  const ability = defineAbility((can) => {
    can('read', 'Article', { authorId: 1 });
    can('read', 'Article', { public: true });
    can('read', 'Article', { title: { $regex: /^\[Draft\]/i } });
  });

  const defaultValues = rulesToFields(ability, 'read', 'Article');
  console.log(defaultValues); // { public: true, authorId: 1 }

  const newArticle = {
    ...defaultValues,
    title: '...',
    description: '...'
  };
  ```

## permittedFieldsOf

This function returns fields of `subject` which specified `action` may be applied on. Accepts single generic parameter `TAbility` (`T` to be short).

* **Parameters**
  * `ability: T`
  * `action: string`
  * `subject: SubjectType`
  * `options?: PermittedFieldsOptions<T>`
* **Returns** an array of fields
* **Usage**\
  This function is especially useful for backend API because it allows to filter out from request only permittedFields (e.g., in [expressjs](https://expressjs.com/) middleware)

  ```ts
  import { defineAbility } from '@casl/ability';
  import { permittedFieldsOf } from '@casl/ability/extra';
  import { pick, isEmpty } from 'lodash';

  const ability = defineAbility((can) => {
    can('read', 'Article');
    can('update', 'Article', ['title', 'description']);
  });

  app.patch('/api/articles/:id', async (req, res) => {
    const updatableFields = permittedFieldsOf(ability, 'update', 'Article');
    const changes = pick(req.body, updatableFields);

    if (isEmpty(changes)) {
      res.status(400).send({ message: 'Nothing to update' });
      return;
    }

    await updateArticleById(id, changes);
  });
  ```

  So, now even if user try to send fields that he is not allowed to update, `permittedFieldsOf` will filter them out!

* **See also**: [Restricting fields access](../../guide/restricting-fields), [@casl/mongoose](../../package/casl-mongoose#accessible-fields-plugin)

## packRules

This function **reduces serialized rules size in 2 times** (in comparison to its raw representation), by converting objects to arrays. This is useful if you plan to cache rules in [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) token.

> Don’t use directly result returned by packRules, its format is not public and may change in future versions.

* **Parameters**:
  * `rules: TRawRule[]`
  * `packSubject?: (subjectType: SubjectType) => string` - we need to pass this parameter only if we use classes as subject types. It should return subject type's string representation.
* **Returns** `PackRule<TRawRule>[]`
* **Usage**

  ```ts
  import { packRules } from '@casl/ability/extra';
  import jwt from 'jsonwebtoken';
  import { defineRulesFor } from '../services/appAbility';

  app.post('/session', (req, res) => {
    const token = jwt.sign({
      id: req.user.id,
      rules: packRules(defineRulesFor(req.user))
    }, 'jwt secret', { expiresIn: '1d' });

    res.send({ token });
  });
  ```
* **See also**: [Cache abilities](../../cookbook/cache-rules), [`unpackRules`](#unpack-rules)

## unpackRules

This function is unpacks rules previously packed by [`packRules`](#pack-rules), so they can be consumed by `Ability` instance.

* **Parameters**:
  * `rules: PackRule<TRawRule>[]`
  * `unpackSubject?: (type: string) => SubjectType` - we need to pass this parameter only if we use classes as subject types. It should return subject type out of its string representation.
* **Returns** `TRawRule[]`
* **Usage**\
  If backend sends use packed rules, we need to use `unpackRules` before passing them into `Ability` instance:

  ```ts
  import { unpackRules } from '@casl/ability/extra'
  import jwt from 'jsonwebtoken';
  import ability from '../services/appAbility';

  export default class LoginComponent {
    login(params) {
      return http.post('/session')
        .then((response) => {
          const token = jwt.decode(response.token);
          ability.update(unpackRules(token.rules))
        });
    }
  }
  ```
* **See also**: [Cache abilities](../../cookbook/cache-rules), [`packRules`](#pack-rules)
