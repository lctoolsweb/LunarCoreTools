<script setup lang="ts">
import { reactive, ref, provide } from 'vue'
import Header from '@/components/Header/index.vue'
import startnav from './components/startnav.vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()



function send(value: string) {
  const send_msg = {
    type: 'CMD',
    data: value,
  }
  const send_msg_str = JSON.stringify(send_msg)
  appStore.socketSend(send_msg_str)
}

const isLogin = ref(appStore.isLogin)
provide('send', send)
provide('isLogin', !isLogin)


</script>
<template>
  <Header />
  <div class="cont">
    <startnav />
    <div class="selectcom">
      <router-view></router-view>
    </div>
  </div>

</template>
<style lang="less" scoped>
@import url('./style.less');
</style>