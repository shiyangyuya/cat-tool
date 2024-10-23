/**
 * 缓存函数的结果以提高性能。
 * @param fn - 需要被缓存的函数。可以是同步或异步函数。
 * @param max - 缓存的最大条目数，默认为 100。
 * @returns 返回一个新的函数，该函数具有与 `fn` 相同的参数和返回类型，但会缓存结果以提高性能。
 */
export declare function memoize<T extends Function>(fn: T, max?: number): (arg: any) => T;
