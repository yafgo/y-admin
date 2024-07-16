<template>
  <a-menu>
    <template v-for="el in menuTree" :key="el.name">
      <a-menu-item @click="goto(el)">{{ el.name }}</a-menu-item>
    </template>
    <a-menu-item key="2">Solution</a-menu-item>
    <a-menu-item key="3">Cloud Service</a-menu-item>
    <a-menu-item key="4">Cooperation</a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import useMenuTree from './use-menu-tree'

defineOptions({ name: 'MenuList' })

const router = useRouter()
const { menuTree } = useMenuTree()

// const mode = ref('vertical')
console.log(menuTree.value)

const goto = (el: RouteRecordRaw) => {
  // console.log(el)
  router.push({
    path: el.path,
  })
}
</script>

<style lang="scss" scoped></style>
