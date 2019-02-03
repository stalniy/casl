import { ForbiddenError } from './error';
import { Rule } from './rule';
import { wrapArray, getSubjectName, clone } from './utils';

const PRIVATE_FIELD = typeof Symbol !== 'undefined' ? Symbol('private') : `__${Date.now()}`;
const DEFAULT_ALIASES = {
  crud: ['create', 'read', 'update', 'delete'],
};

export class Ability {
  static addAlias(alias, actions) {
    if (alias === actions || Array.isArray(actions) && actions.indexOf(alias) !== -1) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${actions.toString()}`);
    }

    DEFAULT_ALIASES[alias] = actions;
    return this;
  }

  constructor(rules, { RuleType = Rule, subjectName = getSubjectName } = {}) {
    this[PRIVATE_FIELD] = {
      RuleType,
      subjectName,
      originalRules: rules || [],
      indexedRules: Object.create(null),
      mergedRules: Object.create(null),
      events: {},
      aliases: clone(DEFAULT_ALIASES)
    };
    this.update(rules);
  }

  update(rules) {
    if (Array.isArray(rules)) {
      const payload = { rules, ability: this };

      this.emit('update', payload);
      this[PRIVATE_FIELD].originalRules = Object.freeze(rules.slice(0));
      this[PRIVATE_FIELD].indexedRules = this.buildIndexFor(rules);
      this[PRIVATE_FIELD].mergedRules = Object.create(null);
      this.emit('updated', payload);
    }

    return this;
  }

  buildIndexFor(rules) {
    const indexedRules = Object.create(null);
    const { RuleType } = this[PRIVATE_FIELD];

    for (let i = 0; i < rules.length; i++) {
      const rule = new RuleType(rules[i]);
      const actions = this.expandActions(rule.actions);
      const subjects = wrapArray(rule.subject);
      const priority = rules.length - i - 1;

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

    return indexedRules;
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

  get rules() {
    return this[PRIVATE_FIELD].originalRules;
  }

  can(action, subject, field) {
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
    const subjectName = this[PRIVATE_FIELD].subjectName(subject);
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

    return mergedRules.filter(Boolean);
  }

  rulesFor(action, subject, field) {
    return this.possibleRulesFor(action, subject)
      .filter(rule => rule.isRelevantFor(subject, field));
  }

  cannot(...args) {
    return !this.can(...args);
  }

  throwUnlessCan(...args) {
    const rule = this.relevantRuleFor(...args);

    if (!rule || rule.inverted) {
      const [action, subject, field] = args;
      const subjectName = this[PRIVATE_FIELD].subjectName(subject);

      throw new ForbiddenError(rule ? rule.reason : null, {
        action,
        subjectName,
        subject,
        field
      });
    }
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
      handlers.forEach(handler => handler(payload));
    }
  }
}
