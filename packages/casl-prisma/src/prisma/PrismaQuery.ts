import { PrismaClient, Prisma } from '@prisma/client';
import { AnyInterpreter, createTranslatorFactory } from '@ucast/core';
import { PrismaQueryParser } from './PrismaQueryParser';
import { interpretPrismaQuery } from './interpretPrismaQuery';

type ModelDelegates = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? PrismaClient[Uncapitalize<K>]
    : never
};

export type WhereInput<T> = T extends Model<Record<string, unknown>, infer Kind>
  // @ts-expect-error because prisma client is not generated at this stage
  ? Exclude<Parameters<ModelDelegates[Kind]['findFirst']>[0], undefined | null>['where']
  : never;

export type Model<T extends Record<string, unknown>, TName extends string> = T & { kind?: TName };

export const parser = new PrismaQueryParser();

export const prismaQuery = createTranslatorFactory(
  parser.parse,
  interpretPrismaQuery as AnyInterpreter
);
