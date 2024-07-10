<template>
  <a-layout class="layout-content">
    <router-view></router-view>

    <p class="layout-footer">底部</p>
  </a-layout>
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

.layout-footer {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
</style>
