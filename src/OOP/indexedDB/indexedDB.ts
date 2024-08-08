class IndexedDBWrapper<T extends any> {
  private dbName: string;
  private storeName: string;
  private version: number;
  private db: IDBDatabase | null = null;
  constructor(dbName: string, storeName: string, version = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }
  // 打开数据库
  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          const store = this.db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
          resolve(this.db);
        }
      };
      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  // 添加数据
  add(data: T): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database is not open');
      }
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);
      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // 查询数据
  get(key: IDBValidKey): Promise<T | any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database is not open');
      }
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);
      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result);
      };
      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // 修改数据
  update(data: T): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database is not open');
      }
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(data);

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // 删除数据
  delete(key: IDBValidKey): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('Database is not open');
      }
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}

export default IndexedDBWrapper;

