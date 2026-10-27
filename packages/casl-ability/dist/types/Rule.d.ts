import { Abilities, ToAbilityTypes, Normalize, ConditionsMatcher, FieldMatcher } from './types';
import type { RawRule } from './RawRule';
import type { Condition } from '@ucast/mongo2js';
type Tuple<A extends Abilities> = Normalize<ToAbilityTypes<A>>;
export interface RuleOptions<Conditions> {
    conditionsMatcher?: ConditionsMatcher<Conditions>;
    fieldMatcher?: FieldMatcher;
    resolveAction(action: string | string[]): string | string[];
}
export declare class Rule<A extends Abilities, C> {
    private _matchConditions;
    private _matchField;
    private readonly _options;
    readonly action: Tuple<A>[0] | Tuple<A>[0][];
    readonly subject: Tuple<A>[1] | Tuple<A>[1][];
    readonly inverted: boolean;
    readonly conditions: C | undefined;
    readonly fields: string[] | undefined;
    readonly reason: string | undefined;
    readonly origin: RawRule<ToAbilityTypes<A>, C>;
    readonly priority: number;
    constructor(rule: RawRule<ToAbilityTypes<A>, C>, options: RuleOptions<C>, priority?: number);
    private _conditionsMatcher;
    get ast(): Condition<unknown> | undefined;
    matchesConditions(object: Normalize<A>[1] | undefined): boolean;
    matchesField(field: string | undefined): boolean;
}
export {};
