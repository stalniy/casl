type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? true
  : false;
type AvoidDistribution<U> = [U];
export type IfExtends<X, Value, Then, Else> =
  Equals<X, any> extends true
    ? Else
    : AvoidDistribution<X> extends AvoidDistribution<Value>
      ? Then
      : AvoidDistribution<Value> extends AvoidDistribution<X>
        ? Then | Else
        : Else;
export type ValueOf<T> = T extends Record<string, infer U> ? U : never;
export type AnyClass = new (...args: any[]) => any;
export type SubjectConstructor<N extends string = string> = AnyClass & { modelName: N };
export type AnyObject = Record<PropertyKey, unknown>;
export type SubjectType = string | SubjectConstructor | AnyClass;
export type Subject = object | SubjectType;
export type GetSubjectName<T extends Subject> = (subject?: T) => string;
export type CanParameters<A, S, IncludeField = true> = IfExtends<
S,
'all',
Parameters<(action: A, subject?: 'all') => never>,
IncludeField extends true
  ? Parameters<(action: A, subject: S, field?: string) => never>
  : Parameters<(action: A, subject: S) => never>
>;

export type ExtractSubjectType<S extends Subject> = Extract<S, SubjectType>;
export type CollectSubjects<T, IncludeTagName = unknown> =
  T |
  (
    T extends new (...args: any[]) => infer I
      ? I | IncludeTagName & (
        T extends SubjectConstructor<infer N> ? N : TagName<I>
      )
      : TagName<T>
  );
type TaggedInterface<T extends string> =
  { readonly type: T } |
  { readonly kind: T } |
  { readonly tag: T };
type TagName<T> = T extends TaggedInterface<infer U> ? U : unknown;
