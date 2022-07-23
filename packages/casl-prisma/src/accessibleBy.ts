import { rulesToQuery } from '@casl/ability/extra';
import { AnyAbility, ForbiddenError } from '@casl/ability';
import { PrismaAbility } from './PrismaAbility';
import { WhereInput, ModelName } from '.prisma/casl-adapter';

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
function createQuery(ability: PrismaAbility, action: string) {
  return new Proxy({
    _ability: ability,
    _action: action
  }, proxyHandlers) as unknown as AccessibleQuery;
}

type AccessibleQuery = {
  [K in ModelName]: WhereInput<K>;
};

export function accessibleBy(ability: PrismaAbility<any, any>, action = 'read'): AccessibleQuery {
  return createQuery(ability, action);
}
