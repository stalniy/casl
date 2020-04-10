type Fn = (...args: any[]) => any;
type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;
type AnyRecord = Record<PropertyKey, any>;

export type ValueOf<T> = T extends Record<string, infer U> ? U : never;
export type AnyObject = Record<PropertyKey, unknown>;
export type SubjectClass<N extends string = string> = AnyClass & { modelName?: N };
export type SubjectType = string | SubjectClass | undefined;
export type Subject = AnyRecord | SubjectType;
export type AbilityTuple<X extends string = string, Y extends Subject = Subject> = [X, Y];
export type Abilities = string | AbilityTuple;

export type ToAbilityTypes<T extends Abilities> = T extends AbilityTuple
  ? AbilityTupleType<T[0], ExtractSubjectType<T[1]>>
  : Extract<T, string>;

export type AbilityTupleType<
  T extends string = string,
  U extends SubjectType = SubjectType
> = [T, U];
export type AbilityTypes = string | AbilityTupleType;

export type Normalize<T extends Abilities> = T extends AbilityTuple ? T : [T, undefined?];
export type DetectSubjectType<T extends Subject> = (subject?: T) => string;

export type IfString<T, U> = T extends string ? U : never;
export type AbilityParameters<
  T extends Abilities,
  TupleFunction extends Fn,
  StringFunction extends Fn = () => 0,
  Else = IfString<T, Parameters<StringFunction>>
> = T extends AbilityTuple ? Parameters<TupleFunction> : Else;
export type CanParameters<T extends Abilities, IncludeField extends boolean = true> =
  AbilityParameters<
  T,
  T extends AbilityTuple
    ? IncludeField extends true
      ? (action: T[0], subject: T[1], field?: string) => 0
      : (action: T[0], subject: T[1]) => 0
    : never,
  (action: T) => 0
  >;
export type ExtractSubjectType<S extends Subject> = Extract<S, SubjectType> | TagName<S>;

type SubjectClassWithCustomName<T> = AnyClass & { modelName: T };
export type InferSubjects<T, IncludeTagName extends boolean = false> =
  T | (
    T extends AnyClass<infer I>
      ? I | (
        IncludeTagName extends true
          ? T extends SubjectClassWithCustomName<infer Name> ? Name : TagName<I>
          : never
      )
      : TagName<T>
  );

export type ForcedSubject<T> = { readonly __caslSubjectType__: T };

type TaggedInterface<T extends string> = ForcedSubject<T> | { readonly kind: T };
type TagName<T> = T extends TaggedInterface<infer U> ? U : never;

export type MatchConditions<T extends object = AnyRecord> = (object: T) => boolean;
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField<T extends string> = (field: T) => boolean;
export type FieldMatcher = <T extends string>(fields: T[]) => MatchField<T>;
export type AliasesMap = Record<string, string | string[]>;
export type ResolveAction<T extends string> = (action: T | T[]) => T | T[];
