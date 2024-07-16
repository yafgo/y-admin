<template>
  <a-dropdown trigger="hover" position="br">
    <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
      <img alt="avatar" :src="avatar" />
    </a-avatar>
    <template #content>
      <a-doption>
        <a-space @click="todo">
          <icon-tag />
          <span> 菜单1 </span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space @click="$router.push({ name: 'Info' })">
          <icon-user />
          <span> 用户中心 </span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space @click="$router.push({ name: 'Setting' })">
          <icon-settings />
          <span> 用户设置 </span>
        </a-space>
      </a-doption>
      <a-doption>
        <a-space class="menu-item-logout" @click="todo">
          <icon-export />
          <span> 退出登录 </span>
        </a-space>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeaderRightUser' })

const avatar = ref('/src/assets/logo.svg')

const todo = () => console.log('todo')
</script>

<style lang="scss" scoped>
.menu-item-logout {
  color: rgb(var(--red-6));
}
</style>
