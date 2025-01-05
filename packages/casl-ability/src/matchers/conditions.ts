import {
  $all,
  $elemMatch,
  $eq,
  $exists,
  $gt,
  $gte,
  $in,
  $lt,
  $lte,
  $ne,
  $nin,
  $options,
  $regex,
  $size,
  all,
  and,
  BuildMongoQuery,
  createFactory,
  DefaultOperators,
  elemMatch,
  eq,
  exists,
  gt,
  gte,
  lt,
  lte,
  ne,
  nin,
  regex,
  size,
  within
} from '@ucast/mongo2js';
import { Container, GenericFactory } from '../hkt';
import { AnyObject, ConditionsMatcher } from '../types';

const defaultInstructions = {
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
  $options,
  $elemMatch,
  $exists,
};
const defaultInterpreters = {
  eq,
  ne,
  lt,
  lte,
  gt,
  gte,
  in: within,
  nin,
  all,
  size,
  regex,
  elemMatch,
  exists,
  and,
};

interface MongoQueryFactory extends GenericFactory {
  produce: MongoQuery<this[0]>
}

type MergeUnion<T, Keys extends keyof T = keyof T> = { [K in Keys]: T[K] };
export type MongoQuery<T = AnyObject> = BuildMongoQuery<MergeUnion<T>, {
  toplevel: {},
  field: Pick<DefaultOperators<MergeUnion<T>>['field'], keyof typeof defaultInstructions>
}> & Container<MongoQueryFactory>;

type MongoQueryMatcherFactory =
  (...args: Partial<Parameters<typeof createFactory>>) => ConditionsMatcher<MongoQuery>;
export const buildMongoQueryMatcher = ((instructions, interpreters, options) => createFactory(
  { ...defaultInstructions, ...instructions },
  { ...defaultInterpreters, ...interpreters },
  options
)) as MongoQueryMatcherFactory;

export const mongoQueryMatcher = createFactory(defaultInstructions, defaultInterpreters);
export type {
  MongoQueryFieldOperators, MongoQueryOperators, MongoQueryTopLevelOperators
} from '@ucast/mongo2js';

