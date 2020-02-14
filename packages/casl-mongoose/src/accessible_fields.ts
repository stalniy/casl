import { Ability, wrapArray, Rule, Subject } from '@casl/ability';
import { permittedFieldsOf, PermittedFieldsOptions } from '@casl/ability/extra';
import { Schema, Model, Document } from 'mongoose';

export type AccessibleFieldsOptions =
  { only: string | string[] } |
  { except: string | string[] };

function fieldsOf(schema: Schema<Document>, options?: AccessibleFieldsOptions) {
  const fields = Object.keys((schema as any).paths);

  if (!options || !('except' in options)) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

type GetAccessibleFields<T extends AccessibleFieldsDocument> =
  <A extends string = string>(this: Model<T> | T, ability: Ability<A>, action?: A) => string[];

export interface AccessibleFieldsModel<T extends AccessibleFieldsDocument> extends Model<T> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

export interface AccessibleFieldsDocument extends Document {
  accessibleFieldsBy: GetAccessibleFields<AccessibleFieldsDocument>
}

export function accessibleFieldsPlugin(
  schema: Schema<Document>,
  options?: AccessibleFieldsOptions
) {
  let fieldsFrom: PermittedFieldsOptions['fieldsFrom'];
  function accessibleFieldsBy<
    A extends string = string
  >(this: Model<Document>, ability: Ability<A>, action: A | 'read' = 'read') {
    if (!fieldsFrom) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only)
        : fieldsOf(schema, options);
      fieldsFrom = (rule: Rule<string, Subject, any>) => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action, subject, { fieldsFrom });
  }

  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  (schema.methods as any).accessibleFieldsBy = accessibleFieldsBy;
}
