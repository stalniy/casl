import { AnyMongoAbility, Generics, Normalize } from '@casl/ability';
import type { Document as Doc, HydratedDocument, Model, Query, QueryWithHelpers, Schema } from 'mongoose';
import { accessibleBy } from '../accessibleBy';

function accessibleRecords<T extends AnyMongoAbility>(
  baseQuery: Query<any, any>,
  ability: T,
  action?: Normalize<Generics<T>['abilities']>[0]
): QueryWithHelpers<Doc, Doc> {
  const subjectType = ability.detectSubjectType({
    constructor: baseQuery.model
  });

  if (!subjectType) {
    throw new TypeError(`Cannot detect subject type of "${baseQuery.model.modelName}" to return accessible records`);
  }

  const query = accessibleBy(ability, action).ofType(subjectType);

  return baseQuery.and([query]);
}

type GetAccessibleRecords<T, TQueryHelpers, TMethods, TVirtuals> = <U extends AnyMongoAbility>(
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => QueryWithHelpers<T[], T, AccessibleRecordQueryHelpers<T, TQueryHelpers, TMethods, TVirtuals>>;

export type AccessibleRecordQueryHelpers<T, TQueryHelpers = {}, TMethods = {}, TVirtuals = {}> = {
  /** @deprecated use accessibleBy helper instead */
  accessibleBy: GetAccessibleRecords<
  HydratedDocument<T, TMethods, TVirtuals>,
  TQueryHelpers,
  TMethods,
  TVirtuals
  >
};
export interface AccessibleRecordModel<
  T,
  TQueryHelpers = {},
  TMethods = {},
  TVirtuals = {}
> extends Model<T,
  TQueryHelpers & AccessibleRecordQueryHelpers<T, TQueryHelpers, TMethods, TVirtuals>,
  TMethods,
  TVirtuals> {
  /** @deprecated use accessibleBy helper instead */
  accessibleBy: GetAccessibleRecords<
  HydratedDocument<T, TMethods, TVirtuals>,
  TQueryHelpers,
  TMethods,
  TVirtuals
  >
}

function modelAccessibleBy(this: Model<unknown>, ability: AnyMongoAbility, action?: string) {
  return accessibleRecords(this.where(), ability, action);
}

function queryAccessibleBy(
  this: Query<unknown, unknown>,
  ability: AnyMongoAbility,
  action?: string
) {
  return accessibleRecords(this, ability, action);
}

export function accessibleRecordsPlugin(schema: Schema<any>): void {
  (schema.query as Record<string, unknown>).accessibleBy = queryAccessibleBy;
  schema.statics.accessibleBy = modelAccessibleBy;
}
