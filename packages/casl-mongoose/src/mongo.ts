import { AnyMongoAbility } from '@casl/ability';
import { AbilityQuery, rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule: AnyMongoAbility['rules'][number]) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

/**
 * @deprecated use accessibleBy instead
 *
 * Converts ability action + subjectType to MongoDB query
 */
export function toMongoQuery<T extends AnyMongoAbility>(
  ability: T,
  subjectType: Parameters<T['rulesFor']>[1],
  action: Parameters<T['rulesFor']>[0] = 'read'
): AbilityQuery | null {
  return rulesToQuery(ability, action, subjectType, convertToMongoQuery);
}

export interface RecordTypes {
}
type StringOrKeysOf<T> = keyof T extends never ? string : keyof T;

/**
 * Returns Mongo query per record type (i.e., entity type) based on provided Ability and action.
 * In case action is not allowed, it returns `{ $expr: false }`
 */
export function accessibleBy<T extends AnyMongoAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0] = 'read'
): Record<StringOrKeysOf<RecordTypes>, AbilityQuery> {
  return new Proxy({
    _ability: ability,
    _action: action
  }, accessibleByProxyHandlers) as unknown as Record<StringOrKeysOf<RecordTypes>, AbilityQuery>;
}

const accessibleByProxyHandlers: ProxyHandler<{ _ability: AnyMongoAbility, _action: string }> = {
  get(target, subjectType) {
    const query = rulesToQuery(target._ability, target._action, subjectType, convertToMongoQuery);
    return query === null ? { $expr: false } : query;
  }
};
