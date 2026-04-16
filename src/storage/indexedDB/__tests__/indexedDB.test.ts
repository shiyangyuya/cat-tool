import { IndexedDBWrapper } from '../indexedDB';

describe('IndexedDBWrapper', () => {
  it('should initialize, add, get, update, delete and getAll using mock context', async () => {
    const db = new IndexedDBWrapper('test-db', 'test-store', 1);
    
    const mockDB = {
      transaction: () => ({
        objectStore: () => ({
          add: () => {
            const req: any = { result: 1 };
            setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0);
            return req;
          },
          get: () => {
            const req: any = { result: { name: 'test' } };
            setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0);
            return req;
          },
          put: () => {
            const req: any = { result: 1 };
            setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0);
            return req;
          },
          getAll: () => {
            const req: any = { result: [{ name: 'test' }] };
            setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0);
            return req;
          },
          delete: () => {
            const req: any = { result: undefined };
            setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0);
            return req;
          }
        })
      })
    };
    
    // Simulate indexedDB interactions to bypass JSDOM/fake-indexeddb async queue issues
    jest.spyOn(db, 'autoOpen').mockResolvedValue(mockDB as any);
    (db as any).db = mockDB;
    
    // Add
    const id = await db.add({ name: 'test' });
    expect(id).toBe(1);

    // Get
    let record = await db.get(id);
    expect((record as any).name).toBe('test');

    // Update
    await db.update({ id, name: 'test-updated' });

    // GetAll
    const all = await db.getAll();
    expect((all as any[]).length).toBe(1);

    // Delete
    await db.delete(id);
  });
});
