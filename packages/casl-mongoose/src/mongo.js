import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule) {
  return rule.inverted ? { $nor: [rule.conditions] } : rule.conditions;
}

export function toMongoQuery(ability, subject, action = 'read') {
  return rulesToQuery(ability, action, subject, convertToMongoQuery);
}
