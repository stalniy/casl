import { AnyInterpreter, createTranslatorFactory } from '@ucast/core';
import { ForcedSubject } from '@casl/ability';
import { PrismaQueryParser } from './PrismaQueryParser';
import { interpretPrismaQuery } from './interpretPrismaQuery';

const parser = new PrismaQueryParser();
export const prismaQuery = createTranslatorFactory(
  parser.parse,
  interpretPrismaQuery as AnyInterpreter
);

export type Model<T, TName extends string> = T & ForcedSubject<TName>;
export type Subjects<T extends Partial<Record<string, Record<string, unknown>>>> =
  | keyof T
  | { [K in keyof T]: Model<T[K], K & string> }[keyof T];

/**
 * Extracts Prisma model name from given object and possible list of all subjects
 */
export type ExtractModelName<
  TObject,
  TModelName extends string
> = TObject extends { kind: TModelName }
  ? TObject['kind']
  : TObject extends ForcedSubject<TModelName>
    ? TObject['__caslSubjectType__']
    : TObject extends { __typename: TModelName }
      ? TObject['__typename']
      : TModelName;
