import { toMongoQuery } from './mongo';

function emptyQuery(query) {
  const originalExec = query.exec;

  query.exec = function exec(operation, callback) {
    const op = typeof operation === 'string' ? operation : this.op;
    const cb = typeof operation === 'function' ? operation : callback;
    let value;

    if (op.indexOf('findOne') === 0) {
      value = null;
    } else if (op.indexOf('find') === 0) {
      value = [];
    } else if (op === 'count') {
      value = 0;
    } else {
      this.where({ __notAllowed__: Date.now() });
      return originalExec.call(this, operation, callback);
    }

    return Promise.resolve(value)
      .then((v) => {
        if (typeof cb === 'function') {
          cb(null, v);
        }

        return v;
      });
  };

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
