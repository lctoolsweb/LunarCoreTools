<template>
  <div class="msg-title text-slate-900 dark:text-slate-100">控制台</div>
  <div class="msg" id="msg">
    <p class="text-slate-900 dark:text-slate-100" v-for="(item, index) in appStore.mesgData" :key="index">
      {{ item }}
    </p>
  </div>
  <div class="cmd">
    <a-input v-model="cmdvalue" placeholder="" allow-clear @keydown.enter="send" />
    <a-button type="outline" @click="send">发送</a-button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const cmdvalue = ref("")
function send() {
  const send_msg = {
    type: 'CMD',
    data: cmdvalue.value,
  }
  const send_msg_str = JSON.stringify(send_msg)
  appStore.socketSend(send_msg_str)
}
watch(
  () => appStore.mesgData,
  () => {
    var div = document.getElementById('msg');
    if (div) {
      div.scrollTop = div.scrollHeight + 30;
    }
  },
  {
    immediate: true,
    deep: true
  },
)
</script>

<style lang="less" scoped>
.msg-title {
  margin: 10px 0;
  text-align: center;
  font-size: 20px;
}

.msg {
  width: 600px;
  height: 240px;
  border: 1px solid #ccc;
  overflow-y: auto;
}

.cmd {
  margin-top: 10px;
  width: 600px;
  display: flex;
}
</style>