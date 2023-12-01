
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'

import role from './json/role.json'

const { text, isSupported, copy } = useClipboard()

var value2 = ref("hp")
var num = ref()
var uid = ref("@")

const value = computed(() => {
  return `setstats ${uid.value} ${value2.value} ${num.value}`
})
const options = reactive(role)
const message = Message

function copyvalue() {
  copy(value.value)
  if (isSupported) {
    message.success(`已复制${value.value}`)
  }
}
</script>

<template>
  <div class="commuse">
    <div class="title"> 直接修改当前角色的面板 </div>
     <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> UID: </div>
      <a-input v-model="uid" placeholder="请输入UID" allow-clear />
    </div>
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 属性: </div>
      <a-cascader allow-search v-model="value2" :options="options" placeholder="" filterable />
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 数值: </div>
      <a-input-number v-model="num" placeholder="" mode="button" size="large" class="input-demo" />
    </div>
    <div class="generate">
      <a-input v-model="value" placeholder="" />
      <a-button type="outline" @click="copyvalue">复制</a-button>
      <!-- <a-button type="outline" @click="copyvalue">执行</a-button> -->
    </div>
  </div>
</template>
<style lang="less" scoped>
.commuse {
  width: 500px;
  margin: auto;
}

.title {
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
}

.commuse-item {
  display: flex;
  align-items: center;
  color: #000;
  margin: 18px 0;

  > div {
    &:nth-child(1) {
      width: 150px;
      text-align: right;
      padding-right: 10px;
    }
  }
}

.generate {
  display: flex;
  align-items: center;
  margin-left: 100px;
}
</style>
