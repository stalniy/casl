import { rulesToQuery } from './query';

function ruleToMongoQuery(rule) {
  return rule.inverted ? { $nor: [rule.conditions] } : rule.conditions;
}

function emptyQuery(query) {
  query.exec = () => Promise.resolve(query.op === 'findOne' ? null : []);
  return query;
}

function isEmpty(object) {
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      return false;
    }
  }

  return true;
}

export function toMongoQuery(rules) {
  return rulesToQuery(rules, ruleToMongoQuery);
}

function accessibleBy(ability, action = 'read') {
  const rules = ability.rulesFor(action, this.model || this);
  const query = toMongoQuery(rules);

  return isEmpty(query) ? emptyQuery(this.find()) : this.find(query)
}

export function mongoosePlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
