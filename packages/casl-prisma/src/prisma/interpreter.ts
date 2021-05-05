import { Condition, createInterpreter, FieldCondition, InterpretationContext } from '@ucast/core';

class PrismaQuery {
  private readonly conditions: Record<string, any> = Object.create(null);

  where(field: string, operator: string, value: unknown) {
    if (operator === 'equals') {
      this.conditions[field] = value;
    } else {
      this.conditions[field] = this.conditions[field] || Object.create(null);
      this.conditions[field][operator] = value;
    }

    return this;
  }

  combineUsing(operator: string, conditions: Record<string, unknown>[]) {
    if (!this.conditions[operator]) {
      this.conditions[operator] = conditions;
    } else {
      (this.conditions[operator] as unknown[]).push(...conditions);
    }

    return this;
  }

  child() {
    return new PrismaQuery();
  }

  toJSON() {
    return this.conditions;
  }
}

export type PrismaOperator<T extends Condition = FieldCondition> = (
  condition: T,
  query: PrismaQuery,
  context: InterpretationContext<PrismaOperator<T>>
) => PrismaQuery;

export function createPrismaInterpreter(operators: Record<string, PrismaOperator<any>>) {
  const interpret = createInterpreter(operators);
  return (condition: Condition) => interpret(condition, new PrismaQuery()).toJSON();
}
