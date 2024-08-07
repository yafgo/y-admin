<script lang="tsx">
import router from '@/router'
import { isExternal } from '@/utils/route'
import { addRouteListener } from '@/utils/route-listener'
import { compile } from 'vue'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import { searchTree } from 'xe-utils/array'

export default defineComponent({
  name: 'MenuTop',
  props: {
    menus: {
      type: Array<RouteRecordNormalized>,
      default: [],
    },
  },
  emits: {
    /** 顶部菜单切换 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    menuChange: (el: RouteRecordNormalized) => true,
  },
  setup(props, { emit }) {
    // 当前路由
    const currRoute = ref<RouteRecordNormalized>()
    /** 选中的菜单项key */
    const selectedKeys = ref<string[]>([])

    const handleMenuItemClick = (el: RouteRecordNormalized) => {
      if (isExternal(el.path)) {
        window.open(el.path)
        return
      }
      router.push({ name: el.name })
    }

    addRouteListener((to: RouteLocationNormalized) => {
      // 查找to路由的所属的root路由
      const arrMatch = searchTree(props.menus, (el) => el.name === to.name, {
        children: 'children',
      })
      if (!arrMatch.length) {
        // 没有找到, 正常不应该出现
        return
      }
      const rootRoute = arrMatch[0]
      if (currRoute.value && currRoute.value.name === rootRoute.name) {
        // 顶部菜单没有改变
        return
      }
      currRoute.value = rootRoute
      selectedKeys.value = [rootRoute.name as string]
      emit('menuChange', currRoute.value)
    })

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
