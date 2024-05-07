<template>
  <div>
    <!-- 滚动公告 -->
    <div class="scrolling-notice" v-if="showNotice">
      <marquee behavior="scroll" direction="left">{{ noticeContent }}</marquee>
    </div>

    <!-- 原有的组件内容 -->
    <div class="commuse">

      <div class="commuse-item">
        <div class="text-slate-900 dark:text-slate-100">选择角色: </div>
        <a-cascader allow-search v-model="value2" :options="options" placeholder="请输入物品" filterable />
      </div>

      <div class="generate">
        <a-input v-model="value" placeholder="" />
        <a-button type="primary" shape="round" size="large" @click="copyvalue">复制</a-button>
        <a-button type="primary" shape="round" size="large" @click="execute">执行</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, inject, onMounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import page1 from './json/holyrelic2.json'
import { useAppStore } from '@/store/modules/app'
import axios from 'axios'
const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()

var value2 = ref('先选择角色再选择遗器部位')
var value3 = ref('/give')

const value = computed(() => {
  
  // 删除6位标识字符 括号内的标识字符均为角色代码 如果以后一个角色有更多的套装搭配 可以更改括号类型
  const sixsixsix = value2.value.slice(6);

  return `${value3.value} ${sixsixsix}`
})

const options = reactive(page1)

const message = Message

function copyvalue() {
  copy(value.value)
  if (isSupported) {
    message.success(`已复制${value.value}`)
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

const execute = () => {
  
  const address = localStorage.getItem('address')
  const uid = localStorage.getItem('uid')
  const password = localStorage.getItem('password')

  if (!address || !uid || !password) {
    
    Message.info('用户未登录，请重试')
  } else {
    
    const command = `${value3.value} ${value2.value}`
    const data = { uid, password, command }

    
    axios.post(address, data)
      .then(response => {
        
        if (response.data.retcode === 200) {
          message.success('执行成功！')
        } else {
          message.error('执行失败！')
        }
        console.log(response)
      })
      .catch(error => {
        
        message.error('执行失败！')
        console.error(error)
      })
  }
}

</script>

<style lang="less" scoped>
/* 添加样式以美化滚动公告 */
.scrolling-notice {
  color: #BEBEBE;
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
@media screen and (max-width: 768px) {
  .commuse {
    width: 100%; 
    padding: 10px; 
  }

  .commuse-item {
    margin: 18px 0 10px; 
  }

  .commuse-item > div:nth-child(1) {
    width: auto; 
    text-align: left; 
    padding: 0; 
    margin-bottom: 5px; 
  }

  .generate {
    display: block; 
    margin-left: 0; 
    width: 100%; 
    margin-bottom: 80px; 
    margin-top: 10px; 
    text-align: center; 
  }
  .generate > .arco-input {
    margin-bottom: 10px; 
  }
  .generate button { 
    display: block; 
    width: 100%; 
    margin-top: 10px; 
    
  }
}
</style>
