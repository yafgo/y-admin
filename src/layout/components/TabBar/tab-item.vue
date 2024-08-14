<template>
  <a-dropdown trigger="contextMenu" :popup-max-height="false" @select="handleSelect">
    <div>
      <slot></slot>
    </div>
    <template #content>
      <a-doption :value="EAction.reload">
        <template #icon><icon-refresh /></template>
        <template #default>重新加载</template>
      </a-doption>

      <a-doption :value="EAction.current">
        <template #icon><icon-close /></template>
        <template #default>关闭当前</template>
      </a-doption>

      <a-doption class="devider-top" :value="EAction.left">
        <template #icon><icon-to-left /></template>
        <template #default>关闭左侧</template>
      </a-doption>

      <a-doption :value="EAction.right">
        <template #icon><icon-to-right /></template>
        <template #default>关闭右侧</template>
      </a-doption>

      <a-doption class="devider-top" :value="EAction.others">
        <template #icon><icon-swap /></template>
        <template #default>关闭其他</template>
      </a-doption>

      <a-doption :value="EAction.all">
        <template #icon><icon-folder-delete /></template>
        <template #default>关闭全部</template>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'TabItem' })

enum EAction {
  reload = 'reload',
  current = 'current',
  left = 'left',
  right = 'right',
  others = 'others',
  all = 'all',
}

const handleSelect = async (value: any) => {
  console.log('handleSelect', value)
}
</script>

<style lang="scss" scoped>
.devider-top {
  border-top: 1px solid var(--color-neutral-3);
}
</style>
