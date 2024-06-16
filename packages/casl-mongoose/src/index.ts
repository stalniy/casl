import { AccessibleFieldDocumentMethods, AccessibleFieldsModel } from './plugins/accessible_fields';
import { AccessibleRecordModel, AccessibleRecordQueryHelpers } from './plugins/accessible_records';

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

export { accessibleRecordsPlugin } from './plugins/accessible_records';
export type { AccessibleRecordModel } from './plugins/accessible_records';
export { getSchemaPaths, accessibleFieldsPlugin } from './plugins/accessible_fields';
export type {
  AccessibleFieldsModel,
  AccessibleFieldsDocument,
  AccessibleFieldsOptions
} from './plugins/accessible_fields';

export { accessibleBy } from './accessibleBy';
export type { AccessibleRecords } from './accessibleBy';

export { accessibleFieldsBy } from './accessibleFieldsBy';
// comment to trigger release
