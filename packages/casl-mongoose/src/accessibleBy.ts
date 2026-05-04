import type { AnyMongoAbility, Generics, SubjectType, Abilities, AbilityTuple, ExtractSubjectType } from '@casl/ability';
import { rulesToCondition } from '@casl/ability/extra';

function convertToMongoQuery(rule: AnyMongoAbility['rules'][number]) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

const MONGO_QUERY_AGGREGATION = {
  and: (conditions: unknown[]) => ({ $and: conditions }),
  or: (conditions: unknown[]) => ({ $or: conditions }),
  empty: () => ({})
};

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
    const rules = this._ability.rulesFor(this._action, subjectType);
    const query = rulesToCondition(rules, convertToMongoQuery, MONGO_QUERY_AGGREGATION);
    return query === null ? EMPTY_RESULT_QUERY : query as Record<string, unknown>;
  }
}

type SubjectTypes<T extends Abilities> = T extends AbilityTuple
  ? ExtractSubjectType<T[1]>
  : never;

/**
 * Returns accessible records Mongo query per record type (i.e., entity type) based on provided Ability and action.
 */
export function accessibleBy<T extends AnyMongoAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0] = 'read'
): AccessibleRecords<SubjectTypes<Generics<T>['abilities']>> {
  return new AccessibleRecords(ability, action);
}
