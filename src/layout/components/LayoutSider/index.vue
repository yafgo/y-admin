<template>
  <a-layout-sider
    class="layout-sider"
    breakpoint="sm"
    :collapsible="true"
    :collapsed="appStore.menuCollapsed"
    :width="appStore.menuWidth"
    :hide-trigger="true"
  >
    <div class="menu-wrapper">
      <MenuList></MenuList>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import MenuList from '../MenuList/index.vue'

defineOptions({ name: 'LayoutSider' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout-sider {
  // z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
</style>
