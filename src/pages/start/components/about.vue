<template>
  <div id="app">
    <div class="commuse">
      <div class="commuse-item">
        <div>服务器地址：</div>
        <input v-model="serverAddress" />
        <button @click="testConnection">确定</button>
      </div>
      <div class="commuse-item">
        <div>UID：</div>
        <input v-model="uid" />
        <button @click="sendVerificationCode">发送验证码</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serverAddress: '', // 服务器地址
      uid: '', // UID
    };
  },
  methods: {
    async testConnection() {
      try {
        const response = await this.sendRequest('ping', {}, this.serverAddress);
        console.log(response);
        if (response.retcode === 200) {
          alert('服务器连接成功');
          this.serverAddress = response.data.serverAddress;
        } else {
          throw new Error('服务器连接失败');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async sendVerificationCode() {
      try {
        const uid = parseInt(this.uid, 10);
        if (isNaN(uid)) {
          throw new Error('UID必须是一个整数');
        }

        const response = await this.sendRequest('sendCode', { uid }, this.serverAddress, 'no-cors');
        console.log(response);
        if (response.retcode === 200) {
          alert('验证码发送成功');
          // Handle success as needed
        } else {
          throw new Error('验证码发送失败: ' + response.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async sendRequest(action, data, serverAddress, mode = 'cors') {
      const apiUrl = `http://${serverAddress}/opencommand/api`;
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          mode: mode,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, data }),
        });

        if (response.ok) {
          return { retcode: 200, message: 'Success' };
        } else {
          throw new Error(`Failed to send ${action} request. Status: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`Failed to send ${action} request: ${error.message}`);
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 20px;
}
.commuse {
  width: 500px;
  margin: auto;
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

  button {
    margin-left: 10px;
  }
}
</style>
