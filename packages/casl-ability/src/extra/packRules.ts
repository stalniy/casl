
import { RawRule } from '../RawRule';
import { SubjectType } from '../types';
import { wrapArray } from '../utils';

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
  return rules.map((rule) => {
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

    while (packedRule.length > 0 && !packedRule[packedRule.length - 1]) packedRule.pop();

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

    if (conditions) rule.conditions = conditions;
    if (fields) rule.fields = fields.split(',');
    if (reason) rule.reason = reason;

    return rule;
  });
}
