import type { Container, Generic, GenericFactory, Unpack } from './hkt';
import type {
  AnyObject, ClassLike, InstanceOfClass, Subject, SubjectClass, SubjectType, TaggedInterface
} from './types';

export type BuiltinSubjectKey = '__caslSubjectType__';

/** HKT contract: input subjects in `0`, selected rule subject type in `1`. */
export interface SubjectResolverFactory extends GenericFactory {
  produce: {
    subject: Subject
    subjectType: SubjectType
    instance: object
  }
}

export interface SubjectResolver extends Container<SubjectResolverFactory> {}

type Resolve<S extends Subject, R extends SubjectResolver, Name = SubjectType> =
  (Unpack<R> & Generic<S, Name>)['produce'];

export type ResolveSubjects<S extends Subject, R extends SubjectResolver> = Resolve<S, R>['subject'];
export type ResolveSubjectType<S extends Subject, R extends SubjectResolver> =
  Resolve<S, R>['subjectType'];
export type ResolveInstance<
  S extends Subject, Name extends SubjectType, R extends SubjectResolver
> =
  Resolve<S, R, Name>['instance'];

type TagName<S, K extends PropertyKey> = S extends unknown
  ? Extract<S[Extract<keyof S, K>], string>
  : never;
type TaggedInstance<S, Name, K extends PropertyKey> = S extends unknown
  ? S extends Partial<Record<K, unknown>>
    ? Extract<S[Extract<keyof S, K>], Name> extends never ? never : S
    : never
  : never;

type TaggedResolution<S extends Subject, Name, K extends PropertyKey> = {
  subject: S | TagName<S, K>
  subjectType: Extract<S, SubjectType> | TagName<S, K>
  instance: Extract<TaggedInstance<S, Name, K>, object>
};
interface TaggedSubjectFactory<K extends PropertyKey> extends SubjectResolverFactory {
  produce: TaggedResolution<Extract<this[0], Subject>, this[1], K>
}

/** Resolves object subjects using the specified discriminator properties. */
export type TaggedSubject<K extends PropertyKey = BuiltinSubjectKey> =
  Container<TaggedSubjectFactory<K>>;

type ClassInstance<S> = S extends SubjectClass | ClassLike ? InstanceOfClass<S> : never;
type ClassResolution<S extends Subject, Name> = {
  subject: S | ClassInstance<S>
  subjectType: Extract<S, SubjectType>
  instance: ClassInstance<Name>
};
interface ClassSubjectFactory extends SubjectResolverFactory {
  produce: ClassResolution<Extract<this[0], Subject>, this[1]>
}

/** Resolves class identity and instances, including non-public and abstract constructors. */
export type ClassSubject = Container<ClassSubjectFactory>;

type FactoryInstance<S, K extends PropertyKey> =
  S extends Record<K, (...args: any[]) => infer I> ? Extract<I, object> : never;
type FactoryResolution<S extends Subject, Name, K extends PropertyKey> = {
  subject: S | FactoryInstance<S, K>
  subjectType: Extract<S, SubjectType>
  instance: FactoryInstance<Name, K>
};
interface FactorySubjectFactory<K extends PropertyKey> extends SubjectResolverFactory {
  produce: FactoryResolution<Extract<this[0], Subject>, this[1], K>
}

/** Resolves class identity and object instances from a static factory's return type. */
export type FactorySubject<K extends PropertyKey = 'create'> = Container<FactorySubjectFactory<K>>;

type DefaultInstance<S, Name> = Name extends SubjectClass | ClassLike
  ? InstanceOfClass<Name>
  : Name extends (...args: any[]) => infer O
    ? O
    : Name extends string
      ? Exclude<S, SubjectType> extends TaggedInterface<string>
        ? Extract<S, TaggedInterface<Name>>
        : AnyObject
      : never;
type DefaultResolution<S extends Subject, Name> = {
  subject: S
  subjectType: Extract<S, SubjectType> | (S extends TaggedInterface<infer U> ? U : never)
  instance: Extract<DefaultInstance<S, Name>, object>
};
// Distinguish the default strategy when preserving constructor inference in ToAbilityTypes.
declare const defaultSubject: unique symbol;
interface DefaultSubjectFactory extends SubjectResolverFactory {
  readonly [defaultSubject]: true
  produce: DefaultResolution<Extract<this[0], Subject>, this[1]>
}

/** Preserves CASL's default subject extraction and builder inference. */
export type DefaultSubject = Container<DefaultSubjectFactory>;
