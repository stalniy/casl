import { Ability } from '../Ability';
import { AnyObject, ExtractSubjectType } from '../types';
/**
 * Extracts rules condition values into an object of default values
 */
export declare function rulesToFields<T extends Ability<any, AnyObject>>(ability: T, action: Parameters<T['rulesFor']>[0], subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>): NullObject;
type NullObject = AnyObject & {
    hasOwnProperty?: never;
    toString?: never;
    valueOf?: never;
};
export {};
