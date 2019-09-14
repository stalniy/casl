import { toMongoQuery } from './mongo';

const DENY_CONDITION_NAME = '__forbiddenByCasl__';

function returnQueryResult(original, returnValue, ...args) {
  const [conditions, , callback] = args;

  if (conditions[DENY_CONDITION_NAME]) {
    return typeof callback === 'function'
      ? callback(null, returnValue)
      : Promise.resolve(returnValue);
  }

  if (conditions.hasOwnProperty(DENY_CONDITION_NAME)) {
    delete conditions[DENY_CONDITION_NAME];
  }

  return original.apply(this, args);
}

function emptyQuery(query) {
  query.where({ [DENY_CONDITION_NAME]: 1 });
  const collection = Object.create(query._collection) // eslint-disable-line
  query._collection = collection // eslint-disable-line
  collection.find = returnQueryResult.bind(collection, collection.find, []);
  collection.findOne = returnQueryResult.bind(collection, collection.findOne, null);
  collection.count = returnQueryResult.bind(collection, collection.count, 0);

  return query;
}

function accessibleBy(ability, action) {
  const query = toMongoQuery(ability, this.modelName || this.model.modelName, action);

  return query === null ? emptyQuery(this.where()) : this.where({ $and: [query] });
}

export function accessibleRecordsPlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
