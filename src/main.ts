import { createApp } from 'vue'
import App from './App.vue'
import { setupComponents } from '@/components'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.css'
import 'virtual:svg-icons-register'
import { loadGlobalPlugins } from '@/utils/loadGlobalPlugins'

const app = createApp(App)

loadGlobalPlugins(app) // 加载全局插件

setupComponents(app) // 全局自定义组件

app.mount('#app')
