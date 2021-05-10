import {
  buildAnd,
  Comparable,
  CompoundCondition,
  CompoundInstruction,
  Condition,
  FieldCondition,
  FieldInstruction,
  FieldParsingContext,
  NULL_CONDITION,
  ObjectQueryFieldParsingContext,
  ObjectQueryParser
} from '@ucast/core';
import { ParsingQueryError } from '../errors/ParsingQueryError';

const isPlainObject = (value: any) => {
  return value && (value.constructor === Object || !value.constructor);
};

const equals: FieldInstruction = {
  type: 'field',
  validate(instruction, value) {
    if (Array.isArray(value) || isPlainObject(value)) {
      throw new ParsingQueryError(`"${instruction.name}" does not supports comparison of arrays and objects`);
    }
  }
};

const not: FieldInstruction<unknown, ObjectQueryFieldParsingContext> = {
  type: 'field',
  parse(instruction, value, { hasOperators, field, parse }) {
    if (isPlainObject(value) && !hasOperators(value) || Array.isArray(value)) {
      throw new ParsingQueryError(`"${instruction.name}" does not supports comparison of arrays and objects`);
    }

    if (!isPlainObject(value)) {
      return new FieldCondition('notEquals', field, value);
    }

    return new CompoundCondition('NOT', [parse(value, { field })]);
  }
};

const within: FieldInstruction<unknown[]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value)) {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'an array');
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
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'comparable value');
    }
  }
};

const POSSIBLE_MODES = new Set(['insensitive', 'default']);
const mode: FieldInstruction<string> = {
  type: 'field',
  validate(instruction, value) {
    if (!POSSIBLE_MODES.has(value)) {
      throw ParsingQueryError.invalidArgument(
        instruction.name,
        value,
        `one of ${Array.from(POSSIBLE_MODES).join(', ')}`
      );
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
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'string');
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
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'an array or object');
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
  validate(instruction, value) {
    if (typeof value !== 'boolean') {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'a boolean');
    }
  }
};

const has: FieldInstruction<unknown> = {
  type: 'field'
};

const hasSome: FieldInstruction<unknown[]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value)) {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'an array');
    }
  }
};

const relation: FieldInstruction<Record<string, unknown>, ObjectQueryFieldParsingContext> = {
  type: 'field',
  parse(instruction, value, { field, parse }) {
    if (!isPlainObject(value)) {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'a query for nested relation');
    }

    return new FieldCondition(instruction.name, field, parse(value));
  }
};

const inverted = (name: string, baseInstruction: FieldInstruction): FieldInstruction => {
  return {
    ...baseInstruction,
    parse(instruction, value, ctx) {
      const condition = baseInstruction.parse
        ? baseInstruction.parse(instruction, value, ctx)
        : new FieldCondition(name, ctx.field, value);
      return new CompoundCondition('NOT', [condition]);
    }
  };
};

const instructions = {
  equals,
  not,
  in: within,
  notIn: inverted('in', within),
  lt,
  lte: lt,
  gt: lt,
  gte: lt,
  mode,
  startsWith: compareString,
  endsWith: compareString,
  contains: compareString,
  isEmpty,
  has,
  hasSome,
  hasEvery: hasSome,
  NOT: compound,
  AND: compound,
  OR: compound,
  every: relation,
  some: relation,
  none: inverted('every', relation),
  is: relation,
  isNot: inverted('is', relation),
};

export interface ParseOptions {
  field: string
}

type Query = Record<string, any>;
export class PrismaQueryParser extends ObjectQueryParser<Query> {
  constructor() {
    super(instructions, {
      defaultOperatorName: 'equals',
    });
  }

  parse(query: Query, options?: ParseOptions): Condition {
    if (options && options.field) {
      return buildAnd(this.parseFieldOperators(options.field, query));
    }

    return super.parse(query);
  }
}
