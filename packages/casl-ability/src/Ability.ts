import { PureAbility, AbilityOptions } from './PureAbility';
import { Public } from './RuleIndex';
import { RawRuleFrom } from './RawRule';
import { AbilityTuple } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';

/**
 * @deprecated use `createMongoAbility` function instead
 */
export class Ability<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery
> extends PureAbility<A, C> {
  constructor(rules: RawRuleFrom<A, C>[] = [], options: AbilityOptions<A, C> = {}) {
    super(rules, {
      conditionsMatcher: mongoQueryMatcher,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}

export type AnyMongoAbility = Public<Ability<any, MongoQuery>>;
