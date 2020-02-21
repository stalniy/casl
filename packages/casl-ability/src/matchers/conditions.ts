import { Query, createQueryTester as sift } from 'sift';
import {
  $not,
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
} from 'sift/operations';
import { ConditionsMatcher as Matcher, MatchConditions } from '../Rule';

const operations = {
  $not,
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
type AnyValue = object | string | number | null | boolean | undefined;
type QueryOperators = {
  $not?: QueryOperators,
  $eq?: any,
  $ne?: any,
  $lt?: string | number | Date,
  $lte?: string | number | Date,
  $gt?: string | number | Date,
  $gte?: string | number | Date,
  $in?: [any, ...any[]],
  $nin?: [any, ...any[]],
  $all?: [any, ...any[]],
  $size?: number,
  $regex?: RegExp | RegExpOptions<string> | RegExpOptions<RegExp>,
  $elemMatch?: {
    [k in Exclude<keyof QueryOperators, '$elemMatch'>]?: QueryOperators[k]
  },
  $exists: boolean
};

export type MongoQuery = Record<PropertyKey, QueryOperators | AnyValue>;
export const mongoQueryMatcher: Matcher<MongoQuery> = conditions => sift(conditions as Query, {
  operations
});
export const lambdaMatcher: Matcher<MatchConditions> = conditions => conditions;
