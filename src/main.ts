import { createApp } from 'vue'

import ArcoVue from '@arco-design/web-vue'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

// 主样式
import '@/assets/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
