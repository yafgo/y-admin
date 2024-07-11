<template>
  <a-layout class="layout-content" id="layout-content">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </a-layout>

  <a-back-top target-container="#layout-content" :style="{ position: 'absolute' }">
    <!-- 可自定义slot -->
  </a-back-top>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutContent' })
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
}
</style>
