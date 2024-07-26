/**
 * 水印类
 * @class Watermark
 */
class Watermark {
    /**
     * 构造函数，初始化水印属性
     * @constructor
     * @param {WatermarkOption} option - 水印选项
     */
    constructor(option) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this._generateID = (() => {
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
        this.initialize = () => {
            this.fillWatermark();
        };
        /**
         * 填充水印的主要逻辑
         */
        this.fillWatermark = () => {
            const bodyElement = document.querySelector("body");
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
        this.callback = (domElement, watermarkDiv) => {
            domElement.appendChild(watermarkDiv);
        };
        /**
         * 在画布上填充水印内容
         * @param {HTMLCanvasElement} canvas - 画布元素
         */
        this.fillCanvas = (canvas) => {
            const ctx = canvas.getContext("2d");
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
        this.fillWatermarkDiv = (watermarkDiv, canvas) => {
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
        this.observeChanges = (bodyElement, watermarkDiv, canvas) => {
            const observer = new MutationObserver(() => {
                this.fillWatermarkDiv(watermarkDiv, canvas);
            });
            const bodyObserver = new MutationObserver((mutationsList) => {
                mutationsList.map((mutaion) => {
                    mutaion.removedNodes.forEach((targetNode) => {
                        if ("id" in targetNode && targetNode.id === watermarkDiv.id) {
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
        this.content = option.content;
        this.markIdentifier = this._generateID();
        this.rotationAngle = (_a = option.rotate) !== null && _a !== void 0 ? _a : -22;
        this.opacity = (_b = option.opacity) !== null && _b !== void 0 ? _b : "0.2";
        this.zIndex = (_c = option.zIndex) !== null && _c !== void 0 ? _c : "999999";
        this.xGap = (_d = option.xGap) !== null && _d !== void 0 ? _d : 0;
        this.yGap = (_e = option.yGap) !== null && _e !== void 0 ? _e : 0;
        this.fontSize = (_f = option.fontSize) !== null && _f !== void 0 ? _f : "12px";
        this.color = (_g = option.color) !== null && _g !== void 0 ? _g : "#dcdee0";
        this.xNumber = (_h = option.xNumber) !== null && _h !== void 0 ? _h : 5;
        this.yNumber = (_j = option.yNumber) !== null && _j !== void 0 ? _j : 5;
        this.initialize();
    }
}
export default Watermark;
