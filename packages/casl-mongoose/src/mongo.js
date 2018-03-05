import { rulesToQuery } from '@casl/ability/query';

function ruleToMongoQuery(rule) {
  return rule.inverted ? { $nor: [rule.conditions] } : rule.conditions;
}

export function toMongoQuery(rules) {
  return rulesToQuery(rules, ruleToMongoQuery);
}
