import { wrapArray, Normalize, AnyMongoAbility, Generics } from '@casl/ability';
import { permittedFieldsOf, PermittedFieldsOptions } from '@casl/ability/extra';
import type { Schema, Model, Document } from 'mongoose';

export type AccessibleFieldsOptions =
  {
    getFields(schema: Schema<Document>): string[]
  } &
  ({ only: string | string[] } | { except: string | string[] });

export const getSchemaPaths: AccessibleFieldsOptions['getFields'] = schema => Object.keys((schema as { paths: object }).paths);

function fieldsOf(schema: Schema<Document>, options: Partial<AccessibleFieldsOptions>) {
  const fields = options.getFields!(schema);

  if (!options || !('except' in options)) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

type GetAccessibleFields<T extends AccessibleFieldsDocument> = <U extends AnyMongoAbility>(
  this: Model<T> | T,
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => string[];

export interface AccessibleFieldsModel<T extends AccessibleFieldsDocument> extends Model<T> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

export interface AccessibleFieldsDocument extends Document {
  accessibleFieldsBy: GetAccessibleFields<AccessibleFieldsDocument>
}

function modelFieldsGetter() {
  let fieldsFrom: PermittedFieldsOptions<AnyMongoAbility>['fieldsFrom'];
  return (schema: Schema<Document>, options: Partial<AccessibleFieldsOptions>) => {
    if (!fieldsFrom) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only as string[])
        : fieldsOf(schema, options);
      fieldsFrom = rule => rule.fields || ALL_FIELDS;
    }

    return fieldsFrom;
  };
}

export function accessibleFieldsPlugin(
  schema: Schema<AccessibleFieldsDocument>,
  rawOptions?: Partial<AccessibleFieldsOptions>
) {
  const options = { getFields: getSchemaPaths, ...rawOptions };
  const fieldsFrom = modelFieldsGetter();
  type ModelOrDoc = Model<AccessibleFieldsDocument> | AccessibleFieldsDocument;

  function accessibleFieldsBy(this: ModelOrDoc, ability: AnyMongoAbility, action?: string) {
    const subject = typeof this === 'function' ? this.modelName : this;
    return permittedFieldsOf(ability, action || 'read', subject, {
      fieldsFrom: fieldsFrom(schema, options)
    });
  }

  schema.statics.accessibleFieldsBy = accessibleFieldsBy;
  schema.method('accessibleFieldsBy', accessibleFieldsBy);
}
