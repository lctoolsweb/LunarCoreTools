<template>
  <div>
    <!-- 滚动公告 -->
    <div class="scrolling-notice" v-if="showNotice">
      <marquee behavior="scroll" direction="left">{{ noticeContent }}</marquee>
    </div>

    <!-- Info 类型的 n-alert，位于右上角 -->
    <NAlert title="Tips" type="info" closable class="custom-info-alert">
      <template #icon>
        <n-icon>
          <ios-airplane />
        </n-icon>
      </template>
      {{ t('main.tips') }}
    </NAlert>


    <!-- 原有的组件内容 -->
    <div class="commuse">
      <div class="commuse-item">
        <div class="text-slate-900 dark:text-slate-100">{{ t('relic.relic') }}:</div>
        <a-cascader allow-search v-model="holyrelicnamevalue" :options="options" placeholder="" filterable />
      </div>

      <div class="commuse-item">
        <div class="text-slate-900 dark:text-slate-100">{{ t('relic.basestats') }}:</div>
        <a-cascader allow-search v-model="holyrelicnmainvalue" :options="options2" placeholder="" filterable />
      </div>

      <div class="commuse-item">
        <div class="text-slate-900 dark:text-slate-100">{{ t('relic.advancedstats') }}:</div>

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
        <div class="text-slate-900 dark:text-slate-100">{{ t('relic.enhancementlevel') }}</div>

        <a-input-number placeholder="" v-model="grade" :min="0" :max="20" />
      </div>

      <div class="generate">
        <a-input v-model="value" placeholder="" />
        <a-button type="outline" @click="copyvalue">{{ t('main.copy') }}</a-button>
        <a-button type="outline" v-if="appStore.isLogin" @click="send(value)">执行</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, inject } from 'vue'
import { useClipboard } from '@vueuse/core'
import holyrelicname from './json/holyrelicname.json'
import holyrelicnmain from './json/holyrelicnmain.json'
import holyrelicx from './json/holyrelicnx.json'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store/modules/app'
import { useI18n } from 'vue-i18n'
import { IosAirplane } from '@vicons/ionicons4'
import { NAlert } from 'naive-ui';
const { t, locale } = useI18n()
const { text, isSupported, copy } = useClipboard()
const appStore = useAppStore()

var holyrelicnamevalue = ref('')
var holyrelicnmainvalue = ref('')
var grade = ref(0)

const value = computed(() => {
  var xct = ''
  options3.value.forEach((k) => {
    if (k.isCheck) {
      xct = xct + ` ${k.value}:${k.num}`
    }
  })

  // 删除第一个标识字符 a=头部 b=手部 c=躯干 d=脚部 e=位面球 f=连接绳
  const modifiedValue = holyrelicnmainvalue.value.slice(1);

  // 如果 xct 为空，则使用默认值 1
  xct = xct || ' 1';

  return `/give ${holyrelicnamevalue.value} lv${grade.value} s${modifiedValue}${xct} `
})

const options = reactive(holyrelicname)
const options2 = reactive(holyrelicnmain)

var holyrelicx1 = holyrelicx.map((k) => {
  const obj = {
    isCheck: false,
    num: ref(1),
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
const showNotice = ref(true)
const noticeContent = 'LunarCore及其他任何衍生工具都是免费软件，如果你是付费购买的，那你就被骗了，请及时退款并举报。'

// 在页面加载时设置一个延时，用于显示滚动公告，你可以根据需求调整延时时长
onMounted(() => {
  // 根据浏览器语言设置初始语言
  locale.value = navigator.language.includes('zh') ? 'zh' : 'en';

  // 使用 import 动态加载 JSON 数据
  const jsonPath = locale.value ? `./json/${locale.value}/holyrelicnx.json` : './json/zh/holyrelicnx.json';

  import(jsonPath).then((holyrelicData) => {
    options3.value = holyrelicData.default;

    setTimeout(() => {
      showNotice.value = true;
    }, 1000);
  });
});
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

.smallho {
  height: 300px;
  width: 100%;
  overflow-y: auto;
  .custom-info-alert {
  width: 30px; /* 你可以根据需要调整宽度 */
  position: fixed;
  top: 42px;
  right: 12px;
}

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
