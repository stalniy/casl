import { PureAbility, AbilityOptions } from './PureAbility';
import { Abilities, Normalize } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { RawRule } from './RawRule';
import { fieldPatternMatcher } from './matchers/field';

export type AnyMongoAbility = PureAbility<any, MongoQuery>;

export class Ability<
  A extends Abilities = Abilities,
  C extends MongoQuery = MongoQuery
> extends PureAbility<A, C> {
  constructor(rules?: RawRule<A, C>[], options?: AbilityOptions<Normalize<A>[1], C>) {
    super(rules, {
      conditionsMatcher: mongoQueryMatcher,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
