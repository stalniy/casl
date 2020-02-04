import { wrapArray } from './utils';
import { UnifiedRawRule, RawRule } from './RawRule';
import { AbilitySubject } from './types';

export type MatchConditions = (object: object) => boolean;
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField = (field: string) => boolean;
export type FieldMatcher = (fields: string[]) => MatchField;

interface RuleOptions<TConditions> {
  conditionsMatcher?: ConditionsMatcher<TConditions>
  fieldMatcher?: FieldMatcher
}

export class Rule<TConditions=any> implements UnifiedRawRule<TConditions> {
  private _matchConditions?: MatchConditions;

  private _matchField?: MatchField;

  public actions: UnifiedRawRule['actions'];

  public subject: UnifiedRawRule['subject'];

  public reason: UnifiedRawRule['reason'];

  public fields: UnifiedRawRule['fields'];

  public inverted: boolean;

  public conditions?: TConditions;

  constructor(params: RawRule, options: RuleOptions<TConditions>) {
    this.actions = 'actions' in params ? params.actions : params.action;
    this.subject = params.subject;
    this.inverted = !!params.inverted;
    this.conditions = params.conditions as unknown as TConditions;
    this.reason = params.reason;
    this.fields = !params.fields || params.fields.length === 0
      ? undefined
      : wrapArray(params.fields);

    if (this.conditions && options.conditionsMatcher) {
      this._matchConditions = options.conditionsMatcher(this.conditions);
    }

    if (this.fields && options.fieldMatcher) {
      this._matchField = options.fieldMatcher(this.fields);
    }
  }

  matchesConditions(object: AbilitySubject): boolean {
    if (!this._matchConditions) {
      return true;
    }

    if (typeof object === 'string' || typeof object === 'function') {
      return !this.inverted;
    }

    return this._matchConditions(object);
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
