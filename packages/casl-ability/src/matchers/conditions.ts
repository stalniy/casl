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
  regex,
  $elemMatch,
  elemMatch,
  $exists,
  exists,
  createFactory,
  equal,
  createGetter
} from '@ucast/mongo2js';
import type { MongoQuery } from '@ucast/mongo2js';
import { ConditionsMatcher } from '../types';

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
};

interface HasToJSON {
  toJSON(): unknown
}

function toPrimitive(value: unknown) {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (value && typeof (value as HasToJSON).toJSON === 'function') {
    return (value as HasToJSON).toJSON();
  }

  return value;
}

const isEqual: typeof equal = (a, b) => equal(toPrimitive(a), toPrimitive(b));
const getField = createGetter((object, field) => toPrimitive(object[field]));

type MongoQueryMatcher =
  (...args: Partial<Parameters<typeof createFactory>>) => ConditionsMatcher<MongoQuery>;
export const buildMongoQueryMatcher: MongoQueryMatcher = (instructions, interpreters, options) => {
  return createFactory(
    { ...defaultInstructions, ...instructions },
    { ...defaultInterpreters, ...interpreters },
    { equal: isEqual, get: getField, ...options }
  );
};

export const mongoQueryMatcher = buildMongoQueryMatcher();
export type {
  MongoQuery,
  MongoQueryFieldOperators,
  MongoQueryTopLevelOperators,
  MongoQueryOperators,
} from '@ucast/mongo2js';
