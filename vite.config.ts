import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, mergeConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe } from 'vite-plugin-mock'

import viteConfigDev from './config/vite.config.dev'
import viteConfigProd from './config/vite.config.prod'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  const baseConfig: UserConfig = {
    base: env.BASE_URL,
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        // 自动导入vue相关函数，如: ref、reactive、toRef等
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts',
      }),
      Components({
        // 指定组件位置，默认是 src/components 自动导入自定义组件
        dirs: ['src/components', 'src/layout/components/PageContainer'],
        extensions: ['vue', 'tsx'],
        // 配置文件生成位置
        dts: 'src/components.d.ts',
      }),
      viteMockServe({
        mockPath: 'src/mock',
        enable: env.VITE_ENABLE_MOCK,
        logger: true, // 是否在控制台显示请求日志
        watchFiles: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
  }

  return mergeConfig(baseConfig, command === 'build' ? viteConfigProd : viteConfigDev)
})
