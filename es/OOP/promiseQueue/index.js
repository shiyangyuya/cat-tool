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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PromiseQueue {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.running = 0;
        this.queue = [];
        this.result = [];
        this.queueIndex = 0;
    }
    enqueue(task) {
        const queueIndex = this.queueIndex;
        ++this.queueIndex;
        return new Promise((resolve, reject) => {
            this.queue.push(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield task();
                    this.result.push({
                        type: "resolve",
                        value: result,
                        queueIndex,
                    });
                    resolve(result);
                }
                catch (error) {
                    this.result.push({
                        type: "reject",
                        value: error,
                        queueIndex,
                    });
                    reject(error);
                }
                finally {
                    this.running -= 1;
                    this.runNext();
                }
            }));
            this.runNext();
        });
    }
    runNext() {
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
