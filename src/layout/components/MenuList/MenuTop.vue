<script lang="tsx">
import { compile } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'

export default defineComponent({
  name: 'MenuTop',
  props: {
    menus: {
      type: Array<RouteRecordNormalized>,
      default: [],
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    menuClick: (el: RouteRecordNormalized) => true,
  },
  setup(props, { emit }) {
    /** 选中的菜单项key */
    const selectedKeys = ref<string[]>([])

    const handleMenuItemClick = (el: RouteRecordNormalized) => {
      emit('menuClick', el)
    }

    // 渲染菜单项
    const renderMenu = () => {
      const nodes = props.menus.map((item) => {
        const icon = item?.meta?.icon ? () => h(compile(`<${item?.meta?.icon} />`)) : null

        return (
          <a-menu-item
            key={item.name}
            v-slots={{
              icon,
            }}
            onClick={() => handleMenuItemClick(item)}
          >
            {item.meta?.locale}
          </a-menu-item>
        )
      })

      return nodes
    }

    return () => (
      <a-menu
        mode="horizontal"
        auto-open={false}
        level-indent={16}
        v-model:selected-keys={selectedKeys.value}
        show-collapse-button={true}
      >
        {renderMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="scss" scoped></style>
