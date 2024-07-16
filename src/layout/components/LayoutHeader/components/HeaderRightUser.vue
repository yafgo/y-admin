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
        <a-space class="menu-item-logout" @click="handleLogout">
          <icon-export />
          <span> 退出登录 </span>
        </a-space>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'

defineOptions({ name: 'HeaderRightUser' })

const avatar = ref('/src/assets/logo.svg')

const todo = () => {
  Message.success('todo')
}

const handleLogout = () => {
  const confirm = Modal.confirm({
    title: '提示',
    content: '确定要退出登录吗？',
    onOk: () => {
      Message.success('退出成功')
    },
    onBeforeOk: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    },
  })
  console.log(confirm)
}
</script>

<style lang="scss" scoped>
.menu-item-logout {
  color: rgb(var(--red-6));
}
</style>
