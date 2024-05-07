<template>
    <div class="iframe-container">
      <iframe
        ref="iframe"
        src="https://ys.mihoyo.com/main/"
        frameborder="0"
        scrolling="auto"
        allowfullscreen
        class="iframe-content"
      ></iframe>
    </div>
    
  </template>
  
  <script>
  import { IosAirplane } from '@vicons/ionicons4';
  import { NAlert, NIcon } from 'naive-ui';
  import { useI18n } from 'vue-i18n';
  export default {
    mounted() {
      window.addEventListener("resize", this.adjustIframeHeight);
      this.adjustIframeHeight(); 
    },
    beforeDestroy() {
      
      window.removeEventListener("resize", this.adjustIframeHeight);
    },
    methods: {
      adjustIframeHeight() {
        const iframe = this.$refs.iframe;
        if (iframe) {
          iframe.style.height = window.innerHeight + "px";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .iframe-container {
    width: 86vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .iframe-content {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  