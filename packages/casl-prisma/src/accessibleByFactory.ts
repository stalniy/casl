import { rulesToQuery } from '@casl/ability/extra';
import { AnyAbility, ForbiddenError, Generics, PureAbility } from '@casl/ability';
import { BasePrismaQuery, InferPrismaTypes } from './types';

function convertToPrismaQuery(rule: AnyAbility['rules'][number]) {
  return rule.inverted ? { NOT: rule.conditions } : rule.conditions;
}

const proxyHandlers: ProxyHandler<{ _ability: AnyAbility, _action: string }> = {
  get(target, subjectType) {
    const query = rulesToQuery(target._ability, target._action, subjectType, convertToPrismaQuery);

    if (query === null) {
      const error = ForbiddenError.from(target._ability)
        .setMessage(`It's not allowed to run "${target._action}" on "${subjectType as string}"`);
      error.action = target._action;
      error.subjectType = error.subject = subjectType as string;
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
};

/**
 * @deprecated use accessibleBy directly instead. It will infer the types from passed Ability instance.
 */
export const createAccessibleByFactory = <
  TResult extends Record<string, unknown>,
  TPrismaQuery
>() => {
  return function accessibleBy<TAbility extends PureAbility<any, TPrismaQuery>>(ability: TAbility, action: TAbility["rules"][number]["action"] = "read"): TResult {
    return new Proxy({
        _ability: ability,
        _action: action,
    }, proxyHandlers) as unknown as TResult;
  };
};

export function accessibleBy<TAbility extends PureAbility<any, BasePrismaQuery>>(
  ability: TAbility,
  action: TAbility["rules"][number]["action"] = "read"
): InferPrismaTypes<Generics<TAbility>['conditions']>['WhereInput'] {
  return new Proxy({
      _ability: ability,
      _action: action,
  }, proxyHandlers) as Record<string, any>;
};
