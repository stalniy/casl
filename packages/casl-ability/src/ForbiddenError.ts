import { AnyAbility } from './PureAbility';
import { Normalize, Subject } from './types';
import { Generics } from './RuleIndex';
import { getSubjectTypeName } from './utils';

export type GetErrorMessage = (error: ForbiddenError<AnyAbility>) => string;
/** @deprecated will be removed in the next major release */
export const getDefaultErrorMessage: GetErrorMessage = error => `Cannot execute "${error.action}" on "${error.subjectType}"`;

const NativeError = function NError(this: Error, message: string) {
  this.message = message;
} as unknown as new (message: string) => Error;

NativeError.prototype = Object.create(Error.prototype);

export class ForbiddenError<T extends AnyAbility> extends NativeError {
  public readonly ability!: T;
  public action!: Normalize<Generics<T>['abilities']>[0];
  public subject!: Generics<T>['abilities'][1];
  public field?: string;
  public subjectType!: string;

  static _defaultErrorMessage = getDefaultErrorMessage;

  static setDefaultMessage(messageOrFn: string | GetErrorMessage) {
    this._defaultErrorMessage = typeof messageOrFn === 'string' ? () => messageOrFn : messageOrFn;
  }

  static from<U extends AnyAbility>(ability: U): ForbiddenError<U> {
    return new this<U>(ability);
  }

  private constructor(ability: T) {
    super('');
    this.ability = ability;

    if (typeof Error.captureStackTrace === 'function') {
      this.name = 'ForbiddenError';
      Error.captureStackTrace(this, this.constructor);
    }
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  throwUnlessCan(...args: Parameters<T['can']>): void
  throwUnlessCan(action: string, subject?: Subject, field?: string): void {
    const error = (this as any).unlessCan(action, subject, field);
    if (error) throw error;
  }

  unlessCan(...args: Parameters<T['can']>): this | undefined
  unlessCan(action: string, subject?: Subject, field?: string): this | undefined {
    const rule = this.ability.relevantRuleFor(action, subject, field);

    if (rule && !rule.inverted) {
      return;
    }

    this.action = action;
    this.subject = subject;
    this.subjectType = getSubjectTypeName(this.ability.detectSubjectType(subject));
    this.field = field;

    const reason = rule ? rule.reason : '';
    // eslint-disable-next-line no-underscore-dangle
    this.message = this.message || reason || (this.constructor as any)._defaultErrorMessage(this);
    return this; // eslint-disable-line consistent-return
  }
}
