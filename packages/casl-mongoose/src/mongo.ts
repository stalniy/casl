import { Ability, Rule, AbilitySubject } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule: Rule): object {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

export function toMongoQuery(ability: Ability, subject: AbilitySubject, action: string = 'read') {
  return rulesToQuery(ability, action, subject, convertToMongoQuery);
}
