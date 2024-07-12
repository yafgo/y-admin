<template>
  <div class="header-right">
    <span class="menu-item">菜单1</span>
    <span class="menu-item">菜单2</span>
    <span class="menu-item">用户菜单3</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeaderRight' })
</script>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .menu-item {
    margin-left: 16px;
  }
}
</style>
