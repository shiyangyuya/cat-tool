/**
 * 一个并发控制的队列类，确保同时运行的任务数量不超过指定的最大并发数。
 * @class PromiseQueue
 * @example
 * const queue = new PromiseQueue(2);
 * const task1 = () => new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
 * const task2 = () => new Promise((resolve) => setTimeout(() => resolve('Task 2'), 2000));
 * const task3 = () => new Promise((resolve) => setTimeout(() => resolve('Task 3'), 3000));
 * const task4 = () => new Promise((resolve) => setTimeout(() => resolve('Task 4'), 4000));
 * queue.enqueue(task1).then(console.log);
 * queue.enqueue(task2).then(console.log);
 * queue.enqueue(task3).then(console.log);
 * queue.enqueue(task4).then(console.log);
 */

interface ResultItem {
  type: 'resolve' | 'reject';
  value: unknown;
  queueIndex: number;
}
export class PromiseQueue {
  private maxConcurrency: number;
  private running: number;
  private queue: (() => Promise<void>)[];
  private result: ResultItem[];
  private queueIndex: number;
  constructor(maxConcurrency: number) {
    this.maxConcurrency = maxConcurrency;
    this.running = 0;
    this.queue = [];
    this.result = [];
    this.queueIndex = 0;
  }
  enqueue<T>(task: () => Promise<T>): Promise<T> {
    const queueIndex = this.queueIndex;
    ++this.queueIndex;
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          this.result.push({
            type: 'resolve',
            value: result,
            queueIndex,
          });
          resolve(result);
        } catch (error) {
          this.result.push({
            type: 'reject',
            value: error,
            queueIndex,
          });
          reject(error);
        } finally {
          this.running -= 1;
          this.runNext();
        }
      });
      this.runNext();
    });
  }
  private runNext() {
    while (this.running < this.maxConcurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        this.running += 1;
        task();
      }
    }
  }
  finish() {
    return this.result;
  }
}
