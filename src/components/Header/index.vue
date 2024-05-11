<template>
  <div class="full-screen">
    <a-page-header
      :style="{ width: '100vw', background: theme === 'dark' ? 'black' : 'white' }"
      title="LunarCoreWebTools"
    >
      <template #extra>
        <div class="extra-container">
          
          <a href="https://github.com/lctoolsweb/LunarCoreTools/" target="_blank" rel="noopener noreferrer" class="github-link">
            <SvgIcon name="svg-github" size="small" color="#999999"></SvgIcon>
          </a>
          <a-radio-group type="button" default-value="light" @change="toggleTheme">
            <a-radio value="light">Light</a-radio>
            <a-radio value="dark">Dark</a-radio>
          </a-radio-group>
        </div>
      </template>
    </a-page-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light'
    };
  },
  methods: {
    toggleTheme(theme) {
      this.theme = theme;
      if (theme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        document.body.removeAttribute('arco-theme');
      }
    }
  }
};
</script>

<style>
.full-screen {
  width: 100vw;
  overflow-x: hidden;
}

.a-page-header {
  background: white; 
}
.extra-container {
  display: flex;
  align-items: center; 
}
.github-link {
  
  text-decoration: none;
  color: inherit;
}
</style>
