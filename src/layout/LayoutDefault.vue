<template>
  <a-layout class="layout app-layout">
    <!-- 顶部栏 -->
    <a-layout-header class="layout-header">
      <HeaderLeft></HeaderLeft>

      <div class="header-center">
        <template v-if="appStore.layout === 'top'">
          <MenuList mode="horizontal"></MenuList>
        </template>
      </div>

      <HeaderRight></HeaderRight>
    </a-layout-header>

    <!-- 下方内容区 -->
    <a-layout class="app-layout-content">
      <template v-if="appStore.layout === 'left'">
        <!-- 左侧栏 -->
        <LayoutSider></LayoutSider>
      </template>

      <!-- 右侧内容区 -->
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import HeaderLeft from './components/LayoutHeader/HeaderLeft.vue'
import HeaderRight from './components/LayoutHeader/HeaderRight.vue'
import MenuList from './components/MenuList/index.vue'
import LayoutSider from './components/LayoutSider/index.vue'
import LayoutContent from './components/LayoutContent/index.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'LayoutDefault' })

const appStore = useAppStore()

onMounted(() => {
  console.log('app-layout default')
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
