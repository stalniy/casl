import { CompoundCondition, Condition, buildAnd, buildOr } from '@ucast/mongo2js';
import { AnyAbility } from '../PureAbility';
import { Generics, RuleOf } from '../RuleIndex';
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
  const $and: Generics<T>['conditions'][] = [];
  const $or: Generics<T>['conditions'][] = [];
  const rules = ability.rulesFor(action, subjectType);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const list = rule.inverted ? $and : $or;

    if (!rule.conditions) {
      if (rule.inverted) {
        // stop if inverted rule without fields and conditions
        // Example:
        // can('read', 'Post', { id: 2 })
        // cannot('read', "Post")
        // can('read', 'Post', { id: 5 })
        break;
      } else {
        // if it allows reading all types then remove previous conditions
        // Example:
        // can('read', 'Post', { id: 1 })
        // can('read', 'Post')
        // cannot('read', 'Post', { status: 'draft' })
        return $and.length ? { $and } : {};
      }
    } else {
      list.push(convert(rule));
    }
  }

  // if there are no regular conditions and the where no rule without condition
  // then user is not allowed to perform this action on this subject type
  if (!$or.length) return null;
  return $and.length ? { $or, $and } : { $or };
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
