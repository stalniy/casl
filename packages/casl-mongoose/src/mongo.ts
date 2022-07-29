import { AnyMongoAbility } from '@casl/ability';
import { AbilityQuery, rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule: AnyMongoAbility['rules'][number]) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

export function toMongoQuery<T extends AnyMongoAbility>(
  ability: T,
  subjectType: Parameters<T['rulesFor']>[1],
  action: Parameters<T['rulesFor']>[0] = 'read'
): AbilityQuery | null {
  return rulesToQuery(ability, action, subjectType, convertToMongoQuery);
}
