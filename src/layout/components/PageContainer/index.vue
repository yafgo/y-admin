<template>
  <main class="page-container">
    <div class="page-content">
      <slot></slot>
    </div>

    <LayoutFooter v-if="appStore.footer"></LayoutFooter>
  </main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import LayoutFooter from '../LayoutFooter/index.vue'

defineOptions({ name: 'PageContainer' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.page-container {
  .page-content {
    padding: 0 16px 16px;
  }
}
</style>
