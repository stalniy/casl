import { Ability, Subject } from '@casl/ability';
import { Schema, DocumentQuery, Model, Document } from 'mongoose';
import { toMongoQuery } from './mongo';

const DENY_CONDITION_NAME = '__forbiddenByCasl__';

function returnQueryResult(this: any, methodName: string, returnValue: any, ...args: any[]) {
  const [conditions, , callback] = args;

  if (conditions[DENY_CONDITION_NAME]) {
    return typeof callback === 'function'
      ? callback(null, returnValue)
      : Promise.resolve(returnValue);
  }

  if (conditions.hasOwnProperty(DENY_CONDITION_NAME)) {
    delete conditions[DENY_CONDITION_NAME];
  }

  return this[methodName].apply(this, args);
}

function emptifyQuery(query: DocumentQuery<Document, Document>) {
  query.where({ [DENY_CONDITION_NAME]: 1 });
  const privateQuery: any = query;
  const collection = Object.create(privateQuery._collection); // eslint-disable-line
  privateQuery._collection = collection; // eslint-disable-line
  collection.find = returnQueryResult.bind(collection, 'find', []);
  collection.findOne = returnQueryResult.bind(collection, 'findOne', null);
  collection.count = returnQueryResult.bind(collection, 'count', 0);

  return query;
}

type GetAccessibleRecords<T extends Document> = (
  this: any,
  ability: Ability,
  action?: string
) => DocumentQuery<T, T>;

function accessibleBy<T extends Document, A extends string = string>(
  this: any,
  ability: Ability<A, Subject, any>,
  action: A | 'read' = 'read'
): DocumentQuery<T, T> {
  let modelName: string | null = this.modelName;

  if (!modelName) {
    modelName = 'model' in this ? this.model.modelName : null;
  }

  if (!modelName) {
    throw new TypeError('Cannot detect model name to return accessible records');
  }

  const query = toMongoQuery(ability, modelName, action);

  return query === null ? emptifyQuery(this.where()) : this.where({ $and: [query] });
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
