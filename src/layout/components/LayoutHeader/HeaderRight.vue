<template>
  <a-row class="header-right">
    <a-space size="large">
      <!-- 设置 -->
      <a-tooltip content="设置">
        <a-button size="mini" class="nav-btn" @click="settingDrawerRef?.open">
          <template #icon>
            <icon-settings :size="18" />
          </template>
        </a-button>
      </a-tooltip>

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
            <icon-moon-fill :size="18" v-if="isDark" />
            <icon-sun-fill :size="18" v-else />
          </template>
        </a-button>
      </a-tooltip>

      <!-- 用户菜单 -->
      <HeaderRightUser></HeaderRightUser>
    </a-space>

    <SettingDrawer ref="settingDrawerRef"></SettingDrawer>
  </a-row>
</template>

<script setup lang="ts">
import { useDark, useToggle, useFullscreen } from '@vueuse/core'
import HeaderRightUser from './components/HeaderRightUser.vue'
import SettingDrawer from './components/SettingDrawer.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'HeaderRight' })

const appStore = useAppStore()
const settingDrawerRef = ref<InstanceType<typeof SettingDrawer>>()

// 主题
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  initialValue: appStore.theme === 'dark' ? 'dark' : 'light',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(isDark, defaultHandler, mode) {
    defaultHandler(mode)
    appStore.toggleTheme(isDark)
  },
})
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => toggleTheme()

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
