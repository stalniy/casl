export type ValueOf<T> = T extends Record<string, infer U> ? U : never;
export type AnyClass = new (...args: any[]) => any;
export type SubjectConstructor<N extends string = string> = AnyClass & { modelName: N };
export type AnyObject = Record<PropertyKey, unknown>;
export type SubjectType = string | SubjectConstructor | AnyClass;
export type Subject = object | SubjectType;
export type GetSubjectName<T extends Subject> = (subject: T) => string;

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
