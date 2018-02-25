export function ForbiddenError(message) {
  Error.call(this);
  this.message = message;
  this.constructor = ForbiddenError;

  if (typeof Error.captureStackTrace === 'function') {
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error(this.message).stack;
  }
}

ForbiddenError.prototype = Object.create(Error.prototype);
