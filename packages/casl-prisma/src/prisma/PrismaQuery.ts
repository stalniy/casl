import { AnyInterpreter, createTranslatorFactory } from '@ucast/core';
import { ForcedSubject, hkt } from '@casl/ability';
import { PrismaQueryParser } from './PrismaQueryParser';
import { interpretPrismaQuery } from './interpretPrismaQuery';
import type { WhereInput, ModelName } from '.prisma/casl-adapter'; // generated file

type ExtractModelName<T> = T extends { kind: ModelName }
  ? T['kind']
  : T extends ForcedSubject<ModelName>
    ? T['__caslSubjectType__']
    : T extends { __typename: ModelName }
      ? T['__typename']
      : ModelName;

interface PrismaQueryTypeFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0]>>
}

export type Model<T, TName extends string> = T & ForcedSubject<TName>;
export type Subjects<T extends Partial<Record<ModelName, Record<string, unknown>>>> =
  | keyof T
  | { [K in keyof T]: Model<T[K], K & string> }[keyof T];

type PrismaModel = Model<Record<string, any>, ModelName>;
export type PrismaQuery<T extends PrismaModel = PrismaModel> =
  WhereInput<ExtractModelName<T>> & hkt.Container<PrismaQueryTypeFactory>;

const parser = new PrismaQueryParser();
export const prismaQuery = createTranslatorFactory(
  parser.parse,
  interpretPrismaQuery as AnyInterpreter
);
