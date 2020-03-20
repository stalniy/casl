import { Normalize, AnyMongoAbility } from '@casl/ability';
import { Schema, DocumentQuery, Query, Model, Document } from 'mongoose';
import { toMongoQuery, AbilitiesOf } from './mongo';

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

type GetAccessibleRecords<T extends Document> = <U extends AnyMongoAbility>(
  ability: U,
  action?: Normalize<AbilitiesOf<U>>[0]
) => DocumentQuery<T, T>;

function accessibleBy<T extends AnyMongoAbility>(
  this: any,
  ability: T,
  action?: Normalize<AbilitiesOf<T>>[0]
): DocumentQuery<Document, Document> {
  let modelName: string | undefined = this.modelName;

  if (!modelName) {
    modelName = 'model' in this ? this.model.modelName : null;
  }

  if (!modelName) {
    throw new TypeError('Cannot detect model name to return accessible records');
  }

  const toQuery = toMongoQuery as (...args: any[]) => ReturnType<typeof toMongoQuery>;
  const query = toQuery(ability, modelName, action);

  if (query === null) {
    return emptifyQuery(this.where());
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
