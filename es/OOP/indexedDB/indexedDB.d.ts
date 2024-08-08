declare class IndexedDBWrapper<T extends any> {
    private dbName;
    private storeName;
    private version;
    private db;
    constructor(dbName: string, storeName: string, version?: number);
    open(): Promise<IDBDatabase>;
    add(data: T): Promise<IDBValidKey>;
    get(key: IDBValidKey): Promise<T | any>;
    update(data: T): Promise<IDBValidKey>;
    delete(key: IDBValidKey): Promise<void>;
}
export default IndexedDBWrapper;
