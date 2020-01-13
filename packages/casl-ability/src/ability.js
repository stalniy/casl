import { ForbiddenError } from './error';
import { Rule } from './rule';
import { wrapArray, getSubjectName, clone } from './utils';

const PRIVATE_FIELD = typeof Symbol !== 'undefined' ? Symbol('private') : `__${Date.now()}`;
const DEFAULT_ALIASES = {
  crud: ['create', 'read', 'update', 'delete'],
};

function hasAction(action, actions) {
  return action === actions || Array.isArray(actions) && actions.indexOf(action) !== -1;
}

export class Ability {
  static addAlias(alias, actions) {
    if (alias === 'manage' || hasAction('manage', actions)) {
      throw new Error('Cannot add alias for "manage" action because it represents any action');
    }

    if (hasAction(alias, actions)) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${actions.toString()}`);
    }

    DEFAULT_ALIASES[alias] = actions;
    return this;
  }

  constructor(rules, options = {}) {
    this[PRIVATE_FIELD] = {
      RuleType: options.RuleType || Rule,
      originalRules: rules || [],
      hasPerFieldRules: false,
      indexedRules: Object.create(null),
      mergedRules: Object.create(null),
      events: {},
      aliases: clone(DEFAULT_ALIASES)
    };
    Object.defineProperty(this, 'subjectName', {
      value: options.subjectName || getSubjectName
    });
    Object.defineProperty(this, 'rules', {
      get: () => this[PRIVATE_FIELD].originalRules
    });
    this.update(rules);
  }

  update(rules) {
    if (!Array.isArray(rules)) {
      return this;
    }

    const payload = { rules, ability: this };

    this.emit('update', payload);
    this[PRIVATE_FIELD].originalRules = rules.slice(0);
    this[PRIVATE_FIELD].mergedRules = Object.create(null);

    const index = this.buildIndexFor(rules);

    if (process.env.NODE_ENV !== 'production' && index.isAllInverted && rules.length) {
      // eslint-disable-next-line
      console.warn('[casl]: Ability contains only inverted rules. That means user will not be able to do any actions. This will be changed to Error throw in the next major version')
    }

    this[PRIVATE_FIELD].indexedRules = index.rules;
    this[PRIVATE_FIELD].hasPerFieldRules = index.hasPerFieldRules;

    this.emit('updated', payload);

    return this;
  }

  buildIndexFor(rules) {
    const indexedRules = Object.create(null);
    const { RuleType } = this[PRIVATE_FIELD];
    let isAllInverted = true;
    let hasPerFieldRules = false;

    for (let i = 0; i < rules.length; i++) {
      const rule = new RuleType(rules[i]);
      const actions = this.expandActions(rule.actions);
      const subjects = wrapArray(rule.subject);
      const priority = rules.length - i - 1;

      isAllInverted = !!(isAllInverted && rule.inverted);

      if (!hasPerFieldRules && rule.fields) {
        hasPerFieldRules = true;
      }

      for (let k = 0; k < subjects.length; k++) {
        const subject = subjects[k];
        indexedRules[subject] = indexedRules[subject] || Object.create(null);

        for (let j = 0; j < actions.length; j++) {
          const action = actions[j];
          indexedRules[subject][action] = indexedRules[subject][action] || Object.create(null);
          indexedRules[subject][action][priority] = rule;
        }
      }
    }

    return {
      isAllInverted,
      hasPerFieldRules,
      rules: indexedRules,
    };
  }

  expandActions(rawActions) {
    const { aliases } = this[PRIVATE_FIELD];
    let actions = wrapArray(rawActions);
    let i = 0;

    while (i < actions.length) {
      const action = actions[i++];

      if (aliases.hasOwnProperty(action)) {
        actions = actions.concat(aliases[action]);
      }
    }

    return actions;
  }

  can(action, subject, field) {
    if (field && typeof field !== 'string') {
      // eslint-disable-next-line
      throw new Error('Ability.can expects 3rd parameter to be a string. See https://stalniy.github.io/casl/abilities/2017/07/21/check-abilities.html#checking-fields for details')
    }

    const rule = this.relevantRuleFor(action, subject, field);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(action, subject, field) {
    const rules = this.rulesFor(action, subject, field);

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matches(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  possibleRulesFor(action, subject) {
    const subjectName = this.subjectName(subject);
    const { mergedRules } = this[PRIVATE_FIELD];
    const key = `${subjectName}_${action}`;

    if (!mergedRules[key]) {
      mergedRules[key] = this.mergeRulesFor(action, subjectName);
    }

    return mergedRules[key];
  }

  mergeRulesFor(action, subjectName) {
    const { indexedRules } = this[PRIVATE_FIELD];
    const mergedRules = [subjectName, 'all'].reduce((rules, subjectType) => {
      const subjectRules = indexedRules[subjectType];

      if (!subjectRules) {
        return rules;
      }

      return Object.assign(rules, subjectRules[action], subjectRules.manage);
    }, []);

    // TODO: think whether there is a better way to prioritize rules
    // or convert sparse array to regular one
    return mergedRules.filter(Boolean);
  }

  rulesFor(action, subject, field) {
    const rules = this.possibleRulesFor(action, subject);

    if (!this[PRIVATE_FIELD].hasPerFieldRules) {
      return rules;
    }

    return rules.filter(rule => rule.isRelevantFor(subject, field));
  }

  cannot(...args) {
    return !this.can(...args);
  }

  throwUnlessCan(...args) {
    console.warn(`
      Ability.throwUnlessCan is deprecated and will be removed in 4.x version.
      Please use "ForbiddenError.from(ability).throwUnlessCan(...)" instead.
    `.trim());
    ForbiddenError.from(this).throwUnlessCan(...args);
  }

  on(event, handler) {
    const { events } = this[PRIVATE_FIELD];
    let isAttached = true;

    if (!events[event]) {
      events[event] = [];
    }

    events[event].push(handler);

    return () => {
      if (isAttached) {
        const index = events[event].indexOf(handler);
        events[event].splice(index, 1);
        isAttached = false;
      }
    };
  }

  emit(event, payload) {
    const handlers = this[PRIVATE_FIELD].events[event];

    if (handlers) {
      handlers.slice(0).forEach(handler => handler(payload));
    }
  }
}
