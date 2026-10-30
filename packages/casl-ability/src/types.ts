import type { Condition } from '@ucast/mongo2js';
import { Container, GenericFactory } from './hkt';
import type { DefaultSubject, ResolveSubjects, ResolveSubjectType, SubjectResolver, BuiltinSubjectKey } from './SubjectResolver';

type Fn = (...args: any[]) => any;
export type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;
type AnyRecord = Record<PropertyKey, any>;

export type AnyObject = Record<PropertyKey, unknown>;
export type SubjectClass<N extends string = string> = AnyClass & { modelName?: N };

/** @deprecated use FactorySubject or custom subject type resolver instead */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ClassLike<N extends string = string> = Function & { prototype: any; modelName?: N };
export type SubjectType = string | SubjectClass | ClassLike;
export type Subject = AnyRecord | SubjectType;
export type AbilityTuple<X extends string = string, Y extends Subject = Subject> = [X, Y];
export type Abilities = AbilityTuple | string;

type DefaultAbilityTypes<T extends Abilities> = T extends AbilityTuple
  ? AbilityTupleType<T[0], Extract<T[1], SubjectType> | TagName<T[1]>>
  : T & string;
export type ToAbilityTypes<T extends Abilities, R extends SubjectResolver = DefaultSubject> =
  R extends DefaultSubject ? DefaultAbilityTypes<T> : ResolvedAbilityTypes<T, R>;
type ResolvedAbilityTypes<T extends Abilities, R extends SubjectResolver> = T extends AbilityTuple
  ? AbilityTupleType<T[0], ExtractSubjectType<T[1], R>>
  : T & string;

export type AbilityTupleType<
  T extends string = string,
  U extends SubjectType = SubjectType
> = [T, U];
export type AbilityTypes = string | AbilityTupleType;
export type Normalize<T extends Abilities> = T extends AbilityTuple ? T : [T, string];
export type AbilityActions<T extends Abilities> = Normalize<T>[0];

export type IfString<T, U> = T extends string ? U : never;
/** @deprecated use CanParametersForAction or reference Ability['can'] directly */
export type AbilityParameters<
  T extends Abilities,
  TupleFunction extends Fn,
  StringFunction extends Fn = () => 0,
  Else = IfString<T, Parameters<StringFunction>>
> = T extends AbilityTuple ? Parameters<TupleFunction> : Else;

export type CanParametersForAction<
  Action extends AbilityActions<T>,
  T extends Abilities,
  R extends SubjectResolver = DefaultSubject,
  IncludeField extends boolean = true,
> = [action: Action, ...RestCanParameters<T, Action, R, IncludeField>];

type RestCanParameters<
  T extends Abilities,
  Action extends Normalize<T>[0],
  R extends SubjectResolver = DefaultSubject,
  IncludeField extends boolean = true,
> = { // eslint-disable-line @typescript-eslint/consistent-indexed-object-style
  // Match Action below because mapped keys collapse literal actions alongside string.
  [K in T[0]]: T extends string
    ? Action extends T
      ? []
      : never
    : Action extends T[0]
      ? IncludeField extends true
        ? [subject: ResolveSubjects<T[1], R>, field?: string]
        : [subject: ResolveSubjects<T[1], R>]
      : never
}[Action];

/** @deprecated use CanParametersForAction or reference Ability['can'] directly */
export type CanParameters<
  T extends Abilities,
  IncludeField extends boolean = true,
  R extends SubjectResolver = DefaultSubject
> = AbilityParameters<
  T,
  T extends AbilityTuple
    ? IncludeField extends true
      ? (action: T[0], subject: ResolveSubjects<T[1], R>, field?: string) => 0
      : (action: T[0], subject: ResolveSubjects<T[1], R>) => 0
    : never,
  (action: Extract<T, string>) => 0
  >;
export type ExtractSubjectType<S extends Subject, R extends SubjectResolver = DefaultSubject> =
  ResolveSubjectType<S, R>;

type SubjectClassWithCustomName<T> = (SubjectClass | ClassLike) & { modelName: T };
export type InstanceOfClass<T> = T extends AnyClass<infer I>
  ? I
  : T extends { prototype: infer I } ? I : never;

/**
 * @deprecated direct usage during Ability configuration is not needed anymore.
 *             Otherwise use ResolveSubjects or ExtractSubjectType instead. */
export type InferSubjects<T, IncludeTagName extends boolean = false> =
  T | (
    T extends SubjectClass | ClassLike
      ? InstanceOfClass<T> | (
        IncludeTagName extends true
          ? T extends SubjectClassWithCustomName<infer Name> ? Name : TagName<InstanceOfClass<T>>
          : never
      )
      : TagName<T>
  );

export type ForcedSubject<T> = Readonly<Record<BuiltinSubjectKey, T>>

/** @deprecated use DefaultSubject, TaggedSubject or ClassSubject instead */
export type TaggedInterface<T extends string> = ForcedSubject<T> |
{ readonly kind: T } |
{ readonly __typename: T };
type TagName<T> = T extends TaggedInterface<infer U> ? U : never;

interface MatchConditionsFactory extends GenericFactory<{}> {
  produce: MatchConditions<this[0]>
}

export type MatchConditions<T extends {} = AnyRecord> = Container<MatchConditionsFactory> & {
  (object: T): boolean
  ast?: Condition
  matchesAll?: boolean
};
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField<T extends string> = (field: T) => boolean;
export type FieldMatcher = <T extends string>(fields: T[]) => MatchField<T>;
export type AliasesMap = Record<string, string | string[]>;
