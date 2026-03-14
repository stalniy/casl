import type { hkt } from "@casl/ability";
import type { ExtractModelName, Model } from "./typeorm/typeormQuery";

export type TypeormModel = Model<Record<string, any>, string>;

export type TypeormWhereInput<
  TEntities extends Record<string, Record<string, any>>,
> = {
  [K in keyof TEntities]: Record<string, any>;
};

interface TypeormQueryTypeFactory<
  TEntities extends Record<string, Record<string, any>>,
>
  extends hkt.GenericFactory {
  produce: TypeormWhereInput<TEntities>[ExtractModelName<
    this[0],
    Extract<keyof TEntities, string>
  >];
}

export declare const ɵtypeormTypes: unique symbol;
export type TypeormQueryFactory<
  TEntities extends Record<string, Record<string, any>>,
  T = TypeormModel,
> = TypeormWhereInput<TEntities>[ExtractModelName<
  T,
  Extract<keyof TEntities, string>
>] &
  hkt.Container<TypeormQueryTypeFactory<TEntities>> & {
    [ɵtypeormTypes]?: TEntities;
  };

export type BaseTypeormQuery = Record<string, any>;
