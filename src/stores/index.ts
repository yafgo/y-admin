import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'

const store = createPinia()

export { useAppStore, useUserStore }
export default store
