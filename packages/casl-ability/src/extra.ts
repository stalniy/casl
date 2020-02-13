import { Ability } from './Ability';
import { Rule } from './Rule';
import { UnifiedRawRule, RawRule } from './RawRule';
import { setByPath, wrapArray } from './utils';
import { Subject, AnyObject, SubjectType } from './types';

export type RuleToQueryConverter<
  A extends string,
  S extends Subject,
  C
> = (rule: Rule<A, S, C>) => object;
export interface AbilityQuery {
  $or?: object[]
  $and?: object[]
}

export function rulesToQuery<A extends string, S extends Subject, C>(
  ability: Ability<A, S, C>,
  action: A,
  subject: S,
  convert: RuleToQueryConverter<A, S, C>
): AbilityQuery | null {
  const query: AbilityQuery = {};
  const rules = ability.rulesFor(action, subject);

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

export function rulesToFields<A extends string, S extends Subject, C extends AnyObject>(
  ability: Ability<A, S, C>,
  action: A,
  subject: S
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

const getRuleFields: GetRuleFields = rule => rule.fields;

export type GetRuleFields =
  <A extends string, S extends Subject, C>(rule: Rule<A, S, C>) => string[] | undefined;

export interface PermittedFieldsOptions {
  fieldsFrom?: GetRuleFields
}

export function permittedFieldsOf<A extends string, S extends Subject, C>(
  ability: Ability<A, S, C>,
  action: A,
  subject: S,
  options: PermittedFieldsOptions = {}
): string[] {
  const fieldsFrom = options.fieldsFrom || getRuleFields;
  const uniqueFields = ability.possibleRulesFor(action, subject)
    .filter(rule => rule.matchesConditions(subject))
    .reverse()
    .reduce((fields, rule) => {
      const names = fieldsFrom(rule);

      if (names) {
        const toggle = rule.inverted ? 'delete' : 'add';
        names.forEach(fields[toggle], fields);
      }

      return fields;
    }, new Set<string>());

  return Array.from(uniqueFields);
}

const joinIfArray = (value: string | string[]) => Array.isArray(value) ? value.join(',') : value;

export type PackedRule<A extends string, S extends SubjectType, C> =
  [string, string] |
  [string, string, UnifiedRawRule<A, S, C>['conditions']] |
  [string, string, UnifiedRawRule<A, S, C>['conditions'] | 0, 1] |
  [string, string, UnifiedRawRule<A, S, C>['conditions'] | 0, 1 | 0, string] |
  [string, string, UnifiedRawRule<A, S, C>['conditions'] | 0, 1 | 0, string | 0, string];

export type PackSubjectType<T extends SubjectType> = (type: T) => string;

export function packRules<A extends string, S extends string, C>(
  rules: RawRule<A, S, C>[]
): PackedRule<A, S, C>[];
export function packRules<A extends string, S extends SubjectType, C>(
  rules: RawRule<A, S, C>[],
  packSubject: PackSubjectType<S>
): PackedRule<A, S, C>[];
export function packRules<A extends string, S extends SubjectType, C>(
  rules: RawRule<A, S, C>[],
  packSubject?: PackSubjectType<S>
): PackedRule<A, S, C>[] {
  return rules.map((rule) => { // eslint-disable-line
    const packedRule: PackedRule<A, S, C> = [
      joinIfArray('action' in rule ? rule.action : rule.actions),
      typeof packSubject === 'function'
        ? wrapArray(rule.subject).map(packSubject).join(',')
        : joinIfArray(rule.subject as string),
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

export function unpackRules<A extends string, S extends string, C>(
  rules: PackedRule<A, S, C>[]
): UnifiedRawRule<A, S, C>[];
export function unpackRules<A extends string, S extends SubjectType, C>(
  rules: PackedRule<A, S, C>[],
  unpackSubject: UnpackSubjectType<S>
): UnifiedRawRule<A, S, C>[];
export function unpackRules<A extends string, S extends SubjectType, C>(
  rules: PackedRule<A, S, C>[],
  unpackSubject?: UnpackSubjectType<S>
): UnifiedRawRule<A, S, C>[] {
  return rules.map(([action, subject, conditions, inverted, fields, reason]) => {
    const subjects = subject.split(',');
    const rule: UnifiedRawRule<A, S, C> = {
      inverted: !!inverted,
      action: action.split(',') as A[],
      subject: (typeof unpackSubject === 'function'
        ? subjects.map(unpackSubject)
        : subject.split(',')) as S[]
    };

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
