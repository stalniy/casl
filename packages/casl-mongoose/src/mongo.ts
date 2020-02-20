import { AnyAbility, AbilityParameters, RuleOf } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery<T extends AnyAbility>(rule: RuleOf<T>) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

export function toMongoQuery<T extends AnyAbility>(
  ability: T,
  subject: AbilityParameters<T>['subject'],
  action?: AbilityParameters<T>['action']
) {
  const typedAction = action || 'read' as AbilityParameters<T>['action'];
  return rulesToQuery(ability, typedAction, subject, convertToMongoQuery);
}
