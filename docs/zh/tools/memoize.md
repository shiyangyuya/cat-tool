# memoize 缓存函数

## 简介

`memoize` 是一个高阶函数，它接受一个函数 和一个可选的参数 `max`（默认值为 100），返回一个新的函数。该新函数会缓存函数的调用结果，并在相同的输入再次出现时直接从缓存中返回结果，而不是重新计算。这可以显著提高计算密集型函数的性能，尤其是在相同输入重复调用的情况下。

## 参数

- fn: Function - 要进行记忆化的函数。
- max?: number - 缓存的最大容量，默认值为 100。当缓存大小超过此限制时，将删除最旧的条目。

## 返回值

返回一个具有记忆化功能的新函数。该函数接受与原函数相同的参数，并返回相同的结果。

## 使用示例

```typescript
import { memoize } from 'cat-tool'

function async expensiveCalculation(x: number, y: number): number {
  // 假设此处是一个耗时的任务
  return await Promise.resolve(x * x + y * y);
}

const memoizedExpensiveCalculation = Memoize(expensiveCalculation);

console.log(await memoizedExpensiveCalculation(2, 3)); // 计算并缓存结果
console.log(await memoizedExpensiveCalculation(2, 3)); // 直接从缓存中获取结果
```
