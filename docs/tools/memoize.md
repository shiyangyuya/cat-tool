# memoize Caching Function

## Introduction

`memoize` is a higher-order function that accepts a function and an optional parameter `max` (default value is 100). It returns a new function that caches the results of the original function's calls. When the same inputs are encountered again, it retrieves the result directly from the cache instead of recomputing it. This can significantly improve the performance of computationally intensive functions, especially when they are repeatedly called with the same arguments.

## Parameters

fn: Function - The function to be memoized.
max?: number - The maximum capacity of the cache, defaulting to 100. When the cache size exceeds this limit, the oldest entry will be removed.

## Return Value

Returns a new memoized function. This function accepts the same parameters as the original function and returns the same results.

## Usage Example

```typescript
import { memoize } from 'cat-tool'

async function expensiveCalculation(x: number, y: number): Promise<number> {
// Assume this is a time-consuming task
return await Promise.resolve(x _ x + y _ y);
}
const memoizedExpensiveCalculation = memoize(expensiveCalculation);
console.log(await memoizedExpensiveCalculation(2, 3));
// Computes and caches the result
console.log(await memoizedExpensiveCalculation(2, 3));
// Retrieves the result directly from the cache
```
