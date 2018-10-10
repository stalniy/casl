import { Ability } from '@casl/ability'
import * as mongoose from 'mongoose'

export function toMongoQuery(ability: Ability, subject: any, action?: string): Object | null

interface AccessibleFieldsOptions {
  only?: string | string[],
  except?: string | string[]
}

export function accessibleFieldsPlugin(schema: AccessibleFieldsSchema, options?: AccessibleFieldsOptions): void

export interface AccessibleFieldsSchema extends mongoose.Schema {
  plugin(
    plugin: typeof accessibleFieldsPlugin,
    options?: AccessibleFieldsOptions): this
}

export function accessibleRecordsPlugin(schema: mongoose.Schema): void

export interface AccessibleSchema extends mongoose.Schema {
  plugin(plugin: typeof accessibleRecordsPlugin): this
}

declare module "mongoose" {
  export function model<T extends Document>(
      name: string,
      schema?: AccessibleFieldsSchema | AccessibleSchema,
      collection?: string,
      skipInit?: boolean): Model<T>

  interface DocumentQuery<T, DocType extends Document> {
    accessibleBy(ability: Ability, action?: string): this
  }

  interface Model<T extends Document> {
    accessibleBy(ability: Ability, action?: string): Query<T>
    accessibleFieldsBy(ability: Ability, action?: string): string[]
  }

  interface Document {
    accessibleFieldsBy(ability: Ability, action?: string): string[]
  }
}
