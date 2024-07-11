<template>
  <main class="page-container">
    <slot></slot>

    <LayoutFooter></LayoutFooter>
  </main>
</template>

<script setup lang="ts">
import LayoutFooter from '../LayoutFooter/index.vue'
defineOptions({ name: 'PageContainer' })
</script>

<style lang="scss" scoped></style>
