import { Ability } from './Ability';
import { Subject } from './types';

export type GetErrorMessage = <
  A extends string,
  S extends Subject,
  C
>(error: ForbiddenError<A, S, C>) => string;

const getDefaultMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectName}"`;
let defaultErrorMessage = getDefaultMessage;

type ForbiddenErrorMeta = {
  action: string
  subject: Subject
  field?: string
  subjectName: string
};

function setMeta(error: ForbiddenErrorMeta, meta?: ForbiddenErrorMeta) {
  if (meta) {
    error.subject = meta.subject;
    error.subjectName = meta.subjectName;
    error.action = meta.action;
    error.field = meta.field;
  }
}

const MyError = Error; // to prevent babel of doing it's magic around native classes

export default class ForbiddenError<
  Actions extends string,
  Subjects extends Subject,
  Conditions
> extends MyError implements ForbiddenErrorMeta {
  private _ability: Ability<Actions, Subjects, Conditions>;
  public action: ForbiddenErrorMeta['action'] = '';
  public subject: ForbiddenErrorMeta['subject'] = '';
  public field?: ForbiddenErrorMeta['field'];
  public subjectName: ForbiddenErrorMeta['subjectName'] = '';

  static setDefaultMessage(messageOrFn: string | GetErrorMessage) {
    if (messageOrFn === null) {
      defaultErrorMessage = getDefaultMessage;
    } else {
      defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
    }
  }

  static from<A extends string, S extends Subject, C>(ability: Ability<A, S, C>) {
    return new this(ability);
  }

  constructor(ability: Ability<Actions, Subjects, Conditions>, options?: ForbiddenErrorMeta) {
    super('');
    this._ability = ability;
    setMeta(this, options);

    if (typeof Error.captureStackTrace === 'function') {
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  throwUnlessCan(action: Actions, subject: Subjects, field?: string) {
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
  }
}
