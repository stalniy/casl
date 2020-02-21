import { AnyAbility, AbilityParameters } from './PureAbility';
import { Subject } from './types';

export type GetErrorMessage = <T extends AnyAbility>(error: ForbiddenError<T>) => string;

const getDefaultMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectName}"`;
let defaultErrorMessage = getDefaultMessage;

type ForbiddenErrorMeta = {
  action: string
  subject: Subject | undefined
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

export class ForbiddenError<T extends AnyAbility> extends MyError {
  private _ability: T;
  public action!: AbilityParameters<T>['action'];
  public subject!: AbilityParameters<T>['subject'];
  public field?: string;
  public subjectName!: string;

  static setDefaultMessage(messageOrFn: string | GetErrorMessage) {
    if (messageOrFn === null) {
      defaultErrorMessage = getDefaultMessage;
    } else {
      defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
    }
  }

  static from<T extends AnyAbility>(ability: T) {
    return new this(ability);
  }

  private constructor(ability: T, options?: ForbiddenErrorMeta) {
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

  throwUnlessCan(...args: Parameters<T['can']>) {
    const [action, subject, field] = args;
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
