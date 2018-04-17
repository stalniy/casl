import { permittedFieldsOf } from '@casl/ability/extra';

function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

function fieldsOf(schema, options) {
  const fields = Object.keys(schema.paths);

  if (!options.except) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

export function permittedFieldsPlugin(schema, options = {}) {
  let fieldsFrom;
  const permittedFieldsBy = function permittedFieldsBy(ability, action = 'read') {
    if (!fieldsFrom) {
      const ALL_FIELDS = options.only ? wrapArray(options.only) : fieldsOf(schema, options);
      fieldsFrom = rule => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action, subject, { fieldsFrom });
  };

  schema.statics.permittedFieldsBy = permittedFieldsBy;
  schema.methods.permittedFieldsBy = permittedFieldsBy;
}
