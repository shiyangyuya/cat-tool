/**
 * 水印选项接口
 * @interface WatermarkOption
 * @property {number} [rotate] - 旋转角度
 * @property {string} content - 文案
 * @property {number} [xGap] - 水印之间的水平间隔
 * @property {number} [yGap] - 水印之间的垂直间隔
 * @property {string} [opacity] - 透明度
 * @property {string} [zIndex] - 层级
 * @property {string} [fontSize] - 字号
 * @property {string} [color] - 颜色
 * @property {number} [xNum] - 水平方向水印个数
 * @property {number} [yNum] - 垂直方向水印个数
 */
interface WatermarkOption {
  rotate?: number;
  content: string;
  xGap?: number;
  yGap?: number;
  opacity?: string;
  zIndex?: string;
  fontSize?: string;
  color?: string;
  xNum?: number;
  yNum?: number;
  auto?: boolean;
  position?: string;
}

/**
 * 水印类
 * @class Watermark
 */
class Watermark {
  /**
   * 文案
   * @type {string}
   */
  content: string;
  /**
   * 水印的唯一标识
   * @type {string}
   */
  markIdentifier: string;
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
  /** 水印对齐方式- top right left bottom center */
  position: string;

  fontFamily =
    "PingFangSC-Regular,PingFang SC,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif";

  /**
   * 构造函数，初始化水印属性
   * @constructor
   * @param {WatermarkOption} option - 水印选项
   */
  constructor(option: WatermarkOption) {
    this.content = option.content;
    this.markIdentifier = this._generateID();
    this.rotate = option.rotate ?? -22;
    this.opacity = option.opacity ?? "0.2";
    this.zIndex = option.zIndex ?? "999999";
    this.xGap = option.xGap || 0;
    this.yGap = option.yGap || 0;
    this.fontSize = option.fontSize || "12px";
    this.color = option.color || "#dcdee0";
    this.xNum = option.xNum || 5;
    this.yNum = option.yNum || 5;
    this.auto = option.auto ?? true;
    this.position = option.position || "";
    this.initialize();
  }
  private _generateID = (() => {
    let unique = 0;
    return () => {
      const random = Math.floor((Math.random() * 10000) | 0);
      unique++;
      return `mask_${random}_${unique}`;
    };
  })();

  /**
   * 初始化方法，调用填充水印的方法
   */
  initialize = () => {
    this.fillWatermark();
  };
  /**
   * 测量文本宽度确定水印宽度
   */
  measureWidth = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = `${this.fontSize} ${this.fontFamily}`;
    return ctx.measureText(text).width;
  };
  /**
   * 填充水印的主要逻辑
   */
  fillWatermark = () => {
    const bodyElement = document.querySelector("body") as HTMLBodyElement;
    const canvas = document.createElement("canvas");
    canvas.width = window.screen.width / this.xNum;
    canvas.height = window.screen.height / this.yNum;
    if (this.auto) {
      canvas.height = canvas.width = this.measureWidth(this.content) * 1.4;
    }
    this.fillCanvas(canvas);
    const mask = document.createElement("div");
    mask.id = this.markIdentifier;
    this.generateMask(mask, canvas);
    this.observeChanges(bodyElement, mask, canvas);
    bodyElement.appendChild(mask);
  };

  /**
   * 回调函数，在 DOM 发生变化时将水印元素重新添加到 DOM 中
   * @param {HTMLElement} domElement - DOM 元素
   * @param {HTMLElement} mask - 水印元素
   */
  callback = (domElement: HTMLElement, mask: HTMLElement) => {
    domElement.appendChild(mask);
  };

  /**
   * 在画布上填充水印内容
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  fillCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = `color: ${this.color}`;
    ctx.font = `${this.fontSize} ${this.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const width = canvas.width / 2;
    const height = canvas.height / 2;
    // 将起点设置为中心点
    ctx.translate(width, height);
    // 从中心旋转偏移角度
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.fillText(this.content, this.xGap, this.yGap);
  };

  /**
   * 设置水印 DOM 元素的样式和背景
   * @param {HTMLElement} mask - 水印 DOM 元素
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  generateMask = (mask: HTMLElement, canvas: HTMLCanvasElement) => {
    mask.style.pointerEvents = "none";
    mask.style.top = "0px";
    mask.style.left = "0px";
    mask.style.opacity = this.opacity;
    mask.style.display = "block";
    mask.style.visibility = "visible";
    mask.style.position = "fixed";
    mask.style.zIndex = this.zIndex;
    mask.style.width = document.documentElement.clientWidth + "px";
    mask.style.height = document.documentElement.clientHeight + "px";
    mask.style.background = `url(${canvas.toDataURL("image/png")}) ${
      this.position
    } repeat`;
  };

  /**
   * 观察 DOM 变化并进行相应处理
   * @param {HTMLBodyElement} bodyElement - 页面 body 元素
   * @param {HTMLElement} mask - 水印 DOM 元素
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  observeChanges = (
    bodyElement: HTMLBodyElement,
    mask: HTMLElement,
    canvas: HTMLCanvasElement
  ) => {
    const observer = new MutationObserver(() => {
      this.generateMask(mask, canvas);
    });
    const bodyObserver = new MutationObserver((mutationsList) => {
      mutationsList.map((mutaion) => {
        mutaion.removedNodes.forEach((targetNode) => {
          if ("id" in targetNode && targetNode.id === mask.id) {
            this.callback(bodyElement, mask);
          }
        });
      });
    });
    observer.observe(mask, {
      attributes: true,
    });
    bodyObserver.observe(bodyElement, { childList: true });
    window.onresize = () => {
      this.generateMask(mask, canvas);
    };
  };
}

export default Watermark;
