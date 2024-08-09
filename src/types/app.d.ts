declare namespace App {
  /** 导航页签风格 */
  type TabsType = 'line' | 'card' | 'card-gutter' | 'rounded' | 'capsule'
  interface TabBarItem {
    label: string
    value: TabsType
  }
}
