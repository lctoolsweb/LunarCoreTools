<template>
  <div :style="{ height: '20px' }"></div>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="ip" label="地址">
      <a-input-group>
        <a-input :style="{ width: '80px' }" placeholder="" v-model="form.ssl" />
        <a-input :style="{ width: '160px' }" placeholder="" v-model="form.ip" />
        <a-input :style="{ width: '160px' }" placeholder="" v-model="form.path" />
      </a-input-group>
    </a-form-item>
    <a-form-item field="username" label="用户名">
      <a-input v-model="form.username" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="password" label="密码">
      <a-input-password v-model="form.password" placeholder="Please enter something" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">提交</a-button>
        <a-button @copyTocken="copyTocken">复制Tocken</a-button>
      </a-space>
    </a-form-item>

  </a-form>
  <!-- {{ form }} -->
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { Message } from '@arco-design/web-vue'
import axios from 'axios';
const form = reactive({
  ssl: "https://",
  ip: '',
  path: "/authentication/login",
  username: '',
  password: '',
})
const handleSubmit = () => {
  console.log(form)

  var Url = `${form.ssl}${form.ip}${form.path}`
  var data = {
    username: form.username,
    password: form.password,
  }
  axios.post(Url, data).then(res => {
    console.log(res);

  },
    err => {
      Message.error(err.message)
      console.log(err);
    }
  )
}

const copyTocken = () => {
  console.log(1);
}
</script>
