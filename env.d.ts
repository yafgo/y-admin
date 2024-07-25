/// <reference types="vite/client" />
/// <reference types="@arco-design/web-vue/es/components" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 自定义 Env 类型 (注意字段不要定义 boolean 类型, 因为获取到的仍然是 string 类型)
 */
interface ImportMetaEnv {
  /** 接口地址 */
  readonly VITE_API_BASE_URL: string
  /** 是否启用mock */
  readonly VITE_ENABLE_MOCK: string
}
