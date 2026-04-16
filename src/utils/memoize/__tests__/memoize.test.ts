import { memoize } from '../memoize';

describe('memoize', () => {
  it('should cache the result of the function', () => {
    const fn = jest.fn((a, b) => a + b);
    const memoizedFn = memoize(fn) as any;

    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
    
    expect(memoizedFn(2, 3)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
