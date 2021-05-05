import type { CompoundCondition, FieldCondition, Comparable } from '@ucast/core';
import type { PrismaOperator } from './interpreter';

function compoundOperator(name: string): PrismaOperator<CompoundCondition> {
  const operator = name.toUpperCase();
  return (compoundCondition, query, { interpret }) => {
    const nestedConditions = compoundCondition.value.map((condition) => {
      return interpret(condition, query.child()).toJSON();
    });
    return query.combineUsing(operator, nestedConditions);
  };
}

function fieldOperator<T>(name: string): PrismaOperator<FieldCondition<T>> {
  return (condition, query) => {
    return query.where(condition.field, name, condition.value);
  };
}

export const eq = fieldOperator('equals');
export const ne = fieldOperator('not');

export const within = fieldOperator<unknown[]>('in');
export const nin = fieldOperator<unknown[]>('notIn');

export const lt = fieldOperator<Comparable>('lt');
export const lte = fieldOperator<Comparable>('lte');
export const gt = fieldOperator<Comparable>('gt');
export const gte = fieldOperator<Comparable>('gte');

export const startsWith = fieldOperator<string>('startsWith');
export const endsWith = fieldOperator<string>('endsWith');
export const contains = fieldOperator<string>('contains');
export const icontains: PrismaOperator<FieldCondition<string>> = (condition, query) => {
  return query.where(condition.field, 'contains', condition.value)
    .where(condition.field, 'mode', 'insensitive');
};

export const hasEvery = fieldOperator('hasEvery');
export const isEmpty = fieldOperator<unknown[]>('isEmpty');
export const has: PrismaOperator = (condition, query) => {
  const operator = Array.isArray(condition.value) ? 'hasSome' : 'has';
  return query.where(condition.field, operator, condition.value);
};

export const and = compoundOperator('and');
export const or = compoundOperator('or');
export const not = compoundOperator('not');
