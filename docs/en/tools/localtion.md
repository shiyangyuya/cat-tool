# getLocaltion

## Introduction

`getLocaltion` to get the user's latitude and longitude information.

## parameters

- `timeout`: which indicates the maximum waiting time (in milliseconds) for obtaining location information. By default, if no timeout is specified, the timeout limit is not set.

## Return value

Returns an object of type `Promise<{ latitude: number; longitude: number }>`, which resolves to an object containing latitude and longitude if successful, and is rejected with an error message when it fails.

## Precautions

- This function can only be run in modern browsers that support the `navigator.geolocation` API.
- Users must agree to share their location information or an error will be thrown.
- If the browser is not running in an HTTPS environment, it will not work. Ensure that the application is deployed on HTTPS

## Example

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

## Online Experience

<span @click="get" class="btn">get location</span>

<div>{{ info }}</div>

<script setup>
import { onMounted, ref } from 'vue'
let get = null
let info = ref('')
onMounted(() => {
  import('../../../es/index.js').then((module) => {
    let {getLocaltion} = module
    get = ()=> {
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
