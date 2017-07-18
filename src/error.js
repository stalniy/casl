export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.constructor = ForbiddenError;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(this.message).stack;
    }
  }
}
