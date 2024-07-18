<template>
  <a-layout-header class="layout-header">
    <HeaderLeft></HeaderLeft>

    <HeaderCenter></HeaderCenter>

    <HeaderRight></HeaderRight>
  </a-layout-header>
</template>

<script setup lang="ts">
import HeaderLeft from './HeaderLeft.vue'
import HeaderCenter from './HeaderCenter.vue'
import HeaderRight from './HeaderRight.vue'

defineOptions({ name: 'LayoutHeader' })
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 56px;
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
