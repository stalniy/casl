import { Ability, AbilityOptions, AbilityOptionsOf } from './Ability';
import { RawRuleFrom } from './RawRule';
import { AbilityTuple } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';
import { Public, RawRuleOf } from './RuleIndex';

export interface AnyMongoAbility extends Public<Ability<any, MongoQuery>> {}
export interface MongoAbility<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery
> extends Ability<A, C> {}

/**
 * Creates Ability with MongoDB conditions matcher
 */
export function createMongoAbility<
  T extends AnyMongoAbility = MongoAbility
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createMongoAbility<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery
>(rules?: RawRuleFrom<A, C>[], options?: AbilityOptions<A, C>): MongoAbility<A, C>;
export function createMongoAbility(rules: any[] = [], options = {}): AnyMongoAbility {
  return new Ability(rules, {
    conditionsMatcher: mongoQueryMatcher,
    fieldMatcher: fieldPatternMatcher,
    ...options,
  });
}
