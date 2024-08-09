<template>
  <a-layout-sider
    class="layout-sider"
    breakpoint="xl"
    :collapsible="true"
    :collapsed="collapsed"
    @collapse="handleCollapse"
    :width="appStore.menuWidth"
    :hide-trigger="true"
  >
    <div class="menu-wrapper">
      <MenuList :menus="props.menus" :theme="menuTheme"></MenuList>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import MenuList from '../MenuList/index.vue'
import type { RouteRecordNormalized } from 'vue-router'

defineOptions({ name: 'LayoutSider' })

/** 是否第一次执行 */
const isInit = ref(true)
const appStore = useAppStore()

const props = withDefaults(
  defineProps<{
    menus?: RouteRecordNormalized[]
  }>(),
  {
    menus: () => [],
  }
)

const menuTheme = computed(() => (appStore.menuDark ? 'dark' : 'light'))

const collapsed = computed(() => appStore.menuCollapsed)
const handleCollapse = (val: boolean) => {
  if (isInit.value) return
  appStore.updateSettings({ menuCollapsed: val })
}

onMounted(() => {
  isInit.value = false
})
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
    z-index: 1;
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
