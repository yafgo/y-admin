<template>
  <div class="tab-bar">
    <a-tabs
      :type="tabsType"
      hide-content
      editable
      :active-key="route.path"
      @tab-click="(key) => handleTabClick(key as string)"
      @delete="(key) => handleTabDelete(key as string)"
    >
      <a-tab-pane
        v-for="item in tabBarStore.tabList"
        :title="item.title"
        :key="item.path"
        :closable="true"
      ></a-tab-pane>
      <!-- <template #extra>
        <div>右侧扩展</div>
      </template> -->
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useTabBarStore } from '@/stores'
import type { TabItem } from '@/stores/modules/tabbar/types'
import { addRouteListener } from '@/utils/route-listener'

defineOptions({ name: 'TabBar' })

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const tabBarStore = useTabBarStore()

const tabsType = computed(() => appStore.tabBarMode || 'card')

addRouteListener((routeItem) => {
  // console.log('listen', routeItem)
  if (routeItem.meta.hideInMenu) {
    return
  }
  const item: TabItem = {
    title: routeItem.meta?.locale || '',
    name: '',
    path: routeItem.path,
    query: routeItem.query,
  }
  tabBarStore.addTabItem(item)
})

const handleTabClick = (key: string) => {
  if (key === route.path) {
    return
  }
  router.push({ path: key })
}

const handleTabDelete = (key: string) => {
  tabBarStore.removeTabItem(key)
}
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
