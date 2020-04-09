import {
  Query,
  createQueryTester as sift,
  $eq,
  $ne,
  $lt,
  $lte,
  $gt,
  $gte,
  $in,
  $nin,
  $all,
  $size,
  $regex,
  $elemMatch,
  $exists
} from 'sift';
import { ConditionsMatcher as Matcher } from '../types';

const defaultOperations = {
  $eq,
  $ne,
  $lt,
  $lte,
  $gt,
  $gte,
  $in,
  $nin,
  $all,
  $size,
  $regex,
  $elemMatch,
  $exists,
};

type RegExpOptions<T> = { $regex: T, $options?: string };
type Primitive = string | number | null | boolean | undefined;
export type MongoQueryOperators = {
  $eq?: any,
  $ne?: any,
  $lt?: string | number | Date,
  $lte?: string | number | Date,
  $gt?: string | number | Date,
  $gte?: string | number | Date,
  $in?: [any, ...any[]],
  $nin?: [any, ...any[]],
  $all?: [any, ...any[]],
  /** checks by array length */
  $size?: number,
  $regex?: RegExp | RegExpOptions<string> | RegExpOptions<RegExp>,
  /** checks the shape of array item */
  $elemMatch?: {
    [k in Exclude<keyof MongoQueryOperators, '$elemMatch'>]?: MongoQueryOperators[k]
  },
  /** checks that property exists */
  $exists?: boolean
};

export type MongoQuery<AdditionalOperators = never> =
  Record<PropertyKey, MongoQueryOperators | Primitive | AdditionalOperators>;
export function buildMongoQueryMatcher<T extends object>(
  operations: Record<keyof T, any>
): Matcher<MongoQuery | T> {
  const options = { operations: { ...defaultOperations, ...operations } };
  return conditions => sift(conditions as unknown as Query, options);
}
export const mongoQueryMatcher = buildMongoQueryMatcher({});
