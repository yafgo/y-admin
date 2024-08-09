<template>
  <div class="tab-bar">
    <a-tabs :type="tabsType" hide-content>
      <a-tab-pane :title="`tab-${i}`" v-for="i in 20" :key="i"></a-tab-pane>
      <template #extra>
        <div>右侧扩展</div>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

defineOptions({ name: 'TabBar' })

const appStore = useAppStore()

const tabsType = computed(() => appStore.tabBarMode || 'card')
</script>

<style lang="scss" scoped>
.tab-bar {
  padding: 6px 0px 0;
  background-color: var(--color-bg-1);

  :deep(.arco-tabs-nav) {
    // tab-bar 底部边线
    &::before {
      z-index: 1;
    }
  }
}
</style>
