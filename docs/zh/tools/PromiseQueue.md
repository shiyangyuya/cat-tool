# PromiseQueue 异步队列控制

## 概述

用于控制异步任务并发执行数量的队列类。它允许你限制同时运行的 Promise 数量，确保不会因为并发过多而导致资源耗尽或性能下降。

## 使用方式

1. 创建实例`new PromiseQueue(maxConcurrency: number)`，传入最大并发数。
2. 使用 `enqueue`方法添加任务到队列中。每个任务是一个返回 Promise 的函数。

## 示例

```typescript
const queue = new PromiseQueue(2);
const task1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1"), 1000));
const task2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2"), 2000));
const task3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 3"), 3000));
const task4 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 4"), 4000));
queue.enqueue(task1).then(console.log); // Task 1
queue.enqueue(task2).then(console.log); // Task 2
queue.enqueue(task3).then(console.log); // Task 3
queue.enqueue(task4).then(console.log); // Task 4
```
