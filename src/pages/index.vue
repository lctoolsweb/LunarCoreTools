<template>
  <Header />
  <div class="ct">
    <div class="title">
      LunarCoreTools
    </div>
    <div class="introduce">
      Luncore控制台代码快速生成
    </div>
    <div class="start">
      <router-link to="/start/commuse" class="mr-3 flex-none w-[3.0625rem] md:w-auto leading-6 dark:text-slate-200">
        开始
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">

</script>
<style lang="less">
.ct {
  width: 500px;
  margin: auto;
  margin-top: 20vh;

  .title {
    text-align: center;
    font-size: 28px;
  }

  .introduce {
    margin-top: 10px;
    color: #545343;
    text-align: center;
    font-size: 16px;
  }

  .start{
    margin-top: 10px;
    text-align: center;
    font-size: 24px;
  }
}
</style>