# Watermark Page Watermark

## Overview

The Watermark class is used to generate and add watermarks on web pages. By passing in configuration options, you can customize the various properties of the watermark, such as rotation angle, text content, interval, transparency, level, font size, color, number of watermarks, and whether to automatically calculate the number.

## Parameters

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

> This interface defines the configuration options of the watermark:

- content: the text content of the watermark, required.
- rotate: the rotation angle, the default is -22 degrees.
- xGap: the horizontal interval between watermarks, the default is 0.
- yGap: vertical gap between watermarks, default is 0.
- opacity: transparency, default is 0.2.
- zIndex: level, default is 999999.
- fontSize: supports px, default is 12px.
- color: color, default is #dcdee0.
- xNum: number of watermarks in horizontal direction, default is 5.
- yNum: number of watermarks in vertical direction, default is 5.
- auto: whether to automatically calculate the number of watermarks in horizontal and vertical directions, default is true. If true, `xNum` and `yNum` settings will be invalid.

## Usage

> General use

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "hello world!" });
```

> Multi-line watermarking: This can be done by creating multiple instances and by using the xGap | The yGap' parameter controls the spacing between watermarks.
> Note that if you want to implement a multi-line layout, it is recommended to set 'auto' to false yNum' parameter to set the number of watermarks.

```typescript
import { Watermark } from "cat-tool";

new Watermark({ content: "line first" });
new Watermark({ content: "line second", yGap: 20 });
```
