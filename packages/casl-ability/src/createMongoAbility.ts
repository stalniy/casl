import type { DefaultSubject, SubjectResolver } from './SubjectResolver';
import { Ability, AbilityOptions, AbilityOptionsOf } from './Ability';
import { RawRuleFrom } from './RawRule';
import { AbilityTuple } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { fieldPatternMatcher } from './matchers/field';
import { Public, RawRuleOf } from './RuleIndex';

export interface AnyMongoAbility extends Public<Ability<any, MongoQuery, any>> {}
export interface MongoAbility<
  A extends AbilityTuple = AbilityTuple,
  C extends MongoQuery = MongoQuery,
  R extends SubjectResolver = DefaultSubject
> extends Ability<A, C, R> {}

/**
 * Creates Ability with MongoDB conditions matcher
 */
export function createMongoAbility<
  T extends AnyMongoAbility = MongoAbility
>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export function createMongoAbility<
  A extends AbilityTuple,
  C extends MongoQuery,
  R extends SubjectResolver
>(rules?: RawRuleFrom<A, C, R>[], options?: AbilityOptions<A, C, R>): MongoAbility<A, C, R>;
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
