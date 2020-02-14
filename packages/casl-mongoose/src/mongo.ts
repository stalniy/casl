import { Ability, Rule, Subject, MongoQuery } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery<C extends MongoQuery>(rule: Rule<string, Subject, C>) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

export function toMongoQuery<
  A extends string,
  S extends Subject,
  C extends MongoQuery
>(ability: Ability<A, S, C>, subject: S, action: A | 'read' = 'read') {
  return rulesToQuery(ability, action, subject, convertToMongoQuery);
}
