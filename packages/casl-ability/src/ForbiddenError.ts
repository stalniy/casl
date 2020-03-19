import { AnyAbility, AbilityParameters } from './PureAbility';
import { Subject } from './types';

export type GetErrorMessage = <T extends AnyAbility>(error: ForbiddenError<T>) => string;
export const getDefaultErrorMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectType}"`;

type ForbiddenErrorMeta = {
  action: string
  subject: Subject | undefined
  field?: string
  subjectType: string
};

function setMeta(error: ForbiddenErrorMeta, meta?: ForbiddenErrorMeta) {
  if (meta) {
    error.subject = meta.subject;
    error.subjectType = meta.subjectType;
    error.action = meta.action;
    error.field = meta.field;
  }
}

const MyError = Error; // to prevent babel of doing it's magic around native classes
let defaultErrorMessage = getDefaultErrorMessage;

export class ForbiddenError<T extends AnyAbility> extends MyError {
  private _ability: T;
  public action!: AbilityParameters<T>['abilities'][0];
  public subject!: AbilityParameters<T>['abilities'][1];
  public field?: string;
  public subjectType!: string;

  static setDefaultMessage(messageOrFn: string | GetErrorMessage) {
    defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
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
    const rule = this._ability.relevantRuleFor(...args);

    if (rule && !rule.inverted) {
      return;
    }

    const subject = args[1] as Subject;
    setMeta(this, {
      action: args[0],
      subject,
      field: args[2],
      subjectType: this._ability.detectSubjectType(subject)
    });

    const reason = rule ? rule.reason : '';
    this.message = this.message || reason || defaultErrorMessage(this);
    throw this; // eslint-disable-line
  }
}
