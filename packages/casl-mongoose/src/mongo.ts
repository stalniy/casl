import { AnyMongoAbility, Abilities, AbilityTuple, AbilityParameters, Generics } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';

function convertToMongoQuery(rule: AnyMongoAbility['rules'][number]) {
  const conditions = rule.conditions!;
  return rule.inverted ? { $nor: [conditions] } : conditions;
}

type ToMongoQueryRestArgs<T extends Abilities> = AbilityParameters<
T,
T extends AbilityTuple ? (subject: T[1], action?: T[0]) => 0 : never,
(subject: 'all' | undefined, action?: T) => 0
>;

export function toMongoQuery<T extends AnyMongoAbility>(
  ability: T,
  ...args: ToMongoQueryRestArgs<Generics<T>['abilities']>
) {
  return (rulesToQuery as any)(ability, args[1] || 'read', args[0], convertToMongoQuery);
}
