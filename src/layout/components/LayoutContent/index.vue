<template>
  <a-layout class="layout-content" id="layout-content">
    <TabBar v-if="appStore.tabBar"></TabBar>

    <a-layout-content>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component"></component>
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>

  <a-back-top target-container="#layout-content" :style="{ position: 'absolute' }">
    <!-- 可自定义slot -->
  </a-back-top>
</template>

<script setup lang="ts">
import TabBar from '../TabBar/index.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'LayoutContent' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  // overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;

  .arco-layout-content {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
  }
}
</style>
