import { rulesToQuery } from './query';

function ruleToMongoQuery(rule) {
  return rule.inverted ? { $nor: [rule.conditions] } : rule.conditions;
}

function emptyQuery(query) {
  query.exec = () => Promise.resolve(query.op === 'findOne' ? null : []);
  return query;
}

export function toMongoQuery(rules) {
  return rulesToQuery(rules, ruleToMongoQuery);
}

function accessibleBy(ability, action = 'read') {
  const rules = ability.rulesFor(action, this);
  const query = toMongoQuery(rules);

  return Object.keys(query).length > 0 ? this.find(query) : emptyQuery(this.find());
}

export function mongoosePlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
