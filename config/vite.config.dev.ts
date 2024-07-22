import { defineConfig } from 'vite'

export default defineConfig({
  mode: 'development',
  server: {
    // 服务启动后是否自动在浏览器打开
    open: false,
    fs: {
      strict: true,
    },
  },
  plugins: [],
})
