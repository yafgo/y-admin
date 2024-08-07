import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import useAppStore from './modules/app'
import useUserStore from './modules/user'

const store = createPinia()

store.use(piniaPluginPersistedState)

export { useAppStore, useUserStore }
export default store
