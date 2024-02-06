import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { AppState } from './types';
import { useWebSocket } from '@vueuse/core'
import { watch } from 'vue'
import { Message } from '@arco-design/web-vue'

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      title: "",
      h1: '',
      theme: 'dark',
      isLogin: false,
      tick: [
        {
          label: '系统运行时长',
          value: '/',
        },
        {
          label: '在线玩家数量',
          value: '/',
        },
        {
          label: 'Tick耗时',
          value: '/',
        },
        {
          label: '内存占用',
          value: '/',
        }
      ],
      baseData: [
        {
          label: '服务器名称',
          value: '/',
        },
        {
          label: '系统',
          value: '/',
        },
        {
          label: '服务器地址',
          value: '/',
        },
        {
          label: 'JAVA版本',
          value: '/',
        },
        {
          label: '插件版本',
          value: '/',
        }
      ],
      send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean | undefined) => { },
      close: () => { },
      open: () => { },
      mesgData: [""],
      PlayerList: []
    }),
    getters: {},
    actions: {
      // Update app settings
      updateSettings(partial: Partial<AppState>) {
        // @ts-ignore-next-line
        this.$patch(partial);
      },

      // Change theme color
      toggleTheme(dark: boolean) {
        if (dark) {
          this.theme = 'dark';
          document.documentElement.classList.add('dark');
          document.body.setAttribute('arco-theme', 'dark');
          localStorage.setItem('theme', this.theme)
        } else {
          this.theme = 'light';
          document.documentElement.classList.remove('dark');
          document.body.removeAttribute('arco-theme');
          localStorage.setItem('theme', this.theme)
        }
      },
      socketConnect(wss: string) {

        const { status, data, send, open, close } = useWebSocket(wss, {
          autoReconnect: {
            retries: 2,
            delay: 1000,
            onFailed() {
              Message.error('连接失败,请去GrasscuttersWebDashboard查看处理方法')
              localStorage.removeItem("WSS")
            },
          },
          // heartbeat: {
          // message: 'ping',
          // interval: 10000,
          // },
          onConnected: (ws) => {
            this.isLogin = true
            console.log("已登录");
            ws.send("{\"type\":\"State\",\"data\":\"0\"}");
            ws.send("{\"type\":\"Player\",\"data\":\"0\"}");
          }
        })
        localStorage.setItem("WSS", wss)
        watch(
          data,
          (parse) => {
            parse = JSON.parse(parse)
            switch (parse.eventName) {
              case "tick":
                const data = []
                for (const key in parse.data) {
                  if (Object.prototype.hasOwnProperty.call(parse.data, key)) {
                    var element = parse.data[key];
                    var label = ""
                    if (key == "getAllocatedMemory") {
                      label = "系统内存"
                      element = (element / 1024 / 1024).toFixed(2) + "M"
                    }
                    if (key == "playerCount") {
                      label = "在线玩家数量"
                    }
                    if (key == "serverUptime") {
                      label = "系统运行时长"
                      element = this.formatSecToStr(Math.ceil(element / 1000))
                    }
                    if (key == "tickTimeElapsed") {
                      label = "Tick耗时"
                    }
                    if (key == "getFreeMemory") {
                      label = "已用内存"
                      element = (element / 1024 / 1024).toFixed(2) + "M"
                    }
                    data.push({
                      label: label,
                      value: element,
                    })
                  }
                }
                this.tick = data
                break;
              case "BaseData":
                const data2 = []

                for (const key in parse.data) {
                  if (Object.prototype.hasOwnProperty.call(parse.data, key)) {
                    var element = parse.data[key];
                    var label = ""
                    if (key == "GrVersion") {
                      label = "插件版本"
                    }
                    if (key == "IP") {
                      label = "服务器地址"
                    }
                    if (key == "JavaVersion") {
                      label = "JAVA版本"
                    }
                    if (key == "SystemVersion") {
                      label = "系统"
                    }
                    if (key == "ServerName") {
                      label = "服务名称"
                    }
                    data2.push({
                      label: label,
                      value: element,
                    })
                  }
                }
                this.baseData = data2

                break;

              case "cmd_msg":
                this.mesgData.push(parse.data)
                Message.info(parse.data)
                break;
              case "PlayerList":
                this.PlayerList = parse.data
                break;
              default:
                break;
            }
          }
        )
        this.send = send
        this.close = close
        this.open = open
      },
      socketSend(str: string) {
        this.send(str)
      },
      socketClose() {
        this.isLogin = false
        this.close()
        localStorage.removeItem("WSS")
      },
      formatSecToStr(seconds: number) {
        let daySec = 24 * 60 * 60;
        let hourSec = 60 * 60;
        let minuteSec = 60;
        let dd = Math.floor(seconds / daySec);
        let hh = Math.floor((seconds % daySec) / hourSec);
        let mm = Math.floor((seconds % hourSec) / minuteSec);
        let ss = seconds % minuteSec;
        if (dd > 0) {
          return dd + "天" + hh + "小时" + mm + "分钟" + ss + "秒";
        } else if (hh > 0) {
          return hh + "小时" + mm + "分钟" + ss + "秒";
        } else if (mm > 0) {
          return mm + "分钟" + ss + "秒";
        } else {
          return ss + "秒";
        }
      }
    }
  }
)

export function useAppOutsideStore() {
  return useAppStore(piniaStore)
}