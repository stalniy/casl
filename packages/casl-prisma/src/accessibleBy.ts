import { Ability, Generics, Normalize, ExtractSubjectType } from '@casl/ability';
import { rulesToCondition } from '@casl/ability/extra';
import { BasePrismaQuery, InferPrismaTypes } from './types';

function convertToPrismaQuery(rule: Ability<any, BasePrismaQuery>['rules'][number]) {
  return rule.inverted ? { NOT: rule.conditions } : rule.conditions;
}

const PRISMA_QUERY_AGGREGATION = {
  and: (conditions: unknown[]) => ({ AND: conditions }),
  or: (conditions: unknown[]) => ({ OR: conditions }),
  empty: () => ({})
};

type ModelName<TAbility extends Ability<any, BasePrismaQuery>> = Extract<
  keyof InferPrismaTypes<Generics<TAbility>['conditions']>['WhereInput'],
  string
>;
type SubjectType<TAbility extends Ability<any, BasePrismaQuery>> = Extract<
  ExtractSubjectType<Normalize<Generics<TAbility>['abilities']>[1]>,
  ModelName<TAbility>
>;

export class AccessibleRecords<TAbility extends Ability<any, BasePrismaQuery>> {
  constructor(
    private readonly _ability: TAbility,
    private readonly _action: string
  ) {}

  ofType<TSubjectType extends SubjectType<TAbility>>(
    subjectType: TSubjectType
  ): InferPrismaTypes<Generics<TAbility>['conditions']>['WhereInput'][TSubjectType] {
    const rules = this._ability.rulesFor(this._action, subjectType);
    const query = rulesToCondition(rules, convertToPrismaQuery, PRISMA_QUERY_AGGREGATION);
    const finalQuery = query === null ? { OR: [] } : query;

    return finalQuery as InferPrismaTypes<Generics<TAbility>['conditions']>['WhereInput'][TSubjectType];
  }
}

export function accessibleBy<TAbility extends Ability<any, BasePrismaQuery>>(
  ability: TAbility,
  action: TAbility["rules"][number]["action"] & string = "read"
): AccessibleRecords<TAbility> {
  return new AccessibleRecords(ability, action);
}
