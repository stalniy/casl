import { Ability } from './ability';

function isStringOrNonEmptyArray(value) {
  return typeof value === 'string' || Array.isArray(value) && value.length > 0;
}

export class AbilityBuilder {
  static define(params, dsl) {
    const options = typeof params === 'function' ? {} : params;
    const define = params === options ? dsl : params;
    const builder = new this();
    define(builder.can.bind(builder), builder.cannot.bind(builder));

    return new Ability(builder.rules, options);
  }

  static extract() {
    const builder = new this();

    return {
      can: builder.can.bind(builder),
      cannot: builder.cannot.bind(builder),
      rules: builder.rules
    };
  }

  constructor() {
    this.rules = [];
  }

  can(actions, subject, conditions) {
    if (!isStringOrNonEmptyArray(actions)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    if (!isStringOrNonEmptyArray(subject)) {
      throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name or array of subject names');
    }

    const rule = { actions, subject };

    if (typeof conditions === 'object' && conditions) {
      rule.conditions = conditions;
    }

    this.rules.push(rule);

    return rule;
  }

  cannot(...args) {
    const rule = this.can(...args);
    rule.inverted = true;

    return rule;
  }
}
