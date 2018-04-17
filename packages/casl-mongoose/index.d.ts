import { Ability } from '@casl/ability'
import mongoose from 'mongoose'

export function toMongoQuery(ability: Ability, subject: any, action?: string): Object | null

export interface DocumentWithPermittedFields extends mongoose.Document {
  permittedFieldsBy(ability: Ability, action?: string)
}

interface PermittedFieldsOptions {
  only?: string | string[],
  except?: string | string[]
}

export interface PermittedFieldsSchema extends mongoose.Schema {
  plugin(
    plugin: (schema: PermittedFieldsSchema, options?: PermittedFieldsOptions) => void,
    options?: PermittedFieldsOptions): mongoose.Schema;
}

export interface PermittedFieldsModel<T extends DocumentWithPermittedFields> extends mongoose.Model<T> {
  permittedFieldsBy(ability: Ability, action?: string): string[]
}

export function permittedFieldsPlugin(schema: PermittedFieldsSchema, options?: PermittedFieldsOptions): void

export interface AccessibleSchema extends mongoose.Schema {
  plugin(
    plugin: (schema: AccessibleSchema) => AccessibleSchema): mongoose.Schema;
}

export interface AccessibleModel<T extends mongoose.Document> extends mongoose.Model<T> {
  accessibleBy(ability: Ability, action?: string): AccessibleModelQuery<T>
}

export class AccessibleModelQuery<T extends mongoose.Document> extends mongoose.Query<T> {
  accessibleBy(ability: Ability, action?: string): AccessibleModelQuery<T>
}

export function accessibleRecordsPlugin(schema: mongoose.Schema): AccessibleSchema

declare module "mongoose" {
  export function model<T extends DocumentWithPermittedFields>(
      name: string,
      schema?: PermittedFieldsSchema,
      collection?: string,
      skipInit?: boolean): PermittedFieldsModel<T>;

  export function model<T extends Document>(
      name: string,
      schema?: AccessibleSchema,
      collection?: string,
      skipInit?: boolean): AccessibleModel<T>;
}
