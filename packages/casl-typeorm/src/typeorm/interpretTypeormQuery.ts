import { CompoundCondition, FieldCondition } from "@ucast/core";
import {
  JsInterpreter,
  createJsInterpreter,
  eq,
  ne,
  and,
  or,
  within,
  lt,
  lte,
  gt,
  gte,
  compare,
} from "@ucast/js";

type StringInterpreter = JsInterpreter<
  FieldCondition<string>,
  Record<string, string>
>;
const like: StringInterpreter = (condition, object, { get }) => {
  const value = get(object, condition.field);
  const pattern = condition.value.replace(/%/g, ".*").replace(/_/g, ".");
  return new RegExp(`^${pattern}$`).test(value);
};

const ilike: StringInterpreter = (condition, object, { get }) => {
  const value = get(object, condition.field);
  const pattern = condition.value.replace(/%/g, ".*").replace(/_/g, ".");
  return new RegExp(`^${pattern}$`, "i").test(value);
};

type BetweenInterpreter = JsInterpreter<
  FieldCondition<[unknown, unknown]>,
  Record<string, unknown>
>;
const between: BetweenInterpreter = (
  condition,
  object,
  { get, compare: cmp },
) => {
  const value = get(object, condition.field);
  const [min, max] = condition.value;
  return cmp(value, min) >= 0 && cmp(value, max) <= 0;
};

type BooleanFieldInterpreter = JsInterpreter<
  FieldCondition<boolean>,
  Record<string, unknown>
>;
const isNull: BooleanFieldInterpreter = (condition, object, { get }) => {
  const value = get(object, condition.field);
  return condition.value ? value === null : value !== null;
};

type ArrayInterpreter<
  TConditionValue,
  TValue extends Record<string, unknown[]> = Record<string, unknown[]>,
> = JsInterpreter<FieldCondition<TConditionValue>, TValue>;
const arrayContains: ArrayInterpreter<unknown[]> = (
  condition,
  object,
  { get },
) => {
  const value = get(object, condition.field);
  return (
    Array.isArray(value) && condition.value.every((v) => value.includes(v))
  );
};

const arrayContainedBy: ArrayInterpreter<unknown[]> = (
  condition,
  object,
  { get },
) => {
  const value = get(object, condition.field);
  return (
    Array.isArray(value) && value.every((v) => condition.value.includes(v))
  );
};

const arrayOverlap: ArrayInterpreter<unknown[]> = (
  condition,
  object,
  { get },
) => {
  const value = get(object, condition.field);
  return Array.isArray(value) && condition.value.some((v) => value.includes(v));
};

const not: JsInterpreter<CompoundCondition> = (
  condition,
  object,
  { interpret },
) => {
  return condition.value.every(
    (subCondition) => !interpret(subCondition, object),
  );
};

function toComparable(value: unknown) {
  return value && typeof value === "object" ? value.valueOf() : value;
}

const compareValues: typeof compare = (a, b) =>
  compare(toComparable(a), toComparable(b));

export const interpretTypeormQuery = createJsInterpreter(
  {
    equals: eq,
    notEquals: ne,
    in: within,
    lt,
    lte,
    gt,
    gte,
    like,
    ilike,
    between,
    isNull,
    arrayContains,
    arrayContainedBy,
    arrayOverlap,
    and,
    or,
    AND: and,
    OR: or,
    NOT: not,
  },
  {
    get: (object, field) => object[field],
    compare: compareValues,
  },
);
