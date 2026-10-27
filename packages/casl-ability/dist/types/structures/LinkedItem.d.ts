export interface LinkedItem<T> {
    next: LinkedItem<T> | null;
    prev: LinkedItem<T> | null;
    readonly value: T;
}
export declare function linkedItem<T>(value: T, prev: LinkedItem<T>['prev']): {
    value: T;
    prev: LinkedItem<T> | null;
    next: null;
};
export declare function unlinkItem(item: LinkedItem<any>): void;
