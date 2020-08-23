declare const $value: unique symbol;
export type Container<T> = { [$value]?: T };
export type Unpack<T extends Container<any>> = Exclude<T[typeof $value], undefined>;

export interface Generic<T1 = unknown, T2 = unknown, T3 = unknown, T4 = unknown> {
  0: T1
  1: T2
  2: T3
  3: T4
}
export interface GenericFactory<
  T1 = unknown,
  T2 = unknown,
  T3 = unknown,
  T4 = unknown
> extends Generic<T1, T2, T3, T4> {
  produce: unknown
}
export type ProduceGeneric<T, U> = T extends Container<any>
  ? (Unpack<T> & Generic<U>)['produce']
  : T;
