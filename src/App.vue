<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { title } from 'process'
import { useAppStore } from './store/modules/app'

import { ref, watch,onMounted } from 'vue'
import { darkTheme } from 'naive-ui'
const appStore = useAppStore()
const apptheme = ref()



watch(
  () => appStore.theme,
  () => {
    const theme: string = appStore.theme
    if (theme == 'dark') {
      apptheme.value = darkTheme
    } else {
      apptheme.value = null
    }
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  const WSS = localStorage.getItem("WSS")
  if (WSS) {
    appStore.socketConnect(WSS)
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: var(--color-bg-1);
  overflow: hidden;
  min-height: 100vh;
}
</style>