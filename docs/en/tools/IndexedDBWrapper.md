# IndexedDBWrapper

## Overview

- [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) is a high-level API for storing large amounts of structured data on the client side. Compared to earlier Web storage technologies such as localStorage and cookies, IndexedDB provides more powerful features. However, native IndexedDB operations require the use of a large number of callback functions, which increases the mental burden of developers and the difficulty of code maintenance.

- IndexedDBWrapper provides a class for asynchronous database operations based on Promise. This encapsulation class provides basic functions such as database creation, reading, writing, updating, and deleting to simplify the use of IndexedDB.

## Constructor

dbName: The name of the database to be operated.

storeName: The name of the storage object in the database.

version (optional): The version number of the database.

```js
import { IndexedDBWrapper } from "cat-tool";
const db = new IndexedDBWrapper("MyDatabase", "MyObjectStore");
```

## Methods

`db.open()`Opens the specified IndexedDB database and creates storage objects and indexes as needed.
Return value: A Promise object that resolves to the open database object on success, or rejects and returns an error on failure.

`db.add(data)`Adds data to the database.

Parameters: data: the data object to be added.
Return value: A Promise object that resolves to the result of the add operation on success, or rejects and returns an error on failure.

`db.get(key)`Query data from the database based on the specified key.
Parameters: key: the key of the data to be queried.
Return value: A Promise object that resolves to the queried data on success, or rejects and returns an error on failure.

`db.update(data)`Updates the data in the database.
Parameters: data: data object containing update information.
Return value: a Promise object, which resolves to the result of the update operation if successful, and rejects and returns an error if failed.

`db.delete(key)` deletes the data in the database according to the specified key.
Parameters: key: the key of the data to be deleted.
Return value: a Promise object, which resolves to empty if successful, and rejects and returns an error if failed.

## Example 1

```js
async () => {
  const db = new IndexedDBWrapper("MyDatabase", "MyObjectStore");
  try {
    await db.open();
    console.log("Database opened successfully");
    // Add data
    const id = await db.add({ name: "John Doe", age: 30 });
    console.log("Data added successfully, ID:", id);
    // Query data
    const data = await db.get(id);
    console.log("Query data:", data);
    // Modify data
    data.age = 31;
    await db.update(data);
    console.log("Data updated successfully");
    // Delete data
    await db.delete(id);
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Operation failed", error);
  }
};
```

## Example 2

```ts
// store.js
import { IndexedDBWrapper } from "cat-tool";
type Data = {
  id: number | string;
  value: any;
};
const store = new IndexedDBWrapper("dbName", "StoreName", 1);

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

## Notes

- Before performing database operations, you need to wait for the database to be opened successfully. You can use Promise or async/await to achieve this.
- Object storage requires a unique id!
