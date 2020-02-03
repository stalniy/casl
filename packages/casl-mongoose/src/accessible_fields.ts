import { Ability, wrapArray, Rule } from '@casl/ability';
import { permittedFieldsOf, PermittedFieldsOptions } from '@casl/ability/extra';
import { Schema, Model, Document } from 'mongoose';

export type AccessibleFieldsOptions =
  {
    only: string | string[]
  } |
  {
    except: string | string[]
  };

function fieldsOf<T>(schema: Schema<T>, options?: AccessibleFieldsOptions) {
  const fields = Object.keys((schema as any).paths);

  if (!options || !('except' in options)) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

type GetAccessibleFields<T extends AccessibleFieldsDocument> =
  (this: Model<T> | AccessibleFieldsDocument, ability: Ability, action?: string) => string[];

export interface AccessibleFieldsModel<T extends AccessibleFieldsDocument> extends Model<T> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

export interface AccessibleFieldsDocument extends Document {
  accessibleFieldsBy: GetAccessibleFields<AccessibleFieldsDocument>
}

export function accessibleFieldsPlugin<T extends AccessibleFieldsDocument>(
  schema: Schema<T>,
  options?: AccessibleFieldsOptions
) {
  let fieldsFrom: PermittedFieldsOptions['fieldsFrom'];

  const accessibleFieldsBy: GetAccessibleFields<T> = function accessibleFieldsBy(
    ability,
    action = 'read'
  ) {
    if (!fieldsFrom) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only)
        : fieldsOf(schema, options);
      fieldsFrom = (rule: Rule) => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action, subject, { fieldsFrom });
  };

  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  (schema.methods as any).accessibleFieldsBy = accessibleFieldsBy;
}
