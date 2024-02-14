import { AnyMongoAbility, Generics, SubjectType } from '@casl/ability';
import { ToAbilityTypes } from '@casl/ability/dist/types/types';
import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule: AnyMongoAbility['rules'][number]) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

export const EMPTY_RESULT_QUERY = { $expr: { $eq: [0, 1] } };
export class AccessibleRecords<T extends SubjectType> {
  constructor(
    private readonly _ability: AnyMongoAbility,
    private readonly _action: string
  ) {}

  /**
   * In case action is not allowed, it returns `{ $expr: { $eq: [0, 1] } }`
   */
  ofType(subjectType: T): Record<string, unknown> {
    const query = rulesToQuery(this._ability, this._action, subjectType, convertToMongoQuery);
    return query === null ? EMPTY_RESULT_QUERY : query as Record<string, unknown>;
  }
}

/**
 * Returns accessible records Mongo query per record type (i.e., entity type) based on provided Ability and action.
 */
export function accessibleBy<T extends AnyMongoAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0] = 'read'
): AccessibleRecords<ToAbilityTypes<Generics<T>['abilities']>[1]> {
  return new AccessibleRecords(ability, action);
}
