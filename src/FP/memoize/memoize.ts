export function Memoize<T extends Function>(fn: T, max = 100): (arg: any) => T {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    if (cache.size > max) {
      cache.delete(cache.keys().next().value);
    }
    cache.set(key, result);
    return result;
  };
}
