import {
  AbilityOptions,
  AbilityOptionsOf,
  AbilityTuple,
  fieldPatternMatcher,
  PureAbility,
  RawRuleFrom,
  RawRuleOf
} from '@casl/ability';
import { typeormQuery } from './typeorm/typeormQuery';

export function createAbilityFactory<
  TModelName extends string,
  TTypeormQuery extends Record<string, any>
>() {
  function createAbility<
    T extends PureAbility<any, TTypeormQuery>
  >(rules?: RawRuleOf<T>[], options?: AbilityOptionsOf<T>): T;
  function createAbility<
    A extends AbilityTuple = [string, TModelName],
    C extends TTypeormQuery = TTypeormQuery
  >(
    rules?: RawRuleFrom<A, C>[],
    options?: AbilityOptions<A, C>
  ): PureAbility<A, C>;
  function createAbility(rules: any[] = [], options = {}): PureAbility<any, any> {
    return new PureAbility(rules, {
      ...options,
      conditionsMatcher: typeormQuery,
      fieldMatcher: fieldPatternMatcher,
    });
  }

  return createAbility;
}
