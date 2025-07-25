import type { Prisma, PrismaClient } from '@prisma/client';
import type { hkt } from '@casl/ability';
import type { ExtractModelName, Model } from './prisma/prismaQuery';

type ModelWhereInput<TModelName extends string, TPrismaClient> = {
  [K in TModelName]: Uncapitalize<K> extends keyof TPrismaClient
    ? TPrismaClient[Uncapitalize<K>] extends {
        findFirst: (...args: any) => any;
      }
      ? Extract<
          Parameters<TPrismaClient[Uncapitalize<K>]['findFirst']>[0],
          { where?: any }
        >['where']
      : never
    : never;
};

export type WhereInput<TModelName extends string, TPrismaClient> = Extract<
  ModelWhereInput<TModelName, TPrismaClient>[TModelName],
  Record<any, any>
>;

interface PrismaQueryTypeFactory<TModelName extends string, TPrismaClient>
  extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0], TModelName>, TPrismaClient>;
}

type PrismaModel = Model<Record<string, any>, string>;
export type PrismaQuery<
  TModelName extends string = Prisma.ModelName,
  TPrismaClient = PrismaClient,
  T = PrismaModel
> = WhereInput<ExtractModelName<T, TModelName>, TPrismaClient> &
  hkt.Container<PrismaQueryTypeFactory<TModelName, TPrismaClient>>;

export type WhereInputPerModel<TModelName extends string, TPrismaClient> = {
  [K in TModelName]: WhereInput<K, TPrismaClient>;
};
