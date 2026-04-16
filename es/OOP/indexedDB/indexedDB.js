var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class IndexedDBWrapper {
    constructor(dbName, storeName, version = 1) {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }
    /**
     * @description 打开数据库
     * @returns {IDBDatabase|null} 返回数据库实例,如果返回null表示当前为版本升级
     */
    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.createObjectStore(this.storeName, {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                    Promise.resolve().then(() => resolve(null));
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
    /** 自动链接数据库,如果打开结果是版本变更状态,则再次尝试链接数据库 */
    autoOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            let init = true;
            const data = yield this.open();
            if (data) {
                return data;
            }
            if (init && data === null) {
                init = false;
                return yield this.open();
            }
            return null;
        });
    }
    // 添加数据
    add(data) {
        return new Promise((resolve, reject) => {
            this.autoOpen()
                .then((db) => {
                if (!db)
                    return reject("Database is not open");
                const transaction = db.transaction([this.storeName], "readwrite");
                const store = transaction.objectStore(this.storeName);
                const request = store.add(data);
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            })
                .catch(() => {
                return reject("Database is not open");
            });
        });
    }
    // 查询数据
    get(key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject("Database is not open");
            }
            this.autoOpen().then((db) => {
                if (!db)
                    return reject("Database is not open");
                const transaction = db.transaction([this.storeName], "readonly");
                const store = transaction.objectStore(this.storeName);
                const request = store.get(key);
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        });
    }
    // 修改数据
    update(data) {
        return new Promise((resolve, reject) => {
            this.autoOpen()
                .then((db) => {
                if (!db)
                    return reject("Database is not open");
                const transaction = db.transaction([this.storeName], "readwrite");
                const store = transaction.objectStore(this.storeName);
                const request = store.put(data);
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            })
                .catch(() => {
                return reject("Database is not open");
            });
        });
    }
    // 删除数据
    delete(key) {
        return new Promise((resolve, reject) => {
            this.autoOpen().then((db) => {
                if (!db)
                    return reject("Database is not open");
                const transaction = db.transaction([this.storeName], "readwrite");
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(key);
                request.onsuccess = () => {
                    resolve();
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.autoOpen().then((db) => {
                if (!db)
                    return reject("Database is not open");
                const transaction = db.transaction([this.storeName], "readonly");
                const store = transaction.objectStore(this.storeName);
                const request = store.getAll();
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        });
    }
}
export default IndexedDBWrapper;
