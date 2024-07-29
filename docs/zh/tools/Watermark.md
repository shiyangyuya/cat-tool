# Watermark 页面水印

## 概述

Watermark 类用于在网页上生成和添加水印。通过传入配置选项，可以自定义水印的各项属性，如旋转角度、文案内容、间隔、透明度、层级、字号、颜色、水印个数以及是否自动计算个数等。

## 参数

```typescript
interface WatermarkOption {
  content: string;
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
}
```

> 该接口定义了水印的配置选项：

- content：水印的文案内容，必填。
- rotate：旋转角度，默认为 -22 度。
- xGap：水印之间的水平间隔，默认为 0。
- yGap：水印之间的垂直间隔，默认为 0。
- opacity：透明度，默认为 0.2。
- zIndex：层级，默认为 999999。
- fontSize：字号，支持 px、rem 单位，默认为 12px。
- color：颜色，默认为 #dcdee0。
- xNum：水平方向水印个数，默认为 5。
- yNum：垂直方向水印个数，默认为 5。
- auto：是否自动计算水平和垂直方向上的水印个数，默认为 true。如果为 true，`xNum` 和 `yNum` 设置会失效。

## 使用方法

> 一般使用

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "hello world!" });
```

> 多行水印: 可以通过创建多个实例并且通过 `xGap | yGap` 参数控制水印之间的间距

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "line first" });
new Watermark({ content: "line second", yGap: 20 });
```
