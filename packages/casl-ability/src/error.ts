import { AbilitySubject, GetSubjectName } from './utils';
import Rule from './rule';

export type GetErrorMessage = (error: ForbiddenError) => string;

const getDefaultMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectName}"`;
let defaultErrorMessage = getDefaultMessage;

type ForbiddenErrorMeta = {
  action: string
  subject: AbilitySubject
  field?: string
  subjectName: string
};

interface AbilityLike {
  relevantRuleFor(action: string, subject: AbilitySubject, field?: string): Rule | null;
  subjectName: GetSubjectName
}

interface ForbiddenErrorType {
  (this: ForbiddenError, message: string, options?: ForbiddenErrorMeta): void
  from: (ability: AbilityLike) => ForbiddenError
  setDefaultMessage(messageOrFn: string | GetErrorMessage): void
}

type ExtendedError = Error & ForbiddenErrorMeta;

interface ForbiddenError extends ExtendedError {
  _customMessage: string | null
  _ability?: AbilityLike

  setMessage(message: string | null): this
  throwUnlessCan(action: string, subject: AbilitySubject, field?: string): void
  _setMetadata(meta: ForbiddenErrorMeta): void
}

const ForbiddenError: ForbiddenErrorType = Object.assign(
  function ForbiddenError(this: ForbiddenError, message: string, options?: ForbiddenErrorMeta) {
    Error.call(this, message);

    if (options) {
      this._setMetadata(options);
    }

    this.message = message || defaultErrorMessage(this);
    this._customMessage = null;

    if (typeof Error.captureStackTrace === 'function') {
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  },
  {
    setDefaultMessage(messageOrFn: string | GetErrorMessage): void {
      if (messageOrFn === null) {
        defaultErrorMessage = getDefaultMessage;
      } else {
        defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
      }
    },

    from(ability: AbilityLike): ForbiddenError {
      const error = new (this as any)('');
      Object.defineProperty(error, '_ability', { value: ability });
      return error;
    }
  }
);

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

Object.assign(ForbiddenError.prototype, {
  setMessage(this: ForbiddenError, message: string | null): ForbiddenError {
    this._customMessage = message;
    return this;
  },

  throwUnlessCan(this: ForbiddenError, action: string, subject: AbilitySubject, field?: string) {
    if (!this._ability) {
      throw new ReferenceError('Cannot throw FordiddenError without respective ability instance');
    }

    const rule = this._ability.relevantRuleFor(action, subject, field);

    if (rule && !rule.inverted) {
      return;
    }

    this._setMetadata({
      action,
      subject,
      field,
      subjectName: this._ability.subjectName(subject)
    });

    const reason = rule ? rule.reason : '';
    this.message = this._customMessage || reason || defaultErrorMessage(this);
    throw this; // eslint-disable-line
  },

  _setMetadata(this: ForbiddenError, meta: ForbiddenErrorMeta): void {
    this.subject = meta.subject;
    this.subjectName = meta.subjectName;
    this.action = meta.action;
    this.field = meta.field;
  },
});

export default ForbiddenError;
