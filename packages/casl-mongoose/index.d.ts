import { Ability } from '@casl/ability'
import * as mongoose from 'mongoose'

export function toMongoQuery(ability: Ability, subject: any, action?: string): Object | null

interface PermittedFieldsOptions {
  only?: string | string[],
  except?: string | string[]
}

export function permittedFieldsPlugin(schema: PermittedFieldsSchema, options?: PermittedFieldsOptions): void

export interface PermittedFieldsSchema extends mongoose.Schema {
  plugin(
    plugin: typeof permittedFieldsPlugin,
    options?: PermittedFieldsOptions): this
}

export function accessibleRecordsPlugin(schema: mongoose.Schema): void

export interface AccessibleSchema extends mongoose.Schema {
  plugin(plugin: typeof accessibleRecordsPlugin): this
}

declare module "mongoose" {
  export function model<T extends Document>(
      name: string,
      schema?: PermittedFieldsSchema | AccessibleSchema,
      collection?: string,
      skipInit?: boolean): Model<T>

  interface DocumentQuery<T, DocType extends Document> {
    accessibleBy(ability: Ability, action?: string): this
  }

  interface Model<T extends Document> {
    accessibleBy(ability: Ability, action?: string): Query<T>
    permittedFieldsBy(ability: Ability, action?: string): string[]
  }

  interface Document {
    permittedFieldsBy(ability: Ability, action?: string): string[]
  }
}
