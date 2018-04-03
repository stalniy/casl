export function rulesToQuery(ability, action, subject, convert) {
  const query = {};
  const ignoreOperators = {};
  const rules = ability.rulesFor(action, subject);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const op = rule.inverted ? '$and' : '$or';

    if (!rule.conditions) {
      if (rule.inverted) {
        return null;
      }

      if (query[op]) {
        delete query[op];
      }

      ignoreOperators[op] = true;
    } else if (!ignoreOperators.hasOwnProperty(op)) {
      query[op] = query[op] || [];
      query[op].push(convert(rule));
    }
  }

  return rules.length > 0 ? query : null;
}

const getRuleFields = rule => rule.fields;

export function permittedFieldsOf(ability, action, subject, options = {}) {
  const fieldsFrom = options.fieldsFrom || getRuleFields;
  const uniqueFields = ability.possibleRulesFor(action, subject)
    .slice(0)
    .reverse()
    .filter(rule => rule.matches(subject))
    .reduce((fields, rule) => {
      const names = fieldsFrom(rule);

      if (names) {
        const toggle = rule.inverted ? 'delete' : 'add';
        names.forEach(fields[toggle], fields);
      }

      return fields;
    }, new Set());

  return Array.from(uniqueFields);
}
