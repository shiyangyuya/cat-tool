import { PromiseQueue } from '../index';

describe('PromiseQueue', () => {
  it('should run tasks concurrently up to the max concurrency', async () => {
    const queue = new PromiseQueue(2);
    let running = 0;
    let maxRunning = 0;

    const task = () => new Promise<string>((resolve) => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      setTimeout(() => {
        running--;
        resolve('done');
      }, 50);
    });

    const tasks = [
      queue.enqueue(task),
      queue.enqueue(task),
      queue.enqueue(task),
      queue.enqueue(task)
    ];

    await Promise.all(tasks);

    expect(maxRunning).toBe(2);
    const results = queue.finish();
    expect(results.length).toBe(4);
    expect(results[0].type).toBe('resolve');
    expect(results[0].value).toBe('done');
  });
});
