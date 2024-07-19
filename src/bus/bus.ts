type FnObj = {
  [K in string]: Function;
};
type EventQueue = {
  [K in string]: FnObj[];
};
class Bus {
  /** 事件总线 */
  _list: EventQueue;
  /** 匿名函数key */
  i: number;
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
  addEventListener(name: string, fn: Function, fnKey?: string) {
    this._list[name] = this._list[name] || [];
    const key = fnKey || `_fn${++this.i}`;
    this._list[name].push({ [key]: fn });
  }
  /**
   * @description 触发事件
   * @param {string} name 事件名称
   * @param {any} data 事件参数
   */
  emit(name: string, data: any) {
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
  removeEventListener(name: string, fnKey: string) {
    if (!Array.isArray(this._list[name])) {
      return;
    }
    this._list[name] = this._list[name].filter(
      (d) => Object.keys(d)[0] !== fnKey
    );
  }
  /**
   * @description 移除所有事件
   * @param {string} name 事件名称
   */
  removeAllEventListener(name: string) {
    this._list[name] = [];
  }
}
export default Bus;
