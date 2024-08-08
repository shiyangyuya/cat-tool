# getLocaltion 获取定位

## 简介

`getLocaltion` 获取用户的经纬度信息。

## 参数

- `timeout`: 可选, 表示获取位置信息的最大等待时间（毫秒）。默认情况下，如果没有指定超时时间，则不设置超时限制。

## 返回值

返回一个 `Promise<{ latitude: number; longitude: number }>`类型的对象，成功时解析为包含纬度和经度的对象，失败时被拒绝并传递错误信息。

## 注意事项

- 此函数只能在支持`navigator.geolocation` API 的现代浏览器中运行。
- 用户必须同意分享他们的位置信息，否则会抛出错误。
- 如果浏览器不在 HTTPS 环境下运行，无法正常工作。确保应用程序部署在 HTTPS 上

## 示例

```js
import { getLocaltion } from "cat-tool";

getLocaltion()
  .then(({ latitude, longitude }) => {
    console.log("Location:", latitude, longitude);
  })
  .catch((error) => {
    console.error("Error getting location:", error);
  });
```

## 在线体验

<span @click="get" class="btn">获取位置信息</span>

<div>{{ info }}</div>

<script setup>
import { onMounted, ref } from 'vue'
let get = null
let info = ref('')
onMounted(() => {
  import('../../../es/index.js').then((module) => {
    let {getLocaltion} = module
    get = ()=> {
      info.value = '获取定位中...'
      getLocaltion().then(({latitude, longitude})=> {
        info.value = `Location: latitude: ${latitude}, longitude: ${longitude}`
      }).catch(()=> {
        info.value = `getting location Error`
      })
    }
  })
})
</script>
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
