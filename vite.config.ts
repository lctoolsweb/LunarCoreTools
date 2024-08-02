import { UserConfig, ConfigEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './config/vite/plugins';
import proxy from './config/vite/proxy';
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant';
import { generateModifyVars } from './config/themeConfig';

function resovePath(paths: string) {
  return path.resolve(__dirname, paths);
}

export default async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const isBuild = command === 'build';
  console.log('Command:', command);
  console.log('Mode:', mode);

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
    plugins: await createVitePlugins(isBuild),
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
      chunkSizeWarningLimit: 2000,
    },
  };

  console.log('Vite config:', viteConfig);

  return viteConfig;
};
