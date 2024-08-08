# uuid 唯一标识符

## 简介

本模块提供了两种方法来生成唯一标识符（UUID）：

- buildShortID: 生成较短的唯一标识符。
- buildID: 生成标准 UUID v4 格式的唯一标识符。

## 示例

```javascript
import { uuid } from "cat-tool";

uuid.buildID();
uuid.buildShortID();
```
## 在线体验

<span @click="build('buildShortID')" class="btn">buildShortID</span>
<span @click="build('buildID')" class="btn">buildID</span>
<div>{{ uid }}</div>

<script setup>
import { onMounted,ref } from 'vue'
let build = null
let uid = ref('')
onMounted(() => {
  import('../../../es/index.js').then((module) => {
    let {uuid} = module
    build = (key)=> {
      uid.value = uuid[key]()
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