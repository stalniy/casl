import sift from 'sift';

function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

export class Rule {
  constructor({ conditions, actions, subject, fields, inverted }) { // eslint-disable-line
    this.conditions = conditions;
    this.actions = actions;
    this.subject = subject;
    this.fields = !fields || fields.length === 0 ? undefined : wrapArray(fields);
    this.inverted = !!inverted;
    this._matches = this.conditions ? sift(this.conditions) : undefined;
  }

  matches(object) {
    if (!this._matches) {
      return true;
    }

    if (typeof object === 'string') {
      return !this.inverted;
    }

    return this._matches(object);
  }

  isRelevantFor(object, field) {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this.fields.indexOf(field) !== -1;
  }
}
