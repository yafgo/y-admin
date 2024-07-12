<template>
  <main class="page-container">
    <div class="page-content">
      <slot></slot>
    </div>

    <LayoutFooter></LayoutFooter>
  </main>
</template>

<script setup lang="ts">
import LayoutFooter from '../LayoutFooter/index.vue'
defineOptions({ name: 'PageContainer' })
</script>

<style lang="scss" scoped>
.page-container {
  .page-content {
    padding: 0 16px 16px;
  }
}
</style>
