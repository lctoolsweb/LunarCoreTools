<template>
  <div class="nav">
    <a-menu class="menu" :default-collapsed="isMobile" showCollapseButton :default-open-keys="['0', '1', '2']" :selected-keys="selectedKey">
      <a-sub-menu key="0">
        <template #icon>
          <IconApps></IconApps>
        </template>
        <template #title>控制台代码生成 </template>
        <a-menu-item v-for="(item, index) in datav" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
      <!-- Commented out datav2 section
      <a-sub-menu key="1">
        <template #icon>
          <IconBug></IconBug>
        </template>
        <template #title>{{ GMTitle }}</template>
        <a-menu-item v-for="(item, index) in datav2" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
      -->
      <!-- Commented out datav3 section
      <a-sub-menu key="2">
        <template #icon>
          <IconApps></IconApps>
        </template>
        <template #title>GCAuth-暂未实现功能</template>
        <a-menu-item v-for="(item, index) in datav3" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
      -->
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { IconApps, IconBug } from '@arco-design/web-vue/es/icon';
import router from "@/router/index"
import { useAppStore } from '@/store'

const appStore = useAppStore()  

const datav = reactive([
  { name: '常用', path: "/start/commuse" },
  { name: '自定义遗器', path: "/start/holyrelic" },
  { name: '毕业遗器', path: "/start/holyrelic2" },
  { name: '怪物生成', path: "/start/monster" },
  { name: '预设快捷指令', path: "/start/other" },
  { name: '光锥', path: "/start/weapon" },
  { name: '物品', path: "/start/thing" },
  { name: '角色', path: "/start/avatar" },
  { name: '食物', path: "/start/food" },
  { name: '头像', path: "/start/page1" },
  { name: '场景', path: "/start/scene" },
  { name: '远程', path: "/start/about" },
])

// Commented out datav2 and GMTitle
/*
const datav2 = reactive([
  { name: 'WSS连接', path: "/start/wss" },
  { name: '控制台', path: "/start/consoled" },
  { name: '在线人员', path: "/start/personnel" },
])

const GMTitle = ref("GM控制面板-暂不可用")
*/

// Commented out datav3
/*
const datav3 = reactive([
  { name: '登录获取Tocken', path: "/start/login" },
  { name: '注册', path: "/start/register" },
  { name: '修改密码', path: "/start/changepassword" },
])
*/

function topath(path: string) {
  router.push({ path: path })
}

const selectedKey = ref([""])
const isMobile = ref(false)

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
