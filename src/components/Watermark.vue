<template>
  <div class="watermark-container" v-show="showWatermark">
    <div class="watermark" v-if="watermarkData.pic">
      <div class="watermark-text-left">{{ watermarkData.text1 }}</div>
      <div class="watermark-image"></div>
      <div class="watermark-text-right">{{ watermarkData.text2 }}</div>
    </div>
    <div class="watermark-text-only" v-else>
      <div class="watermark-text-left">{{ watermarkData.text1 }}</div>
      <div class="watermark-text-right">{{ watermarkData.text2 }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const showWatermark = ref(true);
    const watermarkData = ref({ pic: false, text1: '', text2: '' });

    const fetchWatermarkData = async () => {
      try {
        const response = await axios.get('https://api.starxe.top/data');
        watermarkData.value = response.data;
      } catch (error) {
        console.error('Failed to fetch watermark data:', error);
      }
    };

    onMounted(() => {
      fetchWatermarkData();
    });

    return { showWatermark, watermarkData };
  },
}
</script>

<style>
.watermark-container {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.watermark {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.watermark-image {
  width: 200px; /* 根据需要调整宽度 */
  height: 200px; /* 根据需要调整高度 */
  background-image: url('https://api.starxe.top/pic');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.5;
}

.watermark-text-left,
.watermark-text-right {
  color: rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0; /* 调整文字与图片之间的间距 */
  pointer-events: none;
}

.watermark-text-only {
  transform: rotate(-45deg); /* 文字倾斜 */
  color: rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: bold;
  pointer-events: none;
}
</style>
