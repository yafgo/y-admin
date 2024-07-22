import { defineConfig } from 'vite'

export default defineConfig({
  mode: 'production',
  plugins: [],
  // 构建配置
  build: {
    outDir: 'dist', // 指定打包输出路径, 默认为 'dist'
    assetsDir: 'static', // 静态资源输出路径(相对于 `outDir`), 默认为 'assets'
    assetsInlineLimit: 4096, // 静态超过多少kb时, 生成单独文件
    chunkSizeWarningLimit: 2000, // 单个chunk超过多少kb时, 发出警告
    sourcemap: false, // 是否生成 sourcemap 文件
    /**
     * 混淆模式, 'esbuild' | 'terser' , 默认 'esbuild'
     * 设为 'esbuild' 使用和 `build` 同级的 `esbuild` 配置
     * 设为 'terser' 使用下面的 terserOptions 配置, 同时需要安装 terser 依赖
     */
    minify: 'esbuild',
    /* terserOptions: {
      compress: {
        drop_console: true, // 去除console
        drop_debugger: true, // 去除debugger
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0, 这可能会导致 Chrome 上的性能问题
      },
      format: {
        comments: false, // 去除注释
      },
    }, */
    rollupOptions: {
      output: {
        // 入口文件
        entryFileNames: 'static/js/[name]-[hash].js',
        // 各页面js
        chunkFileNames: 'static/js/[name]-[hash].js',
        // 其他静态资源
        assetFileNames: 'static/[ext]/[name]-[hash][extname]',
      },
    },
  },
  esbuild: {
    drop: [/* 'console', */ 'debugger'], // 压缩时移除 console 和 debugger
    pure: ['console.log' /* , 'console.info' */], // 压缩时移除特定的 console
  },
})
