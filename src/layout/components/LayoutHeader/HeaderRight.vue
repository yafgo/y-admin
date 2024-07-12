<template>
  <a-row class="header-right">
    <a-space size="medium">
      <!-- 搜索 -->
      <a-tooltip content="搜索">
        <a-button size="mini" class="nav-btn">
          <template #icon>
            <icon-search :size="18" />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 全屏 -->
      <a-tooltip content="切换全屏">
        <a-button size="mini" class="nav-btn" @click="handleToggleFullscreen">
          <template #icon>
            <icon-fullscreen :size="18" />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 深色模式 -->
      <a-tooltip :content="'切换为' + (theme === 'dark' ? '浅色模式' : '深色模式')">
        <a-button size="mini" class="nav-btn" @click="handleToggleTheme">
          <template #icon>
            <icon-moon-fill :size="18" v-if="theme === 'dark'" />
            <icon-sun-fill :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <span class="menu-item">菜单1</span>
      <span class="menu-item">菜单2</span>
    </a-space>
  </a-row>
</template>

<script setup lang="ts">
defineOptions({ name: 'HeaderRight' })

const theme = ref('light')

const handleToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const handleToggleFullscreen = () => {
  // todo 待实现
  console.log('切换全屏')
}
</script>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .nav-btn {
    border: 0 !important;
    background-color: transparent;

    &:hover {
      background: var(--color-secondary-hover) !important;
    }

    &:active {
      background: var(--color-secondary-active) !important;
    }
  }

  .menu-item {
    margin-left: 16px;
  }
}
</style>
