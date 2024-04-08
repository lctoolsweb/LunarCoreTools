import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import './index.css';
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import 'virtual:svg-icons-register';
import WatermarkDesign from '@watermark-design/vue';
import { Message } from '@arco-design/web-vue';
import i18n from '@/includes/i18n'; // 使用命名导入

const app = createApp(App);

Message._context = app._context;

app.use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(piniaStore)
  .use(i18n)
  .use(WatermarkDesign)
  .mount('#app');
