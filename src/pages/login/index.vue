<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import Header from '@/components/Header/index.vue'
import { Message } from '@arco-design/web-vue'
import { useAppStore, useUserStore } from '@/store'
const appStore = useAppStore()

var wss = ref('')
function login() {
  if (wss.value) {
    appStore.socketConnect(wss.value)
  } else {
    Message.error(`地址不正确`)
  }
}

function close() {
  appStore.socketClose()
}

function send() {
  const send_msg = {
    type: 'CMD',
    data: 'g',
  }
  const send_msg_str = JSON.stringify(send_msg)
  appStore.socketSend(send_msg_str)
}
const data = ref([
  {
    label: '系统运行时长',
    value: '14小时8分钟44秒',
  },
  {
    label: '在线玩家数量',
    value: '0',
  },
  {
    label: 'Tick耗时',
    value: '999',
  },
  {
    label: '内存占用',
    value: '66719376/101498880',
  }
])
const data2 = ref([
  {
    label: '服务器名称',
    value: 'ttt',
  },
  {
    label: '系统',
    value: 'win10',
  },
  {
    label: '服务器地址',
    value: '0.0.0.0',
  },
  {
    label: 'JAVA版本',
    value: '17.0',
  },
  {
    label: '插件版本',
    value: '1.0',
  }
])

onMounted(() => {
  const WSS = localStorage.getItem("WSS")
  if (WSS) {
    wss.value = WSS
  }
})

watch(
  () => appStore.tick,
  () => {
    data.value = appStore.tick
  },
  {
    immediate: true,
  },
)

watch(
  () => appStore.baseData,
  () => {
    data2.value = appStore.baseData
  },
  {
    immediate: true,
  },
)

</script>

<style lang="less" scoped>
.login {
  width: 600px;
  margin-top: 10vh;

  .title {
    text-align: center;
    line-height: 40px;
  }
  .commuse-item {
    display: flex;
    align-items: center;
    color: #000;
    margin: 18px 0;

    >div {
      &:nth-child(1) {
        width: 150px;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
</style>