<template>
  <div>
    
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
        <router-link to="/start/commuse" class="n-button n-button--info mr-3 flex-none w-[3.0625rem] md:w-auto leading-6 dark:text-slate-200">
  <n-button  type="info" dashed> {{ translatedText.start }} </n-button>
</router-link>
      </div>
    </div>
    <n-alert title="Tips" type="info" closable class="custom-info-alert">
      <template #icon>
        <n-icon>
          <IosAirplane />
        </n-icon>
      </template>
      {{ t('main.version') }}，闲聊吹水群：124750952
    </n-alert>
    <!-- 将语言切换按钮移到右上角 -->
    <button class="language-toggle" @click="toggleLanguage">
      {{ isChinese ? 'EN' : '中文' }}
    </button>

    <!-- Add a footer to display page views -->
    <div class="footer">
      {{ t('main.views') }} {{ pageViews }} {{ t('main.time') }}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { IosAirplane } from '@vicons/ionicons4';
import { NAlert, NIcon, NButton } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const isChinese = ref(true);

const translatedText = {
  title: t('ct.title'),
  introduce: t('ct.introduce'),
  start: t('ct.start'),
};

const pageViews = ref(0);

// Define a separate async function to fetch page views
const fetchPageViews = async () => {
  try {
    const response = await axios.get('https://finicounter.eu.org/counter?host=lctoolsweb.vercel.app');
    pageViews.value = response.data.views;
  } catch (error) {
    console.error('Failed to fetch page views:', error);
  }
};

// Call the async function inside onMounted
onMounted(() => {
  fetchPageViews();

  // Existing code for language toggle and other features
  const browserLanguage = navigator.language.toLowerCase();
  isChinese.value = browserLanguage.startsWith('zh');
  locale.value = isChinese.value ? 'zh' : 'en';

  // Update translatedText if needed
  translatedText.title = t('ct.title');
  translatedText.introduce = t('ct.introduce');
  translatedText.start = t('ct.start');
});

// 切换语言的方法
const toggleLanguage = () => {
  locale.value = isChinese.value ? 'en' : 'zh'; // 切换语言
  isChinese.value = !isChinese.value; // 切换按钮文字
  updateTranslatedText(); // 更新翻译文本
};

// 更新翻译文本
const updateTranslatedText = () => {
  translatedText.title = t('ct.title');
  translatedText.introduce = t('ct.introduce');
  translatedText.start = t('ct.start');
};
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
  font-size: 96px;
}

.language-toggle {
  position: fixed;
  top: 70px;
  right: 30px;
  padding: 10px;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.ct {
  max-width: 90%; 
  margin: 0 auto; 
  text-align: center;
}

.language-toggle:hover {
  background-color: rgba(52, 152, 219, 0.5);
  color: #fff;
}

.custom-info-alert {
  width: 300px;
  position: fixed;
  top: 120px;
  right: 20px;
}

/* Add styles for the footer */
.footer {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #666;
}
</style>

<style lang="less">
.n-button.n-button--info.n-button--blue {
  background-color: blue !important;
  color: white !important;
}



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
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.language-toggle:hover {
  background-color: rgba(52, 152, 219, 0.5);
  color: #fff;
}

.custom-info-alert {
  width: 300px;
  position: fixed;
  top: 120px;
  right: 20px;
}

/* Add styles for the footer */
.footer {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #666;
}
</style>

