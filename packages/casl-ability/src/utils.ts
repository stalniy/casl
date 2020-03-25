import { AnyObject, Subject, SubjectClass, ForcedSubject } from './types';

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

const TYPE_FIELD = '__caslSubjectType__';
export function setSubjectType<
  T extends string,
  U extends Record<PropertyKey, any>
>(type: T, object: U): U & ForcedSubject<T> {
  if (object) {
    if (!object.hasOwnProperty(TYPE_FIELD)) {
      Object.defineProperty(object, TYPE_FIELD, { value: type });
    } else if (type !== object[TYPE_FIELD]) {
      throw new Error(`Trying to cast object to subject type ${type} but previously it was casted to ${object[TYPE_FIELD]}`);
    }
  }

  return object as U & ForcedSubject<T>;
}

export function detectSubjectType<T extends Subject>(subject?: T): string {
  if (!subject) {
    return 'all';
  }

  if (typeof subject === 'string') {
    return subject;
  }

  if (subject.hasOwnProperty(TYPE_FIELD)) {
    return (subject as any)[TYPE_FIELD];
  }

  const Type = typeof subject === 'function' ? subject : subject.constructor;
  return (Type as SubjectClass).modelName || Type.name;
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
