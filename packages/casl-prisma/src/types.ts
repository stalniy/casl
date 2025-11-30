import type { hkt } from '@casl/ability';
import type { ExtractModelName, Model } from './prisma/prismaQuery';

export type PrismaTypeMap<TModelName extends string> = {
  model: Record<TModelName, {
    operations: {
      findFirst: {
        args: {
          where?: Record<string, any>;
        }
      }
    }
  }>;
}

export type PrismaTypes<TTypeMap extends PrismaTypeMap<string>> = {
  ModelName: Extract<keyof TTypeMap['model'], string>;
  WhereInput: {
    [K in keyof TTypeMap['model']]: Extract<
      TTypeMap['model'][K]['operations']['findFirst']['args']['where'],
      Record<string, any>
    >
  }
}

interface PrismaQueryTypeFactory<
  TTypeMap extends PrismaTypeMap<string>
> extends hkt.GenericFactory {
  produce: PrismaTypes<TTypeMap>['WhereInput'][ExtractModelName<this[0], PrismaTypes<TTypeMap>['ModelName']>];
}

export type PrismaModel = Model<Record<string, any>, string>;

export declare const ɵprismaTypes: unique symbol;
export type PrismaQueryFactory<TTypeMap extends PrismaTypeMap<string>, T = PrismaModel> =
  PrismaTypes<TTypeMap>['WhereInput'][ExtractModelName<T, PrismaTypes<TTypeMap>['ModelName']>] &
  hkt.Container<PrismaQueryTypeFactory<TTypeMap>> & {
    [ɵprismaTypes]?: PrismaTypes<TTypeMap>;
  };

export type PrismaQueryOf<
  TTypeMap extends PrismaTypeMap<string>,
  T extends PrismaModel = PrismaModel
> = PrismaQueryFactory<TTypeMap, T>;

export type WhereInputOf<
  TTypeMap extends PrismaTypeMap<string>,
  TModelName extends PrismaTypes<TTypeMap>['ModelName']
> = PrismaTypes<TTypeMap>['WhereInput'][TModelName];

export type BasePrismaQuery = { [ɵprismaTypes]?: PrismaTypes<PrismaTypeMap<string>> };
export type InferPrismaTypes<T extends BasePrismaQuery> =
  Exclude<T[typeof ɵprismaTypes], undefined>;
