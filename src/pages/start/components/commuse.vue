
  
<template>
    <div>
      <!-- 滚动公告 -->
      <div class="scrolling-notice" v-if="showNotice">
        <marquee behavior="scroll" direction="left">{{ t('main.notice') }}</marquee>
      </div>
  
      <!-- 原有的组件内容 -->
      <div class="commuse">
  
        <div class="commuse-item">
          <div class="text-slate-900 dark:text-slate-100">{{ t('commuse.item') }}</div>
          <a-cascader allow-search v-model="value2" :options="options" placeholder="{{ t('main.item') }}" filterable />
        </div>
  
        <div class="commuse-item">
          <div class="text-slate-900 dark:text-slate-100">{{ t('commuse.number') }}</div>
          <a-input-number v-model="num" placeholder="{{ t('main.number') }}" mode="button" size="large" class="input-demo" />
        </div>
  
        <div class="generate">
          <a-input v-model="value" placeholder="" />
          <a-button type="outline" @click="copyvalue">{{ t('main.copy') }}</a-button>
          <a-button type="outline" v-if="appStore.isLogin" @click="send(value)">{{ t('main.execute') }}</a-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, inject } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { Message } from '@arco-design/web-vue'
  import { useAppStore } from '@/store/modules/app'
  import { useI18n } from 'vue-i18n'
  
  const appStore = useAppStore()
  const { text, isSupported, copy } = useClipboard()
  const { t, locale } = useI18n()
  
  var value2 = ref(1)
  var num = ref(1000)
  
  const value = computed(() => {
    return `/give ${value2.value} x${num.value}`
  })
  
  const message = Message
  
  const options = ref([] as { label: string; value: number }[]); // 使用 ref 创建响应式数组
  
  function copyvalue() {
    copy(value.value)
    if (isSupported) {
      message.success(t('main.success', { value: value.value }))
    }
  }
  
  const send: any = inject("send")
  
  const showNotice = ref(true)
  
  // 在页面加载时设置一个延时，用于显示滚动公告，你可以根据需求调整延时时长
  onMounted(() => {
    // 根据浏览器语言设置初始语言
    locale.value = navigator.language.includes('zh') ? 'zh' : 'en'
  
    // 导入中文和英文的 JSON 数据
    import('./json/zh/commuse.json').then((commusezh) => {
      import('./json/en/commuse.json').then((commuseen) => {
        // 根据语言选择相应的 JSON 数据进行赋值
        options.value = locale.value === 'zh' ? commusezh.default : commuseen.default;
  
        setTimeout(() => {
          showNotice.value = true
        }, 1000);
      });
    });
  })
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
  