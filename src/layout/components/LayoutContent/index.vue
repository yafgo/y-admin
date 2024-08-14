<template>
  <a-layout class="layout-content" id="layout-content">
    <TabBar v-if="appStore.tabBar"></TabBar>

    <a-layout-content>
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <keep-alive :include="tabBarStore.getCacheList">
            <component :is="Component" :key="route.path" v-if="appStore.reloadPageFlag"></component>
          </keep-alive>
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
import { useAppStore, useTabBarStore } from '@/stores'

defineOptions({ name: 'LayoutContent' })

const appStore = useAppStore()
const tabBarStore = useTabBarStore()
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

@import '../../../assets/styles/css/transition.css';
</style>
