import { PureAbility, AnyAbility, RuleOf, Generics } from './PureAbility';
import { RawRule } from './RawRule';
import { Rule } from './Rule';
import { setByPath, wrapArray } from './utils';
import {
  AbilityParameters,
  AnyObject,
  SubjectType,
  AbilityTuple,
  CanParameters,
  Abilities
} from './types';

export type RuleToQueryConverter<T extends AnyAbility> = (rule: RuleOf<T>) => object;
export interface AbilityQuery {
  $or?: object[]
  $and?: object[]
}

type RulesToQueryRestArgs<T extends Abilities, ConvertRule> = AbilityParameters<
T,
T extends AbilityTuple
  ? (action: T[0], subject: T[1], convert: ConvertRule) => 0
  : never,
(action: never, subject: never, convert: ConvertRule) => 0
>;

export function rulesToQuery<T extends AnyAbility>(
  ability: T,
  ...args: RulesToQueryRestArgs<Generics<T>['abilities'], RuleToQueryConverter<T>>
): AbilityQuery | null {
  const [action, subject, convert] = args;
  const query: AbilityQuery = {};
  const rules = ability.rulesFor(action, subject) as RuleOf<T>[];

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

export function rulesToFields<T extends PureAbility<any, AnyObject>>(
  ability: T,
  ...[action, subject]: CanParameters<Generics<T>['abilities'], false>
): AnyObject {
  return ability.rulesFor(action, subject)
    .filter(rule => !rule.inverted && rule.conditions)
    .reduce((values, rule) => {
      const conditions = rule.conditions!;

      return Object.keys(conditions).reduce((fields, fieldName) => {
        const value = conditions[fieldName];

        if (!value || (value as any).constructor !== Object) {
          setByPath(fields, fieldName, value);
        }

        return fields;
      }, values);
    }, {} as AnyObject);
}

const getRuleFields = (rule: RuleOf<AnyAbility>) => rule.fields;

export type GetRuleFields<R extends Rule<any, any>> = (rule: R) => string[] | undefined;

export interface PermittedFieldsOptions<T extends AnyAbility> {
  fieldsFrom?: GetRuleFields<RuleOf<T>>
}

function deleteKey(this: Record<string, any>, key: string) {
  delete this[key];
}

function setKey(this: Record<string, any>, key: string) {
  this[key] = true;
}

export function permittedFieldsOf<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['can']>[0],
  subject: Parameters<T['can']>[1],
  options: PermittedFieldsOptions<T> = {}
): string[] {
  const fieldsFrom = options.fieldsFrom || getRuleFields;
  const uniqueFields = ability.possibleRulesFor(action, subject)
    .filter(rule => rule.matchesConditions(subject))
    .reverse()
    .reduce((fields, rule) => {
      const names = fieldsFrom(rule);

      if (names) {
        const toggle = rule.inverted ? deleteKey : setKey;
        names.forEach(toggle, fields);
      }

      return fields;
    }, {} as Record<string, true>);

  return Object.keys(uniqueFields);
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
