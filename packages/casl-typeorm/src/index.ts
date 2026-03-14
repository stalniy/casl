import {
  AbilityOptions,
  AbilityTuple,
  fieldPatternMatcher,
  PureAbility,
  RawRuleFrom
} from '@casl/ability';
import { typeormQuery } from './typeorm/typeormQuery';

export { typeormQuery } from './typeorm/typeormQuery';
export type { Model, Subjects, ExtractModelName } from './typeorm/typeormQuery';
export { accessibleBy } from './accessibleBy';
export { createAbilityFactory } from './createAbilityFactory';
export { ParsingQueryError } from './errors/ParsingQueryError';
export type {
  TypeormModel,
  TypeormWhereInput,
  TypeormQueryFactory,
  BaseTypeormQuery,
} from './types';

export type TypeormQuery = Record<string, any>;

export function createTypeormAbility<
  T extends PureAbility<any, any>
>(rules?: RawRuleFrom<any, any>[], options?: AbilityOptions<any, any>): T;
export function createTypeormAbility<
  A extends AbilityTuple = [string, string],
  C extends TypeormQuery = TypeormQuery
>(
  rules?: RawRuleFrom<A, C>[],
  options?: AbilityOptions<A, C>
): PureAbility<A, C>;
export function createTypeormAbility(rules: any[] = [], options = {}): PureAbility<any, any> {
  return new PureAbility(rules, {
    ...options,
    conditionsMatcher: typeormQuery,
    fieldMatcher: fieldPatternMatcher,
  });
}
