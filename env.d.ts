/// <reference types="vite/client" />
/// <reference types="@arco-design/web-vue/es/components" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 接口地址 */
  readonly VITE_API_BASE_URL: string
  /** 是否启用mock */
  readonly VITE_ENABLE_MOCK: boolean
}
