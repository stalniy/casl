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
import { ConditionsMatcher as Matcher, MatchConditions } from '../types';

const operations = {
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
type AnyValue = string | number | null | boolean | undefined;
type QueryOperators = {
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
    [k in Exclude<keyof QueryOperators, '$elemMatch'>]?: QueryOperators[k]
  },
  /** checks that property exists */
  $exists?: boolean
};

const siftOptions = { operations };

export type MongoQuery = Record<PropertyKey, QueryOperators | AnyValue>;
export const mongoQueryMatcher: Matcher<MongoQuery> = _ => sift(_ as Query, siftOptions);
export const lambdaMatcher: Matcher<MatchConditions> = conditions => conditions;
