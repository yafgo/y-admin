<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <PageContainer>
    <TheWelcome v-for="i in 5" :key="i" />
  </PageContainer>
</template>
