<script lang="tsx">
import { compile } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import useMenuTree from './use-menu-tree'

export default defineComponent({
  name: 'MenuList',
  setup() {
    const router = useRouter()
    const { menuTree } = useMenuTree()

    const goto = (el: RouteRecordRaw) => {
      router.push({
        name: el.name,
        // path: el.path,
      })
    }

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
        onCollapse={(e: any) => console.log(e)}
      >
        {renderMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="scss" scoped></style>
