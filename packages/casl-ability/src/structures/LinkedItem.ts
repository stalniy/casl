export class LinkedItem<T> {
  public next: LinkedItem<T> | null = null;

  constructor(
    public readonly value: T,
    public prev: LinkedItem<T> | null = null
  ) {
    if (prev) {
      prev.next = this;
    }
  }

  destroy() {
    const { next, prev } = this;

    if (next) {
      next.prev = prev;
    }

    if (prev) {
      prev.next = next;
    }

    this.next = this.prev = null; // eslint-disable-line
  }
}
