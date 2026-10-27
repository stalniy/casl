import { Ability, AbilityOptions, AbilityOptionsOf } from './Ability';
import { RawRuleFrom } from './RawRule';
import { AbilityTuple } from './types';
import { MongoQuery } from './matchers/conditions';
import { Public, RawRuleOf } from './RuleIndex';
export interface AnyMongoAbility extends Public<Ability<any, MongoQuery>> {
}
export interface MongoAbility<A extends AbilityTuple = AbilityTuple, C extends MongoQuery = MongoQuery> extends Ability<A, C> {
}
/**
 * Creates Ability with MongoDB conditions matcher
 */
export declare function createMongoAbility<T extends AnyMongoAbility = MongoAbility>(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
export declare function createMongoAbility<A extends AbilityTuple = AbilityTuple, C extends MongoQuery = MongoQuery>(rules?: RawRuleFrom<A, C>[], options?: AbilityOptions<A, C>): MongoAbility<A, C>;
