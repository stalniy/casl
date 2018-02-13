import sift from 'sift';

export class Rule {
  constructor(params) {
    this.conditions = params.conditions;
    this.actions = params.actions;
    this.subject = params.subject;
    this.inverted = !!params.inverted;
    this._matches = this.conditions ? sift(this.conditions) : null;
  }

  matches(object) {
    return !this._matches || this._matches(object);
  }
}
