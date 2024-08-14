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
      >
        <!-- <template #title>
          <TabItem>{{ item.title }}</TabItem>
        </template> -->
      </a-tab-pane>
      <template #extra>
        <a-space size="medium">
          <!-- 刷新当前页 -->
          <icon-refresh class="icon-btn-reload" :size="18" @click="handleReload" />

          <!-- 更多页签操作 -->
          <a-dropdown trigger="hover" @select="handleDropdownSelect">
            <icon-apps class="icon-btn-actions" :size="18" />
            <template #content>
              <a-doption :value="EAction.current">
                <template #icon><icon-close /></template>
                <template #default>关闭当前</template>
              </a-doption>
              <a-doption :value="EAction.others">
                <template #icon><icon-eraser /></template>
                <template #default>关闭其他</template>
              </a-doption>
              <a-doption :value="EAction.all">
                <template #icon><icon-folder-delete /></template>
                <template #default>关闭全部</template>
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useTabBarStore } from '@/stores'
import type { ITabItem } from '@/stores/modules/tabbar/types'
// import TabItem from './tab-item.vue'
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
  const item: ITabItem = {
    title: routeItem.meta?.locale || (routeItem.name as string) || '[未命名]',
    name: routeItem.name as string,
    path: routeItem.path,
    query: routeItem.query,
  }
  tabBarStore.addTabItem(item)
  if (!routeItem.meta.ignoreCache) {
    tabBarStore.cacheAdd(item.name)
  }
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

const handleReload = () => {
  console.log('刷新页面')
  appStore.reloadPage()
}

enum EAction {
  current = 'current',
  others = 'others',
  all = 'all',
}
const handleDropdownSelect = (key: any) => {
  switch (key) {
    case EAction.current:
      tabBarStore.closeOne(route.path)
      break
    case EAction.others:
      tabBarStore.closeOthers(route.path)
      break
    case EAction.all:
      tabBarStore.closeAll()
      break
    default:
      break
  }
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

.icon-btn-actions {
  margin-right: 12px;
  cursor: pointer;
}

.icon-btn-reload {
  cursor: pointer;
}
</style>
