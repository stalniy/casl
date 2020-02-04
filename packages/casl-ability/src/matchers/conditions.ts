import '../sift';
import sift, { Query as SiftQuery } from 'sift';
import { ConditionsMatcher as Matcher, MatchConditions } from '../Rule';

export const mongoQueryMatcher: Matcher<object> = conditions => sift(conditions as SiftQuery);
export const callableMatcher: Matcher<MatchConditions> = conditions => conditions;
