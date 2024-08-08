type FnObj = {
    [K in string]: Function;
};
type EventQueue = {
    [K in string]: FnObj[];
};
declare class Bus {
    /** 事件总线 */
    _list: EventQueue;
    /** 匿名函数key */
    i: number;
    constructor();
    /**
     * @description 注册事件
     * @param {string} name 注册事件名称
     * @param {Function} fn 事件函数
     * @param {string} fnKey 函数的key,可以用来移除事件
     */
    addEventListener(name: string, fn: Function, fnKey?: string): void;
    /**
     * @description 触发事件
     * @param {string} name 事件名称
     * @param {any} data 事件参数
     */
    emit(name: string, data: any): void;
    /**
     * @description 移除事件
     * @param {string} name 事件名称
     * @param {string} fnKey 函数的key
     */
    removeEventListener(name: string, fnKey: string): void;
    /**
     * @description 移除所有事件
     * @param {string} name 事件名称
     */
    removeAllEventListener(name: string): void;
}
export default Bus;
