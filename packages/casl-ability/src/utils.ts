import { AnyObject, GetSubjectName, SubjectConstructor } from './types';

export function wrapArray<T>(value: T[] | T): T[] {
  return Array.isArray(value) ? value : [value];
}

export function setByPath(object: AnyObject, path: string, value: unknown): void {
  let ref = object;
  let lastKey = path;

  if (path.indexOf('.') !== -1) {
    const keys = path.split('.');

    lastKey = keys.pop()!;
    ref = keys.reduce((res, prop) => {
      res[prop] = res[prop] || {};
      return res[prop] as AnyObject;
    }, object);
  }

  ref[lastKey] = value;
}

export const getSubjectName: GetSubjectName = (subject) => {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;
  return (Type as SubjectConstructor).modelName || Type.name;
};

export function isObject(value: unknown): value is object {
  return value && typeof value === 'object';
}

export function isStringOrNonEmptyArray(value: string | string[]): boolean {
  if (!value || !value.length) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.every(item => typeof item === 'string');
  }

  return typeof value === 'string';
}

export type AliasesMap = Record<string, string | string[]>;
export function expandActions(aliases: AliasesMap, rawActions: string | string[]) {
  let actions = wrapArray(rawActions);
  let i = 0;

  while (i < actions.length) {
    const action = actions[i++];

    if (aliases.hasOwnProperty(action)) {
      actions = actions.concat(aliases[action]);
    }
  }

  return actions;
}
