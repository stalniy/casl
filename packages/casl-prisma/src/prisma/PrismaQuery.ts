import { PrismaClient, Prisma } from '@prisma/client';
import { AnyInterpreter, createTranslatorFactory } from '@ucast/core';
import { PrismaQueryParser } from './PrismaQueryParser';
import { interpretPrismaQuery } from './interpretPrismaQuery';

type ModelDelegates = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? PrismaClient[Uncapitalize<K>]
    : never
};

type Present<T> = Exclude<T, null | undefined>;

export type WhereInput<TModelName extends Prisma.ModelName> =
  Present<Present<Parameters<ModelDelegates[TModelName]['findFirst']>[0]>['where']>;

export const parser = new PrismaQueryParser();

export const prismaQuery = createTranslatorFactory(
  parser.parse,
  interpretPrismaQuery as AnyInterpreter
);
