import { BuildMongoQuery, createFactory, DefaultOperators } from '@ucast/mongo2js';
import { Container, GenericFactory } from '../hkt';
import { AnyObject, ConditionsMatcher } from '../types';
declare const defaultInstructions: {
    $eq: import("@ucast/mongo2js").FieldInstruction<unknown, import("@ucast/mongo2js").FieldParsingContext>;
    $ne: import("@ucast/mongo2js").FieldInstruction<unknown, import("@ucast/mongo2js").FieldParsingContext>;
    $lt: import("@ucast/mongo2js").FieldInstruction<import("@ucast/mongo2js").Comparable, import("@ucast/mongo2js").FieldParsingContext>;
    $lte: import("@ucast/mongo2js").FieldInstruction<import("@ucast/mongo2js").Comparable, import("@ucast/mongo2js").FieldParsingContext>;
    $gt: import("@ucast/mongo2js").FieldInstruction<import("@ucast/mongo2js").Comparable, import("@ucast/mongo2js").FieldParsingContext>;
    $gte: import("@ucast/mongo2js").FieldInstruction<import("@ucast/mongo2js").Comparable, import("@ucast/mongo2js").FieldParsingContext>;
    $in: import("@ucast/mongo2js").FieldInstruction<unknown[], import("@ucast/mongo2js").FieldParsingContext>;
    $nin: import("@ucast/mongo2js").FieldInstruction<unknown[], import("@ucast/mongo2js").FieldParsingContext>;
    $all: import("@ucast/mongo2js").FieldInstruction<unknown[], import("@ucast/mongo2js").FieldParsingContext>;
    $size: import("@ucast/mongo2js").FieldInstruction<number, import("@ucast/mongo2js").FieldParsingContext>;
    $regex: import("@ucast/mongo2js").FieldInstruction<string | RegExp, import("@ucast/mongo2js").RegExpFieldContext>;
    $options: import("@ucast/mongo2js").FieldInstruction<unknown, import("@ucast/mongo2js").FieldParsingContext>;
    $elemMatch: import("@ucast/mongo2js").FieldInstruction<(import("@ucast/mongo2js").MongoQueryFieldOperators<any> & import("@ucast/mongo2js").MongoQueryTopLevelOperators<any>) | ({
        [x: string]: any;
    } & import("@ucast/mongo2js").MongoQueryTopLevelOperators<any>), import("@ucast/mongo2js").ObjectQueryFieldParsingContext>;
    $exists: import("@ucast/mongo2js").FieldInstruction<boolean, import("@ucast/mongo2js").FieldParsingContext>;
};
interface MongoQueryFactory extends GenericFactory {
    produce: MongoQuery<this[0]>;
}
type MergeUnion<T, Keys extends keyof T = keyof T> = {
    [K in Keys]: T[K];
};
export type MongoQuery<T = AnyObject> = BuildMongoQuery<MergeUnion<T>, {
    toplevel: {};
    field: Pick<DefaultOperators<MergeUnion<T>>['field'], keyof typeof defaultInstructions>;
}> & Container<MongoQueryFactory>;
type MongoQueryMatcherFactory = (...args: Partial<Parameters<typeof createFactory>>) => ConditionsMatcher<MongoQuery>;
export declare const buildMongoQueryMatcher: MongoQueryMatcherFactory;
export declare const mongoQueryMatcher: import("@ucast/mongo2js").Filter;
export type { MongoQueryFieldOperators, MongoQueryOperators, MongoQueryTopLevelOperators } from '@ucast/mongo2js';
