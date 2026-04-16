import { uuid } from '../index';

describe('uuid', () => {
  it('buildShortID should generate a unique string', () => {
    const id1 = uuid.buildShortID();
    const id2 = uuid.buildShortID();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
  });

  it('buildID should generate a 32-character string without hyphens', () => {
    const id1 = uuid.buildID();
    const id2 = uuid.buildID();
    expect(id1).not.toBe(id2);
    expect(id1.length).toBe(32);
    expect(id1).not.toMatch(/-/);
  });
});
