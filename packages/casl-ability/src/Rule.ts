import type { DefaultSubject, ResolveSubjects, SubjectResolver } from './SubjectResolver';
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
import type { RawRule, RawRuleFrom } from './RawRule';
import type { Condition } from '@ucast/mongo2js';

type Tuple<A extends Abilities, R extends SubjectResolver> = Normalize<ToAbilityTypes<A, R>>;

function validate(rule: RawRuleFrom<Abilities, any>, options: RuleOptions<any>) {
  if (Array.isArray(rule.fields) && !rule.fields.length) {
    throw new Error('The `rawRule.fields` array cannot be empty. https://bit.ly/390miLa');
  }

  if (rule.fields && !options.fieldMatcher) {
    throw new Error('Cannot restrict access by fields without a "fieldMatcher" option');
  }

  if (rule.conditions && !options.conditionsMatcher) {
    throw new Error('Cannot restrict access by conditions without a "conditionsMatcher" option.' +
      ' Please, provide a "conditionsMatcher" function to your Ability class or use "createMongoAbility" instead.');
  }
}

export interface RuleOptions<Conditions> {
  conditionsMatcher?: ConditionsMatcher<Conditions>
  fieldMatcher?: FieldMatcher
  resolveAction(action: string | string[]): string | string[]
}

export class Rule<A extends Abilities, C, R extends SubjectResolver = DefaultSubject> {
  private _matchConditions: MatchConditions | undefined;
  private _matchField: MatchField<string> | undefined;
  private readonly _options!: RuleOptions<C>;
  public readonly action!: Tuple<A, R>[0] | Tuple<A, R>[0][];
  public readonly subject!: Tuple<A, R>[1] | Tuple<A, R>[1][];
  public readonly inverted!: boolean;
  public readonly conditions!: C | undefined;
  public readonly fields!: string[] | undefined;
  public readonly reason!: string | undefined;
  public readonly origin!: RawRule<ToAbilityTypes<A, R>, C>;
  public readonly priority!: number;

  constructor(
    rule: RawRule<ToAbilityTypes<A, R>, C>,
    options: RuleOptions<C>,
    priority = 0
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

  matchesConditions(object: ResolveSubjects<Normalize<A>[1], R> | undefined): boolean {
    if (!this.conditions) {
      return true;
    }

    if (!object || isSubjectType(object)) {
      if (!this.inverted) return true;
      const matches = this._conditionsMatcher();
      if (!matches) return false;
      return matches.matchesAll === true || !!matches.ast && isMatchesAll(matches.ast);
    }

    const matches = this._conditionsMatcher();
    return matches ? matches(object as Record<string, unknown>) : false;
  }

  matchesField(field: string | undefined): boolean {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      // if there is no field (i.e., checking whether user has access to at least one field on subject)
      // we ignore inverted rules because they disallow to do an action on it, so we are continue looking for regular rule
      return !this.inverted;
    }

    if (!this._matchField) {
      this._matchField = this._options.fieldMatcher!(this.fields);
    }

    return this._matchField ? this._matchField(field) : false;
  }
}

function isMatchesAll(ast: Condition): boolean {
  return (ast.operator === 'and' || ast.operator === 'AND') &&
    Array.isArray(ast.value) &&
    ast.value.length === 0;
}
