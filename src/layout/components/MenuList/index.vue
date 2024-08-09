<script lang="tsx">
import { compile } from 'vue'
import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import useMenuTree from '@/router/app-menus'
import { addRouteListener } from '@/utils/route-listener'
import { useAppStore } from '@/stores'

export default defineComponent({
  name: 'MenuList',
  props: {
    mode: {
      type: String, // "horizontal" | "vertical" | "pop" | "popButton"
      default: 'vertical',
    },
    menus: {
      type: Array<RouteRecordNormalized>,
      default: [],
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  setup(props) {
    const appStore = useAppStore()
    const router = useRouter()
    const { menuTree } = useMenuTree()

    const menus = computed(() => {
      if (props.menus.length) {
        return props.menus
      }
      return menuTree.value
    })

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
      menus.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })
      return result
    }

    const updateSelectedKeys = (name: string) => {
      const menuOpenKeys = findMenuOpenKeys(name)

      const keySet = new Set([...menuOpenKeys, ...openKeys.value])
      openKeys.value = [...keySet]

      selectedKeys.value = [menuOpenKeys[menuOpenKeys.length - 1]]
    }

    // 监听路由变化
    addRouteListener((to: RouteLocationNormalized) => {
      const { activeMenu, hideInMenu } = to.meta
      if (hideInMenu && !activeMenu && !to.name) {
        return
      }

      updateSelectedKeys(activeMenu || (to.name as string))
    }, true)

    /** 菜单项变化时 */
    watch(menus, () => {
      const route = router.currentRoute.value
      updateSelectedKeys(route.name as string)
    })

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
      return travel(menus.value)
    }

    // 菜单折叠状态
    const menuCollapsed = computed({
      get: () => (appStore.device === 'desktop' ? appStore.menuCollapsed : false),
      set: (val: boolean) => appStore.updateSettings({ menuCollapsed: val }),
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCollapse = (val: boolean) => {
      /* if (appStore.device === 'desktop') {
        appStore.updateSettings({ menuCollapsed: val })
      } */
    }

    return () => (
      <a-menu
        mode={props.mode}
        theme={props.theme}
        auto-open={false}
        level-indent={16}
        v-model:collapsed={menuCollapsed.value}
        v-model:open-keys={openKeys.value}
        v-model:selected-keys={selectedKeys.value}
        onCollapse={handleCollapse}
        show-collapse-button={true}
        style="height: 100%; width: 100%;"
      >
        {renderMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="scss" scoped></style>
