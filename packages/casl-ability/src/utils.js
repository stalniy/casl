export function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

export function setByPath(object, path, value) {
  let ref = object;
  let lastKey = path;

  if (path.indexOf('.') !== -1) {
    const keys = path.split('.');

    lastKey = keys.pop();
    ref = keys.reduce((res, prop) => {
      res[prop] = res[prop] || {};
      return res[prop];
    }, object);
  }

  ref[lastKey] = value;
}

export function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;

  return Type.modelName || Type.name;
}
