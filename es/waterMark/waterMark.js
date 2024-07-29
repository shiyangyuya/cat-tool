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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this._generateID = (() => {
            let unique = 0;
            return () => {
                const random = Math.floor(Math.random() * 1000000000);
                unique++;
                return `mask_${random}_${unique}`;
            };
        })();
        /**
         * 初始化方法，调用填充水印的方法
         */
        this.initialize = () => {
            this.fillWatermark();
        };
        /**
         * 测量文本宽度确定水印宽度
         */
        this.measureWidth = (text) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.font = `${this.fontSize} PingFangSC-Regular,PingFang SC,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif`;
            return ctx.measureText(text).width;
        };
        /**
         * 填充水印的主要逻辑
         */
        this.fillWatermark = () => {
            const bodyElement = document.querySelector("body");
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
        this.callback = (domElement, mask) => {
            domElement.appendChild(mask);
        };
        /**
         * 在画布上填充水印内容
         * @param {HTMLCanvasElement} canvas - 画布元素
         */
        this.fillCanvas = (canvas) => {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = `color: ${this.color}`;
            ctx.font = `${this.fontSize} PingFangSC-Regular,PingFang SC,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif`;
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
        this.generateMask = (mask, canvas) => {
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
            mask.style.background =
                "url(" + canvas.toDataURL("image/png") + ") center repeat";
        };
        /**
         * 观察 DOM 变化并进行相应处理
         * @param {HTMLBodyElement} bodyElement - 页面 body 元素
         * @param {HTMLElement} mask - 水印 DOM 元素
         * @param {HTMLCanvasElement} canvas - 画布元素
         */
        this.observeChanges = (bodyElement, mask, canvas) => {
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
        this.content = option.content;
        this.markIdentifier = this._generateID();
        this.rotate = (_a = option.rotate) !== null && _a !== void 0 ? _a : -22;
        this.opacity = (_b = option.opacity) !== null && _b !== void 0 ? _b : "0.2";
        this.zIndex = (_c = option.zIndex) !== null && _c !== void 0 ? _c : "999999";
        this.xGap = (_d = option.xGap) !== null && _d !== void 0 ? _d : 0;
        this.yGap = (_e = option.yGap) !== null && _e !== void 0 ? _e : 0;
        this.fontSize = (_f = option.fontSize) !== null && _f !== void 0 ? _f : "12px";
        this.color = (_g = option.color) !== null && _g !== void 0 ? _g : "#dcdee0";
        this.xNum = (_h = option.xNum) !== null && _h !== void 0 ? _h : 5;
        this.yNum = (_j = option.yNum) !== null && _j !== void 0 ? _j : 5;
        this.auto = (_k = option.auto) !== null && _k !== void 0 ? _k : true;
        this.initialize();
    }
}
export default Watermark;
