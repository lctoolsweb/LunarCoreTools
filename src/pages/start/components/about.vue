<template>
  <div id="app">
    <button @click="testConnection">测试连接</button>
    <button @click="sendVerificationCode">发送验证码</button>
    <button @click="verifyCode">验证验证码</button>
    <button @click="executeCommand">执行命令</button>
  </div>
</template>

<script>
export default {
  methods: {
    async testConnection() {
      try {
        const response = await this.sendRequest('ping', {});
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async sendVerificationCode() {
      try {
        const response = await this.sendRequest('sendCode', { uid: 123 });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async verifyCode() {
      try {
        const response = await this.sendRequest('verify', { token: 'received_token', code: 1234 });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async executeCommand() {
      try {
        const response = await this.sendRequest('command', { token: 'verified_token', command: '/your_command' });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    async sendRequest(action, data) {
      const apiUrl = 'http://127.0.0.1:443/opencommand/api';
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, data }),
        });
        const responseData = await response.json();
        return responseData;
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
button {
  margin: 10px;
}
</style>
