<template>
  <a-layout class="layout app-layout">
    <!-- 顶部栏 -->
    <LayoutHeader></LayoutHeader>

    <!-- 下方内容区 -->
    <a-layout class="app-layout-content">
      <!-- 左侧栏 -->
      <LayoutSider></LayoutSider>

      <!-- 右侧内容区 -->
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutSider from './components/LayoutSider.vue'
import LayoutContent from './components/LayoutContent/index.vue'

defineOptions({ name: 'AppLayout' })

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
  }
}
</style>

<style scoped lang="less">
/* .layout {
    color: #dfa;
  } */
</style>
