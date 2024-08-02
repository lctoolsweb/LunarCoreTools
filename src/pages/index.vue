<template>
  <div>
    <div class="ct">
      <!-- 添加图片 -->
      <img src="https://ooo.0x0.ooo/2024/06/02/OJH6MG.jpg" alt="Image" class="centered-image" />

      <div class="title">
        {{ translatedText.title }}
      </div>
      <div class="introduce">
        {{ translatedText.introduce }}
      </div>
      <div class="start">
        <router-link to="/start/commuse" class="n-button n-button--info mr-3 flex-none w-[3.0625rem] md:w-auto leading-6 dark:text-slate-200">
          <n-button type="info" dashed>{{ translatedText.start }}</n-button>
        </router-link>
      </div>
    </div>
    <n-alert title="Tips" type="info" closable class="custom-info-alert">
      <template #icon>
        <n-icon>
          <IosAirplane />
        </n-icon>
      </template>
      {{ t('main.version') }}，本指令器是独立项目，与任何公开PS没有从属关系。
    </n-alert>
    <!-- 将语言切换按钮移到右上角 -->
    <button class="language-toggle" @click="toggleLanguage">
      {{ isChinese ? 'EN' : '中文' }}
    </button>

    <!-- Add a footer to display page views -->
    <div class="footer">
      {{ t('main.views') }} {{ pageViews }} {{ t('main.time') }}
    </div>

    
    <div v-if="showAlert" class="alert-overlay"></div>
    <div v-if="showAlert" class="alert-container">
      <div class="alert-text">
        当前版本已过时，请前往GitHub更新。
      </div>
      <div class="alert-btn">
        <a href="https://github.com/lctoolsweb/LunarCoreTools" target="_blank">
          <button>确认</button>
        </a>
      </div>
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
const showAlert = ref(false);

const translatedText = {
  title: t('ct.title'),
  introduce: t('ct.introduce'),
  start: t('ct.start'),
};

const pageViews = ref(0);


const fetchPageViews = async () => {
  try {
    const response = await axios.get('https://finicounter.eu.org/counter?host=lctoolsweb.vercel.app');
    pageViews.value = response.data.views;
  } catch (error) {
    console.error('Failed to fetch page views:', error);
  }
};


onMounted(() => {
  fetchPageViews();

  
  const browserLanguage = navigator.language.toLowerCase();
  isChinese.value = browserLanguage.startsWith('zh');
  locale.value = isChinese.value ? 'zh' : 'en';

  
  updateTranslatedText();
});


const toggleLanguage = () => {
  locale.value = isChinese.value ? 'en' : 'zh'; 
  isChinese.value = !isChinese.value; 
  updateTranslatedText(); 
};


const updateTranslatedText = () => {
  translatedText.title = t('ct.title');
  translatedText.introduce = t('ct.introduce');
  translatedText.start = t('ct.start');
};

const currentVersion = import.meta.env.VITE_APP_CURRENT_VERSION;
const latestVersion = ref('');

const fetchLatestVersion = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/lctoolsweb/LunarCoreTools/releases');
    if (response.data && response.data.length > 0) {
      latestVersion.value = response.data[0].tag_name;
      if (latestVersion.value > currentVersion) {
        showAlert.value = true;
      }
    }
  } catch (error) {
    console.error('Failed to fetch latest version:', error);
  }
};

onMounted(() => {
  fetchLatestVersion();
});

const closeAlert = () => {
  showAlert.value = false;
};
</script>


<style lang="less">
.alert-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  z-index: -1; /* 放在底层 */
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
.alert-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.alert-text {
  text-align: center;
  font-size: 18px;
}

.alert-btn {
  margin-top: 10px;
  text-align: center;
}

.alert-btn button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.alert-btn button:hover {
  background-color: #0056b3;
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
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px); /* 高斯模糊效果 */
  z-index: 9999; /* 放在弹窗上面 */
}
</style>
