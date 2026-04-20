import { rulesToQuery } from '@casl/ability/extra';
import { AnyAbility, ForbiddenError, Generics, PureAbility, ExtractSubjectType } from '@casl/ability';
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
      const error = ForbiddenError.from(this._ability)
        .setMessage(`It's not allowed to run "${this._action}" on "${String(subjectType)}"`);
      error.action = this._action;
      error.subjectType = error.subject = subjectType;
      throw error;
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
  action: TAbility["rules"][number]["action"] = "read"
): AccessibleRecords<TAbility> {
  return new AccessibleRecords(ability, action as string);
}
