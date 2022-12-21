import {
  $eq,
  eq,
  $ne,
  ne,
  $lt,
  lt,
  $lte,
  lte,
  $gt,
  gt,
  $gte,
  gte,
  $in,
  within,
  $nin,
  nin,
  $all,
  all,
  $size,
  size,
  $regex,
  $options,
  regex,
  $elemMatch,
  elemMatch,
  $exists,
  exists,
  and,
  $or,
  or,
  createFactory,
  BuildMongoQuery,
  DefaultOperators,
} from '@ucast/mongo2js';
import { ConditionsMatcher, AnyObject } from '../types';
import { Container, GenericFactory } from '../hkt';

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
  $or,
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
  or
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
  MongoQueryFieldOperators,
  MongoQueryTopLevelOperators,
  MongoQueryOperators,
} from '@ucast/mongo2js';
