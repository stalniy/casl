import { wrapArray, RuleOf, AbilityParameters } from '@casl/ability';
import { permittedFieldsOf, PermittedFieldsOptions } from '@casl/ability/extra';
import { Schema, Model, Document } from 'mongoose';
import { AnyMongoAbility } from './types';

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
  action?: AbilityParameters<U>['action']
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
    action?: AbilityParameters<T>['action']
  ) {
    if (!fieldsFrom) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only)
        : fieldsOf(schema, options);
      fieldsFrom = (rule: RuleOf<T>) => rule.fields || ALL_FIELDS;
    }

    const subject = typeof this === 'function' ? this.modelName : this;

    return permittedFieldsOf(ability, action || 'read', subject, { fieldsFrom });
  }

  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  schema.method('accessibleFieldsBy', accessibleFieldsBy);
}
