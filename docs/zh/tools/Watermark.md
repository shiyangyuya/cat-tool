# Watermark 页面水印

## 概述

Watermark 类用于在网页上生成和添加水印。通过传入配置选项，可以自定义水印的各项属性，如旋转角度、文案内容、间隔、透明度、层级、字号、颜色、水印个数以及是否自动计算个数等。

## 参数

```typescript
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
}
```

> 该接口定义了水印的配置选项:

- content: 水印的文案内容，必填。
- containerId: 要添加水印的容器 id。默认值为 body。
- rotate: 旋转角度，默认为 -22 度。
- xGap: 水印之间的水平间隔，默认为 0。
- yGap: 水印之间的垂直间隔，默认为 0。
- opacity: 透明度，默认为 0.2。
- zIndex: 层级，默认为 999999。
- fontSize: 字号，单位 px，默认为 12px。
- color: 颜色，默认为 #dcdee0。
- xNum: 水平方向水印个数，默认为 5。
- yNum: 垂直方向水印个数，默认为 5。
- auto: 是否自动计算水平和垂直方向上的水印个数，默认为 true。如果为 true，`xNum` 和 `yNum` 设置会失效。
- fontCanvasRatio: 采用自动计算水印个数时，文字长度与画布边长的比例，默认 1.4 。

## 普通使用

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "hello world!" });
```

## 多行水印

> 可以通过创建多个实例并且通过 `xGap | yGap` 参数控制水印之间的间距.
> 需要注意的是想要实现多行布局建议设置`auto`为 false.通过`xNum | yNum`参数设置水印个数.

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "line first", auto: false });
new Watermark({ content: "line second", yGap: 20, auto: false });
```

## 指定挂载的节点

> 可以通过指定`containerId`属性指定挂载的节点，需要注意的是需要保证挂在的节点已经创建成功，并且挂在的节点已经设置定位属性，否则可能会导致水印无法正常显示

> 挂载的节点建议使用唯一 id ,多个会按照 querySelector 匹配到的第一个

## 移除水印

> 移除水印可以使用实例的 `remove()` 方法

```typescript
import { Watermark } from "cat-tool";

const appMark = new Watermark({ content: "hello world!", containerId: "#app" });

appMark.remove();
```

## 在线体验

<span @click="fill" class="btn">生成单行水印</span>
<span @click="fillMuti" class="btn">生成多行水印</span>
<span @click="remove" class="btn">移除水印</span>

<style scoped>
.btn {
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  display: inline-block;
  user-select: none;
}
.btn:hover {
  background-color: #66b1ff;
}
</style>
<script setup>
import { onMounted } from 'vue'
let fill = null
let fillMuti = null
let remove = null
let domArr = []
onMounted(() => {
  import('../../../es/index.js').then((module) => {
    let {Watermark} = module
    fill = ()=> {
      const item = new Watermark({ content: "hello world!" });
      domArr.push(item)
    }
    fillMuti = ()=> {
      const item1 = new Watermark({ content: "line first", auto: false });
      const item2 = new Watermark({ content: "line second", yGap: 20, auto: false });
      domArr.push(item1,item2)
    }
    remove = ()=>{
      domArr.forEach(item=> item && item.remove())
      domArr = []
    }
  })
})
</script>
