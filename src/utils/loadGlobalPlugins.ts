import { type App } from "vue";
import router from "@/router";
import pinia from "@/stores";
import directives from "@/directives";

/**
 * @description 加载全局插件
 * @param {App} app - vue实例
 */
export const loadGlobalPlugins = (app: App) => {
  app.use(router) // 路由
  app.use(pinia) // 状态管理
  app.use(directives)  // 注册vue指令
}