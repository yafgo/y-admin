<template>
  <div class="header-left">
    <a-space class="site-logo" @click="handleLogoClick">
      <img alt="logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
      <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
        Y Admin
      </a-typography-title>
    </a-space>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeaderLeft' })

const handleLogoClick = () => {
  console.log('click Site Logo')
}
</script>

<style lang="scss" scoped>
.site-logo {
  cursor: pointer;
}
</style>
