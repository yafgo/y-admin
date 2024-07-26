<template>
  <a-dropdown trigger="hover" position="br">
    <a-row align="center" :wrap="false" class="user-wrapper">
      <a-avatar :size="32">
        <img alt="avatar" :src="avatar" />
      </a-avatar>
      <span class="username">{{ userStore.name }}</span>
      <icon-down></icon-down>
    </a-row>

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
import { useUserStore } from '@/stores'
import avatarDefault from '@/assets/logo.svg'

defineOptions({ name: 'HeaderRightUser' })

const userStore = useUserStore()

const avatar = computed(() => {
  return userStore.avatar || avatarDefault
})

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
.user-wrapper {
  cursor: pointer;
  color: var(--color-text-1);

  .username {
    margin-left: 10px;
    white-space: nowrap;
  }

  .arco-icon-down {
    transition: all 0.3s;
    margin-left: 2px;
  }

  &.arco-dropdown-open {
    .arco-icon-down {
      transform: rotate(180deg);
    }
  }
}

.menu-item-logout {
  color: rgb(var(--red-6));
}
</style>
