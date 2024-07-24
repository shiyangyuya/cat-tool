# IndexedDBWrapper

## 概述

- [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 是一种在客户端存储大量结构化数据的高级 API。与早期的 Web 存储技术如 localStorage 和 cookie 相比，IndexedDB 提供了更强大的功能。但原生 IndexedDB 操作需要使用大量的回调函数，增加了开发者的心智负担以及代码维护难度。

- IndexedDBWrapper 提供了基于 Promise 的异步操作数据库的类。此封装类提供了数据库的创建、读取、写入、更新和删除等基本功能，以简化对 IndexedDB 的使用。

## 构造函数

dbName：要操作的数据库名称。

storeName：数据库中的存储对象名称。

version（可选）：数据库的版本号。

```js
import { IndexedDBWrapper } from "cat-tool";
const db = new IndexedDBWrapper("MyDatabase", "MyObjectStore");
```

## 方法

`db.open()`打开指定的 IndexedDB 数据库，并根据需要创建存储对象和索引。
返回值：一个 Promise 对象，成功时解析为打开的数据库对象，失败时拒绝并返回错误。

`db.add(data)`向数据库中添加数据。

参数：data：要添加的数据对象。
返回值：一个 Promise 对象，成功时解析为添加操作的结果，失败时拒绝并返回错误。

`db.get(key)`根据指定的键从数据库中查询数据。
参数：key：要查询的数据的键。
返回值：一个 Promise 对象，成功时解析为查询到的数据，失败时拒绝并返回错误。

`db.update(data)`更新数据库中的数据。
参数：data：包含更新信息的数据对象。
返回值：一个 Promise 对象，成功时解析为更新操作的结果，失败时拒绝并返回错误。

`db.delete(key)`根据指定的键删除数据库中的数据。
参数：key：要删除的数据的键。
返回值：一个 Promise 对象，成功时解析为空，失败时拒绝并返回错误。

## 使用示例 1

```js
async () => {
  const db = new IndexedDBWrapper("MyDatabase", "MyObjectStore");
  try {
    await db.open();
    console.log("数据库打开成功");

    // 添加数据
    const id = await db.add({ name: "John Doe", age: 30 });
    console.log("数据添加成功，ID:", id);

    // 查询数据
    const data = await db.get(id);
    console.log("查询到的数据:", data);

    // 修改数据
    data.age = 31;
    await db.update(data);
    console.log("数据更新成功");

    // 删除数据
    await db.delete(id);
    console.log("数据删除成功");
  } catch (error) {
    console.error("操作失败", error);
  }
};
```

## 使用示例 2

```ts
// store.js
import { IndexedDBWrapper } from "cat-tool";
type Data = {
  id: number | string;
  value: any;
};
// 创建数据库
const store = new IndexedDBWrapper("dbName", "StoreName", 1);

// 创建或更新数据
const setData = async (data: Data) => {
  const oldData = await store.get(data.id);
  oldData
    ? await store.update({
        id: data.id,
        value: data.value,
      })
    : await store.add({
        id: data.id,
        value: data.value,
      });
};

// 获取数据
const getData = async (id: number | string): Promise<any> => {
  return await store.get(id);
};
export default { setData, getData, value: store };
```

```js
import store from "./store";
store.getData("id");
store.setData({ id, value });
```

## 注意事项

- 在进行数据库操作前需要等待数据库打开成功，可以使用 Promise 或 async/await 来实现。
- 对象存储需要唯一id!