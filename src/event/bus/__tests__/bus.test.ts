import { Bus } from '../bus';

describe('Bus', () => {
  it('should subscribe and emit events', () => {
    const bus = new Bus();
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    bus.addEventListener('test-event', fn1);
    bus.addEventListener('test-event', fn2);
    
    bus.emit('test-event', { data: 123 });

    expect(fn1).toHaveBeenCalledWith({ data: 123 });
    expect(fn2).toHaveBeenCalledWith({ data: 123 });
  });

  it('should unsubscribe an event via its key', () => {
    const bus = new Bus();
    const fn = jest.fn();
    
    bus.addEventListener('test', fn, 'my-key');
    bus.removeEventListener('test', 'my-key');
    bus.emit('test', null);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should remove all events for a specific name', () => {
    const bus = new Bus();
    const fn = jest.fn();
    
    bus.addEventListener('test', fn);
    bus.removeAllEventListener('test');
    bus.emit('test', null);

    expect(fn).not.toHaveBeenCalled();
  });
});
