---
title: Ability to database query
categories: [advanced]
order: 75
meta:
  keywords: ~
  description: ~
---

Sometimes you need to restrict which records are returned from the database based on what the user is able to do in the app. `@casl/ability/extra` provides `rulesToQuery` helper function which helps to convert rules into a particular database's query. This function accepts 4 arguments:

1. An instance of `PureAbility`
2. `action` for which you want to get rules
3. `subjectType` which you plan to query
4. conversion function which takes rule as the only argument and returns database query chunk

The helper aggregates all query chunks into a single object that has `$or` and `$and` properties. Query chunk for direct rules are collected in `$or` array and inverted - in `$and` array. **This function returns `null`** if the provided ability does not allow to perform the provided action on the provided subject type.

> See [@casl/mongoose](../../package/casl-mongoose) to get details about integration with [MongoDB](https://www.mongodb.com/)

To understand the logic better let's implement **a basic helper** for [sequelize](https://sequelize.org/).

```js @{data-filename="toSequelizeQuery.js"}
const { rulesToQuery } = require('@casl/ability/extra');
const { Op } = require('sequelize');

/**
 * Tricky way to walk recursively over deeply nested object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Parameters
 */
function symbolize(query) {
  return JSON.parse(JSON.stringify(query), function keyToSymbol(key, value) {
    if (key[0] === '$') {
      const symbol = Op[key.slice(1)];
      this[symbol] = value;
      return;
    }

    return value;
  });
}

function ruleToSequelize(rule) {
  return rule.inverted ? { $not: rule.conditions } : rule.conditions;
}

function toSequelizeQuery(ability, subject, action) {
  const query = rulesToQuery(ability, action, subject, ruleToSequelize);
  return query === null ? query : symbolize(query);
}

async function accessibleBy(ability, action = 'read') {
  const query = toSequelizeQuery(ability, action, this.name);

  if (query === null) { // there is no accessible records, so no need to send query to db
    return [];
  }

  return this.findAll({
    where: query;
  });
}

module.exports = {
  toSequelizeQuery,
  accessibleBy,
};
```

In this example, we used `rulesToQuery` to iterate over rules and aggregate sequelize query. `$not` operator is used to invert the result of inverted rules' conditions. As of sequelize v6, operator aliases are removed ([sequelize#10820](https://github.com/sequelize/sequelize/issues/10820)), so we need to convert string based keys into symbols. To do so, we used a trick of stringifying and parsing JSON object with custom `reviver` argument, which detects keys that starts with `$` and replaces them with the respective symbol.

Then, we can use this function to define static method or scope in your model. Here, we will define static method because its usage looks more natural and readable than custom scope:

```js @{data-filename="Article.js"}
const { Model, DataTypes } = require('sequelize');
const { accessibleBy } = require('./toSequelizeQuery');

module.exports = (sequelize) => {
  class Article extends Model {
    static accessibleBy = accessibleBy;
  }

  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    // other columns' definitions
  }, {
    sequelize,
    modelName: Article.name,
  });

  return Article;
}
```

Now we can fetch accessible records using our static method:

```js
const { Sequelize } = require('sequelize');
const { defineAbility } = require('@casl/ability');
const defineArticle = require('./Article');

const sequelize = new Sequelize('sqlite::memory');
const Article = defineArticle(sequelize);

async function main() {
  const ability = defineAbility(can => can('read', Article, { published: true }));
  const articles = await Article.accessibleBy(ability);

  console.log(articles);
}

main().catch(console.error);
```

This implementation is basic because it doesn't support joins. See [#8](https://github.com/stalniy/casl/issues/8) to track status of SQL support in CASL.
