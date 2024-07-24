# 事件总线实现 - Bus 类

## 概述

Bus 类提供了一个轻量级且灵活的事件总线实现，适用于需要在不同组件或模块之间进行收发事件、通信的场景，而无需直接引用彼此。通过使用事件总线，可以提高代码的可维护性和可扩展性，同时保持良好的代码组织结构。

## 创建事件总线实例

首先，你需要创建一个 Bus 类的实例, 并且保持单例模式：

```typescript
import { Bus } from "cat-tool";
const eventBus = new Bus();
```

## 注册事件监听器

使用 addEventListener 方法注册事件监听器。你可以选择性地提供一个唯一的 fnKey 来标识监听器，以便稍后移除它：

```typescript
eventBus.addEventListener("myEvent", (data) => {
  console.log("Event triggered with data:", data);
});

// 或者使用自定义 key
eventBus.addEventListener(
  "myEvent",
  (data) => console.log("event:", data),
  "fnkey"
);
```

## 触发事件

使用 emit 方法触发事件，并传递数据给监听器：

```typescript
eventBus.emit("myEvent", { message: "Hello World!" });
```

## 移除事件监听器

使用 removeEventListener 方法移除特定的事件监听器，需要提供事件名称和监听器的 fnKey：

```typescript
eventBus.removeEventListener("myEvent", "customListenerKey");
```

## 移除所有事件监听器

使用 removeAllEventListener 方法移除特定事件的所有监听器：

```typescript
eventBus.removeAllEventListener("myEvent");
```

## 示例

下面是一个完整的示例，展示了如何使用 Bus 类：

```typescript
// eventBus.js
import { Bus } from "cat-tool";
export const eventBus = new Bus();
```

```js
import { eventBus } from "./eventBus.js";
// A模块 监听注册时间
eventBus.addEventListener("myEvent", (data) => {});
```

```js
import { eventBus } from "./eventBus.js";
// B模块 触发事件
eventBus.emit("myEvent", { message: "Hello World!" });
```
