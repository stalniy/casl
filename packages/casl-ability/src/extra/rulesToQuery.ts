import { CompoundCondition, Condition, buildAnd, buildOr } from '@ucast/mongo2js';
import { AnyAbility } from '../PureAbility';
import { RuleOf } from '../RuleIndex';
import { ExtractSubjectType } from '../types';

export type RuleToQueryConverter<T extends AnyAbility, R = object> = (rule: RuleOf<T>) => R;
export interface AbilityQuery<T = object> {
  $or?: T[]
  $and?: T[]
}

export function rulesToQuery<T extends AnyAbility, R = object>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
  convert: RuleToQueryConverter<T, R>
): AbilityQuery<R> | null {
  const query: AbilityQuery<R> = {};
  const rules = ability.rulesFor(action, subjectType);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const op = rule.inverted ? '$and' : '$or';

    if (!rule.conditions) {
      if (rule.inverted) {
        break;
      } else {
        delete query[op];
        return query;
      }
    } else {
      query[op] = query[op] || [];
      query[op]!.push(convert(rule));
    }
  }

  return query.$or ? query : null;
}

function ruleToAST(rule: RuleOf<AnyAbility>): Condition {
  if (!rule.ast) {
    throw new Error(`Ability rule "${JSON.stringify(rule)}" does not have "ast" property. So, cannot be used to generate AST`);
  }

  return rule.inverted ? new CompoundCondition('not', [rule.ast]) : rule.ast;
}

export function rulesToAST<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
): Condition | null {
  const query = rulesToQuery(ability, action, subjectType, ruleToAST) as AbilityQuery<Condition>;

  if (query === null) {
    return null;
  }

  if (!query.$and) {
    return query.$or ? buildOr(query.$or) : buildAnd([]);
  }

  if (query.$or) {
    query.$and.push(buildOr(query.$or));
  }

  return buildAnd(query.$and);
}
