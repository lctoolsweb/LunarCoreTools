
<script setup lang="ts">
import { reactive, ref, computed, inject } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const { text, isSupported, copy } = useClipboard()

var value2 = ref(223)
var uid = ref('')
var num = ref(1000)

const value = computed(() => {
  return `/give ${value2.value} x${num.value}`
})
const options = reactive([
    
        {
            "label": "星琼",
            "value": 1
        },
        {
            "label": "信用点",
            "value": 2
        },
        {
            "label": "古老梦华",
            "value": 3
        },
        {
            "label": "开拓力",
            "value": 11
        },
        {
            "label": "后备开拓力",
            "value": 12
        },
        {
            "label": "经验",
            "value": 21
        },
        {
            "label": "里程",
            "value": 22
        },
        {
            "label": "活跃度",
            "value": 23
        },
        {
            "label": "开拓进行时",
            "value": 24
        },
        {
            "label": "归程轨迹",
            "value": 25
        },
        {
            "label": "宇宙碎片",
            "value": 31
        },
        {
            "label": "技能点",
            "value": 32
        },
        {
            "label": "沉浸器",
            "value": 33
        },
        {
            "label": "成就点数",
            "value": 41
        },
        {
            "label": "无名客的经验",
            "value": 51
        },
        {
            "label": "无名客的经验",
            "value": 52
        },
        {
            "label": "发展资金",
            "value": 53
        },
        {
            "label": "星轨通票",
            "value": 101
        },
        {
            "label": "星轨专票",
            "value": 102
        },
        {
            "label": "探索积分",
            "value": 170
        },
        {
            "label": "探索积分",
            "value": 171
        },
        {
            "label": "燃料",
            "value": 201
        },
        {
            "label": "旅情见闻",
            "value": 211
        },
        {
            "label": "冒险记录",
            "value": 212
        },
        {
            "label": "漫游指南",
            "value": 213
        },
        {
            "label": "稀薄以太",
            "value": 221
        },
        {
            "label": "凝缩以太",
            "value": 222
        },
        {
            "label": "提纯以太",
            "value": 223
        },
        {
            "label": "遗失光尘",
            "value": 231
        },
        {
            "label": "遗失碎金",
            "value": 232
        },
        {
            "label": "遗失晶块",
            "value": 233
        },
        {
            "label": "遗失精粹",
            "value": 234
        },
        {
            "label": "遗器残骸",
            "value": 235
        },
        {
            "label": "自塑尘脂",
            "value": 236
        },
        {
            "label": "命运的足迹",
            "value": 241
        },
        {
            "label": "未熄的余烬",
            "value": 251
        },
        {
            "label": "未熄的星芒",
            "value": 252
        },
        {
            "label": "流光余晖",
            "value": 261
        },
        {
            "label": "叠影器（特制）",
            "value": 271
        },
        {
            "label": "黑塔债券",
            "value": 503
        },
        {
            "label": "启行的祝福",
            "value": 800
        },
        {
            "label": "启行的祝福",
            "value": 801
        },
        {
            "label": "dev_通用测试道具",
            "value": 999
        }
    ]
)
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
      <div class="text-slate-900 dark:text-slate-100"> 物品: </div>
      <a-cascader allow-search v-model="value2" :options="options" placeholder="请输入物品" filterable />
    </div>

    <div class="commuse-item">
      <div class="text-slate-900 dark:text-slate-100"> 数量: </div>
      <a-input-number v-model="num" placeholder="请输入数量" mode="button" size="large" class="input-demo" />
    </div>
    <div class="generate">
      <a-input v-model="value" placeholder="" />
      <a-button type="outline" @click="copyvalue">复制</a-button>
      <a-button type="outline" v-if="appStore.isLogin" @click="send(value)">执行</a-button>
    </div>
  </div>

  <div> </div>
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
