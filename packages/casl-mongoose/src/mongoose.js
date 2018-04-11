import { toMongoQuery } from './mongo';

function emptyQuery(query) {
  query.exec = () => Promise.resolve(query.op === 'findOne' ? null : []);
  return query;
}

function accessibleBy(ability, action) {
  const query = toMongoQuery(ability, this.modelName || this.model.modelName, action);

  return query === null ? emptyQuery(this.find()) : this.find(query);
}

export function accessibleRecordsPlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
