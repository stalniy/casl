import sift, { Query as SiftQuery } from 'sift';
import { ConditionsMatcher as Matcher, MatchConditions } from '../Rule';

export type MongoQuery = Record<PropertyKey, object | string | number | null | boolean | SiftQuery>;
export const mongoQueryMatcher: Matcher<MongoQuery> = conditions => sift(conditions as SiftQuery);
export const callableMatcher: Matcher<MatchConditions> = conditions => conditions;
