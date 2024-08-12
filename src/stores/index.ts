import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTabBarStore from './modules/tabbar'

const store = createPinia()

store.use(piniaPluginPersistedState)

export { useAppStore, useUserStore, useTabBarStore }
export default store
