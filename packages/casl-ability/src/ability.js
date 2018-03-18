import { ForbiddenError } from './error';
import { Rule } from './rule';

function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;

  return Type.modelName || Type.name;
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

const DEFAULT_ALIASES = {
  manage: ['create', 'read', 'update', 'delete'],
};
const PRIVATE_FIELD = typeof Symbol !== 'undefined' ? Symbol.for('private') : `__private${Date.now()}`;

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
      rules: {},
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
      this[PRIVATE_FIELD].rules = this.buildIndexFor(this.rules);
      this.emit('updated', payload);
    }

    return this;
  }

  buildIndexFor(rules) {
    const indexedRules = {};
    const { RuleType } = this[PRIVATE_FIELD];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const actions = this.expandActions(rule.actions);

      for (let j = 0; j < actions.length; j++) {
        const action = actions[j];
        const subjects = Array.isArray(rule.subject) ? rule.subject : [rule.subject];

        for (let k = 0; k < subjects.length; k++) {
          const subject = subjects[k];
          indexedRules[subject] = indexedRules[subject] || {};
          indexedRules[subject][action] = indexedRules[subject][action] || [];
          indexedRules[subject][action].unshift(new RuleType(rule));
        }
      }
    }

    return indexedRules;
  }

  expandActions(rawActions) {
    const actions = Array.isArray(rawActions) ? rawActions : [rawActions];
    const { aliases } = this[PRIVATE_FIELD];

    return actions.reduce((expanded, action) => {
      if (aliases.hasOwnProperty(action)) {
        return expanded.concat(this.expandActions(aliases[action]));
      }

      return expanded;
    }, actions);
  }

  get rules() {
    return this[PRIVATE_FIELD].originalRules;
  }

  can(action, subject, field) {
    const rules = this.rulesFor(action, subject, field);

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matches(subject)) {
        return !rules[i].inverted;
      }
    }

    return false;
  }

  rulesFor(action, subject, field) {
    const subjectName = this[PRIVATE_FIELD].subjectName(subject);
    const { rules } = this[PRIVATE_FIELD];
    const specificRules = rules.hasOwnProperty(subjectName) ? rules[subjectName][action] : null;
    const generalRules = rules.hasOwnProperty('all') ? rules.all[action] : null;
    const relevantRules = (specificRules || []).concat(generalRules || []);

    return relevantRules.filter(rule => rule.matchesField(subject, field));
  }

  cannot(...args) {
    return !this.can(...args);
  }

  throwUnlessCan(action, subject) {
    if (this.cannot(action, subject)) {
      throw new ForbiddenError(`Cannot execute "${action}" on "${this[PRIVATE_FIELD].subjectName(subject)}"`);
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
