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
  const rules = ability.rulesFor(action, this.model || this);

  if (rules.length) {
    return this.find(toMongoQuery(rules));
  }

  return emptyQuery(this.find());
}

export function mongoosePlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
