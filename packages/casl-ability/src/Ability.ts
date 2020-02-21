import { PureAbility, AbilityOptions } from './PureAbility';
import { Subject, ExtractSubjectType as E } from './types';
import { MongoQuery, mongoQueryMatcher } from './matchers/conditions';
import { RawRule } from './RawRule';
import { fieldPatternMatcher } from './matchers/field';

export class Ability<
  Actions extends string = string,
  Subjects extends Subject = Subject
> extends PureAbility<
  Actions,
  Subjects,
  MongoQuery
  > {
  constructor(
    rules?: RawRule<Actions, E<Subjects>, MongoQuery>[],
    options?: AbilityOptions<Subjects, MongoQuery>
  ) {
    super(rules, {
      conditionsMatcher: mongoQueryMatcher,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
