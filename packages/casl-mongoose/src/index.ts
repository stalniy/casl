import { AccessibleFieldsModel } from './accessible_fields';
import { AccessibleRecordModel } from './accessible_records';

export type AccessibleModel<T,
  TQueryHelpers = {},
  TMethods = {},
  TVirtuals = {}> =
  AccessibleRecordModel<T, TQueryHelpers, TMethods, TVirtuals> &
  AccessibleFieldsModel<T, TQueryHelpers, TMethods, TVirtuals>;

export * from './accessible_records';
export * from './accessible_fields';
export * from './mongo';
