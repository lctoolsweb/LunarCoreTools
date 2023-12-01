<script setup lang="ts">
import { reactive, ref } from 'vue'
import Header from '@/components/Header/index.vue'
import startnav from './components/startnav.vue'
import other from './components/other.vue'


</script>
<template>
  <Header />
  <div class="cont">
    <startnav />
    <div class="selectcom">
      <other />
    </div>
  </div>

</template>

<style lang="less" scoped>
@import url('./style.less');
</style>