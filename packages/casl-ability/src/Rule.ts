import { wrapArray } from './utils';
import {
  MatchConditions,
  ConditionsMatcher,
  MatchField,
  FieldMatcher,
  Abilities,
  ToAbilityTypes,
  Normalize
} from './types';
import { RawRule } from './RawRule';

export interface RuleOptions<TConditions> {
  conditionsMatcher?: ConditionsMatcher<TConditions>
  fieldMatcher?: FieldMatcher
}

type Tuple<A extends Abilities> = Normalize<ToAbilityTypes<A>>;

export class Rule<A extends Abilities, C> {
  private readonly _matchConditions?: MatchConditions;
  private readonly _matchField?: MatchField<string>;
  public readonly action: Tuple<A>[0] | Tuple<A>[0][];
  public readonly subject: Tuple<A>[1] | Tuple<A>[1][];
  public readonly inverted: boolean;
  public readonly conditions?: C;
  public readonly fields?: string[];
  public readonly reason: string | undefined;

  constructor(rule: RawRule<ToAbilityTypes<A>, C>, options: RuleOptions<C>) {
    this.action = (rule as any).actions || (rule as any).action;
    this.subject = rule.subject;
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

  matchesConditions(object: Normalize<A>[1] | undefined): boolean {
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
