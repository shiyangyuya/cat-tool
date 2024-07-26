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
 * @property {number} [xNumber] - 水平方向水印个数
 * @property {number} [yNumber] - 垂直方向水印个数
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
  xNumber?: number;
  yNumber?: number;
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
  rotationAngle: number;
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
   * 字号
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
  xNumber: number;

  /**
   * 垂直方向水印个数
   * @type {number}
   */
  yNumber: number;
  /**
   * 构造函数，初始化水印属性
   * @constructor
   * @param {WatermarkOption} option - 水印选项
   */
  constructor(option: WatermarkOption) {
    this.content = option.content;
    this.markIdentifier = this._generateID();
    this.rotationAngle = option.rotate ?? -22;
    this.opacity = option.opacity ?? "0.2";
    this.zIndex = option.zIndex ?? "999999";
    this.xGap = option.xGap ?? 0;
    this.yGap = option.yGap ?? 0;
    this.fontSize = option.fontSize ?? "12px";
    this.color = option.color ?? "#dcdee0";
    this.xNumber = option.xNumber ?? 5;
    this.yNumber = option.yNumber ?? 5;
    this.initialize();
  }
  private _generateID = (() => {
    let unique = 0;
    return () => {
      const time = Date.now();
      const random = Math.floor(Math.random() * 1000000000);
      unique++;
      return random + unique + String(time);
    };
  })();

  /**
   * 初始化方法，调用填充水印的方法
   */
  initialize = () => {
    this.fillWatermark();
  };

  /**
   * 填充水印的主要逻辑
   */
  fillWatermark = () => {
    const bodyElement = document.querySelector("body") as HTMLBodyElement;
    const canvasElement = document.createElement("canvas");
    canvasElement.width = window.screen.width / this.xNumber;
    canvasElement.height = window.screen.height / this.yNumber;
    this.fillCanvas(canvasElement);
    const watermarkDiv = document.createElement("div");
    watermarkDiv.id = this.markIdentifier;
    this.fillWatermarkDiv(watermarkDiv, canvasElement);
    this.observeChanges(bodyElement, watermarkDiv, canvasElement);
    bodyElement.appendChild(watermarkDiv);
  };

  /**
   * 回调函数，在 DOM 发生变化时将水印元素重新添加到 DOM 中
   * @param {HTMLElement} domElement - DOM 元素
   * @param {HTMLElement} watermarkDiv - 水印元素
   */
  callback = (domElement: HTMLElement, watermarkDiv: HTMLElement) => {
    domElement.appendChild(watermarkDiv);
  };

  /**
   * 在画布上填充水印内容
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  fillCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = `color: ${this.color}`;
    ctx.font = `${this.fontSize} Microsoft YaHei`;
    const width = canvas.width / 2;
    const height = canvas.height / 2;
    // 将起点设置为中心点
    ctx.translate(width, height);
    // 从中心旋转偏移角度
    ctx.rotate((Math.PI / 180) * this.rotationAngle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 绘制文字
    ctx.fillText(this.content, 0 + this.xGap, 0 + this.yGap);
  };

  /**
   * 设置水印 DOM 元素的样式和背景
   * @param {HTMLElement} watermarkDiv - 水印 DOM 元素
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  fillWatermarkDiv = (watermarkDiv: HTMLElement, canvas: HTMLCanvasElement) => {
    watermarkDiv.style.pointerEvents = "none";
    watermarkDiv.style.top = "0px";
    watermarkDiv.style.left = "0px";
    watermarkDiv.style.opacity = this.opacity;
    watermarkDiv.style.display = "block";
    watermarkDiv.style.visibility = "visible";
    watermarkDiv.style.position = "fixed";
    watermarkDiv.style.zIndex = this.zIndex;
    watermarkDiv.style.width = document.documentElement.clientWidth + "px";
    watermarkDiv.style.height = document.documentElement.clientHeight + "px";
    watermarkDiv.style.background =
      "url(" + canvas.toDataURL("image/png") + ") left top repeat";
  };

  /**
   * 观察 DOM 变化并进行相应处理
   * @param {HTMLBodyElement} bodyElement - 页面 body 元素
   * @param {HTMLElement} watermarkDiv - 水印 DOM 元素
   * @param {HTMLCanvasElement} canvas - 画布元素
   */
  observeChanges = (
    bodyElement: HTMLBodyElement,
    watermarkDiv: HTMLElement,
    canvas: HTMLCanvasElement
  ) => {
    const observer = new MutationObserver(() => {
      this.fillWatermarkDiv(watermarkDiv, canvas);
    });
    const bodyObserver = new MutationObserver((mutationsList) => {
      mutationsList.map((mutaion) => {
        mutaion.removedNodes.forEach((targetNode) => {
          if ("id" in targetNode && targetNode!.id === watermarkDiv.id) {
            this.callback(bodyElement, watermarkDiv);
          }
        });
      });
    });
    observer.observe(watermarkDiv, {
      attributes: true,
    });
    bodyObserver.observe(bodyElement, { childList: true });
    window.onresize = () => {
      this.fillWatermarkDiv(watermarkDiv, canvas);
    };
  };
}

export default Watermark;
