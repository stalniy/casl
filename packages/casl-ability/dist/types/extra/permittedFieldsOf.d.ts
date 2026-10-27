import { AnyAbility } from '../Ability';
import { Rule } from '../Rule';
import { RuleOf } from '../RuleIndex';
import { Subject, SubjectType } from '../types';
export type GetRuleFields<R extends Rule<any, any>> = (rule: R) => string[];
export interface PermittedFieldsOptions<T extends AnyAbility> {
    fieldsFrom: GetRuleFields<RuleOf<T>>;
}
export declare function permittedFieldsOf<T extends AnyAbility>(ability: T, action: Parameters<T['can']>[0], subject: Parameters<T['can']>[1], options: PermittedFieldsOptions<T>): string[];
export type GetSubjectTypeAllFieldsExtractor = (subjectType: SubjectType) => string[];
/**
 * Helper class to make custom `accessibleFieldsBy` helper function
 */
export declare class AccessibleFields<T extends Subject> {
    private readonly _ability;
    private readonly _action;
    private readonly _getAllFields;
    constructor(_ability: AnyAbility, _action: string, _getAllFields: GetSubjectTypeAllFieldsExtractor);
    /**
     * Returns accessible fields for Model type
     */
    ofType(subjectType: Extract<T, SubjectType>): string[];
    /**
     * Returns accessible fields for particular document
     */
    of(subject: Exclude<T, SubjectType>): string[];
    private _getRuleFields;
}
