import { Normalize, AnyMongoAbility, Generics, ForbiddenError } from '@casl/ability';
import { Schema, QueryWithHelpers, Model, Document, HydratedDocument, Query } from 'mongoose';
import { EMPTY_RESULT_QUERY, toMongoQuery } from './mongo';

function failedQuery(
  ability: AnyMongoAbility,
  action: string,
  modelName: string,
  query: QueryWithHelpers<Document, Document>
) {
  query.where(EMPTY_RESULT_QUERY);
  const anyQuery: any = query;

  if (typeof anyQuery.pre === 'function') {
    anyQuery.pre((cb: (error?: Error) => void) => {
      const error = ForbiddenError.from(ability).unlessCan(action, modelName);
      cb(error);
    });
  }

  return query;
}

function accessibleBy<T extends AnyMongoAbility>(
  baseQuery: Query<any, any>,
  ability: T,
  action?: Normalize<Generics<T>['abilities']>[0]
): QueryWithHelpers<Document, Document> {
  const subjectType = ability.detectSubjectType({
    constructor: baseQuery.model
  });

  if (!subjectType) {
    throw new TypeError(`Cannot detect subject type of "${baseQuery.model.modelName}" to return accessible records`);
  }

  const query = toMongoQuery(ability, subjectType, action);

  if (query === null) {
    return failedQuery(ability, action || 'read', subjectType, baseQuery.where());
  }

  return baseQuery.and([query]);
}

type GetAccessibleRecords<T, TQueryHelpers, TMethods, TVirtuals> = <U extends AnyMongoAbility>(
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => QueryWithHelpers<
Array<T>,
T,
AccessibleRecordQueryHelpers<T, TQueryHelpers, TMethods, TVirtuals>
>;

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

function modelAccessibleBy<T>(this: Model<T>, ability: AnyMongoAbility, action?: string) {
  return accessibleBy(this.where(), ability, action);
}

function queryAccessibleBy(
  this: Query<unknown, unknown>,
  ability: AnyMongoAbility,
  action?: string
) {
  return accessibleBy(this, ability, action);
}

export function accessibleRecordsPlugin<T>(schema: Schema<T, AccessibleRecordModel<T>>): void {
  (schema.query as Record<string, unknown>).accessibleBy = queryAccessibleBy;
  schema.statics.accessibleBy = modelAccessibleBy;
}
