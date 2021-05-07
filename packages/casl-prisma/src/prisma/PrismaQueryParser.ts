import {
  Comparable,
  CompoundCondition,
  CompoundInstruction,
  FieldCondition,
  FieldInstruction,
  FieldParsingContext,
  NULL_CONDITION,
  ObjectQueryParser
} from '@ucast/core';

const equals: FieldInstruction = {
  type: 'field',
  validate(instruction, value) {
    if (Array.isArray(value) || value && typeof value === 'object') {
      throw new TypeError(`"${instruction.name}" does not currently supports comparison of arrays and objects`);
    }
  }
};

const within: FieldInstruction<unknown[]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value)) {
      throw new TypeError(
        `"${instruction.name}" expects to receive an array but got:\n "${typeof value}"`
      );
    }
  }
};

const lt: FieldInstruction<Comparable> = {
  type: 'field',
  validate(instruction, value) {
    const type = typeof value;
    const isComparable = type === 'string'
      || type === 'number' && Number.isFinite(value)
      || value instanceof Date;

    if (!isComparable) {
      throw new TypeError(
        `"${instruction.name}" expects to get comparable value but instead got "${typeof value}"`
      );
    }
  }
};

const mode: FieldInstruction<string> = {
  type: 'field',
  validate(instruction, value) {
    if (value && value !== 'insensitive') {
      throw new TypeError(`"${instruction.name}" can be one of "insensitive"`);
    }
  },
  parse: () => NULL_CONDITION
};

interface StringFieldContext extends FieldParsingContext {
  query: {
    mode?: 'insensitive'
  }
}

const compareString: FieldInstruction<string, StringFieldContext> = {
  type: 'field',
  validate(instruction, value) {
    if (typeof value !== 'string') {
      throw new TypeError(`"${instruction.name}" expects to receive string but got "${typeof value}"`);
    }
  },
  parse(instruction, value, { query, field }) {
    const name = query.mode === 'insensitive' ? `i${instruction.name}` : instruction.name;
    return new FieldCondition(name, field, value);
  }
};

const compound: CompoundInstruction = {
  type: 'compound',
  validate(instruction, value) {
    if (!value || typeof value !== 'object') {
      throw new TypeError(`"${instruction.name}" expects to receive either array or object but got "${typeof value}"`);
    }
  },
  parse(instruction, arrayOrObject, { parse }) {
    const value = Array.isArray(arrayOrObject) ? arrayOrObject : [arrayOrObject];
    const conditions = value.map(v => parse(v));
    return new CompoundCondition(instruction.name, conditions);
  }
};

const isEmpty: FieldInstruction<boolean> = {
  type: 'field',
};

const hasSome: FieldInstruction<unknown[]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value)) {
      throw new TypeError(
        `"${instruction.name}" expects to receive an array but got "${typeof value}"`
      );
    }
  }
};

const relation: FieldInstruction<Record<string, unknown>> = {
  type: 'field',
  parse(instruction, value, { field, parse }) {
    return new FieldCondition(instruction.name, field, parse(value));
  }
};

const instructions = {
  equals,
  not: equals,
  in: within,
  notIn: within,
  lt,
  lte: lt,
  gt: lt,
  gte: lt,
  mode,
  startsWith: compareString,
  endsWith: compareString,
  contains: compareString,
  isEmpty,
  has: isEmpty,
  hasSome,
  hasEvery: hasSome,
  NOT: compound,
  AND: compound,
  OR: compound,
  every: relation,
  none: relation,
  some: relation,
  is: relation,
  isNot: relation,
};

export class PrismaQueryParser extends ObjectQueryParser<Record<string, any>> {
  constructor() {
    super(instructions, {
      defaultOperatorName: 'equals',
    });
  }
}
