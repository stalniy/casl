import { RawRule } from '../RawRule';
import { SubjectType } from '../types';
export type PackRule<T extends RawRule<any, any>> = [
    string,
    string
] | [
    string,
    string,
    T['conditions']
] | [
    string,
    string,
    T['conditions'] | 0,
    1
] | [
    string,
    string,
    T['conditions'] | 0,
    1 | 0,
    string
] | [
    string,
    string,
    T['conditions'] | 0,
    1 | 0,
    string | 0,
    string
];
export type PackSubjectType<T extends SubjectType> = (type: T) => string;
export declare function packRules<T extends RawRule<any, any>>(rules: readonly T[], packSubject?: PackSubjectType<T['subject']>): PackRule<T>[];
export type UnpackSubjectType<T extends SubjectType> = (type: string) => T;
export declare function unpackRules<T extends RawRule<any, any>>(rules: PackRule<T>[], unpackSubject?: UnpackSubjectType<T['subject']>): T[];
