<template>
  <div class="form-container">
    <!-- 新加入的警告提示 -->
    <a-alert type="warning">
      因倒卖🐕与一些人的跳脸行为，远程功能已经停止公开，如果你仍然想要使用远程功能，请通过某些途径进行验证。
    </a-alert>

    <!-- 原有的内容 -->
    <div :style="{ height: '20px' }"></div>
    <a-form :model="form" class="form" @submit="handleSubmit">
      <a-form-item field="ip" label="地址">
        <a-input-group>
          <a-input class="input-small" placeholder="" v-model="form.ssl" />
          <a-input class="input-medium" placeholder="" v-model="form.ip" />
          <a-input class="input-medium" placeholder="" v-model="form.path" />
        </a-input-group>
      </a-form-item>
      <a-form-item field="uid" label="uid">
        <a-input v-model="form.uid" placeholder="请输入玩家UID..." />
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear />
      </a-form-item>
      <a-form-item field="command" label="command">
        <a-input v-model="form.command" placeholder="请输入命令..." />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" shape="round" size="large" html-type="submit">提交</a-button>
          <a-button type="primary" shape="round" size="large" html-type="reset" @click="handleReset">重置</a-button>
        </a-space>
      </a-form-item>

      <a-form-item label="返回数据">
        <a-input v-model="responseData" :disabled="true" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import axios from 'axios';

const form = reactive({
  ssl: "http://",
  ip: '',
  path: "/submit",
  uid: '',
  password: '',
  command: ''
});

const handleReset = () => {
  localStorage.clear();
  form.uid = "";
  form.password = "";
  form.command = "";
  responseData.value = "";
  showMessage.value = false;
  messageType.value = "";
  message.value = "";
};

const responseData = ref('');

const showMessage = ref(false);
const messageType = ref<'error' | 'success' | ''>('');
const message = ref('');

const handleSubmit = () => {
  console.log(form);

  var Url = `${form.ssl}${form.ip}${form.path}`;
  var data = {
    uid: form.uid,
    password: form.password,
    command: form.command
  };

  axios.post(Url, data).then(res => {
    console.log(res);
    
    responseData.value = JSON.stringify(res.data, null, 2);

    if (res.data.retcode === 200) {
      localStorage.setItem('address', form.ssl + form.ip + form.path);
      localStorage.setItem('uid', form.uid);
      localStorage.setItem('password', form.password);
      
      showMessage.value = true;
      messageType.value = 'success';
      message.value = '数据保存成功！';
      Message.success('数据保存成功！');
    } else {
      showMessage.value = true;
      messageType.value = 'error';
      message.value = '数据保存失败！';
    }
  },
  err => {
    Message.error(err.message);
    console.log(err);
  });
};
</script>

<style lang="less" scoped>
.form-container {
  margin: 20px auto;
  max-width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.form {
  max-width: 100%;
}

a-form-item {
  margin-bottom: 16px;
}

a-input-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* 使元素在小屏幕上换行 */
}

a-input-group > a-input {
  margin-right: 8px;
  flex: 1 1 auto; /* 使输入框适应其容器 */
}

.input-small {
  max-width: 80px;
}

.input-medium {
  max-width: 160px;
}

@media screen and (max-width: 768px) {
  .form-container {
    padding: 10px;
  }

  a-input-group {
    flex-direction: column;
    align-items: stretch;
  }

  a-input-group > a-input {
    margin-right: 0;
    margin-bottom: 8px;
    width: 100%;
  }

  .input-small,
  .input-medium {
    width: 100%;
    max-width: none; /* 取消最大宽度限制 */
  }

  a-space {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  a-space > .arco-button {
    width: 100%;
    margin-top: 10px;
  }

  a-form-item {
    margin-bottom: 12px;
  }
}
</style>
