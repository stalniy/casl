import { toMongoQuery } from './mongo';

function emptyQuery(query) {
  query.exec = () => Promise.resolve(query.op === 'findOne' ? null : []);
  return query;
}

function accessibleBy(ability, action = 'read') {
  const rules = ability.rulesFor(action, this.modelName || this.model.modelName);
  const query = toMongoQuery(rules);

  return query === null ? emptyQuery(this.find()) : this.find(query);
}

export function mongoosePlugin(schema) {
  schema.query.accessibleBy = accessibleBy;
  schema.statics.accessibleBy = accessibleBy;
  return schema;
}
