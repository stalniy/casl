export interface LinkedItem<T> {
  next: LinkedItem<T> | null
  prev: LinkedItem<T> | null
  readonly value: T
}

export const linkedItem = <T>(value: T, prev: LinkedItem<T>['prev']) => {
  const item = { value, prev, next: null };

  if (prev) {
    prev.next = item;
  }

  return item;
};

export const unlinkItem = (item: LinkedItem<any>) => {
  if (item.next) {
    item.next.prev = item.prev;
  }

  if (item.prev) {
    item.prev.next = item.next;
  }

  item.next = item.prev = null; // eslint-disable-line
};
