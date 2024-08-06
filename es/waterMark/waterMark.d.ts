interface WatermarkOption {
    content: string;
    containerId?: string;
    rotate?: number;
    xGap?: number;
    yGap?: number;
    opacity?: string;
    zIndex?: string;
    fontSize?: string;
    color?: string;
    xNum?: number;
    yNum?: number;
    auto?: boolean;
    fontCanvasRatio?: number;
    position?: string;
}
/**
 * 水印类
 * @class Watermark
 */
declare class Watermark {
    /**
     * 文案
     * @type {string}
     */
    content: string;
    /**
     * 水印的唯一标识
     * @type {string}
     */
    markId: string;
    /**
     * 要添加水印的容器id
     * @type {string}
     */
    containerId: string;
    /**
     * 旋转角度
     * @type {number}
     */
    rotate: number;
    /**
     * 透明度
     * @type {string}
     */
    opacity: string;
    /**
     * 层级
     * @type {string}
     */
    zIndex: string;
    /**
     * 水平间隔
     * @type {number}
     */
    xGap: number;
    /**
     * 垂直间隔
     * @type {number}
     */
    yGap: number;
    /**
     * 字号单位px
     * @type {string}
     */
    fontSize: string;
    /**
     * 颜色
     * @type {string}
     */
    color: string;
    /**
     * 水平方向水印个数
     * @type {number}
     */
    xNum: number;
    /**
     * 垂直方向水印个数
     * @type {number}
     */
    yNum: number;
    /**
     * 是否自动计算水平和垂直方向上的水印个数，会使xyNum失效
     * @type {boolean}
     */
    auto: boolean;
    /** 文字长度与画布边长的比例 */
    fontCanvasRatio: number;
    /** 水印对齐方式- top right left bottom center */
    position: string;
    fontFamily: string;
    containerOb?: MutationObserver;
    elementOb?: MutationObserver;
    /**
     * 构造函数，初始化水印属性
     * @constructor
     * @param {WatermarkOption} option - 水印选项
     */
    constructor(option: WatermarkOption);
    private _generateID;
    /**
     * 初始化方法，调用填充水印的方法
     */
    initialize: () => void;
    remove: () => void;
    /**
     * 测量文本宽度确定水印宽度
     */
    measureWidth: (text: string) => number;
    /**
     * 填充水印的主要逻辑
     */
    fillWatermark: () => void;
    /**
     * 回调函数，在 DOM 发生变化时将水印元素重新添加到 DOM 中
     * @param {HTMLElement} domElement - DOM 元素
     * @param {HTMLElement} mask - 水印元素
     */
    callback: (domElement: HTMLElement, mask: HTMLElement) => void;
    /**
     * 在画布上填充水印内容
     * @param {HTMLCanvasElement} canvas - 画布元素
     */
    fillCanvas: (canvas: HTMLCanvasElement) => void;
    /**
     * 设置水印 DOM 元素的样式和背景
     * @param {HTMLElement} mask - 水印 DOM 元素
     * @param {HTMLCanvasElement} canvas - 画布元素
     */
    generateMask: (mask: HTMLElement, canvas: HTMLCanvasElement) => void;
    /**
     * 观察 DOM 变化并进行相应处理
     * @param {HTMLBodyElement} container - 页面 body 元素
     * @param {HTMLElement} mask - 水印 DOM 元素
     * @param {HTMLCanvasElement} canvas - 画布元素
     */
    observeChanges: (container: HTMLElement, mask: HTMLElement, canvas: HTMLCanvasElement) => void;
}
export default Watermark;
