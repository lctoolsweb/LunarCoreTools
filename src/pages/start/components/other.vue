<template>
  <div>
    <!-- 滚动公告 -->
    <div class="scrolling-notice" v-if="showNotice">
      <marquee behavior="scroll" direction="left">{{ noticeContent }}</marquee>
    </div>

    <!-- 原有的组件内容 -->
    <div class="commuse">
      <div v-for="(item, index) in options" :key="index">
        <div class="text-slate-900 dark:text-slate-100">{{ item.title }}</div>
        <div>
          <a-input v-model="item.value" placeholder="" disabled />
        </div>
        <div>
          <a-button type="outline" @click="copyvalue(item.value)">复制</a-button>
          <a-button type="outline" v-if="appStore.isLogin" @click="send(item.value)">执行</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, inject, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store/modules/app'

const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()

const options = reactive([
  {
    title: '站场角色满级',
    value: '/avatar lv80 s10',
  },
  {
    title: '获得所有武器',
    value: '/giveall lightcones lv80 r5',
  },
  {
    title: '1000星轨通票',
    value: '/give 101 x1000',
  },
  {
    title: '1000星轨专票',
    value: '/give 102 x1000',
  },
  {
    title: '清除所有物品',
    value: '/clear all',
  },
  {
    title: '切换男主(重启生效)',
    value: '/gender male',
  },
  {
    title: '切换女主',
    value: '/gender female',
  },
  {
    title: '均衡等级8',
    value: '/worldlevel 8',
  },
])

const message = Message

function copyvalue(value: string) {
  copy(value)
  if (isSupported) {
    message.success(`已复制${value}`)
  }
}

const send: any = inject("send")

const showNotice = ref(true)
const noticeContent = 'LunarCore及其他任何衍生工具都是免费软件，如果你是付费购买的，那你就被骗了，请及时退款并举报。'

// 在页面加载时设置一个延时，用于显示滚动公告，你可以根据需求调整延时时长
onMounted(() => {
  setTimeout(() => {
    showNotice.value = true
  }, 1000)
})
</script>

<style lang="less" scoped>
/* 添加样式以美化滚动公告 */
.scrolling-notice {
  background-color: #ff6464;
  color: #333;
  padding: 8px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 10px; /* 添加圆角样式 */
}

.commuse {
  width: 500px;
  margin: auto;

  > div {
    margin: 10px 0;
    display: flex;
    align-items: center;
    color: #000;

    > div {
      &:nth-child(1) {
        width: 130px;
      }

      margin: 0 5px;
    }
  }
}

.generate {
  display: flex;
  align-items: center;
  margin-left: 100px;
}
</style>
