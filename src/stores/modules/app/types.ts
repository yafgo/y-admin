import type { RouteRecordNormalized } from 'vue-router'

export interface AppState {
  theme: string
  /** 布局: left-左侧菜单(默认), top-顶部菜单, mix-混合菜单 */
  layout: 'left' | 'top' | 'mix'

  /** 色弱模式 */
  colorWeak: boolean

  navbar: boolean
  menu: boolean
  hideMenu: boolean
  menuCollapsed: boolean

  /** 是否显示页脚 */
  footer: boolean

  /** 主题色 */
  themeColor: string

  /** 左侧菜单栏宽度 */
  menuWidth: number
  globalSettings: boolean
  device: string

  /** 是否启用多页签 */
  tabBar: boolean
  /**
   * 多页签模式
   *   "card": 卡片模式
   *   "card-gutter": 卡片模式带间距
   *   "text": 文本模式
   *   "rounded": 圆角模式
   *   "capsule": 胶囊模式
   */
  tabBarMode: App.TabsType

  /** 是否使用服务端菜单 */
  menuFromServer: boolean
  /** 服务端菜单 */
  serverMenu: RouteRecordNormalized[]

  [key: string]: unknown
}
