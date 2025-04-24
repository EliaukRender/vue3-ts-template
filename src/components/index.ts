import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import FixedWhRadio from './FixedWhRadio/index.vue'

// 全局组件列表
const components = {
  SvgIcon, // Svg组件
  FixedWhRadio
}

// 注册全局组件
export function setupComponents(app: App) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key as keyof typeof components])
  })
} 