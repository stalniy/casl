import { Ability } from './ability';
import { getSubjectName } from './utils';

function isStringOrNonEmptyArray(value) {
  return ![].concat(value).some(item => typeof item !== 'string');
}

function isObject(value) {
  return value && typeof value === 'object';
}

export class RuleBuilder {
  constructor(rule) {
    this.rule = rule;
  }

  because(reason) {
    this.rule.reason = reason;
    return this;
  }
}

export class AbilityBuilder {
  static define(params, dsl) {
    const options = typeof params === 'function' ? {} : params;
    const define = params === options ? dsl : params;
    const builder = new this(options);
    const result = define(builder.can.bind(builder), builder.cannot.bind(builder));
    const buildAbility = () => new Ability(builder.rules, options);

    return result && typeof result.then === 'function' ? result.then(buildAbility) : buildAbility();
  }

  static extract() {
    const builder = new this();

    return {
      can: builder.can.bind(builder),
      cannot: builder.cannot.bind(builder),
      rules: builder.rules
    };
  }

  constructor({ subjectName = getSubjectName } = {}) {
    this.rules = [];
    this.subjectName = subjectName;
  }

  can(actions, subject, conditionsOrFields, conditions) {
    if (!isStringOrNonEmptyArray(actions)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    const subjectName = [].concat(subject).map(this.subjectName);

    if (!isStringOrNonEmptyArray(subjectName)) {
      throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name/type or an array of subject names/types');
    }

    const rule = { actions, subject: subjectName };

    if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
      rule.fields = conditionsOrFields;
    }

    if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
      rule.conditions = conditions || conditionsOrFields;
    }

    this.rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(...args) {
    const builder = this.can(...args);
    builder.rule.inverted = true;

    return builder;
  }
}
