<template>
  <a-layout class="layout app-layout layout-mix">
    <!-- 顶部栏 -->
    <a-layout-header class="layout-header">
      <HeaderLeft></HeaderLeft>

      <div class="header-center">
        <MenuTop :menus="topMenus" @menuClick="handleTopMenuClick"></MenuTop>
      </div>

      <HeaderRight></HeaderRight>
    </a-layout-header>

    <!-- 下方内容区 -->
    <a-layout class="app-layout-content">
      <!-- 左侧栏 -->
      <LayoutSider :menus="leftMenus"></LayoutSider>

      <!-- 右侧内容区 -->
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
import HeaderLeft from './components/LayoutHeader/HeaderLeft.vue'
import HeaderRight from './components/LayoutHeader/HeaderRight.vue'
import MenuTop from './components/MenuList/MenuTop.vue'
import LayoutSider from './components/LayoutSider/index.vue'
import LayoutContent from './components/LayoutContent/index.vue'
// import { useAppStore } from '@/stores'
import useMenuTree from '@/router/app-menus'

defineOptions({ name: 'LayoutMix' })

// const appStore = useAppStore()

const { menuTree } = useMenuTree()

// 顶部菜单
const topMenus = computed(() => menuTree.value)
// 左侧菜单
const leftMenus = ref<RouteRecordNormalized[]>([])

const handleTopMenuClick = (el: RouteRecordNormalized) => {
  console.log('el', el)
  if (isExternal(el.path)) {
    window.open(el.path)
    return
  }
  refreshLeftMenus(el)

  console.log('leftMenus', leftMenus.value)
}

/**
 * 刷新左侧菜单
 */
const refreshLeftMenus = (el: RouteRecordNormalized) => {
  console.log('左侧菜单', el.name)
  const menu = menuTree.value.find((item: RouteRecordNormalized) => item.name === el.name)
  if (!menu || !menu.children) {
    leftMenus.value = []
    return
  }
  leftMenus.value = menu.children
}

/** 判断 path 是否为外链 */
const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

onMounted(() => {
  console.log('app-layout mix')
})
</script>

<style scoped lang="scss">
.app-layout {
  height: 100%;

  &-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: var(--color-fill-2);
  }
}

.layout-header {
  width: 100%;
  height: 59px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;

  .header-left {
    display: flex;
  }

  .header-center {
    flex: 1;
  }

  .header-right {
    display: flex;
  }
}
</style>

<style scoped lang="less">
/* .layout {
      color: #dfa;
    } */
</style>
