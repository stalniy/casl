const json = (...args) => JSON.stringify(args);

export function memoize(fn, generateKey = json) {
  const cache = new Map();
  const memoized = function (...args) {
    const key = generateKey(...args);

    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }

    return cache.get(key);
  };
  memoized.cache = cache;

  return memoized;
}
