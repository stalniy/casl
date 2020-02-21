import { wrapArray } from './utils';
import { RawRule } from './RawRule';
import { ExtractSubjectType as E, Subject } from './types';

export type MatchConditions = (object: object) => boolean;
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField<T extends string> = (field: T) => boolean;
export type FieldMatcher = <T extends string>(fields: T[]) => MatchField<T>;

interface RuleOptions<TConditions> {
  conditionsMatcher?: ConditionsMatcher<TConditions>
  fieldMatcher?: FieldMatcher
}

export class Rule<A extends string, S extends Subject, C = unknown> {
  private readonly _matchConditions?: MatchConditions;
  private readonly _matchField?: MatchField<string>;
  public readonly action: A | A[];
  public readonly subject: E<S> | E<S>[];
  public readonly inverted: boolean;
  public readonly conditions?: C;
  public readonly fields?: string[];
  public readonly reason: string | undefined;

  constructor(rule: RawRule<A, E<S>, C>, options: RuleOptions<C>) {
    this.action = 'actions' in rule ? rule.actions : rule.action;
    this.subject = rule.subject as E<S> | E<S>[];
    this.inverted = !!rule.inverted;
    this.conditions = rule.conditions;
    this.reason = rule.reason;
    this.fields = !rule.fields || rule.fields.length === 0
      ? undefined
      : wrapArray(rule.fields);

    if ('actions' in rule) {
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

  matchesConditions(object: S | undefined): boolean {
    if (!this._matchConditions) {
      return true;
    }

    if (!object || typeof object === 'string' || typeof object === 'function') {
      return !this.inverted;
    }

    return this._matchConditions(object as object);
  }

  matchesField(field: string | undefined): boolean {
    if (!this._matchField) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this._matchField(field);
  }
}
