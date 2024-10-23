export function Memoize(fn, max = 100) {
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
