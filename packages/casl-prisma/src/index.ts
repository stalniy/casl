import type { Prisma } from '@prisma/client';

import type { PrismaModel, PrismaQueryFactory, PrismaTypes } from './runtime';

export type * from './runtime';
export { accessibleBy, ParsingQueryError, prismaQuery, createPrismaAbility } from './runtime';
export type WhereInput<TModelName extends Prisma.ModelName> =
  PrismaTypes<Prisma.TypeMap>['WhereInput'][TModelName];
export type PrismaQuery<T extends PrismaModel = PrismaModel> =
  PrismaQueryFactory<Prisma.TypeMap, T>;
