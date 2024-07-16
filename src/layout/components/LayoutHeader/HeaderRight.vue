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
      <a-tooltip :content="isFullscreen ? '退出全屏' : '进入全屏'">
        <a-button size="mini" class="nav-btn" @click="toggleFullScreen">
          <template #icon>
            <icon-fullscreen :size="18" v-if="!isFullscreen" />
            <icon-fullscreen-exit :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 深色模式 -->
      <a-tooltip :content="'切换为' + (isDark ? '浅色模式' : '深色模式')">
        <a-button size="mini" class="nav-btn" @click="handleToggleTheme">
          <template #icon>
            <icon-sun-fill :size="18" v-if="isDark" />
            <icon-moon-fill :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <span class="menu-item">菜单1</span>
      <span class="menu-item">菜单2</span>
    </a-space>
  </a-row>
</template>

<script setup lang="ts">
import { useDark, useToggle, useFullscreen } from '@vueuse/core'

defineOptions({ name: 'HeaderRight' })

// 主题
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  initialValue: 'light',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme'
})
const handleToggleTheme = () => useToggle(isDark)

// 全屏
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
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
