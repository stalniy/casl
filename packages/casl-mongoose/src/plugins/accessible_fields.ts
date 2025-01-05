import { AnyMongoAbility, Generics, Normalize, wrapArray } from '@casl/ability';
import { AccessibleFields, GetSubjectTypeAllFieldsExtractor } from '@casl/ability/extra';
import type { Document as Doc, Model, Schema } from 'mongoose';

export type AccessibleFieldsOptions =
  {
    getFields(schema: Schema<Doc>): string[]
  } &
  ({ only: string | string[] } | { except: string | string[] });

export const getSchemaPaths: AccessibleFieldsOptions['getFields'] = schema => Object.keys((schema as { paths: object }).paths);

function fieldsOf(schema: Schema<Doc>, options: Partial<AccessibleFieldsOptions>) {
  const fields = options.getFields!(schema);

  if (!options || !('except' in options)) {
    return fields;
  }

  const excludedFields = wrapArray(options.except);
  return fields.filter(field => excludedFields.indexOf(field) === -1);
}

type GetAccessibleFields<T> = <U extends AnyMongoAbility>(
  this: Model<T> | T,
  ability: U,
  action?: Normalize<Generics<U>['abilities']>[0]
) => string[];

export interface AccessibleFieldsModel<
  T,
  TQueryHelpers = {},
  TMethods = {},
  TVirtuals = {}
> extends Model<T, TQueryHelpers, TMethods & AccessibleFieldDocumentMethods<T>, TVirtuals> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

export interface AccessibleFieldDocumentMethods<T = Doc> {
  accessibleFieldsBy: GetAccessibleFields<T>
}

/**
 * @deprecated Mongoose recommends against `extends Document`, prefer to use `AccessibleFieldsModel` instead.
 * See here: https://mongoosejs.com/docs/typescript.html#using-extends-document
 */
export interface AccessibleFieldsDocument extends Document, AccessibleFieldDocumentMethods {}

function getAllSchemaFieldsFactory() {
  let getAllFields: GetSubjectTypeAllFieldsExtractor;
  return (schema: Schema<any>, options: Partial<AccessibleFieldsOptions>) => {
    if (!getAllFields) {
      const ALL_FIELDS = options && 'only' in options
        ? wrapArray(options.only as string[])
        : fieldsOf(schema, options);
      getAllFields = () => ALL_FIELDS;
    }

    return getAllFields;
  };
}

export function accessibleFieldsPlugin(
  schema: Schema<any>,
  rawOptions?: Partial<AccessibleFieldsOptions>
): void {
  const options = { getFields: getSchemaPaths, ...rawOptions };
  const getAllFields = getAllSchemaFieldsFactory();

  function instanceAccessibleFields(this: Doc, ability: AnyMongoAbility, action?: string) {
    return new AccessibleFields(ability, action || 'read', getAllFields(schema, options)).of(this);
  }

  function modelAccessibleFields(this: Model<unknown>, ability: AnyMongoAbility, action?: string) {
    // using fake document because at this point we don't know how Ability's detectSubjectType was configured:
    // does it use classes or strings?
    const fakeDocument = { constructor: this };
    return new AccessibleFields(ability, action || 'read', getAllFields(schema, options)).of(fakeDocument);
  }

  schema.statics.accessibleFieldsBy = modelAccessibleFields;
  schema.method('accessibleFieldsBy', instanceAccessibleFields);
}
