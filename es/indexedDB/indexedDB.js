class IndexedDBWrapper {
    dbName;
    storeName;
    version;
    db = null;
    constructor(dbName, storeName, version = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }
    // 打开数据库
    open(index) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    const store = this.db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true,
                    });
                    index && store.createIndex(index, index, { unique: false });
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
// 使用示例
// (async () => {
//   const dbWrapper = new IndexedDBWrapper('MyDatabase', 'MyObjectStore');
//   try {
//     await dbWrapper.open();
//     console.log('数据库打开成功');
//     // 添加数据
//     const id = await dbWrapper.add({ name: 'John Doe', age: 30 });
//     console.log('数据添加成功，ID:', id);
//     // 查询数据
//     const data = await dbWrapper.get(id);
//     console.log('查询到的数据:', data);
//     // 修改数据
//     data.age = 31;
//     await dbWrapper.update(data);
//     console.log('数据更新成功');
//     // 删除数据
//     await dbWrapper.delete(id);
//     console.log('数据删除成功');
//   } catch (error) {
//     console.error('操作失败', error);
//   }
// })();
