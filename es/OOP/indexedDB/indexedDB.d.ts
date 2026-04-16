declare class IndexedDBWrapper {
    private dbName;
    private storeName;
    private version;
    private db;
    constructor(dbName: string, storeName: string, version?: number);
    /**
     * @description 打开数据库
     * @returns {IDBDatabase|null} 返回数据库实例,如果返回null表示当前为版本升级
     */
    open(): Promise<IDBDatabase | null>;
    /** 自动链接数据库,如果打开结果是版本变更状态,则再次尝试链接数据库 */
    autoOpen(): Promise<IDBDatabase | null>;
    add(data: unknown): Promise<IDBValidKey>;
    get(key: IDBValidKey): Promise<unknown>;
    update(data: unknown): Promise<IDBValidKey>;
    delete(key: IDBValidKey): Promise<void>;
    getAll(): Promise<unknown>;
}
export default IndexedDBWrapper;
