import { UserConfig, ConfigEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import { createVitePlugins } from './config/vite/plugins';
import proxy from './config/vite/proxy';
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant';
import { generateModifyVars } from './config/themeConfig';

function resovePath(paths: string) {
  return path.resolve(__dirname, paths);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  console.log(command, mode);

  const viteConfig: UserConfig = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        '@config': resovePath('./config'),
        "@components": resovePath('./src/components'),
        '@utils': resovePath('./src/utils'),
        '@api': resovePath('./src/api'),
        
      }
    },
    base: "./",
    plugins: createVitePlugins(isBuild),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
          additionalData: `@import "${resovePath('src/assets/styles/base.less')}";`
        },
      },
    },
    server: {
      hmr: { overlay: false },
      port: VITE_PORT,
      open: false,
      cors: true,
      host: '0.0.0.0',
      proxy,
      force: true
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        external: [],
      },
      watch: {},
      chunkSizeWarningLimit: 2000,
    },
  };

  return viteConfig;
};
