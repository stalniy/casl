import { Ability } from './ability';
import Rule from './rule';
import { RawRule, UnifiedRawRule } from './RawRule';
import { setByPath, AbilitySubject, AnyObject } from './utils';

export type RuleToQueryConverter = (rule: Rule) => object;
export interface AbilityQuery {
  $or?: object[]
  $and?: object[]
}

export function rulesToQuery(
  ability: Ability,
  action: string,
  subject: AbilitySubject,
  convert: RuleToQueryConverter
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

export function rulesToFields(
  ability: Ability,
  action: string,
  subject: AbilitySubject
): AnyObject {
  return ability.rulesFor(action, subject)
    .filter((rule: Rule) => !rule.inverted && rule.conditions)
    .reduce((values: AnyObject, rule: Rule) => {
      const conditions = rule.conditions!;

      return Object.keys(conditions).reduce((fields, fieldName) => {
        const value = conditions[fieldName] as any;

        if (!value || value.constructor !== Object) {
          setByPath(fields, fieldName, value);
        }

        return fields;
      }, values);
    }, {});
}

const getRuleFields: GetRuleFields = (rule: Rule) => rule.fields;

export type GetRuleFields = (rule: Rule) => string[] | undefined;

export interface AccessibleFieldsOptions {
  fieldsFrom?: GetRuleFields
}

export function permittedFieldsOf(
  ability: Ability,
  action: string,
  subject: AbilitySubject,
  options: AccessibleFieldsOptions = {}
): string[] {
  const fieldsFrom = options.fieldsFrom || getRuleFields;
  const uniqueFields = ability.possibleRulesFor(action, subject)
    .filter(rule => rule.matches(subject))
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

export type PackedRule = [
  string,
  string,
  (UnifiedRawRule['conditions'] | 0)?,
  (1 | 0)?,
  (string | 0)?,
  (string | 0)?
];

export function packRules(rules: UnifiedRawRule[]): PackedRule[] {
  return rules.map(({ actions, subject, conditions, inverted, fields, reason }) => { // eslint-disable-line
    const rule: PackedRule = [
      joinIfArray(actions),
      joinIfArray(subject),
      conditions || 0,
      inverted ? 1 : 0,
      fields ? joinIfArray(fields) : 0,
      reason || 0
    ];

    while (!rule[rule.length - 1]) rule.pop();

    return rule;
  });
}

export function unpackRules(rules: PackedRule[]): RawRule[] {
  return rules.map(([actions, subject, conditions, inverted, fields, reason]) => ({
    actions: actions.split(','),
    subject: subject.split(','),
    inverted: !!inverted,
    conditions: conditions || undefined,
    fields: fields ? fields.split(',') : undefined,
    reason: reason || undefined
  }));
}
