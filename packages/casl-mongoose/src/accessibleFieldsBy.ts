import { AnyMongoAbility, Generics } from "@casl/ability";
import { AccessibleFields, GetSubjectTypeAllFieldsExtractor } from "@casl/ability/extra";
import mongoose from 'mongoose';

const getSubjectTypeAllFieldsExtractor: GetSubjectTypeAllFieldsExtractor = (type) => {
  const Model = typeof type === 'string' ? mongoose.models[type] : type;
  if (!Model) throw new Error(`Unknown mongoose model "${type}"`);
  return 'schema' in Model ? Object.keys((Model.schema as any).paths) : [];
};

export function accessibleFieldsBy<T extends AnyMongoAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0] = 'read'
): AccessibleFields<Extract<Generics<T>['abilities'], unknown[]>[1]> {
  return new AccessibleFields(ability, action, getSubjectTypeAllFieldsExtractor);
}
