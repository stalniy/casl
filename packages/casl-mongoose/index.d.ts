import { Ability } from '@casl/ability'
import * as mongoose from 'mongoose'

export function toMongoQuery(ability: Ability, subject: any, action?: string): Object | null

interface PermittedFieldsOptions {
  only?: string | string[],
  except?: string | string[]
}
interface AccessibleFieldsOptions {
  only?: string | string[],
  except?: string | string[]
}

export function permittedFieldsPlugin(schema: PermittedFieldsSchema, options?: PermittedFieldsOptions): void
export function accessibleFieldsPlugin(schema: AccessibleFieldsSchema, options?: AccessibleFieldsOptions): void

export interface PermittedFieldsSchema extends mongoose.Schema {
  plugin(
    plugin: typeof permittedFieldsPlugin,
    options?: PermittedFieldsOptions): this
}
export interface AccessibleFieldsSchema extends mongoose.Schema {
  plugin(
    plugin: typeof accessibleFieldsPlugin,
    options?: AccessibleFieldsOptions): this
}

export function accessibleRecordsPlugin(schema: mongoose.Schema, options?: null): void

export interface AccessibleSchema extends mongoose.Schema {
  plugin(
    plugin: typeof accessibleRecordsPlugin,
    options?: null): this
}

declare module mongoose {
  export function model<T extends Document>(
      name: string,
      schema?: PermittedFieldsSchema | AccessibleFieldsSchema | AccessibleSchema,
      collection?: string,
      skipInit?: boolean): Model<T>

  interface DocumentQuery<T, DocType extends Document> {
    accessibleBy(ability: Ability, action?: string): this
  }

  interface Model<T extends Document> {
    accessibleBy(ability: Ability, action?: string): this
    permittedFieldsBy(ability: Ability, action?: string): string[]
    accessibleFieldsBy(ability: Ability, action?: string): string[]
  }

  interface Document {
    permittedFieldsBy(ability: Ability, action?: string): string[]
    accessibleFieldsBy(ability: Ability, action?: string): string[]
  }
}
