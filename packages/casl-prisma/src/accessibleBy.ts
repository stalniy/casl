import { AnyAbility, ExtractSubjectType, Generics, PureAbility } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';
import { BasePrismaQuery, InferPrismaTypes } from './types';

function convertToPrismaQuery(rule: AnyAbility['rules'][number]) {
  return rule.inverted ? { NOT: rule.conditions } : rule.conditions;
}

export class AccessibleRecords<TAbility extends PureAbility<any, BasePrismaQuery>> {
  constructor(
    private readonly _ability: TAbility,
    private readonly _action: string
  ) {}

  ofType<TSubjectType extends ExtractSubjectType<Parameters<TAbility['rulesFor']>[1]> & string>(
    subjectType: TSubjectType
  ): InferPrismaTypes<Generics<TAbility>['conditions']>['WhereInput'][TSubjectType] {
    const query = rulesToQuery(this._ability, this._action, subjectType, convertToPrismaQuery);

    if (query === null) {
      return { OR: [] } as any;
    }

    const prismaQuery = Object.create(null);

    if (query.$or) {
      prismaQuery.OR = query.$or;
    }

    if (query.$and) {
      prismaQuery.AND = query.$and;
    }

    return prismaQuery;
  }
}

export function accessibleBy<TAbility extends PureAbility<any, BasePrismaQuery>>(
  ability: TAbility,
  action: TAbility["rules"][number]["action"] & string = "read"
): AccessibleRecords<TAbility> {
  return new AccessibleRecords(ability, action);
}
