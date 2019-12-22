const getDefaultMessage = error => `Cannot execute "${error.action}" on "${error.subjectName}"`;
let defaultErrorMessage = getDefaultMessage;

export class ForbiddenError extends Error {
  static setDefaultMessage(messageOrFn) {
    if (messageOrFn === null) {
      defaultErrorMessage = getDefaultMessage;
    } else {
      defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
    }
  }

  static from(ability) {
    const error = new this('');
    Object.defineProperty(error, 'ability', { value: ability });
    return error;
  }

  constructor(message, options = {}) {
    super(message);
    this._setMetadata(options);
    this.message = message || defaultErrorMessage(this);
    this._customMessage = null;

    if (typeof Error.captureStackTrace === 'function') {
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }

  setMessage(message) {
    this._customMessage = message;
    return this;
  }

  throwUnlessCan(action, subject, field) {
    if (!this.ability) {
      throw new ReferenceError('Cannot throw FordiddenError without respective ability instance');
    }

    const rule = this.ability.relevantRuleFor(action, subject, field);

    if (rule && !rule.inverted) {
      return;
    }

    this._setMetadata({
      action,
      subject,
      field,
      subjectName: this.ability.subjectName(subject)
    });

    const reason = rule ? rule.reason : '';
    this.message = this._customMessage || reason || defaultErrorMessage(this);
    throw this; // eslint-disable-line
  }

  _setMetadata(options) {
    this.subject = options.subject;
    this.subjectName = options.subjectName;
    this.action = options.action;
    this.field = options.field;
  }
}
