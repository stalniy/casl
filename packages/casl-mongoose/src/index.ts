import { AccessibleFieldDocumentMethods, AccessibleFieldsModel } from './accessible_fields';
import { AccessibleRecordModel, AccessibleRecordQueryHelpers } from './accessible_records';

export interface AccessibleModel<
  T,
  TQueryHelpers = unknown,
  TMethods = unknown,
  TVirtuals = unknown
  >
  extends
  AccessibleRecordModel<T, TQueryHelpers, TMethods & AccessibleFieldDocumentMethods<T>, TVirtuals>,
  AccessibleFieldsModel<T, TQueryHelpers & AccessibleRecordQueryHelpers<
  T,
  TQueryHelpers,
  TMethods & AccessibleFieldDocumentMethods<T>,
  TVirtuals
  >, TMethods, TVirtuals>
{}

export { accessibleRecordsPlugin } from './accessible_records';
export type { AccessibleRecordModel } from './accessible_records';
export { getSchemaPaths, accessibleFieldsPlugin } from './accessible_fields';
export type {
  AccessibleFieldsModel,
  AccessibleFieldsDocument,
  AccessibleFieldsOptions
} from './accessible_fields';
export { toMongoQuery } from './mongo';
