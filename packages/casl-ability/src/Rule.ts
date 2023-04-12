import { wrapArray, isSubjectType } from './utils';
import {
  MatchConditions,
  MatchField,
  Abilities,
  ToAbilityTypes,
  Normalize,
  ConditionsMatcher,
  FieldMatcher,
} from './types';
import { RawRule, RawRuleFrom } from './RawRule';

type Tuple<A extends Abilities> = Normalize<ToAbilityTypes<A>>;

function validate(rule: RawRuleFrom<Abilities, any>, options: RuleOptions<any>) {
  if (Array.isArray(rule.fields) && !rule.fields.length) {
    throw new Error('`rawRule.fields` cannot be an empty array. https://bit.ly/390miLa');
  }

  if (rule.fields && !options.fieldMatcher) {
    throw new Error('You need to pass "fieldMatcher" option in order to restrict access by fields');
  }

  if (rule.conditions && !options.conditionsMatcher) {
    throw new Error('You need to pass "conditionsMatcher" option in order to restrict access by conditions');
  }
}

export interface RuleOptions<Conditions> {
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
  resolveAction(action: string | string[]): string | string[]
}

export class Rule<A extends Abilities, C> {
  private _matchConditions: MatchConditions | undefined;
  private _matchField: MatchField<string> | undefined;
  private readonly _options!: RuleOptions<C>;
  public readonly action!: Tuple<A>[0] | Tuple<A>[0][];
  public readonly subject!: Tuple<A>[1] | Tuple<A>[1][];
  public readonly inverted!: boolean;
  public readonly conditions!: C | undefined;
  public readonly fields!: string[] | undefined;
  public readonly reason!: string | undefined;
  public readonly origin!: RawRule<ToAbilityTypes<A>, C>;
  public readonly priority!: number;

  constructor(
    rule: RawRule<ToAbilityTypes<A>, C>,
    options: RuleOptions<C>,
    priority: number = 0
  ) {
    validate(rule, options);

    this.action = options.resolveAction(rule.action);
    this.subject = rule.subject!;
    this.inverted = !!rule.inverted;
    this.conditions = rule.conditions;
    this.reason = rule.reason;
    this.origin = rule;
    this.fields = rule.fields ? wrapArray(rule.fields) : undefined;
    this.priority = priority;
    this._options = options;
  }

  private _conditionsMatcher() {
    if (this.conditions && !this._matchConditions) {
      this._matchConditions = this._options.conditionsMatcher!(this.conditions);
    }

    return this._matchConditions!;
  }

  get ast() {
    const matches = this._conditionsMatcher();
    return matches ? matches.ast : undefined;
  }

  matchesConditions(object: Normalize<A>[1] | undefined): boolean {
    if (!this.conditions) {
      return true;
    }

    if (!object || isSubjectType(object)) {
      return !this.inverted;
    }

    const matches = this._conditionsMatcher();
    return matches(object as Record<string, unknown>);
  }

  matchesField(field: string | undefined): boolean {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    if (this.fields && !this._matchField) {
      this._matchField = this._options.fieldMatcher!(this.fields);
    }

    return this._matchField!(field);
  }
}
