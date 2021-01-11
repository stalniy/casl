import { Normalize, AnyMongoAbility, Generics, ForbiddenError, getDefaultErrorMessage } from '@casl/ability';
import { Schema, DocumentQuery, Query, Model, Document } from 'mongoose';
import { toMongoQuery } from './mongo';

function failedQuery(
  ability: AnyMongoAbility,
  action: string,
  modelName: string,
  query: DocumentQuery<Document, Document>
) {
  const error = ForbiddenError.from(ability);
  error.action = action;
  error.subjectType = modelName;
  error.setMessage(getDefaultErrorMessage(error));

  query.where({ __forbiddenByCasl__: 1 }); // eslint-disable-line
  query.exec = function patchedExecByCasl(...args: any[]) {
    const cb = typeof args[0] === 'function' ? args[0] : args[1];
    if (typeof cb === 'function') {
      process.nextTick(() => cb(error));
      return;
    }
    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  } as typeof query['exec'];

  return query;
}

type GetAccessibleRecords<T extends Document> = <U extends AnyMongoAbility>(
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => DocumentQuery<T, T>;

function accessibleBy<T extends AnyMongoAbility>(
  this: any,
  ability: T,
  action?: Normalize<Generics<T>['abilities']>[0]
): DocumentQuery<Document, Document> {
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

  return this instanceof Query ? this.and([query]) : this.where({ $and: [query] });
}

export interface AccessibleRecordModel<T extends Document, K = {}> extends Model<T, K & {
  accessibleBy: GetAccessibleRecords<T>
}> {
  accessibleBy: GetAccessibleRecords<T>
}

export function accessibleRecordsPlugin(schema: Schema<Document>) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
}
