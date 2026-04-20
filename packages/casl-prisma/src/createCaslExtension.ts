import { Prisma } from '@prisma/client';

export function createCaslExtension() {
  return Prisma.defineExtension({
    name: 'casl',
    query: {
      $allModels: {
        $allOperations({ args, query }) {
          const where = (args as { where?: unknown })?.where;
          let newArgs = args;
          if (hasEmptyCondition(where)) {
            newArgs = { ...args };
            if (Array.isArray(where)) {
              (newArgs as any).where = { OR: [], AND: where };
            } else if (typeof where === 'object') {
              (newArgs as any).where = { ...where, OR: [], AND: [where] };
            } else {
              (newArgs as any).where = { OR: [], AND: [where] };
            }
          }

          return query(newArgs);
        },
      },
    },
  });
}

function hasEmptyCondition(rawWhere: unknown): boolean {
  if (!rawWhere || typeof rawWhere !== 'object') return false;

  const where = rawWhere as Record<string, unknown>;

  if (Array.isArray(where)) {
    for (let i = 0, len = where.length; i < len; i++) {
      if (hasEmptyCondition(where[i])) return true;
    }
    return false;
  }

  if ((where.OR as unknown[])?.length === 0) {
    return true;
  }

  for (const key in where) {
    if (!Object.hasOwn(where, key)) continue;
    const value = where[key];
    if (value && typeof value === 'object' && hasEmptyCondition(value)) {
      return true;
    }
  }

  return false;
}
