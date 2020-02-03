import { AccessibleFieldsModel, AccessibleFieldsDocument } from './accessible_fields';
import { AccessibleRecordModel } from './accessible_records';

export type AccessibleModel<T extends AccessibleFieldsDocument> =
  AccessibleRecordModel<T> & AccessibleFieldsModel<T>;
