export type ValueOf<T> = T extends Record<string, infer U> ? U : never;
type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;
export type AnyObject = Record<PropertyKey, unknown>;
export type SubjectClass<N extends string = string> = AnyClass & { modelName?: N };
export type SubjectType = string | SubjectClass | undefined;
export type Subject = object | SubjectType;
export type AbilityTuple<X extends string = string, Y extends Subject = Subject> = [X, Y];
export type Abilities = string | AbilityTuple;
export type Normalize<T extends Abilities> = T extends AbilityTuple ? T : [T, 'all'?];
export type DetectSubjectType<T extends Subject> = (subject?: T) => string;

type CanParametersWithSubject<T extends Abilities, Else, IncludeField> =
  T extends AbilityTuple<infer A, infer S>
    ? IncludeField extends true
      ? Parameters<(action: A, subject: S, field?: string) => 0>
      : Parameters<(action: A, subject: S) => 0>
    : Else;
export type CanParameters<T extends Abilities, IncludeField = true> = CanParametersWithSubject<
T,
[T] extends [string] ? Parameters<(action: T, subject?: 'all') => 0> : never,
IncludeField
>;
export type ExtractSubjectType<S extends Subject> = Extract<S, SubjectType> | TagName<S>;
export type CollectSubjects<T, IncludeTagName = true> =
  T |
  (
    T extends AnyClass<infer I>
      ? I | (
        IncludeTagName extends true
          ? (T extends SubjectClass<infer Name> ? Name : TagName<I>)
          : never
      )
      : TagName<T>
  );
type TaggedInterface<T extends string> =
  { readonly __caslSubjectType__: T } |
  { readonly type: T } |
  { readonly kind: T } |
  { readonly tag: T };
type TagName<T> = T extends TaggedInterface<infer U> ? U : never;

export type MatchConditions = (object: object) => boolean;
export type ConditionsMatcher<T> = (conditions: T) => MatchConditions;
export type MatchField<T extends string> = (field: T) => boolean;
export type FieldMatcher = <T extends string>(fields: T[]) => MatchField<T>;
