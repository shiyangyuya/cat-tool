class IndexedDBWrapper {
  private dbName: string;
  private storeName: string;
  private version: number;
  private db: IDBDatabase | null = null;
  constructor(dbName: string, storeName: string, version = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }
  /**
   * @description 打开数据库
   * @returns {IDBDatabase|null} 返回数据库实例,如果返回null表示当前为版本升级
   */
  open(): Promise<IDBDatabase | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          this.db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
          Promise.resolve().then(() => resolve(null));
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
  /** 自动链接数据库,如果打开结果是版本变更状态,则再次尝试链接数据库 */
  async autoOpen() {
    let init = true;
    const data = await this.open();
    if (data) {
      return data;
    }
    if (init && data === null) {
      init = false;
      return await this.open();
    }
    return null;
  }
  // 添加数据
  add(data: unknown): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      this.autoOpen()
        .then((db) => {
          if (!db) return reject("Database is not open");
          const transaction = db.transaction([this.storeName], "readwrite");
          const store = transaction.objectStore(this.storeName);
          const request = store.add(data);
          request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result);
          };
          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
          };
        })
        .catch(() => {
          return reject("Database is not open");
        });
    });
  }
  // 查询数据
  get(key: IDBValidKey): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject("Database is not open");
      }
      this.autoOpen().then((db) => {
        if (!db) return reject("Database is not open");
        const transaction = db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);
        request.onsuccess = (event: Event) => {
          resolve((event.target as IDBRequest).result);
        };
        request.onerror = (event: Event) => {
          reject((event.target as IDBRequest).error);
        };
      });
    });
  }
  // 修改数据
  update(data: unknown): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      this.autoOpen()
        .then((db) => {
          if (!db) return reject("Database is not open");
          const transaction = db.transaction([this.storeName], "readwrite");
          const store = transaction.objectStore(this.storeName);
          const request = store.put(data);
          request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result);
          };
          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
          };
        })
        .catch(() => {
          return reject("Database is not open");
        });
    });
  }
  // 删除数据
  delete(key: IDBValidKey): Promise<void> {
    return new Promise((resolve, reject) => {
      this.autoOpen().then((db) => {
        if (!db) return reject("Database is not open");
        const transaction = db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = (event: Event) => {
          reject((event.target as IDBRequest).error);
        };
      });
    });
  }
  getAll() {
    return new Promise((resolve, reject) => {
      this.autoOpen().then((db) => {
        if (!db) return reject("Database is not open");
        const transaction = db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();
        request.onsuccess = (event: Event) => {
          resolve((event.target as IDBRequest).result);
        };
        request.onerror = (event: Event) => {
          reject((event.target as IDBRequest).error);
        };
      });
    });
  }
}

export { IndexedDBWrapper };
