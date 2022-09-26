import { PureAbility, AbilityOptions, AbilityOptionsOf } from './PureAbility';
import { RawRuleFrom } from './RawRule';
import { AbilityTuple } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';
import { Public, RawRuleOf } from './RuleIndex';

/**
 * @deprecated use createMongoAbility function instead and MongoAbility<Abilities> interface.
 * In the next major version PureAbility will be renamed to Ability and this class will be removed
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

export interface AnyMongoAbility extends Public<PureAbility<any, MongoQuery>> {}
export interface MongoAbility<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery
> extends PureAbility<A, C> {}

export function createMongoAbility<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery
>(rules?: RawRuleFrom<A, C>[], options?: AbilityOptions<A, C>): MongoAbility<A, C>;
export function createMongoAbility<
  T extends AnyMongoAbility = AnyMongoAbility
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createMongoAbility(rules: any[] = [], options = {}): AnyMongoAbility {
  return new PureAbility(rules, {
    conditionsMatcher: mongoQueryMatcher,
    fieldMatcher: fieldPatternMatcher,
    ...options,
  });
}
