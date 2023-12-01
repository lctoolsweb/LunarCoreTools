
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store/modules/app'
import weapon from './json/weapon.json'
const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()

var uid = ref("")
var value2 = ref(23013)
var num = ref(1)
var grade = ref(80)
var refined = ref(5)

const value = computed(() => {
  return `/give ${value2.value} x${num.value} lv${grade.value} r${refined.value}`
})
const options = reactive(weapon)

function copyvalue() {
  copy(value.value)
  if (isSupported) {
    Message.success(`已复制${value.value}`)
  }
}
const send: any = inject("send")
</script>

<template>
  <div class="commuse">
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> UID: </div>
      <a-input v-model="uid" placeholder="请输入UID" allow-clear />
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 光锥: </div>
      <a-cascader allow-search v-model="value2" :options="options" placeholder="请输入物品" filterable />
    </div>
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 数量: </div>
      <a-input-number v-model="num" placeholder="" mode="button" size="large" class="input-demo" />
    </div>
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 等级: </div>
      <a-input-number v-model="grade" placeholder="请输入" mode="button" size="large" class="input-demo" />
    </div>
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 叠影等级: </div>
      <a-input-number v-model="refined" placeholder="请输入" mode="button" size="large" class="input-demo" />
    </div>
    <div class="generate">
      <a-input v-model="value" placeholder="" />
      <a-button type="outline" @click="copyvalue">复制</a-button>
      <a-button type="outline" v-if="appStore.isLogin" @click="send(value)">执行</a-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.commuse {
  width: 500px;
  margin: auto;
}

.commuse-item {
  display: flex;
  align-items: center;
  color: #000;
  margin: 18px 0;

  >div {
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
