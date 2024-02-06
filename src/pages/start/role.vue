<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/Header/index.vue'
import startnav from './components/startnav.vue'
import role from './components/role.vue'


</script>
<template>
  <Header />
  <div class="cont">
    <startnav />
    <div class="selectcom">
    <role />

    </div>
  </div>

</template>

<style lang="less" scoped>
@import url('./style.less');
</style>