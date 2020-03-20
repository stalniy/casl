import { AccessibleFieldsModel, AccessibleFieldsDocument } from './accessible_fields';
import { AccessibleRecordModel } from './accessible_records';

export type AccessibleModel<T extends AccessibleFieldsDocument> =
  AccessibleRecordModel<T> & AccessibleFieldsModel<T>;

export * from './accessible_records';
export * from './accessible_fields';
export * from './mongo';
