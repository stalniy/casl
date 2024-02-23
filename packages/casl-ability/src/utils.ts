import { AnyObject, Subject, SubjectType, SubjectClass, ForcedSubject, AliasesMap } from './types';

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
    if (!Object.hasOwn(object, TYPE_FIELD)) {
      Object.defineProperty(object, TYPE_FIELD, { value: type });
    } else if (type !== object[TYPE_FIELD]) {
      throw new Error(`Trying to cast object to subject type ${type} but previously it was casted to ${object[TYPE_FIELD]}`);
    }
  }

  return object as U & ForcedSubject<T>;
}

export const isSubjectType = (value: unknown): value is SubjectType => {
  const type = typeof value;
  return type === 'string' || type === 'function';
};

const getSubjectClassName = (value: SubjectClass) => value.modelName || value.name;
export function getSubjectTypeName(value: SubjectType) {
  return typeof value === 'string' ? value : getSubjectClassName(value);
}

export function detectSubjectType(object: Exclude<Subject, SubjectType>): string {
  if (Object.hasOwn(object, TYPE_FIELD)) {
    return object[TYPE_FIELD];
  }

  return getSubjectClassName(object.constructor as SubjectClass);
}

export const DETECT_SUBJECT_TYPE_STRATEGY = {
  function: (object: Exclude<Subject, SubjectType>) => object.constructor as SubjectClass,
  string: detectSubjectType
};

type AliasMerge = (actions: string[], action: string | string[]) => string[];
function expandActions(aliasMap: AliasesMap, rawActions: string | string[], merge: AliasMerge) {
  let actions = wrapArray(rawActions);
  let i = 0;

  while (i < actions.length) {
    const action = actions[i++];

    if (Object.hasOwn(aliasMap, action)) {
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
