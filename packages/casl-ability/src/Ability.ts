import { PureAbility, AbilityOptions } from './PureAbility';
import { Subject, ExtractSubjectType as E } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { RawRule } from './RawRule';
import { fieldPatternMatcher } from './matchers/field';

export class Ability<
  Actions extends string = string,
  Subjects extends Subject = Subject,
  C extends MongoQuery = MongoQuery
> extends PureAbility<
  Actions,
  Subjects,
  C
  > {
  constructor(
    rules?: RawRule<Actions, E<Subjects>, C>[],
    options?: AbilityOptions<Subjects, C>
  ) {
    super(rules, {
      conditionsMatcher: mongoQueryMatcher,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
