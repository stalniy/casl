import { Ability } from './Ability';
import { AbilitySubject } from './types';

export type GetErrorMessage = (error: ForbiddenError) => string;

const getDefaultMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectName}"`;
let defaultErrorMessage = getDefaultMessage;

type ForbiddenErrorMeta = {
  action: string
  subject: AbilitySubject
  field?: string
  subjectName: string
};

interface ForbiddenErrorContructor {
  new (ability: Ability, options?: ForbiddenErrorMeta): ForbiddenError
  from: (ability: Ability) => ForbiddenError
  setDefaultMessage(messageOrFn: string | GetErrorMessage): void
}

type ExtendedError = Error & ForbiddenErrorMeta;

interface ForbiddenError extends ExtendedError {
  _ability: Ability

  setMessage(message: string | null): this
  throwUnlessCan(action: string, subject: AbilitySubject, field?: string): void
}

function setMeta(error: ForbiddenError, meta?: ForbiddenErrorMeta) {
  if (meta) {
    error.subject = meta.subject;
    error.subjectName = meta.subjectName;
    error.action = meta.action;
    error.field = meta.field;
  }
}

const ForbiddenError = function ForbiddenError(
  this: ForbiddenError,
  ability: Ability,
  options?: ForbiddenErrorMeta
) {
  Error.call(this, '');
  this._ability = ability;
  setMeta(this, options);

  if (typeof Error.captureStackTrace === 'function') {
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
} as Function as ForbiddenErrorContructor;

ForbiddenError.setDefaultMessage = function setMessage(messageOrFn: string | GetErrorMessage) {
  if (messageOrFn === null) {
    defaultErrorMessage = getDefaultMessage;
  } else {
    defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
  }
};

ForbiddenError.from = function fromAbility(ability: Ability): ForbiddenError {
  return new this(ability);
};

ForbiddenError.prototype = Object.assign(Object.create(Error.prototype), {
  constructor: ForbiddenError,

  setMessage(this: ForbiddenError, message: string) {
    this.message = message;
    return this;
  },

  throwUnlessCan(this: ForbiddenError, action: string, subject: AbilitySubject, field?: string) {
    const rule = this._ability.relevantRuleFor(action, subject, field);

    if (rule && !rule.inverted) {
      return;
    }

    setMeta(this, {
      action,
      subject,
      field,
      subjectName: this._ability.subjectName(subject)
    });

    const reason = rule ? rule.reason : '';
    this.message = this.message || reason || defaultErrorMessage(this);
    throw this; // eslint-disable-line
  },
});

export default ForbiddenError;
