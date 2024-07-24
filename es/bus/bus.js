class Bus {
    constructor() {
        this._list = {};
        this.i = 1;
    }
    /**
     * @description 注册事件
     * @param {string} name 注册事件名称
     * @param {Function} fn 事件函数
     * @param {string} fnKey 函数的key,可以用来移除事件
     */
    addEventListener(name, fn, fnKey) {
        this._list[name] = this._list[name] || [];
        const key = fnKey || `_fn${++this.i}`;
        this._list[name].push({ [key]: fn });
    }
    /**
     * @description 触发事件
     * @param {string} name 事件名称
     * @param {any} data 事件参数
     */
    emit(name, data) {
        if (!Array.isArray(this._list[name])) {
            return;
        }
        this._list[name].forEach((d) => Object.values(d)[0](data));
    }
    /**
     * @description 移除事件
     * @param {string} name 事件名称
     * @param {string} fnKey 函数的key
     */
    removeEventListener(name, fnKey) {
        if (!Array.isArray(this._list[name])) {
            return;
        }
        this._list[name] = this._list[name].filter((d) => Object.keys(d)[0] !== fnKey);
    }
    /**
     * @description 移除所有事件
     * @param {string} name 事件名称
     */
    removeAllEventListener(name) {
        this._list[name] = [];
    }
}
export default Bus;
