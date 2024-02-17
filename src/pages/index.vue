<template>
  <div>
    <Header />
    <div class="ct">
      <!-- 添加图片 -->
      <img src="https://img.morax.top/file/4b572184f3de63e1c361f.png" alt="Your Image" class="centered-image" />

      <div class="title">
        {{ translatedText.title }}
      </div>
      <div class="introduce">
        {{ translatedText.introduce }}
      </div>
      <div class="start">
        <router-link to="/start/commuse" class="mr-3 flex-none w-[3.0625rem] md:w-auto leading-6 dark:text-slate-200">
          {{ translatedText.start }}
        </router-link>
      </div>
    </div>
    <n-alert title="Tips" type="info" closable class="custom-info-alert">
      <template #icon>
        <n-icon>
          <IosAirplane />
        </n-icon>
      </template>
      {{ t('main.version') }}
    </n-alert>
    <!-- 将语言切换按钮移到右上角 -->
    <button class="language-toggle" @click="toggleLanguage">
      {{ isChinese ? 'EN' : '中文' }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { IosAirplane } from '@vicons/ionicons4'
import { NAlert, NIcon } from 'naive-ui';

const { t, locale } = useI18n();
const isChinese = ref(true);

const translatedText = {
  title: t('ct.title'),
  introduce: t('ct.introduce'),
  start: t('ct.start'),
};

const toggleLanguage = () => {
  isChinese.value = !isChinese.value;
  locale.value = isChinese.value ? 'en' : 'zh';
  
  translatedText.title = t('ct.title');
  translatedText.introduce = t('ct.introduce');
  translatedText.start = t('ct.start');
};

onMounted(() => {
  
  const browserLanguage = navigator.language.toLowerCase();
  isChinese.value = browserLanguage.startsWith('zh');
  locale.value = isChinese.value ? 'zh' : 'en';

  // 更新翻译文本
  translatedText.title = t('ct.title');
  translatedText.introduce = t('ct.introduce');
  translatedText.start = t('ct.start');
});
</script>
<style lang="less">
.ct {
  width: 500px;
  margin: auto;
  margin-top: 20vh;
  text-align: center; 
}

.centered-image {
  width: 100%; 
  max-width: 150px; 
  margin: 0 auto 10px; 
  display: block; 
  border-radius: 10px; 
}

.title {
  text-align: center;
  font-size: 28px;
}

.introduce {
  margin-top: 10px;
  color: #545343;
  text-align: center;
  font-size: 16px;
}

.start {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
}

.language-toggle {
  position: fixed;
  top: 70px;
  right: 30px;
  padding: 10px;
  background-color: transparent;  /* 将背景颜色设置为透明 */
  border: 2px solid transparent;  /* 将边框颜色设置为透明 */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.language-toggle:hover {
  background-color: rgba(52, 152, 219, 0.5);  /* 鼠标悬停时的半透明背景颜色 */
  color: #fff;
}
.custom-info-alert {
  width: 300px; /* 你可以根据需要调整宽度 */
  position: fixed;
  top: 120px;
  right: 20px;
  }


</style>

