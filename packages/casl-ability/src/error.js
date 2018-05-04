export function ForbiddenError(message, options = {}) {
  Error.call(this);
  this.constructor = ForbiddenError;
  this.subject = options.subject;
  this.subjectName = options.subjectName;
  this.action = options.action;
  this.field = options.field;
  this.message = message || `Cannot execute "${this.action}" on "${this.subjectName}"`;

  if (typeof Error.captureStackTrace === 'function') {
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error(this.message).stack;
  }
}

ForbiddenError.prototype = Object.create(Error.prototype);
