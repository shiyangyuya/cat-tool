# UUID - unique identifier

## Introduction

This module provides two ways to generate a Unique Identifier (UUID):

- buildShortID: Generate a shorter unique identifier.
- buildID: A unique identifier in the form of a standard UUID v4 format.

## Example

```javascript
import { uuid } from "cat-tool";

uuid.buildID();
uuid.buildShortID();
```
## Online experience

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