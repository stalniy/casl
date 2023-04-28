import type { Prisma, PrismaClient } from '@prisma/client';
import type { hkt } from '@casl/ability';
import type { ExtractModelName, Model } from './prisma/prismaQuery';

export type ModelName = Prisma.ModelName;

type ModelWhereInput = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? Extract<Parameters<PrismaClient[Uncapitalize<K>]['findFirst']>[0], { where?: any }>['where']
    : never
};

// eslint-disable-next-line max-len
export type WhereInput<TModelName extends Prisma.ModelName> = Extract<
ModelWhereInput[TModelName],
Record<any, any>
>;

interface PrismaQueryTypeFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0], ModelName>>
}

type PrismaModel = Model<Record<string, any>, string>;
export type PrismaQuery<T = PrismaModel> =
    WhereInput<ExtractModelName<T, ModelName>> & hkt.Container<PrismaQueryTypeFactory>;

export type WhereInputPerModel = {
  [K in ModelName]: WhereInput<K>;
};
