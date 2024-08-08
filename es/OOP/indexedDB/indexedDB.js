class IndexedDBWrapper {
    constructor(dbName, storeName, version = 1) {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }
    // 打开数据库
    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    const store = this.db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true,
                    });
                    resolve(this.db);
                }
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    // 添加数据
    add(data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(data);
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    // 查询数据
    get(key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    // 修改数据
    update(data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(data);
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    // 删除数据
    delete(key) {
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
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
}
export default IndexedDBWrapper;
