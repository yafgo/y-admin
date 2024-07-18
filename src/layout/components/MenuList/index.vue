<script lang="tsx">
import { compile } from 'vue'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import useMenuTree from './use-menu-tree'
import { addRouteListener } from '@/utils/route-listener'

export default defineComponent({
  name: 'MenuList',
  setup() {
    const router = useRouter()
    const { menuTree } = useMenuTree()

    /** 展开的菜单项key */
    const openKeys = ref<string[]>([])
    /** 选中的菜单项key */
    const selectedKeys = ref<string[]>([])

    const goto = (el: RouteRecordRaw) => {
      router.push({
        name: el.name,
      })
    }

    const findMenuOpenKeys = (target: string) => {
      const result: string[] = []
      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }

    // 监听路由变化
    addRouteListener((to: RouteLocationNormalized) => {
      const { activeMenu, hideInMenu } = to.meta
      if (hideInMenu && !activeMenu && !to.name) {
        return
      }

      const menuOpenKeys = findMenuOpenKeys((activeMenu || to.name) as string)

      const keySet = new Set([...menuOpenKeys, ...openKeys.value])
      openKeys.value = [...keySet]

      selectedKeys.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]]
    }, true)

    // 渲染菜单项
    const renderMenu = () => {
      function travel(_routes: RouteRecordRaw[], nodes = []) {
        if (!_routes || !_routes.length) {
          return nodes
        }

        _routes.forEach((el) => {
          const icon = el?.meta?.icon ? () => h(compile(`<${el?.meta?.icon} />`)) : null

          const node =
            el?.children && el?.children.length ? (
              <a-sub-menu
                key={el.name}
                v-slots={{
                  icon,
                  title: () => el?.meta?.locale || '',
                }}
              >
                {travel(el?.children)}
              </a-sub-menu>
            ) : (
              <a-menu-item
                key={el.name}
                v-slots={{
                  icon,
                }}
                onClick={() => goto(el)}
              >
                {el?.meta?.locale || '菜单'}
              </a-menu-item>
            )
          nodes.push(node as never)
        })

        return nodes
      }
      return travel(menuTree.value)
    }

    return () => (
      <a-menu
        mode="vertical"
        auto-open={false}
        level-indent={16}
        v-model:open-keys={openKeys.value}
        v-model:selected-keys={selectedKeys.value}
        onCollapse={(e: any) => console.log(e)}
      >
        {renderMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="scss" scoped></style>
