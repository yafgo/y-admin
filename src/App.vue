<template>
  <a-config-provider>
    <RouterView></RouterView>
    <template #loading>
      <img src="/static/images/loading.gif" class="loading-icon" />
    </template>
  </a-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
</script>

<style lang="scss" scoped>
.loading-icon {
  width: 30px;
}
</style>
