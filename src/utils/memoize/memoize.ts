/**
 * 缓存函数的结果以提高性能。
 * @param fn - 需要被缓存的函数。可以是同步或异步函数。
 * @param max - 缓存的最大条目数，默认为 100。
 * @returns 返回一个新的函数，该函数具有与 `fn` 相同的参数和返回类型，但会缓存结果以提高性能。
 */
export function memoize<T extends Function>(fn: T, max = 100): (arg: any) => T {
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
