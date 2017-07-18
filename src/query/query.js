export function rulesToQuery(rules, convert) {
  const query = {};

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule.conditions) {
      const op = rule.inverted ? '$and' : '$or';
      query[op] = query[op] || [];
      query[op].push(convert(rule));
    }
  }

  return query;
}
