import { permittedFieldsOf } from '@casl/ability/extra';

function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

function deprecate(name, { by: replacementName, fn }) {
  return (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`"${name}" is deprecated, use "${replacementName}"`);
    }

    return fn(...args);
  };
}

function fieldsOf(schema, options) {
  const fields = Object.keys(schema.paths);

  if (!options.except) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

export function accessibleFieldsPlugin(schema, options = {}) {
  let fieldsFrom;
  function accessibleFieldsBy(ability, action = 'read') {
    if (!fieldsFrom) {
      const ALL_FIELDS = options.only ? wrapArray(options.only) : fieldsOf(schema, options);
      fieldsFrom = rule => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action, subject, { fieldsFrom });
  }
  const permittedFieldsBy = deprecate('permittedFieldsBy', {
    by: 'accessibleFieldsBy',
    fn: accessibleFieldsBy
  });

  schema.statics.permittedFieldsBy = permittedFieldsBy;
  schema.methods.permittedFieldsBy = permittedFieldsBy;
  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  schema.methods.accessibleFieldsBy = accessibleFieldsBy;
}

export const permittedFieldsPlugin = deprecate('permittedFieldsPlugin', {
  by: 'accessibleFieldsPlugin',
  fn: accessibleFieldsPlugin
});
