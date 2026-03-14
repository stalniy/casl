import {
  buildAnd,
  Comparable,
  CompoundCondition,
  CompoundInstruction,
  Condition,
  FieldCondition,
  FieldInstruction,
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
      throw new ParsingQueryError(`"${instruction.name}" does not support comparison of arrays and objects`);
    }
  }
};

const not: FieldInstruction<unknown, ObjectQueryFieldParsingContext> = {
  type: 'field',
  parse(instruction, value, { hasOperators, field, parse }) {
    if (isPlainObject(value) && !hasOperators(value) || Array.isArray(value)) {
      throw new ParsingQueryError(`"${instruction.name}" does not support comparison of arrays and objects`);
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

const comparable: FieldInstruction<Comparable> = {
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

const stringField: FieldInstruction<string> = {
  type: 'field',
  validate(instruction, value) {
    if (typeof value !== 'string') {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'string');
    }
  }
};

const between: FieldInstruction<[Comparable, Comparable]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value) || value.length !== 2) {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'an array of 2 elements [min, max]');
    }
  }
};

const booleanField: FieldInstruction<boolean> = {
  type: 'field',
  validate(instruction, value) {
    if (typeof value !== 'boolean') {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'a boolean');
    }
  }
};

const arrayField: FieldInstruction<unknown[]> = {
  type: 'field',
  validate(instruction, value) {
    if (!Array.isArray(value)) {
      throw ParsingQueryError.invalidArgument(instruction.name, value, 'an array');
    }
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

const inverted = (name: string, baseInstruction: FieldInstruction): FieldInstruction => {
  const parse = baseInstruction.parse;

  if (!parse) {
    return {
      ...baseInstruction,
      parse(_, value, ctx) {
        return new CompoundCondition('NOT', [new FieldCondition(name, ctx.field, value)]);
      }
    };
  }

  return {
    ...baseInstruction,
    parse(instruction, value, ctx) {
      const condition = parse(instruction, value, ctx);
      if (condition.operator !== instruction.name) {
        throw new Error(`Cannot invert "${name}" operator parser because it returns a complex Condition`);
      }
      (condition as Mutable<Condition>).operator = name;
      return new CompoundCondition('NOT', [condition]);
    }
  };
};

const instructions = {
  equals,
  not,
  in: within,
  notIn: inverted('in', within),
  lt: comparable,
  lte: comparable,
  gt: comparable,
  gte: comparable,
  like: stringField,
  ilike: stringField,
  between,
  isNull: booleanField,
  arrayContains: arrayField,
  arrayContainedBy: arrayField,
  arrayOverlap: arrayField,
  NOT: compound,
  AND: compound,
  OR: compound,
};

export interface ParseOptions {
  field: string
}

type Query = Record<string, any>;
export class TypeormQueryParser extends ObjectQueryParser<Query> {
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

type Mutable<T> = { -readonly [K in keyof T]: T[K] };
