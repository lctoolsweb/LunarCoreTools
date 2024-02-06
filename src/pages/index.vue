<template>
  <Header />
  <div class="ct">
    <!-- 添加图片 -->
    <img src="https://img.morax.top/file/4b572184f3de63e1c361f.png" alt="Your Image" class="centered-image" />

    <div class="title">
      LunarCoreWebTools
    </div>
    <div class="introduce">
      适用于LunarCore的web命令生成器
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
  text-align: center; 
}

.centered-image {
  width: 100%; 
  max-width: 150px; 
  margin: 0 auto 10px; 
  display: block; 
  border-radius: 10px; 
}

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

.start {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
}
</style>
