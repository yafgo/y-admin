import type { RouteRecordNormalized } from 'vue-router'

export interface AppState {
  theme: string
  /** 布局: left-左侧菜单(默认), top-顶部菜单, mix-混合菜单 */
  layout: 'left' | 'top' | 'mix'
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  topMenu: boolean
  hideMenu: boolean
  menuCollapsed: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  menuFromServer: boolean
  serverMenu: RouteRecordNormalized[]
  [key: string]: unknown
}
