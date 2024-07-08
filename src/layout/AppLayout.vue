<template>
  <!-- <a-layout class="layout app-layout"> -->
  <LayoutHeader></LayoutHeader>

  <router-view></router-view>
  <!-- </a-layout> -->
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'

defineOptions({ name: 'AppLayout' })

onMounted(() => {
  console.log('app-layout')
})
</script>

<style scoped lang="scss">
/* .layout {
  background-color: #eee;
} */
</style>

<style scoped lang="less">
/* .layout {
  color: #dfa;
} */
</style>
