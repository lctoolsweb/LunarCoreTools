<template>
  <div>
    <div :style="{ height: '20px' }"></div>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="ip" label="地址">
        <a-input-group>
          <a-input :style="{ width: '80px' }" placeholder="" v-model="form.ssl" />
          <a-input :style="{ width: '160px' }" placeholder="" v-model="form.ip" />
          <a-input :style="{ width: '160px' }" placeholder="" v-model="form.path" />
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
          <a-button html-type="submit">提交</a-button>
          <a-button @click="copyTocken">复制Tocken</a-button>
        </a-space>
      </a-form-item>

      <!-- 新增的不可编辑文本框 -->
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

// 新增响应数据的变量
const responseData = ref('');

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
    // 更新文本框内容
    responseData.value = JSON.stringify(res.data, null, 2);
  },
  err => {
    Message.error(err.message);
    console.log(err);
  });
};

const copyTocken = () => {
  console.log(1);
};
</script>
