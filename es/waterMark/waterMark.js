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
        var _a, _b, _c, _d;
        this.fontFamily = "PingFangSC-Regular,PingFang SC,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif";
        this._generateID = (() => {
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
        this.initialize = () => {
            this.fillWatermark();
        };
        this.remove = () => {
            var _a, _b;
            const container = document.querySelector(this.containerId);
            const mask = document.getElementById(this.markId);
            (_a = this.containerOb) === null || _a === void 0 ? void 0 : _a.disconnect();
            (_b = this.elementOb) === null || _b === void 0 ? void 0 : _b.disconnect();
            container.removeChild(mask);
        };
        /**
         * 测量文本宽度确定水印宽度
         */
        this.measureWidth = (text) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.font = `${this.fontSize} ${this.fontFamily}`;
            return ctx.measureText(text).width;
        };
        /**
         * 填充水印的主要逻辑
         */
        this.fillWatermark = () => {
            const container = document.querySelector(this.containerId);
            const canvas = document.createElement("canvas");
            if (this.xNum === 0 || this.yNum === 0) {
                return;
            }
            // 默认宽度按照容器计算
            canvas.width = container.offsetWidth / this.xNum;
            canvas.height = container.offsetHeight / this.yNum;
            // 如果是body，则按照屏幕宽度计算
            if (this.containerId === "body") {
                canvas.width = window.screen.width / this.xNum;
                canvas.height = window.screen.height / this.yNum;
            }
            // 如果是自动计算
            if (this.auto) {
                canvas.height = canvas.width =
                    this.measureWidth(this.content) * this.fontCanvasRatio;
            }
            this.fillCanvas(canvas);
            const mask = document.createElement("div");
            mask.id = this.markId;
            this.generateMask(mask, canvas);
            this.observeChanges(container, mask, canvas);
            container.appendChild(mask);
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
        this.generateMask = (mask, canvas) => {
            mask.style.pointerEvents = "none";
            mask.style.top =
                mask.style.left =
                    mask.style.bottom =
                        mask.style.right =
                            "0";
            mask.style.opacity = this.opacity;
            mask.style.display = "block";
            mask.style.visibility = "visible";
            mask.style.position = this.containerId === "body" ? "fixed" : "absolute";
            mask.style.zIndex = this.zIndex;
            mask.style.width = document.documentElement.clientWidth + "px";
            mask.style.height = document.documentElement.clientHeight + "px";
            mask.style.background = `url(${canvas.toDataURL("image/png")}) ${this.position} repeat`;
        };
        /**
         * 观察 DOM 变化并进行相应处理
         * @param {HTMLBodyElement} container - 页面 body 元素
         * @param {HTMLElement} mask - 水印 DOM 元素
         * @param {HTMLCanvasElement} canvas - 画布元素
         */
        this.observeChanges = (container, mask, canvas) => {
            // 如果属性发生变化，则重新设置水印样式
            this.elementOb = new MutationObserver(() => {
                this.generateMask(mask, canvas);
            });
            // 如果dom节点被移除，则重新添加
            this.containerOb = new MutationObserver((mutationsList) => {
                mutationsList.map((mutaion) => {
                    mutaion.removedNodes.forEach((targetNode) => {
                        if ("id" in targetNode && targetNode.id === mask.id) {
                            this.callback(container, mask);
                        }
                    });
                });
            });
            this.elementOb.observe(mask, {
                attributes: true,
            });
            this.containerOb.observe(container, { childList: true });
            window.onresize = () => {
                if (this.containerId !== "body") {
                    this.generateMask(mask, canvas);
                }
            };
        };
        this.content = option.content;
        this.markId = this._generateID();
        this.rotate = (_a = option.rotate) !== null && _a !== void 0 ? _a : -22;
        this.opacity = (_b = option.opacity) !== null && _b !== void 0 ? _b : "0.2";
        this.zIndex = (_c = option.zIndex) !== null && _c !== void 0 ? _c : "999999";
        this.xGap = option.xGap || 0;
        this.yGap = option.yGap || 0;
        this.fontSize = option.fontSize || "12px";
        this.color = option.color || "#dcdee0";
        this.xNum = option.xNum || 5;
        this.yNum = option.yNum || 5;
        this.auto = (_d = option.auto) !== null && _d !== void 0 ? _d : true;
        this.position = option.position || "";
        this.fontCanvasRatio = option.fontCanvasRatio || 1.4;
        this.containerId = option.containerId || "body";
        this.initialize();
    }
}
export default Watermark;
