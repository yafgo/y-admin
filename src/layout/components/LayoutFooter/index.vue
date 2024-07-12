<template>
  <div class="layout-footer">
    <span>底部</span>
    <span> &copy; xxx </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutFooter' })
</script>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  padding: 16px 32px;
  text-align: center;
  background-color: var(--color-fill-2);
}
</style>
