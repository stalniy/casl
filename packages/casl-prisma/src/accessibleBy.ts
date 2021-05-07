import { Prisma } from '@prisma/client';
import { AnyAbility } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';
import { WhereInput } from './prisma/PrismaQuery';

function convertToPrismaQuery(rule: AnyAbility['rules'][number]) {
  return rule.inverted ? { NOT: [rule.conditions] } : rule.conditions;
}

const EMPTY_OBJECT = Object.create(null);
function createQuery(ability: AnyAbility, action: string) {
  return new Proxy(EMPTY_OBJECT, {
    get(_, subjectType) {
      const query = rulesToQuery(ability, action, subjectType, convertToPrismaQuery);

      if (query === null) {
        return null;
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
  });
}

type AccessibleQuery = {
  [K in Prisma.ModelName]: WhereInput<K>;
};

// TODO: replace AnyAbility with PrismaAbility when it's ready
export function accessibleBy(ability: AnyAbility, action = 'read'): AccessibleQuery {
  return createQuery(ability, action);
}
