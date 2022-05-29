import type { PrismaClient, Prisma } from '@prisma/client';
import { AnyInterpreter, createTranslatorFactory } from '@ucast/core';
import { ForcedSubject, hkt } from '@casl/ability';
import { PrismaQueryParser } from './PrismaQueryParser';
import { interpretPrismaQuery } from './interpretPrismaQuery';

type ModelDelegates = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? PrismaClient[Uncapitalize<K>]
    : never
};
export type WhereInput<TModelName extends Prisma.ModelName> =
  Extract<Extract<Parameters<ModelDelegates[TModelName]['findFirst']>[0], { where?: any }>['where'], Record<any, any>>;
type ExtractModelName<T> = T extends { kind: Prisma.ModelName }
  ? T['kind']
  : T extends ForcedSubject<Prisma.ModelName>
    ? T['__caslSubjectType__']
    : T extends { __typename: Prisma.ModelName }
      ? T['__typename']
      : never;

interface PrismaQueryTypeFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0]>>
}

export type Model<T, TName extends string> = T & ForcedSubject<TName>;
export type Subjects<T extends Record<Prisma.ModelName, Record<string, unknown>>> =
  | keyof T
  | { [K in keyof T]: Model<T[K], K & string> }[keyof T];

type PrismaModel = Model<Record<string, any>, Prisma.ModelName>;
export type PrismaQuery<T extends PrismaModel = PrismaModel> =
  WhereInput<ExtractModelName<T>> & hkt.Container<PrismaQueryTypeFactory>;

const parser = new PrismaQueryParser();
export const prismaQuery = createTranslatorFactory(
  parser.parse,
  interpretPrismaQuery as AnyInterpreter
);
