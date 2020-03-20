import { wrapArray, Normalize, AnyMongoAbility } from '@casl/ability';
import { permittedFieldsOf, PermittedFieldsOptions } from '@casl/ability/extra';
import { Schema, Model, Document } from 'mongoose';
import { AbilitiesOf } from './mongo';

export type AccessibleFieldsOptions =
  { only: string | string[] } |
  { except: string | string[] };

function fieldsOf(schema: Schema<AccessibleFieldsDocument>, options?: AccessibleFieldsOptions) {
  const fields = Object.keys((schema as any).paths);

  if (!options || !('except' in options)) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

type GetAccessibleFields<T extends AccessibleFieldsDocument> = <U extends AnyMongoAbility>(
  this: Model<T> | T,
  ability: U,
  action?: Normalize<AbilitiesOf<U>>[0]
) => string[];

export interface AccessibleFieldsModel<T extends AccessibleFieldsDocument> extends Model<T> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

export interface AccessibleFieldsDocument extends Document {
  accessibleFieldsBy: GetAccessibleFields<AccessibleFieldsDocument>
}

export function accessibleFieldsPlugin(
  schema: Schema<AccessibleFieldsDocument>,
  options?: AccessibleFieldsOptions
) {
  let fieldsFrom: PermittedFieldsOptions<AnyMongoAbility>['fieldsFrom'];
  function accessibleFieldsBy<T extends AnyMongoAbility>(
    this: Model<AccessibleFieldsDocument> | AccessibleFieldsDocument,
    ability: T,
    action?: Normalize<AbilitiesOf<T>>[0]
  ) {
    if (!fieldsFrom) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only)
        : fieldsOf(schema, options);
      fieldsFrom = rule => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action || 'read', subject, { fieldsFrom });
  }

  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  schema.method('accessibleFieldsBy', accessibleFieldsBy);
}
