import { wrapArray } from './utils';
import { UnifiedRawRule, RawRule } from './RawRule';
import { ExtractSubjectType as E, Subject } from './types';

export type MatchConditions = <T extends object>(object: T) => boolean;
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField<T extends string> = (field: T) => boolean;
export type FieldMatcher = <T extends string>(fields: T[]) => MatchField<T>;

interface RuleOptions<TConditions> {
  conditionsMatcher?: ConditionsMatcher<TConditions>
  fieldMatcher?: FieldMatcher
}

export class Rule<
  A extends string,
  S extends Subject,
  C = unknown
> implements UnifiedRawRule<A, E<S>, C> {
  private readonly _matchConditions?: MatchConditions;
  private readonly _matchField?: MatchField<string>;
  public readonly action: UnifiedRawRule<A, E<S>, C>['action'];
  public readonly subject: UnifiedRawRule<A, E<S>, C>['subject'];
  public readonly inverted: boolean;
  public readonly conditions?: C;
  public readonly fields?: string[];
  public readonly reason: UnifiedRawRule<A, string, C>['reason'];

  constructor(params: RawRule<A, E<S>, C>, options: RuleOptions<C>) {
    this.action = 'actions' in params ? params.actions : params.action;
    this.subject = params.subject;
    this.inverted = !!params.inverted;
    this.conditions = params.conditions;
    this.reason = params.reason;
    this.fields = !params.fields || params.fields.length === 0
      ? undefined
      : wrapArray(params.fields);

    if ('actions' in params) {
      // eslint-disable-next-line
      console.warn('Rule `actions` field is deprecated. Use `action` field instead');
    }

    if (this.conditions && options.conditionsMatcher) {
      this._matchConditions = options.conditionsMatcher(this.conditions);
    }

    if (this.fields && options.fieldMatcher) {
      this._matchField = options.fieldMatcher(this.fields);
    }
  }

  matchesConditions(object: S): boolean {
    if (!this._matchConditions) {
      return true;
    }

    if (typeof object === 'string' || typeof object === 'function') {
      return !this.inverted;
    }

    return this._matchConditions(object as object);
  }

  matchesField(field?: string): boolean {
    if (!this._matchField) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this._matchField(field);
  }
}
