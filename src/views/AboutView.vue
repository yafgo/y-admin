<template>
  <PageContainer class="about">
    <h1>This is an about page</h1>
    <h2 v-for="i in 50" :key="i">This is an about page</h2>
  </PageContainer>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
