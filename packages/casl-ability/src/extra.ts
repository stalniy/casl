import { Condition, buildAnd, buildOr, CompoundCondition } from '@ucast/mongo2js';
import { PureAbility, AnyAbility } from './PureAbility';
import { RuleOf } from './RuleIndex';
import { RawRule } from './RawRule';
import { Rule } from './Rule';
import { setByPath, wrapArray } from './utils';
import { AnyObject, SubjectType, ExtractSubjectType } from './types';

export type RuleToQueryConverter<T extends AnyAbility> = (rule: RuleOf<T>) => object;
export interface AbilityQuery<T = object> {
  $or?: T[]
  $and?: T[]
}

export function rulesToQuery<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
  convert: RuleToQueryConverter<T>
): AbilityQuery | null {
  const query: AbilityQuery = {};
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

export function rulesToFields<T extends PureAbility<any, AnyObject>>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
): AnyObject {
  return ability.rulesFor(action, subjectType)
    .reduce((values, rule) => {
      if (rule.inverted || !rule.conditions) {
        return values;
      }

      return Object.keys(rule.conditions).reduce((fields, fieldName) => {
        const value = rule.conditions![fieldName];

        if (!value || (value as any).constructor !== Object) {
          setByPath(fields, fieldName, value);
        }

        return fields;
      }, values);
    }, {} as AnyObject);
}

export type GetRuleFields<R extends Rule<any, any>> = (rule: R) => string[];

export interface PermittedFieldsOptions<T extends AnyAbility> {
  fieldsFrom: GetRuleFields<RuleOf<T>>
}

export function permittedFieldsOf<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['can']>[0],
  subject: Parameters<T['can']>[1],
  options: PermittedFieldsOptions<T>
): string[] {
  const subjectType = ability.detectSubjectType(subject);
  const rules = ability.possibleRulesFor(action, subjectType);
  const uniqueFields = new Set<string>();
  const deleteItem = uniqueFields.delete.bind(uniqueFields);
  const addItem = uniqueFields.add.bind(uniqueFields);
  let i = rules.length;

  while (i--) {
    const rule = rules[i];
    if (rule.matchesConditions(subject)) {
      const toggle = rule.inverted ? deleteItem : addItem;
      options.fieldsFrom(rule).forEach(toggle);
    }
  }

  return Array.from(uniqueFields);
}

const joinIfArray = (value: string | string[]) => Array.isArray(value) ? value.join(',') : value;

export type PackRule<T extends RawRule<any, any>> =
  [string, string] |
  [string, string, T['conditions']] |
  [string, string, T['conditions'] | 0, 1] |
  [string, string, T['conditions'] | 0, 1 | 0, string] |
  [string, string, T['conditions'] | 0, 1 | 0, string | 0, string];

export type PackSubjectType<T extends SubjectType> = (type: T) => string;

export function packRules<T extends RawRule<any, any>>(
  rules: T[],
  packSubject?: PackSubjectType<T['subject']>
): PackRule<T>[] {
  return rules.map((rule) => { // eslint-disable-line
    const packedRule: PackRule<T> = [
      joinIfArray((rule as any).action || (rule as any).actions),
      typeof packSubject === 'function'
        ? wrapArray(rule.subject).map(packSubject).join(',')
        : joinIfArray(rule.subject),
      rule.conditions || 0,
      rule.inverted ? 1 : 0,
      rule.fields ? joinIfArray(rule.fields) : 0,
      rule.reason || ''
    ];

    while (!packedRule[packedRule.length - 1]) packedRule.pop();

    return packedRule;
  });
}

export type UnpackSubjectType<T extends SubjectType> = (type: string) => T;

export function unpackRules<T extends RawRule<any, any>>(
  rules: PackRule<T>[],
  unpackSubject?: UnpackSubjectType<T['subject']>
): T[] {
  return rules.map(([action, subject, conditions, inverted, fields, reason]) => {
    const subjects = subject.split(',');
    const rule = {
      inverted: !!inverted,
      action: action.split(','),
      subject: typeof unpackSubject === 'function'
        ? subjects.map(unpackSubject)
        : subjects
    } as T;

    if (conditions) {
      rule.conditions = conditions;
    }

    if (fields) {
      rule.fields = fields.split(',');
    }

    if (reason) {
      rule.reason = reason;
    }

    return rule;
  });
}
