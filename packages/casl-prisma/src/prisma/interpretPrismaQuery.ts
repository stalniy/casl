import { CompoundCondition, Condition, FieldCondition } from '@ucast/core';
import {
  and,
  compare,
  createJsInterpreter,
  eq,
  gt,
  gte,
  JsInterpreter,
  lt,
  lte,
  ne,
  or,
  within,
} from '@ucast/js';

type StringInterpreter = JsInterpreter<
FieldCondition<string>,
Record<string, string>
>;
const startsWith: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field).startsWith(condition.value);
};
const istartsWith: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field)
    .toLowerCase()
    .startsWith(condition.value.toLowerCase());
};

const endsWith: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field).endsWith(condition.value);
};
const iendsWith: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field)
    .toLowerCase()
    .endsWith(condition.value.toLowerCase());
};

const contains: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field).includes(condition.value);
};
const icontains: StringInterpreter = (condition, object, { get }) => {
  return get(object, condition.field)
    .toLowerCase()
    .includes(condition.value.toLowerCase());
};

type ArrayInterpreter<
  TConditionValue,
  TValue extends Record<string, unknown[]> = Record<string, unknown[]>
> = JsInterpreter<FieldCondition<TConditionValue>, TValue>;
const isEmpty: ArrayInterpreter<boolean> = (condition, object, { get }) => {
  const value = get(object, condition.field);
  const empty = Array.isArray(value) && value.length === 0;
  return empty === condition.value;
};
const has: ArrayInterpreter<unknown> = (condition, object, { get }) => {
  const value = get(object, condition.field);
  return Array.isArray(value) && value.includes(condition.value);
};
const hasSome: ArrayInterpreter<unknown[]> = (condition, object, { get }) => {
  const value = get(object, condition.field);
  return Array.isArray(value) && condition.value.some(v => value.includes(v));
};
const hasEvery: ArrayInterpreter<unknown[]> = (condition, object, { get }) => {
  const value = get(object, condition.field);
  return Array.isArray(value) && condition.value.every(v => value.includes(v));
};

const every: JsInterpreter<FieldCondition<Condition>> = (
  condition,
  object,
  { get, interpret }
) => {
  const items = get(object, condition.field) as Record<string, unknown>[];
  return (
    Array.isArray(items)
    && items.length > 0
    && items.every(item => interpret(condition.value, item))
  );
};

const some: JsInterpreter<FieldCondition<Condition>> = (
  condition,
  object,
  { get, interpret }
) => {
  const items = get(object, condition.field) as Record<string, unknown>[];
  return (
    Array.isArray(items) && items.some(item => interpret(condition.value, item))
  );
};

const is: JsInterpreter<FieldCondition<Condition>> = (
  condition,
  object,
  { get, interpret }
) => {
  const item = get(object, condition.field) as Record<string, unknown>;
  return item && typeof item === 'object' && interpret(condition.value, item);
};

const not: JsInterpreter<CompoundCondition> = (
  condition,
  object,
  { interpret }
) => {
  return condition.value.every(subCondition => !interpret(subCondition, object));
};

function toComparable(value: unknown) {
  if (value instanceof Date) {
    return value.getTime();
  }

  return value;
}

const compareValues: typeof compare = (a, b) => compare(toComparable(a), toComparable(b));

export const interpretPrismaQuery = createJsInterpreter(
  {
    // TODO: support arrays and objects comparison
    equals: eq,
    notEquals: ne,
    in: within,
    lt,
    lte,
    gt,
    gte,
    startsWith,
    istartsWith,
    endsWith,
    iendsWith,
    contains,
    icontains,
    isEmpty,
    has,
    hasSome,
    hasEvery,
    and,
    or,
    AND: and,
    OR: or,
    NOT: not,
    every,
    some,
    is,
  },
  {
    get: (object, field) => object[field],
    compare: compareValues,
  }
);
