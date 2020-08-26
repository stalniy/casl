import type { Condition } from '@ucast/mongo2js';
import { wrapArray } from './utils';
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

function validate<A extends Abilities, C>(rule: RawRuleFrom<A, C>, options: RuleOptions<A, C>) {
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

type ResolveAction<T> = (action: T | T[]) => T | T[];
export interface RuleOptions<A extends Abilities, Conditions> {
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
  resolveAction: ResolveAction<Normalize<A>[0]>
}

export class Rule<A extends Abilities, C> {
  private readonly _matchConditions: MatchConditions | undefined;
  private readonly _matchField: MatchField<string> | undefined;
  public readonly action!: Tuple<A>[0] | Tuple<A>[0][];
  public readonly subject!: Tuple<A>[1] | Tuple<A>[1][];
  public readonly inverted!: boolean;
  public readonly conditions!: C | undefined;
  public readonly fields!: string[] | undefined;
  public readonly reason!: string | undefined;
  public readonly ast?: Condition;

  constructor(rule: RawRule<ToAbilityTypes<A>, C>, options: RuleOptions<A, C>) {
    validate(rule, options);

    this.action = options.resolveAction(rule.action);
    this.subject = rule.subject!;
    this.inverted = !!rule.inverted;
    this.conditions = rule.conditions;
    this.reason = rule.reason;
    this.fields = rule.fields ? wrapArray(rule.fields) : undefined;

    if (this.conditions) {
      this._matchConditions = options.conditionsMatcher!(this.conditions);
      this.ast = this._matchConditions!.ast;
    }

    if (this.fields) {
      this._matchField = options.fieldMatcher!(this.fields);
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
