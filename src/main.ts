import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import directives from '@/directives/index'
import { setupComponents } from '@/components'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(router) // 路由
app.use(pinia) // 状态管理
app.use(directives)  // 注册vue指令
setupComponents(app) // 全局组件

app.mount('#app')
