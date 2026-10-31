import { AnyObject, Subject, SubjectType, SubjectClass, ForcedSubject, AliasesMap } from './types';

type HasOwn = (o: Record<PropertyKey, unknown>, prop: PropertyKey) => boolean;
const hasOwn: HasOwn = (Object as any).hasOwn || (hasOwnProperty => (
  (object: object, key: PropertyKey) => hasOwnProperty(object, key)
))(Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty));

export function wrapArray<T>(value: T[] | T): T[] {
  return Array.isArray(value) ? value : [value];
}

const FORBIDDEN_PROPERTIES = new Set(['__proto__', 'constructor', 'prototype']);
export function setByPath(object: AnyObject, path: string, value: unknown): void {
  let ref = object;
  let lastKey = path;

  if (path.indexOf('.') !== -1) {
    const keys = path.split('.');

    lastKey = keys.pop()!;
    ref = keys.reduce((res, prop) => {
      if (FORBIDDEN_PROPERTIES.has(prop)) return res;
      const propValue = hasOwn(res, prop) ? res[prop] : undefined;
      res[prop] = propValue && typeof propValue === 'object' && !Array.isArray(propValue)
        ? propValue
        : Object.create(null);
      return res[prop] as AnyObject;
    }, object);
  }

  if (!FORBIDDEN_PROPERTIES.has(lastKey)) {
    ref[lastKey] = value;
  }
}

const TYPE_FIELD = '__caslSubjectType__';
const TYPE_FIELD_SYMBOL = Symbol('caslSubjectType');
type SubjectTypeTag = {
  [TYPE_FIELD]?: unknown;
  [TYPE_FIELD_SYMBOL]?: unknown;
};

export function setSubjectType<
  T extends string,
  U extends Record<PropertyKey, any>
>(type: T, object: U): U & ForcedSubject<T> {
  if (object) {
    if (!hasOwn(object, TYPE_FIELD)) {
      Object.defineProperty(object, TYPE_FIELD, { value: type });
      Object.defineProperty(object, TYPE_FIELD_SYMBOL, { value: type });
    } else if (
      type !== object[TYPE_FIELD] || type !== (object as SubjectTypeTag)[TYPE_FIELD_SYMBOL]
    ) {
      throw new Error(`Trying to cast object to subject type ${type} but previously it was casted to ${object[TYPE_FIELD]}`);
    }
  }

  return object as U & ForcedSubject<T>;
}

export function validateEnforcedSubjectType(value: unknown): void {
  const object = value as SubjectTypeTag;
  if (hasOwn(object, TYPE_FIELD) && object[TYPE_FIELD] !== object[TYPE_FIELD_SYMBOL]) {
    throw new Error(`Untrusted subject type value "${object[TYPE_FIELD]}".`
      + ' Use "subject" helper to set the subject type.');
  }
}

export const isSubjectType = (value: unknown): value is SubjectType => {
  const type = typeof value;
  return type === 'string' || type === 'function';
};

const getSubjectClassName = (value: SubjectClass) => value.modelName || value.name;
export const getSubjectTypeName = (value: SubjectType) => {
  return typeof value === 'string' ? value : getSubjectClassName(value);
};

export function detectSubjectType(subject: Exclude<Subject, SubjectType>): string {
  if (hasOwn(subject, TYPE_FIELD)) {
    return (subject as any)[TYPE_FIELD];
  }

  return getSubjectClassName(subject.constructor as SubjectClass);
}

type AliasMerge = (actions: string[], action: string | string[]) => string[];
function expandActions(aliasMap: AliasesMap, rawActions: string | string[], merge: AliasMerge) {
  let actions = wrapArray(rawActions);
  let i = 0;

  while (i < actions.length) {
    const action = actions[i++];

    if (hasOwn(aliasMap, action)) {
      actions = merge(actions, aliasMap[action]);
    }
  }

  return actions;
}

function findDuplicate(actions: string[], actionToFind: string | string[]) {
  if (typeof actionToFind === 'string' && actions.indexOf(actionToFind) !== -1) {
    return actionToFind;
  }

  for (let i = 0; i < actionToFind.length; i++) {
    if (actions.indexOf(actionToFind[i]) !== -1) return actionToFind[i];
  }

  return null;
}

const defaultAliasMerge: AliasMerge = (actions, action) => actions.concat(action);
function validateForCycles(aliasMap: AliasesMap, reservedAction: string) {
  if (reservedAction in aliasMap) {
    throw new Error(`Cannot use "${reservedAction}" as an alias because it's reserved action.`);
  }

  const keys = Object.keys(aliasMap);
  const mergeAliasesAndDetectCycles: AliasMerge = (actions, action) => {
    const duplicate = findDuplicate(actions, action);
    if (duplicate) throw new Error(`Detected cycle ${duplicate} -> ${actions.join(', ')}`);

    const isUsingReservedAction = typeof action === 'string' && action === reservedAction
      || actions.indexOf(reservedAction) !== -1
      || Array.isArray(action) && action.indexOf(reservedAction) !== -1;
    if (isUsingReservedAction) throw new Error(`Cannot make an alias to "${reservedAction}" because this is reserved action`);

    return actions.concat(action);
  };

  for (let i = 0; i < keys.length; i++) {
    expandActions(aliasMap, keys[i], mergeAliasesAndDetectCycles);
  }
}

export type AliasResolverOptions = { skipValidate?: boolean; anyAction?: string };
export function createAliasResolver(aliasMap: AliasesMap, options?: AliasResolverOptions) {
  if (!options || options.skipValidate !== false) {
    validateForCycles(aliasMap, options && options.anyAction || 'manage');
  }

  return (action: string | string[]) => expandActions(aliasMap, action, defaultAliasMerge);
}

function copyArrayTo<T>(dest: T[], target: T[], start: number) {
  for (let i = start; i < target.length; i++) {
    dest.push(target[i]);
  }
}

export function mergePrioritized<T extends { priority: number }>(
  array?: T[],
  anotherArray?: T[]
): T[] {
  if (!array || !array.length) {
    return anotherArray || [];
  }

  if (!anotherArray || !anotherArray.length) {
    return array || [];
  }

  let i = 0;
  let j = 0;
  const merged: T[] = [];

  while (i < array.length && j < anotherArray.length) {
    if (array[i].priority < anotherArray[j].priority) {
      merged.push(array[i]);
      i++;
    } else {
      merged.push(anotherArray[j]);
      j++;
    }
  }

  copyArrayTo(merged, array, i);
  copyArrayTo(merged, anotherArray, j);

  return merged;
}

export function getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: () => V) {
  let value = map.get(key);

  if (!value) {
    value = defaultValue();
    map.set(key, value);
  }

  return value;
}

export const identity = <T>(x: T) => x;
