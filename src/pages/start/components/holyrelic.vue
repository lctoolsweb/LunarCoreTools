
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import holyrelicname from './json/holyrelicname.json'
import holyrelicnmain from './json/holyrelicnmain.json'
import holyrelicx from './json/holyrelicnx.json'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store/modules/app'
const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()

var uid = ref('@')
var holyrelicnamevalue = ref('')
var holyrelicnmainvalue = ref('')

var grade = ref(0)
var selectedValue = ref()
var num = ref()

const value = computed(() => {
  var xct = ''
  options3.value.forEach((k) => {
    if (k.isCheck) {
      xct = xct + ` ${k.value},${k.num}`
    }
  })
  return `/give ${uid.value} ${holyrelicnamevalue.value} lv${grade.value} ${holyrelicnmainvalue.value}${xct} `
})
const options = reactive(holyrelicname)

const options2 = reactive(holyrelicnmain)

var holyrelicx1 = holyrelicx.map((k) => {
  const obj = {
    isCheck: false,
    num: 1,
    label: k.label,
    value: k.value,
  }
  return obj
})
const options3 = ref(holyrelicx1)

const message = Message

function copyvalue() {
  copy(value.value)
  if (isSupported) {
    message.success(`已复制${value.value}`)
  }
}
const send: any = inject("send")
</script>

<template>
  <div class="commuse">
    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> UID: </div>
      <a-input v-model="uid" placeholder="UID暂不可用" allow-clear />
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 遗器: </div>
      <a-cascader allow-search v-model="holyrelicnamevalue" :options="options" placeholder="请输入物品" filterable />
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 主属性: </div>
      <a-cascader allow-search v-model="holyrelicnmainvalue" :options="options2" placeholder="请输入主属性" filterable />
      <!-- <n-select v-model:value="holyrelicnmainvalue" filterable placeholder="选择遗器主属性" :options="options2" /> -->
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 属性小词条: </div>

      <div class="smallho">
        <div class="smallho-item" v-for="(item, index) in options3" :key="index">
          <a-checkbox v-model="item.isCheck"></a-checkbox>
          <div class="text-slate-900 dark:text-slate-100">{{ item.label }} </div>
          <div>
            <a-input-number placeholder="" v-model="item.num" :min="1" />
          </div>
        </div>
      </div>
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 强化等级: </div>

      <a-input-number placeholder="" v-model="grade" :min="0" :max="20" />
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

.smallho {
  height: 300px;
  width: 100%;
  overflow-y: auto;

  .smallho-item {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    >div {
      &:nth-child(3) {
        width: 80px;
      }
    }
  }
}
</style>
