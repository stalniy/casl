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
    return !this._matches || typeof object === 'string' || this._matches(object);
  }

  matchesField(object, field) {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this.fields.indexOf(field) !== -1;
  }
}
