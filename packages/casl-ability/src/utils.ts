import { AnyObject, Subject, SubjectClass, ForcedSubject, AliasesMap } from './types';

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

export function expandActions(aliasMap: AliasesMap, rawActions: string | string[]) {
  let actions = wrapArray(rawActions);
  let i = 0;

  while (i < actions.length) {
    const action = actions[i++];

    if (aliasMap.hasOwnProperty(action)) {
      actions = actions.concat(aliasMap[action]);
    }
  }

  return actions;
}

function assertAliasMap(aliasMap: AliasesMap) {
  if (aliasMap.manage) {
    throw new Error('Cannot add alias for "manage" action because it is reserved');
  }

  Object.keys(aliasMap).forEach((alias) => {
    const hasError = alias === aliasMap[alias]
      || Array.isArray(aliasMap[alias]) && (
        aliasMap[alias].indexOf(alias) !== -1 || aliasMap[alias].indexOf('manage') !== -1
      );

    if (hasError) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${aliasMap[alias]}`);
    }
  });
}

export function createAliasResolver(aliasMap: AliasesMap) {
  if (process.env.NODE_ENV !== 'production') {
    assertAliasMap(aliasMap);
  }

  return (action: string | string[]) => expandActions(aliasMap, action);
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
