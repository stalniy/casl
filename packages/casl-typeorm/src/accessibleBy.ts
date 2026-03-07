import { rulesToQuery } from '@casl/ability/extra';
import { AnyAbility, ForbiddenError, PureAbility } from '@casl/ability';
import {
  Not,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Like,
  ILike,
  Between,
  IsNull,
  ArrayContains,
  ArrayContainedBy,
  ArrayOverlap,
  Equal,
  And,
} from 'typeorm';
import type { FindOptionsWhere } from 'typeorm';

const isPlainObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object'
    && (value.constructor === Object || !value.constructor);
};

function operatorToFindOperator(op: string, value: any): any {
  switch (op) {
    case 'equals': return Equal(value);
    case 'not': {
      if (isPlainObject(value)) {
        const inner = toFindOptionsWhere(value);
        const keys = Object.keys(inner);
        if (keys.length === 1) {
          return Not(inner[keys[0]]);
        }
        return Not(And(...keys.map(k => inner[k])));
      }
      return Not(value);
    }
    case 'in': return In(value);
    case 'notIn': return Not(In(value));
    case 'lt': return LessThan(value);
    case 'lte': return LessThanOrEqual(value);
    case 'gt': return MoreThan(value);
    case 'gte': return MoreThanOrEqual(value);
    case 'like': return Like(value);
    case 'ilike': return ILike(value);
    case 'between': return Between(value[0], value[1]);
    case 'isNull': return value ? IsNull() : Not(IsNull());
    case 'arrayContains': return ArrayContains(value);
    case 'arrayContainedBy': return ArrayContainedBy(value);
    case 'arrayOverlap': return ArrayOverlap(value);
    default: return value;
  }
}

function toFindOptionsWhere(conditions: Record<string, any>): Record<string, any> {
  const where: Record<string, any> = {};

  for (const [key, value] of Object.entries(conditions)) {
    if (key === 'AND' || key === 'OR' || key === 'NOT') continue;

    if (isPlainObject(value)) {
      const ops = Object.keys(value);
      const operators = ops.map(op => operatorToFindOperator(op, value[op]));
      where[key] = operators.length === 1 ? operators[0] : And(...operators);
    } else {
      where[key] = value;
    }
  }

  return where;
}

function convertToTypeormQuery(rule: AnyAbility['rules'][number]) {
  return rule.inverted ? { NOT: rule.conditions } : rule.conditions;
}

type TypeormWhereInput = Record<string, Record<string, any> | FindOptionsWhere<any>[]>;

const proxyHandlers: ProxyHandler<{ _ability: AnyAbility, _action: string }> = {
  get(target, subjectType) {
    const query = rulesToQuery(target._ability, target._action, subjectType, convertToTypeormQuery);

    if (query === null) {
      const error = ForbiddenError.from(target._ability)
        .setMessage(`It's not allowed to run "${target._action}" on "${subjectType as string}"`);
      error.action = target._action;
      error.subjectType = error.subject = subjectType as string;
      throw error;
    }

    const orConditions = (query.$or || []).map(toFindOptionsWhere);
    const andConditions = (query.$and || []).map(c => {
      const notBody = (c as any).NOT;
      if (notBody) {
        const inner = toFindOptionsWhere(notBody);
        const result: Record<string, any> = {};
        for (const [key, val] of Object.entries(inner)) {
          result[key] = Not(val);
        }
        return result;
      }
      return toFindOptionsWhere(c);
    });

    const mergedAnd = andConditions.length > 0
      ? Object.assign({}, ...andConditions)
      : null;

    if (orConditions.length === 0 && mergedAnd) {
      return mergedAnd;
    }

    if (orConditions.length === 0) {
      return {};
    }

    if (!mergedAnd) {
      return orConditions.length === 1 ? orConditions[0] : orConditions;
    }

    const result = orConditions.map(or => ({ ...or, ...mergedAnd }));
    return result.length === 1 ? result[0] : result;
  }
};

export function accessibleBy<TAbility extends PureAbility<any, any>>(
  ability: TAbility,
  action: TAbility['rules'][number]['action'] = 'read'
): TypeormWhereInput {
  return new Proxy({
    _ability: ability,
    _action: action,
  }, proxyHandlers) as unknown as TypeormWhereInput;
}
