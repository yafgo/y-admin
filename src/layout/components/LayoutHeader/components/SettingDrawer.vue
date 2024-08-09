<template>
  <a-drawer
    v-model:visible="visible"
    title="全局配置"
    width="300px"
    unmount-on-close
    :footer="false"
  >
    <a-space :size="15" direction="vertical" fill>
      <a-divider orientation="center">系统布局</a-divider>
      <a-row justify="center">
        <a-space>
          <LayoutItem mode="left" name="左侧菜单" @click="appStore.layout = 'left'"></LayoutItem>
          <LayoutItem mode="top" name="顶部菜单" @click="appStore.layout = 'top'"></LayoutItem>
          <LayoutItem mode="mix" name="混合布局" @click="appStore.layout = 'mix'"></LayoutItem>
        </a-space>
      </a-row>

      <a-divider orientation="center">界面显示</a-divider>

      <a-descriptions :column="1" :align="{ value: 'right' }" :value-style="{ paddingRight: 0 }">
        <a-descriptions-item label="页签显示">
          <a-switch v-model="appStore.tabBar" />
        </a-descriptions-item>
        <a-descriptions-item label="页签风格">
          <a-select
            v-model="appStore.tabBarMode"
            placeholder="请选择"
            :options="tabBarModeList"
            :disabled="!appStore.tabBar"
            :trigger-props="{ autoFitPopupMinWidth: true }"
            :style="{ width: '120px' }"
          >
          </a-select>
        </a-descriptions-item>
      </a-descriptions>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import LayoutItem from './LayoutItem.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'SettingDrawer' })
const appStore = useAppStore()
const visible = ref(false)

const tabBarModeList: App.TabBarItem[] = [
  { label: '卡片', value: 'card' },
  { label: '卡片(带间隔)', value: 'card-gutter' },
  { label: '圆角', value: 'rounded' },
  // { label: '胶囊', value: 'capsule' },
  // { label: '线性', value: 'line' },
]

const open = () => {
  visible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
:deep(.arco-descriptions-item-label-block) {
  color: var(--color-text-1);
}
</style>
