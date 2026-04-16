# 快速开始 {#getting-started}

## 安装 {#installation}

你可以使用你喜欢的包管理器安装 `cat-tool`：

::: code-group

```sh [npm]
$ npm install cat-tool
```

```sh [pnpm]
$ pnpm add cat-tool
```

```sh [yarn]
$ yarn add cat-tool
```

:::

## 使用示例 {#usage}

### 1. 基础用法 (Named Imports)

`cat-tool` 推荐使用具名导出方式，这可以触发构建工具（如 Vite, Webpack, Rollup）的 **Tree Shaking** 机制。

```js
import { uuid, Watermark } from 'cat-tool';

// 生成一个短 ID
const id = uuid.buildShortID();

// 添加页面水印
const wm = new Watermark({ content: 'Confidential' });
```

### 2. 异步协作 (以 IndexedDB 为例)

大部分强交互工具都提供了基于 Promise 的异步接口：

```js
import { IndexedDBWrapper } from 'cat-tool';

const db = new IndexedDBWrapper('MyStorage', 'users', 1);

async function saveUser() {
  await db.add({ id: 1, name: 'Cat' });
  const user = await db.get(1);
  console.log(user);
}
```

## 下一步建议 {#next-steps}

- 📚 **查阅 API**: 所有的工具都已按分类排列在左侧侧边栏。
- 🔍 **查看详细用例**: 我们为每个独立工具都配备了详尽的参数说明和场景示例。
- 🧪 **可靠性保证**: 所有的示例代码均经过本地单元测试验证。
