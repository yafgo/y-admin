<template>
  <div class="header-center">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeaderCenter' })
</script>

<style lang="scss" scoped>
.header-center {
  display: flex;
  align-items: center;
  // width: 100%;
  text-align: center;

  a.router-link-exact-active {
    color: var(--color-text);

    &:hover {
      background-color: transparent;
    }
  }

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  a:first-of-type {
    border: 0;
  }
}
</style>
