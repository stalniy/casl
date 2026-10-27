import { type AnyMongoAbility, type MongoAbility } from './createMongoAbility';
import type { ProduceGeneric } from './hkt';
import type { AbilityOptionsOf, AnyAbility } from './Ability';
import type { Generics, RawRuleOf } from './RuleIndex';
import type { AbilityTuple, AnyClass, AnyObject, ExtractSubjectType as E, Normalize, SubjectType, TaggedInterface } from './types';
declare class RuleBuilder<T extends AnyAbility> {
    _rule: RawRuleOf<T>;
    constructor(rule: RawRuleOf<T>);
    because(reason: string): this;
}
type AbilityFactory<T extends AnyAbility> = AnyClass<T> | ((rules?: any[], options?: any) => T);
type InstanceOf<T extends AnyAbility, S extends SubjectType> = S extends AnyClass<infer R> ? R : S extends (...args: any[]) => infer O ? O : S extends string ? Exclude<Normalize<Generics<T>['abilities']>[1], SubjectType> extends TaggedInterface<string> ? Extract<Normalize<Generics<T>['abilities']>[1], TaggedInterface<S>> : AnyObject : never;
type ConditionsOf<T extends AnyAbility, I extends {}> = ProduceGeneric<Generics<T>['conditions'], I>;
type ActionFrom<T extends AbilityTuple, S extends SubjectType> = T extends any ? S extends Extract<T[1], SubjectType> ? T[0] : never : never;
type ActionOf<T extends AnyAbility, S extends SubjectType> = ActionFrom<Generics<T>['abilities'], S>;
type SubjectTypeOf<T extends AnyAbility> = E<Normalize<Generics<T>['abilities']>[1]>;
type SimpleCanParams<T extends AnyAbility> = Parameters<(action: Generics<T>['abilities'] | Generics<T>['abilities'][]) => 0>;
type BuilderCanParameters<S extends SubjectType, I extends InstanceOf<T, S>, T extends AnyAbility> = Generics<T>['abilities'] extends AbilityTuple ? Parameters<(action: ActionOf<T, S> | ActionOf<T, S>[], subject: S | S[], conditions?: ConditionsOf<T, I>) => 0> : SimpleCanParams<T>;
type BuilderCanParametersWithFields<S extends SubjectType, I extends InstanceOf<T, S>, F extends string, T extends AnyAbility> = Generics<T>['abilities'] extends AbilityTuple ? Parameters<(action: ActionOf<T, S> | ActionOf<T, S>[], subject: S | S[], fields?: F | F[], conditions?: ConditionsOf<T, I>) => 0> : SimpleCanParams<T>;
type Keys<T> = string & keyof T;
type AddRule<T extends AnyAbility> = {
    <I extends InstanceOf<T, S>, F extends string = Keys<I>, S extends SubjectTypeOf<T> = SubjectTypeOf<T>>(...args: BuilderCanParametersWithFields<S, I, F | Keys<I>, T>): RuleBuilder<T>;
    <I extends InstanceOf<T, S>, S extends SubjectTypeOf<T> = SubjectTypeOf<T>>(...args: BuilderCanParameters<S, I, T>): RuleBuilder<T>;
};
export declare class AbilityBuilder<T extends AnyAbility> {
    rules: RawRuleOf<T>[];
    private readonly _createAbility;
    can: AddRule<T>;
    cannot: AddRule<T>;
    build: (options?: AbilityOptionsOf<T>) => T;
    constructor(AbilityType: AbilityFactory<T>);
    private _addRule;
}
type DSL<T extends AnyAbility, R> = (can: AbilityBuilder<T>['can'], cannot: AbilityBuilder<T>['cannot']) => R;
export declare function defineAbility<T extends AnyMongoAbility = MongoAbility>(define: DSL<T, Promise<void>>, options?: AbilityOptionsOf<T>): Promise<T>;
export declare function defineAbility<T extends AnyMongoAbility = MongoAbility>(define: DSL<T, void>, options?: AbilityOptionsOf<T>): T;
export {};
