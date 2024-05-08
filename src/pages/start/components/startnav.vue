<template>
  <div class="nav">
    <a-menu class="menu" :default-collapsed="isMobile" showCollapseButton :default-open-keys="['0', '1', '2']" :selected-keys="selectedKey">
      <a-sub-menu key="0">
        <template #icon>
          <IconApps></IconApps>
        </template>
        <template #title>{{ t('menu.main') }}</template>
        <a-menu-item v-for="(item, index) in datav" :key="item.path" @click="topath(item.path)">
          
          {{ t(`menu.${item.name.toLowerCase()}`) }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { IconApps, IconBug } from '@arco-design/web-vue/es/icon';
import router from "@/router/index"
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()  
const { t, locale } = useI18n()

const datav = reactive([
  { name: 'frequently', path: "/start/commuse" },
  { name: 'Customrelics', path: "/start/holyrelic" },
  { name: 'Graduationrelics', path: "/start/holyrelic2" },
  { name: 'Monsterspawning', path: "/start/monster" },
  { name: 'Presetshortcuts', path: "/start/other" },
  { name: 'LightCones', path: "/start/weapon" },
  { name: 'item', path: "/start/thing" },
  { name: 'character', path: "/start/avatar" },
  { name: 'food', path: "/start/food" },
  { name: 'avatar', path: "/start/page1" },
  { name: 'scene', path: "/start/scene" },
  { name: 'RemoteControl', path: "/start/control" }, // Modified key to match your translation
  { name: 'about', path: "/start/about" },
  { name: 'suggest', path: "/start/suggest" },

])

function topath(path: string) {
  router.push({ path: path })
}

const selectedKey = ref([""])
const isMobile = ref(true)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Call it initially to set the correct value on component mount
checkMobile()

// Listen for window resize events and update isMobile accordingly
window.addEventListener('resize', checkMobile)

onMounted(() => {
  selectedKey.value = [router.currentRoute.value.fullPath]
})

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    selectedKey.value = [newValue]
  },
  { immediate: true }
)

// Set initial language based on browser language
onMounted(() => {
  locale.value = navigator.language.includes('zh') ? 'zh' : 'en'
})
</script>

<style lang="less" scoped>
.nav {
  height: calc(100vh - 57px);

  .menu {
    height: 100%;

    .ant-menu-submenu {
      transition: height 0.3s; // Add a transition effect to smooth out the collapse/expand
    }
  }
}
</style>

