<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';
import router from "@/router/index"
import { useAppStore } from '@/store'
import { throwStatement } from '@babel/types';
const appStore = useAppStore()
const datav = reactive([
  { name: '常用', path: "/start/commuse" },
  //{ name: '遗器', path: "/start/holyrelic" },
  { name: '怪物生成', path: "/start/monster" },
  { name: '其它', path: "/start/other" },
  { name: '光锥', path: "/start/weapon" },
    { name: '物品', path: "/start/thing" },
    { name: '角色(咕咕中.....)', path: "/start/avatar" },
  // { name: '角色属性', path: "/start/role" },
])

//const datav2 = reactive([
  //{ name: 'WSS连接', path: "/start/wss" },
  //{ name: '控制台', path: "/start/consoled" },
  //{ name: '在线人员', path: "/start/personnel" },
//])

const datav3 = reactive([
  { name: '登录获取Tocken', path: "/start/login" },
  { name: '注册', path: "/start/register" },
  { name: '修改密码', path: "/start/changepassword" },
])

const GMTitle = ref("GM控制面板-暂不可用")


function topath(path: string) {
  router.push({ path: path })
}

const selectedKey = ref([""])
onMounted(() => {
  selectedKey.value = [router.currentRoute.value.fullPath]
})

watch(
  () => appStore.isLogin,
  () => {
    const isLogin: boolean = appStore.isLogin
    if (isLogin) {
      GMTitle.value = "GM控制面板-已登录"
    } else {
      GMTitle.value = "GM控制面板-暂不可用"
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    selectedKey.value = [newValue]
  },
  { immediate: true }
)
</script>
<template>
  <div class="nav ">
    <a-menu showCollapseButton :default-open-keys="['0', '1', '2']" :selected-keys="selectedKey">
      <a-sub-menu key="0">
        <template #icon>
          <IconApps></IconApps>
        </template>
        <template #title>控制台代码生成 </template>
        <a-menu-item v-for="(item, index) in datav" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon>
          <IconBug></IconBug>
        </template>
        <template #title>{{ GMTitle }}</template>
        <a-menu-item v-for="(item, index) in datav2" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon>
          <IconApps></IconApps>
        </template>
        <template #title>GCAuth-暂未实现功能</template>
        <a-menu-item v-for="(item, index) in datav3" :key="item.path" @click="topath(item.path)">
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<style lang="less" scoped>
.nav {
  height: calc(100vh - 57px);

  >div {
    height: 100%;
  }
}
</style>
