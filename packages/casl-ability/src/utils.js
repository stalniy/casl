export function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

export function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;

  return Type.modelName || Type.name;
}
