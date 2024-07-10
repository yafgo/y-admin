<template>
  <a-layout-sider
    class="layout-sider"
    collapsible
    breakpoint="xl"
    :width="220"
    :collapsed-width="54"
  >
    <div class="logo">Logo</div>
  </a-layout-sider>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-sider {
  .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
    text-align: center;
    line-height: 32px;
  }

  .logo {
    background: var(--color-fill-2);
  }
}
</style>
