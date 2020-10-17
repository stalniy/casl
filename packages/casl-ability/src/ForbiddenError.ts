import { AnyAbility } from './PureAbility';
import { Normalize } from './types';
import { Generics } from './RuleIndex';
import { getSubjectTypeName } from './utils';

export type GetErrorMessage = (error: ForbiddenError<AnyAbility>) => string;
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

  static from<T extends AnyAbility>(ability: T) {
    return new this(ability);
  }

  private constructor(ability: T) {
    super('');
    this.ability = ability;

    if (typeof Error.captureStackTrace === 'function') {
      this.name = 'ForbiddenError';
      Error.captureStackTrace(this, this.constructor);
    }
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  throwUnlessCan(...args: Parameters<T['can']>) {
    const rule = this.ability.relevantRuleFor(...args);

    if (rule && !rule.inverted) {
      return;
    }

    this.action = args[0];
    this.subject = args[1];
    this.subjectType = getSubjectTypeName(this.ability.detectSubjectType(args[1]));
    this.field = args[2];

    const reason = rule ? rule.reason : '';
    // eslint-disable-next-line no-underscore-dangle
    this.message = this.message || reason || (this.constructor as any)._defaultErrorMessage(this);
    throw this; // eslint-disable-line
  }
}
