import { Normalize, AnyMongoAbility, Generics, ForbiddenError, getDefaultErrorMessage } from '@casl/ability';
import type { Schema, QueryWithHelpers, Model, Document } from 'mongoose';
import mongoose from 'mongoose';
import { toMongoQuery } from './mongo';

function failedQuery(
  ability: AnyMongoAbility,
  action: string,
  modelName: string,
  query: QueryWithHelpers<Document, Document>
) {
  query.where({ __forbiddenByCasl__: 1 }); // eslint-disable-line
  const anyQuery: any = query;

  if (typeof anyQuery.pre === 'function') {
    anyQuery.pre((cb: (error?: Error) => void) => {
      const error = ForbiddenError.from(ability);
      error.action = action;
      error.subjectType = modelName;
      error.setMessage(getDefaultErrorMessage(error));
      cb(error);
    });
  }

  return query;
}

function accessibleBy<T extends AnyMongoAbility>(
  this: any,
  ability: T,
  action?: Normalize<Generics<T>['abilities']>[0]
): QueryWithHelpers<Document, Document> {
  let modelName: string | undefined = this.modelName;

  if (!modelName) {
    modelName = 'model' in this ? this.model.modelName : null;
  }

  if (!modelName) {
    throw new TypeError('Cannot detect model name to return accessible records');
  }

  const query = toMongoQuery(ability, modelName, action);

  if (query === null) {
    return failedQuery(ability, action || 'read', modelName, this.where());
  }

  return this instanceof mongoose.Query ? this.and([query]) : this.where({ $and: [query] });
}

type GetAccessibleRecords<T extends Document> = <U extends AnyMongoAbility>(
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => QueryWithHelpers<T, T, QueryHelpers<T>>;

type QueryHelpers<T extends Document> = {
  accessibleBy: GetAccessibleRecords<T>
};
export interface AccessibleRecordModel<
  T extends Document, K = unknown
> extends Model<T, K & QueryHelpers<T>> {
  accessibleBy: GetAccessibleRecords<T>
}

export function accessibleRecordsPlugin(schema: Schema<any>) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
}
