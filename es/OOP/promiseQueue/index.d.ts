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
    type: "resolve" | "reject";
    value: unknown;
    queueIndex: number;
}
export declare class PromiseQueue {
    private maxConcurrency;
    private running;
    private queue;
    private result;
    private queueIndex;
    constructor(maxConcurrency: number);
    enqueue<T>(task: () => Promise<T>): Promise<T>;
    private runNext;
    finish(): ResultItem[];
}
export {};
