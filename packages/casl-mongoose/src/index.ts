import type { AccessibleRecordModel } from './plugins/accessible_records';

export interface AccessibleModel<
  T,
  TQueryHelpers = unknown,
  TMethods = unknown,
  TVirtuals = unknown
> extends AccessibleRecordModel<T, TQueryHelpers, TMethods, TVirtuals> {}

export { accessibleRecordsPlugin } from './plugins/accessible_records';
export type { AccessibleRecordModel } from './plugins/accessible_records';

export { accessibleBy } from './accessibleBy';
export type { AccessibleRecords } from './accessibleBy';

export { accessibleFieldsBy } from './accessibleFieldsBy';
