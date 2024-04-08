<template>
  <div class="watermark-container" v-show="showWatermark">
    <div v-for="(watermark, index) in watermarks" :key="index" class="watermark">{{ watermark }}</div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const showWatermark = ref(true)

    // 定义两条不同的水印文字
    const watermarks = ref([
      'LunarCoreWebTools', // 第一条水印文字
      '@lctweb team' // 第二条水印文字
    ])

    return { showWatermark, watermarks }
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.watermark {
  color: rgba(0, 0, 0, 0.1);
  font-size: 48px;
  font-weight: bold;
  transform: rotate(-45deg);
  pointer-events: none;
}
</style>
