import { setByPath } from './utils';

export function rulesToQuery(ability, action, subject, convert) {
  const rules = ability.possibleRulesFor(action, subject);
  const query = {};

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
    }

    query[op] = query[op] || [];
    query[op].push(convert(rule));
  }

  return query.$or ? query : null;
}

function assignFields(fields, conditions) {
  Object.keys(conditions).forEach((key) => {
    const value = conditions[key];

    if (!value || value.constructor !== Object) {
      setByPath(fields, key, value);
    }
  });
}

export function rulesToFields(ability, action, subject) {
  const rules = ability.possibleRulesFor(action, subject);
  let fields = null;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (!rule.conditions) {
      if (rule.inverted) {
        break;
      } else {
        return {};
      }
    }

    if (!rule.inverted) {
      fields = fields || {};
      assignFields(fields, rule.conditions);
    }
  }

  return fields;
}

const getRuleFields = rule => rule.fields;

export function permittedFieldsOf(ability, action, subject, options = {}) {
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
    }, new Set());

  return Array.from(uniqueFields);
}

const joinIfArray = value => Array.isArray(value) ? value.join(',') : value;

export function packRules(rules) {
  return rules.map(({ actions, subject, conditions, inverted, fields, reason }) => { // eslint-disable-line
    const rule = [
      joinIfArray(actions),
      joinIfArray(subject),
      conditions || 0,
      inverted ? 1 : 0,
      joinIfArray(fields) || 0,
      reason || 0
    ];

    while (!rule[rule.length - 1]) rule.pop();

    return rule;
  });
}

export function unpackRules(rules) {
  return rules.map(([actions, subject, conditions, inverted, fields, reason]) => ({
    actions: actions.split(','),
    subject: subject.split(','),
    inverted: !!inverted,
    conditions: conditions || null,
    fields: fields ? fields.split(',') : null,
    reason: reason || null
  }));
}
